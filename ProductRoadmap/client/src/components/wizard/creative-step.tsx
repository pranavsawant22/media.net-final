import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CloudUpload, Sparkles, Image } from "lucide-react";
import { generateAdCopyWithGemini } from "../../lib/gemini";
import { useToast } from "@/hooks/use-toast";

interface CreativeStepProps {
  productDescription: string;
  adCopy: string;
  uploadedImage: File | null;
  objective: string;
  onProductDescriptionChange: (description: string) => void;
  onAdCopyChange: (copy: string) => void;
  onImageUpload: (file: File | null) => void;
}

export default function CreativeStep({
  productDescription,
  adCopy,
  uploadedImage,
  objective,
  onProductDescriptionChange,
  onAdCopyChange,
  onImageUpload
}: CreativeStepProps) {
  const [generatedCopies, setGeneratedCopies] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      onImageUpload(file);
    }
  };

  const handleGenerateAdCopy = async () => {
    if (!productDescription.trim()) {
      toast({
        title: "Product description required",
        description: "Please describe your product before generating ad copy",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const copies = await generateAdCopyWithGemini(productDescription, objective);
      setGeneratedCopies(copies);
      toast({
        title: "Ad copy generated!",
        description: "Choose one of the AI-generated options below",
      });
    } catch (error) {
      // Fallback ad copy options when AI generation fails
      const fallbackCopies = getFallbackAdCopy(productDescription, objective);
      setGeneratedCopies(fallbackCopies);
      toast({
        title: "Using suggested ad copy",
        description: "AI service unavailable. Here are some suggested options:",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getFallbackAdCopy = (description: string, obj: string) => {
    const productName = description.split(' ').slice(0, 3).join(' ') || 'Your Product';
    
    switch (obj) {
      case 'awareness':
        return [
          `🌟 Discover ${productName}! Quality you can trust. Learn more today!`,
          `✨ Introducing ${productName} - Experience the difference!`,
          `🎯 ${productName} - Now available! See what makes us special.`
        ];
      case 'traffic':
        return [
          `🔥 ${productName} awaits! Visit our website for exclusive details.`,
          `💫 Explore ${productName} on our website. Click to discover more!`,
          `🚀 ${productName} - Visit us online for the full experience!`
        ];
      case 'sales':
        return [
          `🛒 Shop ${productName} now! Limited time offer - Order today!`,
          `💰 ${productName} - Special deals available! Buy now and save!`,
          `⚡ Get ${productName} today! Fast delivery, great prices!`
        ];
      default:
        return [
          `✨ ${productName} - Quality and value combined!`,
          `🌟 Experience ${productName} - Made for you!`,
          `🎯 ${productName} - Your perfect choice awaits!`
        ];
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Create your ad</h2>
          <p className="text-muted-foreground">Add your product details and let AI help you create compelling ad copy.</p>
        </div>
        
        <div className="space-y-6 mb-8">
          <div>
            <Label className="block text-sm font-medium text-foreground mb-2">
              Product/Service Description
            </Label>
            <Textarea 
              placeholder="Describe your product or service (e.g., 'Handmade organic soaps with natural ingredients')"
              value={productDescription}
              onChange={(e) => onProductDescriptionChange(e.target.value)}
              className="resize-none"
              rows={3}
              data-testid="textarea-product-description"
            />
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-foreground mb-2">
              Product Image (Optional)
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="space-y-2">
                  {uploadedImage ? (
                    <div className="flex flex-col items-center">
                      <Image className="text-primary text-2xl" size={32} />
                      <p className="text-primary font-medium">{uploadedImage.name}</p>
                      <p className="text-xs text-muted-foreground">Click to change</p>
                    </div>
                  ) : (
                    <>
                      <CloudUpload className="text-muted-foreground text-2xl mx-auto" size={32} />
                      <p className="text-muted-foreground">
                        <span className="font-medium text-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                    </>
                  )}
                </div>
              </label>
              <input 
                id="image-upload"
                type="file" 
                className="sr-only" 
                accept="image/*"
                onChange={handleFileUpload}
                data-testid="input-image-upload"
              />
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">AI Ad Copy Assistant</h3>
              <Sparkles className="text-primary" size={20} />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Let AI create compelling ad copy based on your product description.
            </p>
            <Button 
              onClick={handleGenerateAdCopy}
              disabled={isGenerating || !productDescription.trim()}
              className="w-full"
              data-testid="button-generate-ad-copy"
            >
              <Sparkles className="mr-2" size={16} />
              {isGenerating ? "Generating..." : "Generate Ad Copy"}
            </Button>
          </div>
          
          {generatedCopies.length > 0 && (
            <div>
              <Label className="block text-sm font-medium text-foreground mb-3">
                Choose your ad copy:
              </Label>
              <RadioGroup value={adCopy} onValueChange={onAdCopyChange} className="space-y-3">
                {generatedCopies.map((copy, index) => (
                  <div key={index} className="step-card">
                    <Label 
                      htmlFor={`copy-${index}`}
                      className={`cursor-pointer block border rounded-lg p-4 transition-colors ${
                        adCopy === copy 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <RadioGroupItem value={copy} id={`copy-${index}`} className="sr-only" />
                      <p className="text-foreground" data-testid={`text-ad-copy-${index}`}>
                        {copy}
                      </p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
