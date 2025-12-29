"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Info, HelpCircle, TrendingUp, PiggyBank, Target } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";
import { planRetirement, type RetirementPlannerOutput } from "@/ai/flows/retirement-planner";


const formSchema = z.object({
  currentAge: z.coerce.number().int().min(18, "L'âge doit être d'au moins 18 ans"),
  retirementAge: z.coerce.number().int().min(40, "L'âge de la retraite doit être d'au moins 40 ans"),
  initialSavings: z.coerce.number().min(0, "L'épargne ne peut être négative"),
  monthlyContribution: z.coerce.number().min(0, "La contribution doit être positive"),
  annualReturnRate: z.coerce.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function RetirementPlannerPage() {
  const [result, setResult] = useState<RetirementPlannerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      initialSavings: 100000,
      monthlyContribution: 2000,
      annualReturnRate: 7,
    },
  });

  async function onSubmit(values: FormValues) {
    if (values.currentAge >= values.retirementAge) {
      form.setError("retirementAge", { message: "L'âge de la retraite doit être supérieur à l'âge actuel." });
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await planRetirement(values);
      setResult(response);
    } catch (e: any) {
      setError("Une erreur est survenue lors de la planification. Veuillez réessayer.");
      console.error(e);
    }
    setLoading(false);
  }
  
  const chartConfig = {
    value: {
      label: "Épargne Totale",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Planificateur de Retraite</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Visualisez la croissance de votre épargne retraite et déterminez si vous êtes sur la bonne voie pour atteindre vos objectifs financiers.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Vos Informations</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="currentAge" render={({ field }) => (
                        <FormItem><FormLabel>Âge Actuel</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="retirementAge" render={({ field }) => (
                        <FormItem><FormLabel>Âge de Retraite</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="initialSavings" render={({ field }) => (
                    <FormItem><FormLabel>Épargne Actuelle (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="monthlyContribution" render={({ field }) => (
                    <FormItem><FormLabel>Contribution Mensuelle (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormMessage>
                )} />
                <FormField control={form.control} name="annualReturnRate" render={({ field }) => (
                    <FormItem><FormLabel>Taux de Rendement Annuel (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormMessage>
                )} />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Planifier ma Retraite'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Projection de votre Retraite</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[500px]">
              {loading && <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
              {error && <Alert variant="destructive"><AlertTitle>Erreur</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
              {result && (
                <div className="space-y-6">
                  <div className="h-[250px]">
                     <ChartContainer config={chartConfig} className="h-full w-full">
                        <LineChart data={result.yearlyBreakdown} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                          <CartesianGrid vertical={false} />
                          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                          <YAxis width={80} tickFormatter={(value) => formatCurrency(value as number).replace(',00', '')} />
                          <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" formatter={(value) => formatCurrency(value as number)} />} />
                          <Legend />
                          <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} name="Épargne Totale" />
                        </LineChart>
                      </ChartContainer>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Épargne Finale</p>
                      <p className="text-xl font-bold font-headline text-primary">{formatCurrency(result.finalSavings)}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Contributions</p>
                      <p className="text-xl font-bold font-headline">{formatCurrency(result.totalContributions)}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Intérêts</p>
                      <p className="text-xl font-bold font-headline">{formatCurrency(result.totalInterest)}</p>
                    </div>
                  </div>
                   <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle className="font-headline">Analyse de l'IA</AlertTitle>
                      <AlertDescription>
                        <p className="font-semibold">{result.analysis}</p>
                        <p className="mt-2">{result.recommendation}</p>
                      </AlertDescription>
                    </Alert>
                </div>
              )}
               {!loading && !result && !error && (
                <div className="text-center text-muted-foreground h-96 flex items-center justify-center">
                  <p>Votre projection de retraite apparaîtra ici.</p>
                </div>
              )}
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>La magie de l'investissement pour la retraite réside dans les intérêts composés. Cet outil vous aide à visualiser cet effet.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Âge Actuel & de Retraite :</strong> Définit votre horizon de temps d'investissement. Plus il est long, plus les intérêts composés sont puissants.</li>
                    <li><strong>Épargne Actuelle :</strong> Votre point de départ.</li>
                    <li><strong>Contribution Mensuelle :</strong> La régularité de vos cotisations est la clé de la croissance.</li>
                    <li><strong>Taux de Rendement Annuel (%) :</strong> Le moteur de votre croissance. Un portefeuille diversifié en actions peut historiquement viser 7-10% par an, mais ce rendement n'est pas garanti.</li>
                </ul>
                <p><strong>Analyse :</strong> Le graphique illustre comment votre épargne (ligne bleue) s'accélère avec le temps. La différence entre votre épargne finale et le total de vos contributions représente les gains générés par vos investissements. L'IA vous donnera des pistes pour savoir si votre plan est réaliste et comment l'améliorer.</p>
            </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}
