import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import { createNextApiHandler } from "@genkit-ai/next";

import "@/ai/flows/dividend-yield-calculator";
import "@/ai/flows/fee-simulator-tool";
import "@/ai/flows/investment-news-summarizer";
import "@/ai/flows/retirement-planner";

genkit({
  plugins: [googleAI()],
});

export const { GET, POST } = createNextApiHandler();
