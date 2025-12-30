
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { formatCurrency } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info } from 'lucide-react';


type YearlyData = {
  year: number;
  startingCapital: number;
  yearlyContribution: number;
  interestGains: number;
  endingCapital: number;
};

type ChartData = {
  year: number;
  capital: number;
  invested: number;
};


export default function CompoundInterestSimulatorPage() {
  const [initialCapital, setInitialCapital] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [duration, setDuration] = useState(20);
  const [isSimulated, setIsSimulated] = useState(false);

  const { projectionData, yearlyBreakdown } = useMemo(() => {
    const chartData: ChartData[] = [];
    const breakdownData: YearlyData[] = [];
    
    let currentCapital = initialCapital;
    let totalInvested = initialCapital;

    chartData.push({
      year: 0,
      capital: currentCapital,
      invested: totalInvested,
    });

    for (let year = 1; year <= duration; year++) {
      const startingCapitalYear = currentCapital;
      const yearlyContribution = monthlyContribution * 12;
      totalInvested += yearlyContribution;
      
      const capitalBeforeInterest = currentCapital + yearlyContribution;
      const interestGains = capitalBeforeInterest * (annualReturn / 100);
      currentCapital = capitalBeforeInterest + interestGains;

      chartData.push({
        year: year,
        capital: Math.round(currentCapital),
        invested: totalInvested,
      });

      breakdownData.push({
        year,
        startingCapital: Math.round(startingCapitalYear),
        yearlyContribution,
        interestGains: Math.round(interestGains),
        endingCapital: Math.round(currentCapital),
      });
    }
    return { projectionData: chartData, yearlyBreakdown: breakdownData };
  }, [initialCapital, monthlyContribution, annualReturn, duration]);

  const finalCapital = projectionData[projectionData.length - 1]?.capital ?? 0;
  const totalInvested = projectionData[projectionData.length - 1]?.invested ?? 0;
  const totalGains = finalCapital - totalInvested;
  const gainsPercentage = finalCapital > 0 ? (totalGains / finalCapital) * 100 : 0;

  const chartConfig = {
    capital: {
      label: "Capital Total",
      color: "hsl(var(--primary))",
    },
    invested: {
      label: "Total Investi",
      color: "hsl(var(--muted-foreground))",
    },
  };

  const finalCompositionData = [
    { name: 'Total Investi', value: totalInvested, fill: 'hsl(var(--muted-foreground))' },
    { name: 'Gains d\'Intérêts', value: totalGains, fill: 'hsl(var(--primary))' },
  ];

  const handleSimulate = () => {
    setIsSimulated(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Simulateur d'Intérêts Composés</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Découvrez la puissance des intérêts composés. Entrez vos informations pour voir comment votre argent peut travailler pour vous et croître de manière exponentielle.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <Accordion type="single" collapsible>
            <AccordionItem value="guide">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        <span className="font-semibold">Guide d'utilisation du simulateur</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 text-muted-foreground">
                        <p>Ce simulateur vous aide à visualiser l'effet des intérêts composés sur votre capital. Voici comment remplir les champs :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Capital de départ :</strong> Le montant initial de votre investissement.</li>
                            <li><strong>Versements mensuels :</strong> Le montant que vous prévoyez d'ajouter chaque mois.</li>
                            <li><strong>Taux de rendement annuel (%) :</strong> Le rendement annuel moyen que vous attendez de vos investissements.</li>
                            <li><strong>Durée de l'investissement (ans) :</strong> Le nombre d'années pendant lesquelles vous laissez votre argent fructifier.</li>
                        </ul>
                        <p>Cliquez sur "Simuler" pour voir la magie opérer !</p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
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
                <Label htmlFor="monthly-contribution">Versements mensuels (MAD)</Label>
                <Input id="monthly-contribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
              </div>
              <div className="space-y-4">
                <Label>Taux de rendement annuel: {annualReturn}%</Label>
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
        
        <div className="lg:col-span-8">
            {!isSimulated ? (
                 <Card className="flex items-center justify-center min-h-[600px]">
                    <p className="text-center text-muted-foreground p-8">
                        Ajustez les paramètres et cliquez sur "Simuler" pour lancer la projection.
                    </p>
                </Card>
            ) : (
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                    <CardTitle>Projection de Croissance</CardTitle>
                    <CardDescription>
                        Voici l'évolution estimée de votre capital sur {duration} ans.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
                            <div>
                                <p className="text-sm text-muted-foreground">Capital Final</p>
                                <p className="text-2xl font-bold text-primary">{formatCurrency(finalCapital)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Contribué</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalInvested)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Gains d'Intérêts</p>
                                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalGains)}</p>
                            </div>
                             <div>
                                <p className="text-sm text-muted-foreground">Part des Gains</p>
                                <p className="text-2xl font-bold text-green-600">{gainsPercentage.toFixed(1)}%</p>
                            </div>
                        </div>
                         <ChartContainer config={chartConfig} className="w-full h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={projectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" name="Année" unit=" an" />
                                <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                                <Tooltip
                                    content={<ChartTooltipContent
                                        formatter={(value, name) => formatCurrency(value as number)}
                                        labelFormatter={(label) => `Année ${label}`}
                                    />}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="capital" stroke={chartConfig.capital.color} strokeWidth={2} dot={false} name="Capital Total" />
                                <Line type="monotone" dataKey="invested" stroke={chartConfig.invested.color} strokeWidth={2} strokeDasharray="5 5" dot={false} name="Total Investi" />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Composition du Capital Final</CardTitle>
                            <CardDescription>Répartition entre le total contribué et les gains d'intérêts.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{}} className="w-full h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={finalCompositionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} labelLine={false}>
                                            {finalCompositionData.map((entry, index) => (
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
                            <CardTitle>Analyse des Gains</CardTitle>
                             <CardDescription>La magie des intérêts composés.</CardDescription>
                        </Header>
                        <CardContent className="text-sm text-muted-foreground flex flex-col justify-center h-[250px]">
                            <p>Dans {duration} ans, votre capital pourrait atteindre <strong>{formatCurrency(finalCapital)}</strong>.</p>
                            <p className="mt-4">De ce montant, <strong>{formatCurrency(totalGains)}</strong> (<strong className="text-primary">{gainsPercentage.toFixed(1)}%</strong>) proviendrait uniquement des intérêts générés par vos investissements.</p>
                             <p className="mt-4">C'est ça, l'effet boule de neige : vos gains génèrent eux-mêmes des gains !</p>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Projection Annuelle Détaillée</CardTitle>
                        <CardDescription>Suivez l'évolution de votre capital année par année.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Année</TableHead>
                                    <TableHead>Capital Initial</TableHead>
                                    <TableHead>Contributions</TableHead>
                                    <TableHead>Gains d'Intérêts</TableHead>
                                    <TableHead>Capital Final</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {yearlyBreakdown.map((item) => (
                                    <TableRow key={item.year}>
                                        <TableCell className="text-center font-medium">{item.year}</TableCell>
                                        <TableCell>{formatCurrency(item.startingCapital)}</TableCell>
                                        <TableCell>{formatCurrency(item.yearlyContribution)}</TableCell>
                                        <TableCell className="text-green-600">{formatCurrency(item.interestGains)}</TableCell>
                                        <TableCell className="font-semibold">{formatCurrency(item.endingCapital)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
