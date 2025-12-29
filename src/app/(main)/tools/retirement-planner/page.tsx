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
import { Loader2, Info, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

// These types are now defined locally to remove AI dependency.
export type YearData = {
  year: number;
  value: number;
};

export type RetirementPlannerOutput = {
  finalSavings: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearData[];
  analysis: string;
  recommendation: string;
};


const formSchema = z.object({
  currentAge: z.coerce.number().int().min(18, "L'âge doit être d'au moins 18 ans"),
  retirementAge: z.coerce.number().int().min(19, "L'âge de la retraite doit être supérieur à l'âge actuel"),
  initialSavings: z.coerce.number().min(0, "L'épargne ne peut être négative"),
  monthlyContribution: z.coerce.number().min(0, "La contribution doit être positive"),
  annualReturnRate: z.coerce.number().min(0).max(100, "Le taux doit être entre 0 et 100"),
}).refine(data => data.retirementAge > data.currentAge, {
    message: "L'âge de la retraite doit être supérieur à l'âge actuel.",
    path: ["retirementAge"],
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
    setLoading(true);
    setResult(null);
    setError(null);
    try {
        // --- All calculations are now done locally ---
        const { currentAge, retirementAge, initialSavings, monthlyContribution, annualReturnRate } = values;
        const yearsToGrow = retirementAge - currentAge;
        const annualContribution = monthlyContribution * 12;
        const rate = annualReturnRate / 100;

        let currentSavings = initialSavings;
        const yearlyBreakdown: YearData[] = [];
        const startYear = new Date().getFullYear();

        for (let i = 0; i <= yearsToGrow; i++) {
            yearlyBreakdown.push({ year: startYear + i, value: Math.round(currentSavings) });
            // For the next year calculation
            currentSavings = (currentSavings + annualContribution) * (1 + rate);
        }
        
        const finalSavings = yearlyBreakdown[yearlyBreakdown.length-1]?.value || initialSavings;
        const totalContributions = initialSavings + (annualContribution * yearsToGrow);
        const totalInterest = finalSavings - totalContributions;

        // --- Pre-programmed analysis replaces the AI ---
        let analysis = "";
        let recommendation = "";

        if (finalSavings > 5000000) {
            analysis = "Votre plan de retraite est excellent et vous mène vers une indépendance financière confortable.";
            recommendation = "Continuez sur cette voie ! Vous pourriez envisager de diversifier davantage vos investissements ou d'optimiser votre fiscalité pour préserver votre capital.";
        } else if (finalSavings > 2000000) {
            analysis = "Vous êtes sur une très bonne trajectoire pour vous constituer un capital retraite solide.";
            recommendation = "Pour accélérer, voyez s'il est possible d'augmenter légèrement votre contribution mensuelle, même de quelques centaines de dirhams. Chaque dirham compte sur le long terme.";
        } else {
            analysis = "C'est un bon début, mais il y a un risque que ce capital ne soit pas suffisant pour maintenir votre niveau de vie à la retraite.";
            recommendation = "Il est crucial d'essayer d'augmenter votre effort d'épargne. Envisagez aussi de revoir votre allocation d'actifs pour viser un rendement potentiellement plus élevé, si votre profil de risque le permet.";
        }

        const response: RetirementPlannerOutput = {
            finalSavings,
            totalContributions,
            totalInterest,
            yearlyBreakdown,
            analysis,
            recommendation
        };
        await new Promise(resolve => setTimeout(resolve, 500));
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
      <div className="container py-12 md:py-16">
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
                        <FormItem><FormLabel>Épargne Actuelle (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></Item>
                    )} />
                    <FormField control={form.control} name="monthlyContribution" render={({ field }) => (
                        <FormItem><FormLabel>Contribution Mensuelle (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></Item>
                    )} />
                    <FormField control={form.control} name="annualReturnRate" render={({ field }) => (
                        <FormItem><FormLabel>Taux de Rendement Annuel (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></Item>
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
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <LineChart data={result.yearlyBreakdown} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} type="number" domain={['dataMin', 'dataMax']} />
                            <YAxis width={80} tickFormatter={(value) => formatCurrency(value as number).replace(',00\u00A0MAD', 'k').replace(/\s/g, '')} />
                            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" formatter={(value) => formatCurrency(value as number)} />} />
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
                        <AlertTitle className="font-headline">Analyse Automatique</AlertTitle>
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
                        <li><strong>Contribution Mensuelle :</strong> La régularité de vos cotisations est la clé de la croissance.</li>
                        <li><strong>Taux de Rendement Annuel (%) :</strong> Le moteur de votre croissance. Un portefeuille diversifié en actions peut historiquement viser 7-10% par an, mais ce rendement n'est pas garanti.</li>
                    </ul>
                    <p><strong>Analyse :</strong> Le graphique illustre comment votre épargne s'accélère avec le temps. La différence entre votre épargne finale et le total de vos contributions représente les gains générés par vos investissements.</p>
                </CardContent>
            </Card>
            </div>
        </div>
      </div>
    </>
  );
}
