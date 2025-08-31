import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import WelcomeScreen from "@/components/wizard/welcome-screen";
import ObjectiveStep from "@/components/wizard/objective-step";
import BudgetStep from "@/components/wizard/budget-step";
import CreativeStep from "@/components/wizard/creative-step";
import AudienceStep from "@/components/wizard/audience-step";
import PreviewStep from "@/components/wizard/preview-step";
import SuccessScreen from "@/components/wizard/success-screen";
import ProgressBar from "@/components/wizard/progress-bar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { InsertCampaign, Campaign } from "@shared/schema";

interface CampaignWizardData {
  objective: string;
  budget: number;
  productDescription: string;
  adCopy: string;
  uploadedImage: File | null;
  location: string;
  ageFrom: number;
  ageTo: number;
  gender: string;
  autoAudience: boolean;
}

export default function CampaignCreator() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [launchedCampaign, setLaunchedCampaign] = useState<Campaign | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [wizardData, setWizardData] = useState<CampaignWizardData>({
    objective: "",
    budget: 5000,
    productDescription: "",
    adCopy: "",
    uploadedImage: null,
    location: "All India",
    ageFrom: 18,
    ageTo: 65,
    gender: "all",
    autoAudience: false,
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: InsertCampaign) => {
      const response = await apiRequest("POST", "/api/campaigns", campaignData);
      return response.json();
    },
    onSuccess: (campaign: Campaign) => {
      setLaunchedCampaign(campaign);
      setShowSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({
        title: "Campaign launched!",
        description: `Campaign ${campaign.id} is now active`,
      });
    },
    onError: (error) => {
      toast({
        title: "Launch failed",
        description: error instanceof Error ? error.message : "Failed to launch campaign",
        variant: "destructive",
      });
    },
  });

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!wizardData.objective) {
          toast({
            title: "Please select an objective",
            description: "Choose your campaign goal to continue",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (wizardData.budget < 500) {
          toast({
            title: "Minimum budget required",
            description: "Please set a budget of at least ₹500",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!wizardData.productDescription.trim()) {
          toast({
            title: "Product description required",
            description: "Please describe your product or service",
            variant: "destructive",
          });
          return false;
        }
        if (!wizardData.adCopy.trim()) {
          toast({
            title: "Ad copy required",
            description: "Please generate and select ad copy",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 4:
        if (!wizardData.location) {
          toast({
            title: "Location required",
            description: "Please select a target location",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleLaunch = () => {
    const campaignData: InsertCampaign = {
      name: `${wizardData.productDescription.slice(0, 30)}...`,
      objective: wizardData.objective,
      budget: wizardData.budget,
      adCopy: wizardData.adCopy,
      productDescription: wizardData.productDescription,
      imageUrl: wizardData.uploadedImage ? "uploaded-image.jpg" : null,
      targetLocation: wizardData.location,
      ageFrom: wizardData.ageFrom,
      ageTo: wizardData.ageTo,
      gender: wizardData.gender,
      status: "active",
    };

    createCampaignMutation.mutate(campaignData);
  };

  const handleViewDashboard = () => {
    setLocation("/dashboard");
  };

  const handleCreateNew = () => {
    setCurrentStep(0);
    setShowSuccess(false);
    setLaunchedCampaign(null);
    setWizardData({
      objective: "",
      budget: 5000,
      productDescription: "",
      adCopy: "",
      uploadedImage: null,
      location: "All India",
      ageFrom: 18,
      ageTo: 65,
      gender: "all",
      autoAudience: false,
    });
  };

  if (showSuccess && launchedCampaign) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SuccessScreen
            campaignId={launchedCampaign.id}
            budget={launchedCampaign.budget}
            onViewDashboard={handleViewDashboard}
            onCreateNew={handleCreateNew}
          />
        </main>
      </div>
    );
  }

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <WelcomeScreen onStart={handleStart} onViewDashboard={handleViewDashboard} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={5} />
        
        <div className="wizard-container">
          {currentStep === 1 && (
            <ObjectiveStep
              selectedObjective={wizardData.objective}
              onObjectiveChange={(objective) => setWizardData(prev => ({ ...prev, objective }))}
            />
          )}
          
          {currentStep === 2 && (
            <BudgetStep
              budget={wizardData.budget}
              onBudgetChange={(budget) => setWizardData(prev => ({ ...prev, budget }))}
            />
          )}
          
          {currentStep === 3 && (
            <CreativeStep
              productDescription={wizardData.productDescription}
              adCopy={wizardData.adCopy}
              uploadedImage={wizardData.uploadedImage}
              objective={wizardData.objective}
              onProductDescriptionChange={(description) => setWizardData(prev => ({ ...prev, productDescription: description }))}
              onAdCopyChange={(copy) => setWizardData(prev => ({ ...prev, adCopy: copy }))}
              onImageUpload={(image) => setWizardData(prev => ({ ...prev, uploadedImage: image }))}
            />
          )}
          
          {currentStep === 4 && (
            <AudienceStep
              location={wizardData.location}
              ageFrom={wizardData.ageFrom}
              ageTo={wizardData.ageTo}
              gender={wizardData.gender}
              autoAudience={wizardData.autoAudience}
              onLocationChange={(location) => setWizardData(prev => ({ ...prev, location }))}
              onAgeFromChange={(age) => setWizardData(prev => ({ ...prev, ageFrom: age }))}
              onAgeToChange={(age) => setWizardData(prev => ({ ...prev, ageTo: age }))}
              onGenderChange={(gender) => setWizardData(prev => ({ ...prev, gender }))}
              onAutoAudienceChange={(auto) => setWizardData(prev => ({ ...prev, autoAudience: auto }))}
            />
          )}
          
          {currentStep === 5 && (
            <PreviewStep
              campaignData={wizardData}
              onLaunch={handleLaunch}
              isLaunching={createCampaignMutation.isPending}
            />
          )}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className={`px-6 py-3 font-medium ${currentStep === 1 ? "invisible" : ""}`}
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
          
          <div></div>
          
          <Button
            onClick={handleNext}
            className={`px-6 py-3 font-medium ${currentStep === 5 ? "hidden" : ""}`}
            data-testid="button-next"
          >
            Next <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </main>
    </div>
  );
}
