import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, User, UserX } from "lucide-react";

interface AudienceStepProps {
  location: string;
  ageFrom: number;
  ageTo: number;
  gender: string;
  autoAudience: boolean;
  onLocationChange: (location: string) => void;
  onAgeFromChange: (age: number) => void;
  onAgeToChange: (age: number) => void;
  onGenderChange: (gender: string) => void;
  onAutoAudienceChange: (auto: boolean) => void;
}

const locations = [
  "All India", "Mumbai", "Delhi", "Bangalore", "Chennai", 
  "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Jaipur"
];

const ages = [18, 25, 35, 45, 55, 65];

export default function AudienceStep({
  location,
  ageFrom,
  ageTo,
  gender,
  autoAudience,
  onLocationChange,
  onAgeFromChange,
  onAgeToChange,
  onGenderChange,
  onAutoAudienceChange
}: AudienceStepProps) {
  const audienceSize = Math.round((50000 - Math.abs(ageTo - ageFrom) * 1000) / (gender === "all" ? 1 : 2));

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Target your audience</h2>
          <p className="text-muted-foreground">Define who should see your ads for better results.</p>
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="bg-accent rounded-lg p-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <Checkbox 
                checked={autoAudience}
                onCheckedChange={onAutoAudienceChange}
                data-testid="checkbox-auto-audience"
              />
              <div>
                <span className="font-medium text-foreground">Auto Audience Suggestion</span>
                <p className="text-sm text-muted-foreground">Let AI choose the best audience based on your campaign goal</p>
              </div>
            </label>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-foreground mb-2">Target Location</Label>
            <Select value={location} onValueChange={onLocationChange}>
              <SelectTrigger className="w-full" data-testid="select-location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-foreground mb-2">Age Range</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-xs text-muted-foreground mb-1">From</Label>
                <Select value={ageFrom.toString()} onValueChange={(value) => onAgeFromChange(parseInt(value))}>
                  <SelectTrigger data-testid="select-age-from">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ages.filter(age => age < ageTo).map((age) => (
                      <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-xs text-muted-foreground mb-1">To</Label>
                <Select value={ageTo.toString()} onValueChange={(value) => onAgeToChange(parseInt(value))}>
                  <SelectTrigger data-testid="select-age-to">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ages.filter(age => age > ageFrom).map((age) => (
                      <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-foreground mb-3">Gender</Label>
            <RadioGroup value={gender} onValueChange={onGenderChange} className="grid grid-cols-3 gap-3">
              <div className="step-card">
                <Label 
                  htmlFor="gender-all"
                  className={`cursor-pointer block border-2 rounded-lg p-3 text-center transition-colors ${
                    gender === "all" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                  }`}
                >
                  <RadioGroupItem value="all" id="gender-all" className="sr-only" />
                  <Users className={`mx-auto mb-2 ${gender === "all" ? "text-primary" : "text-muted-foreground"}`} size={20} />
                  <div className="text-sm font-medium text-foreground">All</div>
                </Label>
              </div>
              <div className="step-card">
                <Label 
                  htmlFor="gender-male"
                  className={`cursor-pointer block border-2 rounded-lg p-3 text-center transition-colors ${
                    gender === "male" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                  }`}
                >
                  <RadioGroupItem value="male" id="gender-male" className="sr-only" />
                  <User className={`mx-auto mb-2 ${gender === "male" ? "text-primary" : "text-muted-foreground"}`} size={20} />
                  <div className="text-sm font-medium text-foreground">Male</div>
                </Label>
              </div>
              <div className="step-card">
                <Label 
                  htmlFor="gender-female"
                  className={`cursor-pointer block border-2 rounded-lg p-3 text-center transition-colors ${
                    gender === "female" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                  }`}
                >
                  <RadioGroupItem value="female" id="gender-female" className="sr-only" />
                  <UserX className={`mx-auto mb-2 ${gender === "female" ? "text-primary" : "text-muted-foreground"}`} size={20} />
                  <div className="text-sm font-medium text-foreground">Female</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Audience Summary</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium">Location:</span> <span data-testid="text-audience-location">{location}</span></p>
              <p><span className="font-medium">Age:</span> <span data-testid="text-audience-age">{ageFrom}-{ageTo}</span></p>
              <p><span className="font-medium">Gender:</span> <span data-testid="text-audience-gender">{gender === "all" ? "All" : gender.charAt(0).toUpperCase() + gender.slice(1)}</span></p>
              <p><span className="font-medium">Estimated Audience Size:</span> <span data-testid="text-audience-size">{(audienceSize / 1000).toFixed(1)}M people</span></p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
