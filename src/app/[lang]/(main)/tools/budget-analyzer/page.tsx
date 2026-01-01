"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, AlertCircle, Lightbulb } from 'lucide-react';

export default function BudgetAnalyzerPage() {
  const [income, setIncome] = useState(15000);
  const [fixedCharges, setFixedCharges] = useState(5000);
  const [variableExpenses, setVariableExpenses] = useState(4000);
  const [isCalculated, setIsCalculated] = useState(false);

  const { potentialSavings, totalExpenses, budgetBreakdown, suggestions } = useMemo(() => {
    const inc = Number(income) || 0;
    const fixed = Number(fixedCharges) || 0;
    const variable = Number(variableExpenses) || 0;

    const totalExp = fixed + variable;
    const savings = inc - totalExp;

    const breakdown = [
      { name: 'Charges Fixes', value: fixed, fill: 'hsl(var(--chart-2))' },
      { name: 'Dépenses Variables', value: variable, fill: 'hsl(var(--chart-4))' },
      { name: 'Épargne Potentielle', value: Math.max(0, savings), fill: 'hsl(var(--chart-1))' },
    ];
    
    const needsPercent = (fixed / inc) * 100;
    const wantsPercent = (variable / inc) * 100;
    const savingsPercent = (savings / inc) * 100;

    let sugg: string[] = [];
    if (savings <= 0) {
        sugg.push("Vos dépenses dépassent ou égalent vos revenus. Il est crucial de revoir vos dépenses variables.");
    } else {
        sugg.push(`Vous avez une capacité d'épargne de ${formatCurrency(savings)}. C'est un excellent point de départ !`);
    }

    if (needsPercent > 50) {
        sugg.push("Vos charges fixes représentent plus de 50% de vos revenus. Explorez des pistes pour les réduire si possible (renégociation de crédits, etc.).");
    }
    if (savingsPercent < 20 && savings > 0) {
        sugg.push(`Votre taux d'épargne est de ${savingsPercent.toFixed(1)}%. Essayez de viser au moins 20% de vos revenus en optimisant vos dépenses variables.`);
    } else if (savingsPercent >= 20) {
        sugg.push(`Félicitations ! Votre taux d'épargne de ${savingsPercent.toFixed(1)}% est supérieur ou égal à l'objectif de 20%.`);
    }


    return {
      potentialSavings: savings,
      totalExpenses: totalExp,
      budgetBreakdown: breakdown,
      suggestions: sugg,
    };
  }, [income, fixedCharges, variableExpenses]);

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Analyseur de Budget Mensuel</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Faites le point sur vos finances personnelles, visualisez la répartition de vos dépenses et déterminez votre capacité d'épargne et d'investissement.
        </p>
      </div>

       <div className="max-w-4xl mx-auto mb-12">
        <Accordion type="single" collapsible>
          <AccordionItem value="guide">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <span className="font-semibold">Comment utiliser cet outil ?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-muted-foreground">
                <p>Cet outil vous aide à comprendre où va votre argent chaque mois.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Revenu Mensuel Net :</strong> Votre salaire ou revenu après impôts.</li>
                  <li><strong>Charges Fixes Mensuelles :</strong> Toutes vos dépenses incompressibles (loyer, crédits, assurances, abonnements...).</li>
                  <li><strong>Dépenses Variables Mensuelles :</strong> Le reste de vos dépenses (nourriture, transport, sorties, shopping...). Faites une estimation moyenne.</li>
                </ul>
                <p>Cliquez sur "Analyser mon Budget" pour obtenir une analyse personnalisée.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Vos Finances Mensuelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="income">Revenu Mensuel Net (MAD)</Label>
                <Input id="income" type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fixed-charges">Charges Fixes Mensuelles (MAD)</Label>
                <Input id="fixed-charges" type="number" value={fixedCharges} onChange={(e) => setFixedCharges(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variable-expenses">Dépenses Variables Mensuelles (MAD)</Label>
                <Input id="variable-expenses" type="number" value={variableExpenses} onChange={(e) => setVariableExpenses(Number(e.target.value))} />
              </div>
              <Button onClick={handleCalculate} className="w-full">Analyser mon Budget</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-8">
          {!isCalculated ? (
            <Card className="flex items-center justify-center min-h-[500px]">
              <p className="text-center text-muted-foreground p-8">
                Remplissez les champs et cliquez sur "Analyser mon Budget" pour voir votre analyse financière.
              </p>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition de votre Budget</CardTitle>
                  <CardDescription>Visualisation de vos revenus, dépenses et épargne.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="order-2 md:order-1 space-y-4">
                         <div>
                            <p className="text-sm text-muted-foreground">Revenu Mensuel</p>
                            <p className="text-2xl font-bold">{formatCurrency(income)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total des Dépenses</p>
                            <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
                        </div>
                        <div className={potentialSavings >= 0 ? "text-green-600" : "text-destructive"}>
                            <p className="text-sm">{potentialSavings >= 0 ? "Épargne Potentielle" : "Déficit Mensuel"}</p>
                            <p className="text-3xl font-bold">{formatCurrency(potentialSavings)}</p>
                        </div>
                    </div>
                     <ChartContainer config={{}} className="w-full h-[300px] order-1 md:order-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={budgetBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                    return (
                                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
                                        {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                    }}
                                    labelLine={false}
                                >
                                    {budgetBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        <CardTitle>Pistes d'Amélioration</CardTitle>
                    </div>
                    <CardDescription>Quelques suggestions basées sur la règle du 50/30/20 (Besoins/Envies/Épargne).</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {suggestions.map((sugg, i) => (
                             <li key={i} className="flex items-start gap-3">
                                <AlertCircle className={`h-5 w-5 mt-0.5 ${potentialSavings >= 0 && i > 0 ? "text-yellow-500" : potentialSavings < 0 ? "text-destructive" : "text-green-600" } flex-shrink-0`} />
                                <span className="text-muted-foreground">{sugg}</span>
                            </li>
                        ))}
                    </ul>
                     <div className="mt-6 border-t pt-4 text-sm text-muted-foreground">
                        <p><strong>Recommandation d'Investissement :</strong> Si votre épargne est stable et positive, envisagez d'investir une partie de ce montant. Une bonne pratique est d'allouer au moins **{formatCurrency(income * 0.1)}** (10% de vos revenus) à des investissements à long terme, une fois votre fonds d'urgence constitué.</p>
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
