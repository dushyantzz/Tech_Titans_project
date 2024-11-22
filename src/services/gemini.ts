import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDXegHB5E6s2VsEcwTL5rHuXOAe8AWQgCo';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateStructuredResponse = async (userInput: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert educational assistant for JEE, NEET, CUET, GATE, and CAT exam preparation.
    Please analyze the following query and provide a structured response in JSON format:
    
    Query: ${userInput}
    
    Response format should be:
    {
      "type": "exam_info" | "subject_details" | "practice_question" | "general",
      "content": {
        "title": "Brief title",
        "details": "Main explanation",
        "points": ["Key point 1", "Key point 2", ...],
        "question": {
          "text": "Question text (if applicable)",
          "options": ["Option 1", "Option 2", ...],
          "answer": "Correct answer",
          "explanation": "Detailed explanation"
        }
      }
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }

    // Fallback to regular text if JSON parsing fails
    return {
      type: 'general',
      content: {
        title: 'Response',
        details: text,
        points: []
      }
    };
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};