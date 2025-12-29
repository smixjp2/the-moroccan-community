import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import { firebase } from "@genkit-ai/firebase";
import { devLogger, startFlowsServer } from "@genkit-ai/flow";

import * as dividendYield from "./flows/dividend-yield-calculator";
// Import other flows here

genkit({
  plugins: [
    devLogger(),
    firebase(),
    googleAI({
      apiVersion: "v1beta",
    }),
  ],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});

startFlowsServer();
