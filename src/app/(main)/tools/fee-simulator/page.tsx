"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Info, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

// This type is now defined locally to remove AI dependency.
type FeeSimulatorOutput = {
  finalValueWithoutFees: number;
  totalFeesPaid: number;
  finalValueWithFees: number;
  feeImpactPercentage: number;
  recommendation: string;
};

const formSchema = z.object({
  initialInvestment: z.coerce.number().min(1000, "Doit être d'au moins 1 000"),
  annualReturnRate: z.coerce.number().min(0).max(100, "Le taux doit être entre 0 et 100"),
  investmentPeriod: z.coerce.number().int().min(1, "Doit être d'au moins 1 an"),
  annualFixedFees: z.coerce.number().min(0, "Les frais ne peuvent être négatifs"),
  transactionCommission: z.coerce.number().min(0).max(100, "La commission doit être entre 0 et 100"),
  transactionsPerYear: z.coerce.number().int().min(0, "Doit être un nombre positif"),
});

type FormValues = z.infer<typeof formSchema>;

export default function FeeSimulatorPage() {
  const [result, setResult] = useState<FeeSimulatorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 100000,
      annualReturnRate: 8,
      investmentPeriod: 10,
      annualFixedFees: 500,
      transactionCommission: 0.5,
      transactionsPerYear: 2,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
        // --- All calculations are now done locally ---
        const { 
            initialInvestment, 
            annualReturnRate, 
            investmentPeriod, 
            annualFixedFees,
            transactionCommission,
            transactionsPerYear
        } = values;

        const rate = annualReturnRate / 100;
        const commission = transactionCommission / 100;
        
        let finalValueWithoutFees = initialInvestment;
        for (let i = 0; i < investmentPeriod; i++) {
            finalValueWithoutFees *= (1 + rate);
        }
        
        let finalValueWithFees = initialInvestment;
        let totalFeesPaid = 0;
        for (let i = 0; i < investmentPeriod; i++) {
            // Assume commission is paid on the value of transactions for the year
            const transactionValue = finalValueWithFees * rate; // Simplified: gains are transacted
            const commissionsPaid = transactionValue * commission * transactionsPerYear;
            const totalAnnualFees = annualFixedFees + commissionsPaid;
            totalFeesPaid += totalAnnualFees;
            
            finalValueWithFees = (finalValueWithFees * (1 + rate)) - totalAnnualFees;
             if (finalValueWithFees < 0) finalValueWithFees = 0;
        }

        const feeImpact = finalValueWithoutFees - finalValueWithFees;
        const feeImpactPercentage = finalValueWithoutFees > 0 ? (feeImpact / finalValueWithoutFees) * 100 : 0;
        
        // --- Pre-programmed analysis replaces the AI ---
        let recommendation = "";
        if (feeImpactPercentage > 20) {
            recommendation = "L'impact des frais est très élevé et nuit considérablement à votre performance. Il est fortement recommandé de chercher un courtier moins cher.";
        } else if (feeImpactPercentage > 10) {
            recommendation = "L'impact des frais est significatif. Vous devriez comparer les offres pour voir s'il est possible de réduire ces coûts.";
        } else {
            recommendation = "L'impact des frais semble raisonnable. Cette structure de coûts est compétitive pour le marché marocain.";
        }
        
        const response: FeeSimulatorOutput = {
            finalValueWithoutFees,
            totalFeesPaid,
            finalValueWithFees,
            feeImpactPercentage,
            recommendation
        };

        await new Promise(resolve => setTimeout(resolve, 500));
        setResult(response);

    } catch (e: any) {
        setError("Une erreur est survenue lors de la simulation. Veuillez réessayer.");
        console.error(e);
    }
    setLoading(false);
  }
  
  const chartData = result ? [
    { name: "Valeur Finale", "Sans Frais": result.finalValueWithoutFees, "Avec Frais": result.finalValueWithFees },
  ] : [];

  return (
    <>
    <div className="container py-12 md:py-16">
     <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Simulateur d'Impact des Frais</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
            Voyez comment les frais bancaires et les commissions affectent vos rendements d'investissement dans le temps.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Paramètres de Simulation</CardTitle>
            <CardDescription>
              Entrez les détails de votre investissement pour simuler l'impact des frais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="initialInvestment" render={({ field }) => (
                        <FormItem><FormLabel>Investissement Initial (MAD)</FormLabel><FormControl><Input type="number" placeholder="100000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="annualReturnRate" render={({ field }) => (
                        <FormItem><FormLabel>Rendement Annuel (%)</FormLabel><FormControl><Input type="number" step="0.1" placeholder="8" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="investmentPeriod" render={({ field }) => (
                        <FormItem><FormLabel>Période (Années)</FormLabel><FormControl><Input type="number" placeholder="10" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="annualFixedFees" render={({ field }) => (
                        <FormItem><FormLabel>Frais Fixes Annuels (MAD)</FormLabel><FormControl><Input type="number" placeholder="500" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="transactionCommission" render={({ field }) => (
                        <FormItem><FormLabel>Commission par transaction (%)</FormLabel><FormControl><Input type="number" step="0.01" placeholder="0.5" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="transactionsPerYear" render={({ field }) => (
                        <FormItem><FormLabel>Transactions par an</FormLabel><FormControl><Input type="number" placeholder="2" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Calculer l'Impact"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="flex-1 min-h-[500px]">
            <CardHeader>
              <CardTitle className="font-headline">Résultats de la Simulation</CardTitle>
              <CardDescription>L'impact calculé des frais sur votre investissement.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && (
                  <div className="flex justify-center items-center h-full min-h-[300px]">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
              )}
               {error && <Alert variant="destructive"><AlertTitle>Erreur</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
              {result && (
                <div className="space-y-6">
                  <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} layout="vertical" margin={{left: 10, right: 10}}>
                              <XAxis type="number" hide />
                              <YAxis type="category" dataKey="name" hide />
                              <Tooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
                              <Legend />
                              <Bar dataKey="Sans Frais" fill="hsl(var(--chart-2))" radius={[4, 4, 4, 4]} />
                              <Bar dataKey="Avec Frais" fill="hsl(var(--chart-1))" radius={[4, 4, 4, 4]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-secondary rounded-lg">
                          <p className="text-sm text-muted-foreground">Frais Totaux Payés</p>
                          <p className="text-lg font-bold text-destructive">{formatCurrency(result.totalFeesPaid)}</p>
                      </div>
                       <div className="p-4 bg-secondary rounded-lg">
                          <p className="text-sm text-muted-foreground">Impact des Frais</p>
                          <p className="text-lg font-bold text-destructive">{result.feeImpactPercentage.toFixed(2)}%</p>
                      </div>
                  </div>
                   <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle className="font-headline">Recommandation Automatique</AlertTitle>
                      <AlertDescription>
                          {result.recommendation}
                      </AlertDescription>
                  </Alert>
                </div>
              )}
              {!loading && !result && !error && (
                  <div className="text-center text-muted-foreground h-full flex items-center justify-center min-h-[300px]">
                      <p>Les résultats de la simulation apparaîtront ici.</p>
                  </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <HelpCircle className="h-6 w-6 text-primary" />
                Guide d'Utilisation du Simulateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Cet outil est conçu pour vous montrer l'impact réel des frais sur le long terme.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Frais Fixes Annuels :</strong> Ce sont les frais comme les droits de garde, que votre banque prélève chaque année.</li>
                <li><strong>Commission par transaction (%) :</strong> Le pourcentage prélevé sur chaque transaction (achat/vente).</li>
                 <li><strong>Transactions par an :</strong> Le nombre d'opérations (achat ou vente) que vous estimez faire par an.</li>
              </ul>
              <p><strong>Analyse des Résultats :</strong> Le graphique vous montre la différence entre ce que vous auriez pu gagner (valeur sans frais) et ce qu'il vous reste réellement (valeur avec frais). La "Recommandation" vous aide à décider si la structure de frais est acceptable.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}

    