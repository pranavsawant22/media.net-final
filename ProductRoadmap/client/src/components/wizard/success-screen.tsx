import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessScreenProps {
  campaignId: string;
  budget: number;
  onViewDashboard: () => void;
  onCreateNew: () => void;
}

export default function SuccessScreen({ campaignId, budget, onViewDashboard, onCreateNew }: SuccessScreenProps) {
  return (
    <div className="wizard-container flex items-center justify-center">
      <Card className="max-w-2xl w-full text-center shadow-lg">
        <CardContent className="p-8 md:p-12">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-green-600 text-3xl" size={36} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Campaign Launched Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your campaign is now live and reaching your target audience.
            </p>
          </div>
          
          <div className="bg-muted rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-4">Campaign Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign ID:</span>
                <span className="font-mono font-medium text-foreground" data-testid="text-campaign-id">
                  {campaignId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium text-foreground" data-testid="text-success-budget">
                  ₹{budget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={onViewDashboard}
              className="w-full"
              size="lg"
              data-testid="button-view-dashboard"
            >
              View Dashboard
            </Button>
            <Button 
              onClick={onCreateNew}
              variant="outline"
              className="w-full"
              size="lg"
              data-testid="button-create-another"
            >
              Create Another Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
