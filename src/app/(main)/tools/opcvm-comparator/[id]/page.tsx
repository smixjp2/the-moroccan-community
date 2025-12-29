"use client";

import { notFound } from 'next/navigation';
import { opcvmData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const getPerfClass = (perf: number) => {
    if (perf > 0) return "text-green-600";
    if (perf < 0) return "text-red-600";
    return "text-muted-foreground";
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];


export default function OpcvmDetailPage({ params }: { params: { id: string } }) {
  const opcvm = opcvmData.find((o) => o.id === params.id);

  if (!opcvm) {
    notFound();
  }

  const { name, category, managementCompany, nav, perfYTD, perf1y, details } = opcvm;

  const chartConfig = {
    value: { label: "VL" },
    label: { color: "hsl(var(--background))" },
  };

  const allocationChartData = details.assetAllocation.map(item => ({ name: item.label, value: item.value }));


  return (
    <div className="container py-12 md:py-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Badge variant="secondary" className="mb-2">{category}</Badge>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{name}</h1>
        <p className="text-muted-foreground mt-2 text-lg">Géré par : {managementCompany}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valeur Liquidative</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(nav)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Perf. YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getPerfClass(perfYTD)}`}>{perfYTD.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Perf. 1 An</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getPerfClass(perf1y)}`}>{perf1y.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Frais Gestion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{details.managementFee}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-2">
            {/* NAV Chart */}
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Évolution de la Valeur Liquidative</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full">
                <ResponsiveContainer>
                    <LineChart data={details.historicalNav} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="date" tickFormatter={(str) => new Date(str).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' })} />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} tickFormatter={(val) => formatCurrency(val).replace(",00\u00A0MAD", "")}/>
                        <Tooltip 
                            content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)}/>}
                        />
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="VL" />
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            {/* Factsheet */}
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Fiche Technique</CardTitle>
                </CardHeader>
                <CardContent>
                <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Classification</dt><dd className="font-medium">{details.classification}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Date de création</dt><dd className="font-medium">{new Date(details.creationDate).toLocaleDateString('fr-FR')}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">VL initiale</dt><dd className="font-medium">{formatCurrency(details.initialNav)}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Frais de souscription</dt><dd className="font-medium">{details.subscriptionFee}</dd></div>
                </dl>
                </CardContent>
            </Card>

             {/* Asset Allocation */}
            {allocationChartData.length > 0 && (
                 <Card>
                    <CardHeader>
                    <CardTitle className="font-headline">Allocation d'Actifs</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={allocationChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                return (
                                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                    {`${(percent * 100).toFixed(0)}%`}
                                </text>
                                );
                            }}
                          >
                             {allocationChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                          </Pie>
                          <Tooltip content={<ChartTooltipContent />} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}
        </div>

        {/* Historical Performance */}
         {details.historicalPerformance.length > 0 && (
            <div className="lg:col-span-3">
                <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Performance Historique Annuelle</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        {details.historicalPerformance.map(p => <TableHead key={p.year} className="text-center">{p.year}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        {details.historicalPerformance.map(p => (
                            <TableCell key={p.year} className={`text-center font-bold text-lg ${getPerfClass(p.performance)}`}>
                            {p.performance.toFixed(2)}%
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </div>
         )}
      </div>
    </div>
  );
}
