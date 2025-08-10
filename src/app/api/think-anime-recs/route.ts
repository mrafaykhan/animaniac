import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});


export async function POST(request: Request) {
    try {
        const { query } = await request.json();
        if (!query) {
            return NextResponse.json({ error: "Missing query in request body" }, { status: 400 });
        }
        const result = await thinkAnimeRecs(query);
        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}

async function thinkAnimeRecs(contents: string) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });
        console.log("Generated text:", response.text);
        return response.text;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}