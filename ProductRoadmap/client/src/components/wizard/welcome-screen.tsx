import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Clock, Sparkles, TrendingUp } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
  onViewDashboard: () => void;
}

export default function WelcomeScreen({ onStart, onViewDashboard }: WelcomeScreenProps) {
  return (
    <div className="wizard-container flex items-center justify-center">
      <Card className="max-w-2xl w-full text-center shadow-lg">
        <CardContent className="p-8 md:p-12">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Megaphone className="text-primary text-3xl" size={36} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Create Your First Campaign
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Launch professional ad campaigns in just 5 simple steps. No marketing experience required.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-3">
                <Clock className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Under 5 Minutes</h3>
              <p className="text-sm text-muted-foreground">Quick setup process</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-3">
                <Sparkles className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Smart ad copy generation</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Budget-Friendly</h3>
              <p className="text-sm text-muted-foreground">Start from ₹500</p>
            </div>
          </div>
          
          <Button 
            onClick={onStart}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg shadow-md"
            size="lg"
            data-testid="button-get-started"
          >
            Get Started <span className="ml-2">→</span>
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Already have campaigns?{" "}
            <button 
              onClick={onViewDashboard} 
              className="text-primary hover:underline"
              data-testid="link-view-dashboard"
            >
              View Dashboard
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
