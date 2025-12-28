import { ai } from "@/ai/genkit";
import { createApiHandler } from "@genkit-ai/next/api";

export const { GET, POST } = createApiHandler({
    getGenkit: () => ai,
});
