import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface Recommendation {
    type: string;
    productName: string;
    reason: string;
}

export const getAIRecommendations = async (crop: string): Promise<Recommendation[]> => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured');
    }

    const prompt = `As an expert agricultural consultant, recommend the best farming inputs for growing ${crop}. 
    Provide recommendations for:
    1. A specific Seed variety
    2. A Recommended Fertilizer
    3. A Recommended Pesticide or Bio-control
    Include the reason for each choice. Return the data in a structured JSON format.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING, description: "Type of input (Seed, Fertilizer, Pesticide)" },
                            productName: { type: Type.STRING, description: "Name of the recommended product" },
                            reason: { type: Type.STRING, description: "Why this is recommended for this crop" }
                        },
                        required: ["type", "productName", "reason"]
                    }
                }
            }
        });

        const text = response.text || '[]';
        return JSON.parse(text);
    } catch (error) {
        console.error('AI Recommendation Error:', error);
        return [];
    }
};
