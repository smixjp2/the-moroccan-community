
'use client';

import { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { opcvmData } from '@/lib/data';
import type { Opcvm } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';


function PerformanceCell({ value }: { value: number }) {
    const isPositive = value > 0;
    const isNegative = value < 0;
    const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
    const colorClass = isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground';

    return (
        <div className={`flex items-center gap-1 font-medium ${colorClass}`}>
            <Icon className="h-4 w-4" />
            <span>{value.toFixed(2)}%</span>
        </div>
    );
}

export default function OpcvmComparatorPage() {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [companyFilter, setCompanyFilter] = useState('all');
    const [selectedOpcvm, setSelectedOpcvm] = useState<Opcvm | null>(null);

    const managementCompanies = useMemo(() => ['all', ...Array.from(new Set(opcvmData.map(item => item.managementCompany)))], []);
    const categories = useMemo(() => ['all', ...Array.from(new Set(opcvmData.map(item => item.category)))], []);

    const filteredData = useMemo(() => {
        return opcvmData.filter(item => {
            const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
            const companyMatch = companyFilter === 'all' || item.managementCompany === companyFilter;
            return categoryMatch && companyMatch;
        });
    }, [categoryFilter, companyFilter]);
    
    const chartConfig = {
      nav: { label: "VL", color: "hsl(var(--primary))" },
    };
    const pieChartColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];


    return (
        <div className="container py-12 md:py-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur d'OPCVM</h1>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    Filtrez, comparez et analysez les fonds d'investissement (OPCVM) marocains pour prendre des décisions éclairées.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div>
                            <CardTitle>Fonds d'Investissement</CardTitle>
                            <CardDescription>Cliquez sur une ligne pour voir les détails.</CardDescription>
                        </div>
                        <div className="flex gap-4">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <SelectValue placeholder="Catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat === 'all' ? 'Toutes les catégories' : cat}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select value={companyFilter} onValueChange={setCompanyFilter}>
                                <SelectTrigger className="w-full md:w-[240px]">
                                    <SelectValue placeholder="Société de gestion" />
                                </SelectTrigger>
                                <SelectContent>
                                    {managementCompanies.map(comp => <SelectItem key={comp} value={comp}>{comp === 'all' ? 'Toutes les sociétés' : comp}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom de l'OPCVM</TableHead>
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead className="text-right">VL (MAD)</TableHead>
                                    <TableHead className="text-right">Perf. 1S</TableHead>
                                    <TableHead className="text-right">Perf. 1M</TableHead>
                                    <TableHead className="text-right">Perf. YTD</TableHead>
                                    <TableHead className="text-right">Perf. 1A</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((opcvm) => (
                                    <TableRow key={opcvm.id} onClick={() => setSelectedOpcvm(opcvm)} className="cursor-pointer">
                                        <TableCell>
                                            <div className="font-medium">{opcvm.name}</div>
                                            <div className="text-sm text-muted-foreground">{opcvm.managementCompany}</div>
                                        </TableCell>
                                        <TableCell>{opcvm.category}</TableCell>
                                        <TableCell className="text-right font-mono">{formatCurrency(opcvm.nav)}</TableCell>
                                        <TableCell className="text-right"><PerformanceCell value={opcvm.perf1w} /></TableCell>
                                        <TableCell className="text-right"><PerformanceCell value={opcvm.perf1m} /></TableCell>
                                        <TableCell className="text-right"><PerformanceCell value={opcvm.perfYTD} /></TableCell>
                                        <TableCell className="text-right"><PerformanceCell value={opcvm.perf1y} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            
            <Dialog open={!!selectedOpcvm} onOpenChange={() => setSelectedOpcvm(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                    {selectedOpcvm && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-headline">{selectedOpcvm.name}</DialogTitle>
                                <DialogDescription>{selectedOpcvm.managementCompany} - {selectedOpcvm.details.classification}</DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 grid md:grid-cols-3 gap-6 overflow-y-auto pr-4 pt-4">
                               <div className="md:col-span-2 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Évolution de la Valeur Liquidative</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                             <ChartContainer config={chartConfig} className="w-full h-[250px]">
                                                <ResponsiveContainer>
                                                    <LineChart data={selectedOpcvm.details.historicalNav}>
                                                        <CartesianGrid vertical={false} />
                                                        <XAxis dataKey="date" tickFormatter={(str) => new Date(str).toLocaleDateString('fr-FR', { month: 'short' })} />
                                                        <YAxis domain={['auto', 'auto']} tickFormatter={(val) => formatCurrency(val)} />
                                                        <Tooltip content={<ChartTooltipContent formatter={(val) => formatCurrency(val as number)} />} />
                                                        <Line type="monotone" dataKey="value" stroke={chartConfig.nav.color} strokeWidth={2} dot={false} name="VL" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Performances Annuelles</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {selectedOpcvm.details.historicalPerformance.map(perf => (
                                                    <div key={perf.year} className="flex justify-between items-center text-sm">
                                                        <span>{perf.year}</span>
                                                        <PerformanceCell value={perf.performance} />
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                               </div>
                               <div className="space-y-6">
                                   <Card>
                                        <CardHeader>
                                            <CardTitle>Informations Clés</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm space-y-2">
                                            <div className="flex justify-between"><span>Date de création:</span> <span className="font-medium">{new Date(selectedOpcvm.details.creationDate).toLocaleDateString('fr-FR')}</span></div>
                                            <div className="flex justify-between"><span>VL Initiale:</span> <span className="font-medium">{formatCurrency(selectedOpcvm.details.initialNav)}</span></div>
                                            <div className="flex justify-between"><span>Frais de gestion:</span> <span className="font-medium">{selectedOpcvm.details.managementFee}</span></div>
                                            <div className="flex justify-between"><span>Frais de souscription:</span> <span className="font-medium">{selectedOpcvm.details.subscriptionFee}</span></div>
                                        </CardContent>
                                   </Card>
                                   {selectedOpcvm.details.assetAllocation.length > 0 && (
                                       <Card>
                                            <CardHeader><CardTitle>Allocation d'Actifs</CardTitle></CardHeader>
                                            <CardContent>
                                                <ChartContainer config={{}} className="w-full h-[200px]">
                                                    <ResponsiveContainer>
                                                        <PieChart>
                                                            <Pie data={selectedOpcvm.details.assetAllocation} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={40} outerRadius={60} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                                                                {selectedOpcvm.details.assetAllocation.map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                                                                ))}
                                                            </Pie>
                                                            <Tooltip content={<ChartTooltipContent />} />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </ChartContainer>
                                            </CardContent>
                                       </Card>
                                   )}
                               </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
}