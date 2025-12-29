"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Info, HelpCircle, Percent, HandCoins, PiggyBank } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";
import type { DividendYieldOutput } from "@/ai/flows/dividend-yield-calculator";


const formSchema = z.object({
  stockPrice: z.coerce.number().min(0.01, "Le prix doit être positif"),
  annualDividendPerShare: z.coerce.number().min(0, "Le dividende ne peut être négatif"),
  investmentAmount: z.coerce.number().min(1, "Le montant doit être positif"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DividendYieldCalculatorPage() {
  const [result, setResult] = useState<DividendYieldOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockPrice: 250,
      annualDividendPerShare: 12,
      investmentAmount: 50000,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
        // --- Calculs en local ---
        const { stockPrice, annualDividendPerShare, investmentAmount } = values;
        const dividendYield = (annualDividendPerShare / stockPrice) * 100;
        const numberOfShares = investmentAmount / stockPrice;
        const annualDividendIncome = numberOfShares * annualDividendPerShare;

        // --- Analyse pré-programmée ---
        let analysis = "";
        let recommendation = "";

        if (dividendYield > 5) {
            analysis = "Le rendement du dividende est élevé.";
            recommendation = "Un rendement élevé peut être très attractif, mais assurez-vous que le dividende est soutenable par l'entreprise et qu'il ne cache pas une baisse récente et importante du prix de l'action.";
        } else if (dividendYield > 2) {
            analysis = "Le rendement du dividende est modéré.";
            recommendation = "Ce niveau de rendement est souvent un bon équilibre entre un revenu régulier et un potentiel de croissance du capital. C'est typique des entreprises stables et matures.";
        } else {
            analysis = "Le rendement du dividende est faible.";
            recommendation = "Un rendement faible peut indiquer que l'entreprise réinvestit massivement ses bénéfices pour la croissance (bon signe) ou qu'elle a une politique de dividende limitée. Privilégiez ce type d'action pour la croissance du capital plutôt que pour le revenu.";
        }

        const response: DividendYieldOutput = {
            dividendYield,
            numberOfShares,
            annualDividendIncome,
            analysis,
            recommendation
        };
        // Simuler un court délai pour l'expérience utilisateur
        await new Promise(resolve => setTimeout(resolve, 500));
        setResult(response);
    } catch (e: any) {
        setError("Une erreur est survenue lors du calcul. Veuillez réessayer.");
        console.error(e);
    }
    setLoading(false);
  }

  return (
     <>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Calculateur de Rendement des Dividendes</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Estimez le rendement de vos actions à dividendes et comprenez le revenu passif potentiel qu'elles peuvent générer.
        </p>
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Paramètres de Calcul</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="stockPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix de l'Action (MAD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="250" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="annualDividendPerShare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dividende Annuel par Action (MAD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="investmentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Montant de l'Investissement (MAD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Calculer le Rendement'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Résultats du Calcul</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[500px]">
            {loading && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {error && <Alert variant="destructive"><AlertTitle>Erreur</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            {result && (
                <div className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-secondary rounded-lg">
                            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Percent className="h-4 w-4"/>Rendement Dividende</p>
                            <p className="text-2xl font-bold font-headline text-primary">{result.dividendYield.toFixed(2)}%</p>
                        </div>
                        <div className="p-4 bg-secondary rounded-lg">
                           <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><HandCoins className="h-4 w-4"/>Revenu Annuel Estimé</p>
                           <p className="text-2xl font-bold font-headline text-primary">{formatCurrency(result.annualDividendIncome)}</p>
                        </div>
                         <div className="p-4 bg-secondary rounded-lg col-span-1 sm:col-span-2">
                           <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><PiggyBank className="h-4 w-4"/>Actions Achetées</p>
                           <p className="text-2xl font-bold font-headline">{result.numberOfShares.toFixed(2)}</p>
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
                <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    <p>Les résultats de votre calcul apparaîtront ici.</p>
                </div>
            )}
          </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Le rendement du dividende est un ratio financier simple qui vous indique le pourcentage de retour sur investissement que vous recevez sous forme de dividendes.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Prix de l'Action :</strong> Le prix actuel d'une seule action de l'entreprise.</li>
                    <li><strong>Dividende Annuel par Action :</strong> Le total des dividendes versés par l'entreprise pour une action sur une année. Vous pouvez le trouver dans les rapports financiers ou sur les sites de cotation.</li>
                    <li><strong>Montant de l'Investissement :</strong> La somme totale que vous souhaitez investir dans cette action.</li>
                </ul>
                <p><strong>Analyse :</strong> Un rendement élevé peut être attractif, mais il peut aussi indiquer un risque plus élevé (par exemple, si le prix de l'action a chuté). Comparez toujours le rendement à celui d'entreprises similaires dans le même secteur. L'analyse automatique vous donne un premier niveau d'interprétation.</p>
            </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
