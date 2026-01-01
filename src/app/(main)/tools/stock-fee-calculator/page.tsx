"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, ArrowUp, ArrowDown, Wallet, TrendingUp } from 'lucide-react';

const BUY_FEE_RATE = 0.01; // 1%
const SELL_FEE_RATE = 0.01; // 1%

export default function StockFeeCalculatorPage() {
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(110);
  const [numberOfShares, setNumberOfShares] = useState(100);
  const [isCalculated, setIsCalculated] = useState(false);

  const {
    totalBuyCost,
    totalSellValue,
    buyFee,
    sellFee,
    totalFees,
    netProfit,
    netProfitPercentage,
    breakEvenPrice,
  } = useMemo(() => {
    const buyP = Number(buyPrice) || 0;
    const sellP = Number(sellPrice) || 0;
    const shares = Number(numberOfShares) || 0;

    const initialCost = buyP * shares;
    const bFee = initialCost * BUY_FEE_RATE;
    const totalBuy = initialCost + bFee;

    const initialSellValue = sellP * shares;
    const sFee = initialSellValue * SELL_FEE_RATE;
    const totalSell = initialSellValue - sFee;

    const profit = totalSell - totalBuy;
    const profitPercentage = initialCost > 0 ? (profit / totalBuy) * 100 : 0;
    
    // P_vente * N * (1 - Taux_vente) = P_achat * N * (1 + Taux_achat)
    // P_vente = P_achat * (1 + Taux_achat) / (1 - Taux_vente)
    const bePrice = buyP * (1 + BUY_FEE_RATE) / (1 - SELL_FEE_RATE);

    return {
      totalBuyCost: totalBuy,
      totalSellValue: totalSell,
      buyFee: bFee,
      sellFee: sFee,
      totalFees: bFee + sFee,
      netProfit: profit,
      netProfitPercentage: profitPercentage,
      breakEvenPrice: bePrice,
    };
  }, [buyPrice, sellPrice, numberOfShares]);

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Calculateur de Frais de Transaction</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Simulez l'impact des frais de courtage sur le profit de vos transactions d'achat et de vente d'actions.
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
                <p>Ce simulateur vous aide à comprendre le coût réel de vos opérations en bourse. Nous utilisons une estimation de <strong>1% de frais pour l'achat et 1% pour la vente.</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Prix d'achat par action :</strong> Le prix auquel vous achetez une action.</li>
                  <li><strong>Prix de vente par action :</strong> Le prix auquel vous prévoyez de vendre cette action.</li>
                  <li><strong>Nombre d'actions :</strong> La quantité d'actions concernées par la transaction.</li>
                </ul>
                <p>Cliquez sur "Calculer" pour voir la simulation détaillée.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de la Transaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="buy-price">Prix d'achat par action (MAD)</Label>
                <Input id="buy-price" type="number" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sell-price">Prix de vente par action (MAD)</Label>
                <Input id="sell-price" type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} />
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
                Remplissez les paramètres et cliquez sur "Calculer" pour analyser votre transaction.
              </p>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Synthèse de la Transaction</CardTitle>
                  <CardDescription>
                    Voici l'analyse de votre opération d'achat-revente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Buy Side */}
                    <Card className="p-4 bg-secondary">
                        <CardHeader className="p-2">
                            <div className="flex items-center gap-2 text-red-600">
                                <ArrowDown className="h-5 w-5" />
                                <CardTitle className="text-lg">Opération d'Achat</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-2 space-y-2 text-sm">
                            <div className="flex justify-between"><span>Coût initial :</span> <strong>{formatCurrency(buyPrice * numberOfShares)}</strong></div>
                            <div className="flex justify-between"><span>Frais d'achat (1%) :</span> <strong>{formatCurrency(buyFee)}</strong></div>
                            <div className="flex justify-between border-t pt-2 mt-2"><span>Coût Total d'Achat :</span> <strong className="text-lg">{formatCurrency(totalBuyCost)}</strong></div>
                        </CardContent>
                    </Card>
                    {/* Sell Side */}
                    <Card className="p-4 bg-secondary">
                        <CardHeader className="p-2">
                            <div className="flex items-center gap-2 text-green-600">
                                <ArrowUp className="h-5 w-5" />
                                <CardTitle className="text-lg">Opération de Vente</CardTitle>
                            </div>
                        </CardHeader>
                         <CardContent className="p-2 space-y-2 text-sm">
                            <div className="flex justify-between"><span>Valeur de vente :</span> <strong>{formatCurrency(sellPrice * numberOfShares)}</strong></div>
                            <div className="flex justify-between"><span>Frais de vente (1%) :</span> <strong>{formatCurrency(sellFee)}</strong></div>
                            <div className="flex justify-between border-t pt-2 mt-2"><span>Montant Net Reçu :</span> <strong className="text-lg">{formatCurrency(totalSellValue)}</strong></div>
                        </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Résultat Net et Impact des Frais</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 rounded-lg bg-secondary">
                            <Wallet className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Total des Frais</p>
                            <p className="text-2xl font-bold">{formatCurrency(totalFees)}</p>
                        </div>
                         <div className={`p-4 rounded-lg ${netProfit >= 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
                             <TrendingUp className={`h-8 w-8 mx-auto mb-2 ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`} />
                            <p className="text-sm text-muted-foreground">Profit / Perte Net(te)</p>
                            <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>{formatCurrency(netProfit)}</p>
                        </div>
                        <div className={`p-4 rounded-lg ${netProfit >= 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
                             <TrendingUp className={`h-8 w-8 mx-auto mb-2 ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`} />
                            <p className="text-sm text-muted-foreground">Rendement Net</p>
                             <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>{netProfitPercentage.toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="mt-6 border-t pt-4 text-sm text-muted-foreground">
                        <p>Pour cette opération, les frais représentent <strong>{(totalFees / totalBuyCost * 100).toFixed(2)}%</strong> de votre investissement initial.</p>
                        <p className="mt-2">Le prix de votre action doit atteindre <strong>{formatCurrency(breakEvenPrice)}</strong> juste pour couvrir les frais d'achat et de vente. C'est votre seuil de rentabilité.</p>
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
