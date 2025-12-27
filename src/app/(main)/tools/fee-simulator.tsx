"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { feeSimulator, type FeeSimulatorOutput } from "@/ai/flows/fee-simulator-tool";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

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
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    try {
      const response = await feeSimulator(values);
      setResult(response);
    } catch (e) {
      setError("Une erreur est survenue lors de l'exécution de la simulation. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Simulateur d'Impact des Frais d'Investissement</CardTitle>
          <CardDescription>
            Voyez comment les frais bancaires et les commissions affectent vos rendements d'investissement dans le temps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Calculer l'Impact
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
            {error && <p className="text-destructive">{error}</p>}
            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Valeur Finale (Sans Frais)</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(result.finalValueWithoutFees)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Valeur Finale (Avec Frais)</CardTitle>
                            <TrendingDown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(result.finalValueWithFees)}</div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader className="pb-2">
                         <CardTitle className="text-lg font-medium">Total des Frais Payés</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-destructive">{formatCurrency(result.totalFeesPaid)}</p>
                        <p className="text-xs text-muted-foreground">Cela représente {result.feeImpactPercentage.toFixed(2)}% de votre valeur potentielle finale.</p>
                    </CardContent>
                </Card>
                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle className="font-headline">Recommandation de l'IA</AlertTitle>
                    <AlertDescription>{result.recommendation}</AlertDescription>
                </Alert>
              </div>
            )}
            {!result && !loading && (
                 <div className="text-center text-muted-foreground h-48 flex items-center justify-center">
                    <p>Entrez les détails de votre investissement pour voir les résultats de la simulation ici.</p>
                 </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
