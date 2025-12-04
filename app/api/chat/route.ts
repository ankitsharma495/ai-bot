import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { NextResponse } from 'next/server'; // Assumed Next.js environment

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google('gemini-2.5-pro'),
      messages: convertToModelMessages(messages),
    });

    // Correctly returns the streaming response object
    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    // Log the error for debugging
    console.error('AI Stream Error:', error); 
    
    // Return a standard HTTP error response 
    return new NextResponse('Internal Server Error while streaming AI response.', { 
      status: 500 
    });
  }
}