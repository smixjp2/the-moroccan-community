"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingUp, TrendingDown, Info, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

// Mock type for FeeSimulatorOutput
type FeeSimulatorOutput = {
  finalValueWithoutFees: number;
  totalFeesPaid: number;
  finalValueWithFees: number;
  feeImpactPercentage: number;
  recommendation: string;
};

const formSchema = z.object({
  initialInvestment: z.coerce.number().min(1000, "Doit être d'au moins 1 000"),
  annualReturnRate: z.coerce.number().min(0).max(100),
  investmentPeriod: z.coerce.number().int().min(1, "Doit être d'au moins 1 an"),
  bankFees: z.coerce.number().min(0),
  commissionStructure: z.string().min(10, "Veuillez fournir quelques détails"),
});

type FormValues = z.infer<typeof formSchema>;

export default function FeeSimulator() {
  const [result, setResult] = useState<FeeSimulatorOutput | null>(null);
  const [error, setError] = useState<string | null>("La fonctionnalité IA est temporairement désactivée pour maintenance.");
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 100000,
      annualReturnRate: 8,
      investmentPeriod: 10,
      bankFees: 500,
      commissionStructure: "0.5% sur chaque transaction (achat/vente), avec 2 transactions par an.",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError("La fonctionnalité IA est temporairement désactivée pour maintenance.");
    setLoading(false);
  }
  
  const chartData = result ? [
    { name: "Valeur de l'investissement", "Sans Frais": result.finalValueWithoutFees, "Avec Frais": result.finalValueWithFees },
  ] : [];

  const chartConfig = {
    "Sans Frais": {
      label: "Sans Frais",
      color: "hsl(var(--chart-2))",
    },
    "Avec Frais": {
      label: "Avec Frais",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <>
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <fieldset disabled>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="initialInvestment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investissement Initial (MAD)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="annualReturnRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taux de Rendement Annuel (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="investmentPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Période d'Investissement (Années)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bankFees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frais Bancaires Annuels (MAD)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="commissionStructure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Structure des Commissions</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 0.5% par transaction" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
              <Button type="submit" disabled={true} className="w-full">
                Calculer l'Impact (Désactivé)
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="font-headline">Résultats de la Simulation</CardTitle>
            <CardDescription>L'impact calculé des frais sur votre investissement.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}
            
            <div className="text-center text-muted-foreground h-48 flex items-center justify-center">
                <p>Les outils IA sont temporairement désactivés pour maintenance. Merci de votre compréhension.</p>
            </div>
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
            <p>Cet outil, alimenté par l'IA, est conçu pour vous montrer l'impact réel des frais sur le long terme.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Investissement Initial :</strong> La somme que vous investissez au départ.</li>
              <li><strong>Taux de Rendement Annuel (%) :</strong> Votre gain annuel estimé avant déduction des frais. Soyez réaliste ; un rendement moyen de 8 à 10 % est une attente commune pour les marchés actions.</li>
              <li><strong>Période d'Investissement (Années) :</strong> La durée pendant laquelle vous prévoyez de laisser votre argent investi. L'impact des frais est plus visible sur de longues périodes.</li>
              <li><strong>Frais Bancaires Annuels :</strong> Ce sont les frais fixes, comme les droits de garde, que votre banque prélève chaque année.</li>
              <li><strong>Structure des Commissions :</strong> Décrivez ici les frais variables, comme les commissions sur les transactions (achat/vente). Soyez aussi précis que possible. L'IA utilisera cette information pour estimer les coûts.</li>
            </ul>
            <p><strong>Analyse des Résultats :</strong> Le graphique et les chiffres clés vous montrent la différence entre ce que vous auriez pu gagner (valeur sans frais) et ce qu'il vous reste réellement (valeur avec frais). La "Recommandation de l'IA" vous donne une interprétation de ces résultats pour vous aider à décider si la structure de frais est acceptable.</p>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
