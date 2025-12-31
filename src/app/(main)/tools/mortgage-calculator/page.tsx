'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, Home, Wallet, Percent, Calendar } from 'lucide-react';


type AmortizationData = {
  year: number;
  principal: number;
  interest: number;
  remainingBalance: number;
};

export default function MortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [isSimulated, setIsSimulated] = useState(false);

  const { monthlyPayment, totalInterest, totalCost, amortizationSchedule, chartData } = useMemo(() => {
    const principal = Number(loanAmount);
    const rate = Number(interestRate) / 100 / 12;
    const term = Number(loanTerm) * 12;

    if (principal <= 0 || rate <= 0 || term <= 0) {
        return { monthlyPayment: 0, totalInterest: 0, totalCost: 0, amortizationSchedule: [], chartData: [] };
    }

    const monthly = principal * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
    const total = monthly * term;
    const interest = total - principal;
    
    const schedule: AmortizationData[] = [];
    let remaining = principal;
    for (let year = 1; year <= loanTerm; year++) {
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;
        for (let month = 1; month <= 12; month++) {
            const interestPayment = remaining * rate;
            const principalPayment = monthly - interestPayment;
            yearlyInterest += interestPayment;
            yearlyPrincipal += principalPayment;
            remaining -= principalPayment;
        }
        schedule.push({
            year,
            principal: yearlyPrincipal,
            interest: yearlyInterest,
            remainingBalance: remaining > 0 ? remaining : 0,
        });
    }

    return {
        monthlyPayment: monthly,
        totalInterest: interest,
        totalCost: total,
        amortizationSchedule: schedule,
        chartData: [
            { name: 'Capital Emprunté', value: principal, fill: 'hsl(var(--muted-foreground))' },
            { name: 'Coût Total des Intérêts', value: interest, fill: 'hsl(var(--chart-2))' },
        ]
    };
  }, [loanAmount, interestRate, loanTerm]);

  const handleSimulate = () => {
    setIsSimulated(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Calculateur de Crédit Immobilier</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Estimez vos mensualités, le coût total de votre prêt et visualisez votre plan d'amortissement pour prendre une décision éclairée.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <Accordion type="single" collapsible>
            <AccordionItem value="guide">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        <span className="font-semibold">Comment utiliser le calculateur ?</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 text-muted-foreground">
                        <p>Cet outil vous aide à planifier votre prêt immobilier.</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Montant du prêt :</strong> La somme que vous souhaitez emprunter.</li>
                            <li><strong>Taux d'intérêt annuel (%) :</strong> Le taux d'intérêt proposé par la banque, hors assurance et frais de dossier.</li>
                            <li><strong>Durée du prêt (ans) :</strong> Le nombre d'années pour rembourser le crédit.</li>
                        </ul>
                        <p>Cliquez sur "Calculer mes Mensualités" pour obtenir votre simulation.</p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du Prêt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loan-amount">Montant du prêt (MAD)</Label>
                <Input id="loan-amount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
              </div>
              <div className="space-y-4">
                <Label>Taux d'intérêt annuel: {interestRate}%</Label>
                <Slider value={[interestRate]} onValueChange={(value) => setInterestRate(value[0])} max={15} step={0.1} />
              </div>
              <div className="space-y-4">
                <Label>Durée du prêt: {loanTerm} ans</Label>
                <Slider value={[loanTerm]} onValueChange={(value) => setLoanTerm(value[0])} min={5} max={30} step={1} />
              </div>
               <Button onClick={handleSimulate} className="w-full">Calculer mes Mensualités</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-8">
            {!isSimulated ? (
                 <Card className="flex items-center justify-center min-h-[600px]">
                    <p className="text-center text-muted-foreground p-8">
                        Remplissez les paramètres de votre prêt et cliquez sur "Calculer" pour voir la simulation.
                    </p>
                </Card>
            ) : (
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Synthèse de votre prêt</CardTitle>
                        <CardDescription>Voici un résumé des coûts liés à votre simulation de prêt immobilier.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <Home className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Votre mensualité (hors assurance)</p>
                                        <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-destructive/10">
                                        <Percent className="h-6 w-6 text-destructive" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Coût total des intérêts</p>
                                        <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                     <div className="p-3 rounded-full bg-green-500/10">
                                        <Wallet className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Coût total du crédit</p>
                                        <p className="text-2xl font-bold">{formatCurrency(totalCost)}</p>
                                    </div>
                                </div>
                            </div>
                            <ChartContainer config={{}} className="w-full h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} labelLine={false}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Plan d'amortissement annuel</CardTitle>
                        <CardDescription>Détail de la répartition entre capital et intérêts remboursés chaque année.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Année</TableHead>
                                    <TableHead>Capital Remboursé</TableHead>
                                    <TableHead>Intérêts Payés</TableHead>
                                    <TableHead>Capital Restant Dû</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {amortizationSchedule.map((item) => (
                                    <TableRow key={item.year}>
                                        <TableCell className="text-center font-medium">{item.year}</TableCell>
                                        <TableCell className="text-green-600">{formatCurrency(item.principal)}</TableCell>
                                        <TableCell className="text-destructive">{formatCurrency(item.interest)}</TableCell>
                                        <TableCell className="font-semibold">{formatCurrency(item.remainingBalance)}</TableCell>
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
