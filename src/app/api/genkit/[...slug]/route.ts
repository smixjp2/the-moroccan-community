'use server';

import {createNextApiHandler} from '@genkit-ai/next';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Importez vos flux ici
import '@/ai/flows/dividend-yield-calculator';
import '@/ai/flows/fee-simulator-tool';
import '@/ai/flows/investment-news-summarizer';
import '@/ai/flows/retirement-planner';

genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const {GET, POST} = createNextApiHandler();
