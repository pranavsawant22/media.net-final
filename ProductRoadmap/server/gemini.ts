import { GoogleGenerativeAI } from "@google/generative-ai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// Load API key from environment variable
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI("AIzaSyAGNC9DpVhS19llcj_3NDcHJ6k_jSYvVvE");

// Use the model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateAdCopyWithGemini(
  productDescription: string,
  objective: string
): Promise<string[]> {
  try {
    const objectivePrompts = {
      awareness: "brand awareness and visibility",
      traffic: "driving website traffic and clicks",
      sales: "sales conversions and purchases",
    };

    const objectiveText =
      objectivePrompts[objective as keyof typeof objectivePrompts] ||
      "general marketing";

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

    // Ask Gemini
    const result = await model.generateContent(prompt);

    // Handle Markdown fences and ensure valid JSON
    let text = result.response.text().trim();
    if (text.startsWith("```")) {
      text = text.replace(/```json\n?/, "").replace(/```$/, "").trim();
    }

    let parsed: any = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      // If Gemini didn't return JSON, fallback
      parsed = { adCopies: text.split("\n").filter(Boolean) };
    }

    return parsed.adCopies || [];
  } catch (error) {
    throw new Error(`Failed to generate ad copy with Gemini: ${error}`);
  }
}
