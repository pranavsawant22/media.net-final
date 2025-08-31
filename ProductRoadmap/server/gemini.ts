import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "AIzaSyD8LIMEyITAAleIHPTE9_wAzV1uUvIaBeo" });

export async function generateAdCopyWithGemini(productDescription: string, objective: string): Promise<string[]> {
    try {
        const objectivePrompts = {
            awareness: "brand awareness and visibility",
            traffic: "driving website traffic and clicks",
            sales: "sales conversions and purchases"
        };

        const objectiveText = objectivePrompts[objective as keyof typeof objectivePrompts] || "general marketing";

        const prompt = `Create 3 compelling, concise ad copy variations for ${objectiveText} based on this product description: "${productDescription}". 

Requirements:
- Each copy should be under 100 characters
- Include relevant emojis
- Focus on benefits and call-to-action
- Make them catchy and conversion-focused
- Suitable for Indian SMB audience

Return the response as JSON in this exact format:
{
  "adCopies": [
    "Copy variation 1",
    "Copy variation 2", 
    "Copy variation 3"
  ]
}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        adCopies: {
                            type: "array",
                            items: { type: "string" },
                        },
                    },
                    required: ["adCopies"],
                },
            },
            contents: prompt,
        });

        const result = JSON.parse(response.text || "{}");
        return result.adCopies || [];
    } catch (error) {
        throw new Error(`Failed to generate ad copy with Gemini: ${error}`);
    }
}
