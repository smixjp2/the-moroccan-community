"use server";

/**
 * @fileOverview A fee simulator AI agent that calculates the impact of fees on investment returns.
 *
 * - feeSimulator - A function that calculates the impact of fees on investment returns.
 * - FeeSimulatorInput - The input type for the feeSimulator function.
 * - FeeSimulatorOutput - The return type for the feeSimulator function.
 */

import {z} from 'zod';

const FeeSimulatorInputSchema = z.object({
  initialInvestment: z
    .number()
    .describe('The initial investment amount in Moroccan Dirhams.'),
  annualReturnRate: z
    .number()
    .describe('The estimated annual return rate as a percentage.'),
  investmentPeriod: z
    .number()
    .describe('The investment period in years.'),
  bankFees: z
    .number()
    .describe('The annual bank fees in Moroccan Dirhams.'),
  commissionStructure: z
    .string()
    .describe(
      'The commission structure of the bank, including transaction fees and any other charges.'
    ),
});
export type FeeSimulatorInput = z.infer<typeof FeeSimulatorInputSchema>;

const FeeSimulatorOutputSchema = z.object({
  finalValueWithoutFees: z
    .number()
    .describe('The final value of the investment without considering any fees.'),
  totalFeesPaid: z
    .number()
    .describe('The total amount of fees paid over the investment period.'),
  finalValueWithFees: z
    .number()
    .describe('The final value of the investment after deducting all fees.'),
  feeImpactPercentage: z
    .number()
    .describe(
      'The percentage impact of fees on the final investment value. Higher number is bad.'
    ),
  recommendation: z
    .string()
    .describe(
      'A recommendation on whether the bank is cost-effective based on the fee impact.'
    ),
});
export type FeeSimulatorOutput = z.infer<typeof FeeSimulatorOutputSchema>;
