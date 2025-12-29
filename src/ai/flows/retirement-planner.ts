"use server";

/**
 * @fileOverview Simulates retirement savings plan.
 *
 * - planRetirement - A function that simulates retirement savings.
 * - RetirementPlannerInput - The input type for the planRetirement function.
 * - RetirementPlannerOutput - The return type for the planRetirement function.
 */

import {z} from 'zod';

const RetirementPlannerInputSchema = z.object({
  currentAge: z.number().int().min(18).describe('Your current age.'),
  retirementAge: z.number().int().min(40).describe('The age at which you plan to retire.'),
  initialSavings: z.number().describe('Your current retirement savings.'),
  monthlyContribution: z.number().describe('The amount you contribute to savings each month.'),
  annualReturnRate: z.number().describe('The estimated annual return on your investments as a percentage.'),
});
export type RetirementPlannerInput = z.infer<typeof RetirementPlannerInputSchema>;

const YearDataSchema = z.object({
  year: z.number(),
  value: z.number(),
});
export type YearData = z.infer<typeof YearDataSchema>;


const RetirementPlannerOutputSchema = z.object({
  finalSavings: z.number().describe('The total estimated savings at retirement age.'),
  totalContributions: z.number().describe('The total amount of your own money contributed.'),
  totalInterest: z.number().describe('The total interest earned over the period.'),
  yearlyBreakdown: z.array(YearDataSchema).describe('A yearly breakdown of the savings growth.'),
  analysis: z.string().describe('An analysis of the retirement plan.'),
  recommendation: z.string().describe('A recommendation to improve the plan.')
});
export type RetirementPlannerOutput = z.infer<typeof RetirementPlannerOutputSchema>;
