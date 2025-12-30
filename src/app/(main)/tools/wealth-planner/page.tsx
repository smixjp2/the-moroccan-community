"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { formatCurrency } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

type ChartData = {
  year: number;
  capital: number;
  invested: number;
};

export default function WealthPlannerPage() {
  const [initialCapital, setInitialCapital] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [duration, setDuration] = useState(20);
  const [isSimulated, setIsSimulated] = useState(false);

  const projectionData = useMemo(() => {
    const data: ChartData[] = [];
    let currentCapital = initialCapital;
    let totalInvested = initialCapital;

    data.push({
      year: 0,
      capital: currentCapital,
      invested: totalInvested,
    });

    for (let year = 1; year <= duration; year++) {
      let yearlyContribution = monthlyContribution * 12;
      totalInvested += yearlyContribution;
      currentCapital = (currentCapital + yearlyContribution) * (1 + annualReturn / 100);
      data.push({
        year: year,
        capital: Math.round(currentCapital),
        invested: totalInvested,
      });
    }
    return data;
  }, [initialCapital, monthlyContribution, annualReturn, duration]);

  const finalCapital = projectionData[projectionData.length - 1]?.capital ?? 0;
  const totalInvested = projectionData[projectionData.length - 1]?.invested ?? 0;
  const totalGains = finalCapital - totalInvested;

  const chartConfig = {
    capital: {
      label: "Patrimoine Total",
      color: "hsl(var(--primary))",
    },
    invested: {
      label: "Total Investi",
      color: "hsl(var(--muted-foreground))",
    },
  };

  const handleSimulate = () => {
    setIsSimulated(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Planificateur de Patrimoine</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Simulez la croissance de votre patrimoine sur le long terme. Voyez comment votre épargne et vos investissements peuvent fructifier grâce à la magie des intérêts composés.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Simulation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initial-capital">Capital de départ (MAD)</Label>
                <Input id="initial-capital" type="number" value={initialCapital} onChange={(e) => setInitialCapital(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly-contribution">Épargne mensuelle (MAD)</Label>
                <Input id="monthly-contribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
              </div>
              <div className="space-y-4">
                <Label>Rendement annuel espéré: {annualReturn}%</Label>
                <Slider value={[annualReturn]} onValueChange={(value) => setAnnualReturn(value[0])} max={20} step={0.5} />
              </div>
              <div className="space-y-4">
                <Label>Durée de l'investissement: {duration} ans</Label>
                <Slider value={[duration]} onValueChange={(value) => setDuration(value[0])} max={50} step={1} />
              </div>
               <Button onClick={handleSimulate} className="w-full">Simuler</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Résultats de la Projection</CardTitle>
              <CardDescription>
                Voici l'évolution estimée de votre patrimoine sur {duration} ans.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSimulated ? (
                <>
                  <div className="h-[400px] w-full mb-8">
                     <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={projectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" name="Année" unit=" an" />
                            <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                            <Tooltip
                                content={<ChartTooltipContent
                                    formatter={(value, name) => (
                                        <div className="flex flex-col">
                                            <span className="font-bold">{name === 'capital' ? 'Patrimoine' : 'Total Investi'}:</span>
                                            <span>{formatCurrency(value as number)}</span>
                                        </div>
                                    )}
                                    labelFormatter={(label) => `Année ${label}`}
                                />}
                            />
                            <Line type="monotone" dataKey="capital" stroke={chartConfig.capital.color} strokeWidth={2} dot={false} name="Patrimoine Total" />
                            <Line type="monotone" dataKey="invested" stroke={chartConfig.invested.color} strokeWidth={2} strokeDasharray="5 5" dot={false} name="Total Investi" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Capital Final</p>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(finalCapital)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Investi</p>
                      <p className="text-2xl font-bold">{formatCurrency(totalInvested)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gains Totaux</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(totalGains)}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  <p>Veuillez ajuster les paramètres et cliquer sur "Simuler" pour voir la projection.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
