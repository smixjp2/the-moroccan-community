import { ai } from "@/ai/genkit";
import { nextJsApiHandler } from "@genkit-ai/next";

export const { GET, POST } = nextJsApiHandler({
    getGenkit: () => ai,
});
