import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Eye, MousePointer, ShoppingCart, Image } from "lucide-react";

interface PreviewStepProps {
  campaignData: {
    objective: string;
    budget: number;
    adCopy: string;
    productDescription: string;
    uploadedImage: File | null;
    location: string;
    ageFrom: number;
    ageTo: number;
    gender: string;
  };
  onLaunch: () => void;
  isLaunching: boolean;
}

const objectiveIcons = {
  awareness: Eye,
  traffic: MousePointer,
  sales: ShoppingCart,
};

const objectiveLabels = {
  awareness: "Brand Awareness",
  traffic: "Website Traffic", 
  sales: "Sales & Conversions",
};

export default function PreviewStep({ campaignData, onLaunch, isLaunching }: PreviewStepProps) {
  const Icon = objectiveIcons[campaignData.objective as keyof typeof objectiveIcons] || ShoppingCart;
  const objectiveLabel = objectiveLabels[campaignData.objective as keyof typeof objectiveLabels] || "Sales & Conversions";
  const estimatedReach = campaignData.budget * 10;

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Review & Launch</h2>
          <p className="text-muted-foreground">Review your campaign details before launching.</p>
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Ad Preview</h3>
            <div className="bg-muted rounded-lg p-4 max-w-sm">
              <div className="w-full h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-3 flex items-center justify-center">
                {campaignData.uploadedImage ? (
                  <img 
                    src={URL.createObjectURL(campaignData.uploadedImage)} 
                    alt="Campaign creative"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Image className="text-green-600 text-2xl" size={32} />
                )}
              </div>
              <p className="text-sm text-foreground mb-2" data-testid="text-campaign-ad-copy">
                {campaignData.adCopy || "Your ad copy will appear here"}
              </p>
              <Button size="sm" className="bg-primary text-primary-foreground text-xs">
                Shop Now
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">Campaign Objective</h4>
                  <div className="flex items-center space-x-2">
                    <Icon className="text-primary" size={20} />
                    <span className="text-sm text-foreground" data-testid="text-preview-objective">
                      {objectiveLabel}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">Budget & Reach</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Budget:</span>
                      <span className="font-medium text-foreground" data-testid="text-preview-budget">
                        ₹{campaignData.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Reach:</span>
                      <span className="font-medium text-foreground" data-testid="text-preview-reach">
                        {estimatedReach.toLocaleString()} people
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">Target Audience</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium text-foreground" data-testid="text-preview-location">
                        {campaignData.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-medium text-foreground" data-testid="text-preview-age">
                        {campaignData.ageFrom}-{campaignData.ageTo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="font-medium text-foreground" data-testid="text-preview-gender">
                        {campaignData.gender === "all" ? "All" : campaignData.gender.charAt(0).toUpperCase() + campaignData.gender.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">Campaign Timeline</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span className="font-medium text-foreground">Today</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium text-foreground">30 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <Button 
              onClick={onLaunch}
              disabled={isLaunching}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg shadow-md"
              size="lg"
              data-testid="button-launch-campaign"
            >
              <Rocket className="mr-2" size={20} />
              {isLaunching ? "Launching..." : "Launch Campaign"}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              By launching, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
