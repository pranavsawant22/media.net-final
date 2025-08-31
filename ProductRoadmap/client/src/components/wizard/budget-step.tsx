import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface BudgetStepProps {
  budget: number;
  onBudgetChange: (budget: number) => void;
}

export default function BudgetStep({ budget, onBudgetChange }: BudgetStepProps) {
  const estimatedReach = budget * 10;
  const dailySpend = Math.round(budget / 30);

  const handleSliderChange = (value: number[]) => {
    onBudgetChange(value[0]);
  };

  const setBudget = (amount: number) => {
    onBudgetChange(amount);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Set your budget</h2>
          <p className="text-muted-foreground">Choose how much you want to spend on this campaign.</p>
        </div>
        
        <div className="space-y-6 mb-8">
          <div>
            <Label className="block text-sm font-medium text-foreground mb-4">Campaign Budget</Label>
            <div className="px-2">
              <Slider
                value={[budget]}
                onValueChange={handleSliderChange}
                max={50000}
                min={500}
                step={100}
                className="w-full"
                data-testid="slider-budget"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Selected Budget</span>
              <span className="text-2xl font-bold text-primary" data-testid="text-selected-budget">
                ₹{budget.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Estimated Daily Spend</span>
              <span className="text-sm font-medium text-foreground" data-testid="text-daily-spend">
                ₹{dailySpend}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated Reach</span>
              <span className="text-sm font-medium text-foreground" data-testid="text-estimated-reach">
                {estimatedReach.toLocaleString()} people
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              onClick={() => setBudget(1000)}
              className={`h-auto p-3 flex flex-col ${budget === 1000 ? "border-primary bg-primary/5" : ""}`}
              data-testid="button-budget-1000"
            >
              <div className="text-lg font-semibold text-foreground">₹1,000</div>
              <div className="text-xs text-muted-foreground">Starter</div>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setBudget(5000)}
              className={`h-auto p-3 flex flex-col ${budget === 5000 ? "border-primary bg-primary/5" : ""}`}
              data-testid="button-budget-5000"
            >
              <div className="text-lg font-semibold text-primary">₹5,000</div>
              <div className="text-xs text-primary">Recommended</div>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setBudget(10000)}
              className={`h-auto p-3 flex flex-col ${budget === 10000 ? "border-primary bg-primary/5" : ""}`}
              data-testid="button-budget-10000"
            >
              <div className="text-lg font-semibold text-foreground">₹10,000</div>
              <div className="text-xs text-muted-foreground">Growth</div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
