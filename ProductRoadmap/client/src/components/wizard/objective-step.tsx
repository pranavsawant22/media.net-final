import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Eye, MousePointer, ShoppingCart } from "lucide-react";

interface ObjectiveStepProps {
  selectedObjective: string;
  onObjectiveChange: (objective: string) => void;
}

const objectives = [
  {
    id: "awareness",
    icon: Eye,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    title: "Brand Awareness",
    description: "Increase visibility and reach new customers who might be interested in your business.",
    bestFor: "New businesses, product launches"
  },
  {
    id: "traffic",
    icon: MousePointer,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    title: "Website Traffic",
    description: "Drive more visitors to your website, blog, or online store.",
    bestFor: "E-commerce, content sites, lead generation"
  },
  {
    id: "sales",
    icon: ShoppingCart,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
    title: "Sales & Conversions",
    description: "Maximize sales, leads, or other valuable actions on your website.",
    bestFor: "Online stores, service bookings, app downloads"
  }
];

export default function ObjectiveStep({ selectedObjective, onObjectiveChange }: ObjectiveStepProps) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">What's your campaign goal?</h2>
          <p className="text-muted-foreground">Choose the primary objective for your advertising campaign.</p>
        </div>
        
        <RadioGroup value={selectedObjective} onValueChange={onObjectiveChange} className="space-y-4">
          {objectives.map((objective) => {
            const Icon = objective.icon;
            const isSelected = selectedObjective === objective.id;
            
            return (
              <div key={objective.id} className="step-card">
                <Label 
                  htmlFor={objective.id} 
                  className={`cursor-pointer block border-2 rounded-lg p-6 transition-colors ${
                    isSelected 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary"
                  }`}
                >
                  <RadioGroupItem value={objective.id} id={objective.id} className="sr-only" />
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${objective.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={objective.iconColor} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{objective.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{objective.description}</p>
                      <p className="text-xs text-muted-foreground">Best for: {objective.bestFor}</p>
                    </div>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
