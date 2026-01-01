
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';

export default function DividendYieldCalculatorPage() {
  const [sharePrice, setSharePrice] = useState(100);
  const [annualDividend, setAnnualDividend] = useState(5);
  const [numberOfShares, setNumberOfShares] = useState(100);
  const [isCalculated, setIsCalculated] = useState(false);

  const { dividendYield, annualIncome, totalInvestment } = useMemo(() => {
    const price = Number(sharePrice) || 0;
    const dividend = Number(annualDividend) || 0;
    const shares = Number(numberOfShares) || 0;

    const yieldValue = price > 0 ? (dividend / price) * 100 : 0;
    const income = dividend * shares;
    const investment = price * shares;

    return {
      dividendYield: yieldValue,
      annualIncome: income,
      totalInvestment: investment,
    };
  }, [sharePrice, annualDividend, numberOfShares]);

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Calculateur de Rendement de Dividende</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Estimez le rendement de vos actions à dividendes et le revenu annuel potentiel de votre investissement.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <Accordion type="single" collapsible>
          <AccordionItem value="guide">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <span className="font-semibold">Guide d'utilisation du calculateur</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-muted-foreground">
                <p>Ce calculateur vous aide à évaluer la performance d'une action à dividende. Voici comment remplir les champs :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Prix de l'action :</strong> Le coût actuel pour acheter une seule action de l'entreprise.</li>
                  <li><strong>Dividende annuel par action :</strong> Le montant total des dividendes versés pour une seule action sur une année.</li>
                  <li><strong>Nombre d'actions :</strong> Le nombre d'actions que vous possédez ou prévoyez d'acheter.</li>
                </ul>
                <p>Cliquez sur "Calculer" pour voir vos résultats.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du Calcul</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="share-price">Prix de l'action (MAD)</Label>
                <Input id="share-price" type="number" value={sharePrice} onChange={(e) => setSharePrice(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-dividend">Dividende annuel par action (MAD)</Label>
                <Input id="annual-dividend" type="number" value={annualDividend} onChange={(e) => setAnnualDividend(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number-of-shares">Nombre d'actions</Label>
                <Input id="number-of-shares" type="number" value={numberOfShares} onChange={(e) => setNumberOfShares(Number(e.target.value))} />
              </div>
              <Button onClick={handleCalculate} className="w-full">Calculer</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-8">
          {!isCalculated ? (
            <Card className="flex items-center justify-center min-h-[400px]">
              <p className="text-center text-muted-foreground p-8">
                Ajustez les paramètres et cliquez sur "Calculer" pour afficher les résultats.
              </p>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Résultats et Analyse</CardTitle>
                  <CardDescription>
                    Voici l'analyse basée sur les informations fournies.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <Card className="p-4 bg-secondary">
                        <CardHeader className="p-0 items-center">
                            <div className="p-3 rounded-full bg-primary/10 mb-2">
                                <TrendingUp className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-sm text-muted-foreground">Rendement Dividende</CardTitle>
                            <CardDescription className="text-3xl font-bold text-primary">{dividendYield.toFixed(2)}%</CardDescription>
                        </CardHeader>
                    </Card>
                     <Card className="p-4 bg-secondary">
                        <CardHeader className="p-0 items-center">
                            <div className="p-3 rounded-full bg-green-500/10 mb-2">
                               <DollarSign className="h-8 w-8 text-green-600" />
                            </div>
                            <CardTitle className="text-sm text-muted-foreground">Revenu Annuel</CardTitle>
                            <CardDescription className="text-3xl font-bold text-green-600">{formatCurrency(annualIncome)}</CardDescription>
                        </CardHeader>
                    </Card>
                     <Card className="p-4 bg-secondary">
                        <CardHeader className="p-0 items-center">
                             <div className="p-3 rounded-full bg-blue-500/10 mb-2">
                               <PiggyBank className="h-8 w-8 text-blue-600" />
                            </div>
                            <CardTitle className="text-sm text-muted-foreground">Investissement Total</CardTitle>
                            <CardDescription className="text-3xl font-bold text-blue-600">{formatCurrency(totalInvestment)}</CardDescription>
                        </CardHeader>
                    </Card>
                  </div>
                   <div className="text-sm text-muted-foreground space-y-4 pt-4">
                    <p>
                        Avec un investissement de <strong>{formatCurrency(totalInvestment)}</strong>, vous pourriez vous attendre à recevoir environ <strong>{formatCurrency(annualIncome)}</strong> en dividendes chaque année.
                    </p>
                    <p>
                        Le <strong>rendement du dividende de {dividendYield.toFixed(2)}%</strong> est un indicateur clé pour comparer la rentabilité de cette action par rapport à d'autres placements. Un rendement plus élevé signifie que vous recevez plus de revenus pour chaque dirham investi, mais cela peut aussi indiquer un risque plus élevé.
                    </p>
                    <p>
                        Il est important de ne pas se baser uniquement sur le rendement. Assurez-vous d'analyser également la santé financière de l'entreprise et sa capacité à maintenir ou augmenter ses dividendes à l'avenir.
                    </p>
                </div>
                </CardContent>
              </Card>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
