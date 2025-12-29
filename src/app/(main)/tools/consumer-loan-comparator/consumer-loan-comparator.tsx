import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark } from "lucide-react";

interface LoanOffer {
    lenderName: string;
    logo: React.ReactNode;
    indicativeRate: string;
    maxAmount: string;
    maxDuration: string;
}

const loanOffers: LoanOffer[] = [
    { lenderName: "Wafasalaf (Attijariwafa)", logo: <Landmark className="text-yellow-500" />, indicativeRate: "À partir de 6.5% TAEG", maxAmount: "300 000 MAD", maxDuration: "7 ans" },
    { lenderName: "Salafin (BMCE)", logo: <Landmark className="text-blue-600" />, indicativeRate: "À partir de 7.0% TAEG", maxAmount: "250 000 MAD", maxDuration: "6 ans" },
    { lenderName: "Sofac (Banque Populaire)", logo: <Landmark className="text-purple-600" />, indicativeRate: "À partir de 6.8% TAEG", maxAmount: "300 000 MAD", maxDuration: "7 ans" },
    { lenderName: "CIH Bank", logo: <Landmark className="text-pink-500" />, indicativeRate: "À partir de 7.5% TAEG", maxAmount: "200 000 MAD", maxDuration: "5 ans" },
    { lenderName: "Eqdom (Société Générale)", logo: <Landmark className="text-red-600" />, indicativeRate: "À partir de 7.2% TAEG", maxAmount: "250 000 MAD", maxDuration: "7 ans" },
];

export function ConsumerLoanComparator() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Comparatif des Crédits Consommation</CardTitle>
        <CardDescription>Comparez les offres indicatives pour un prêt personnel au Maroc.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Organisme</TableHead>
              <TableHead>Taux Indicatif (TAEG)</TableHead>
              <TableHead>Montant Max</TableHead>
              <TableHead>Durée Max</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loanOffers.map((offer) => (
              <TableRow key={offer.lenderName}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 flex items-center justify-center">{offer.logo}</div>
                    <span>{offer.lenderName}</span>
                  </div>
                </TableCell>
                <TableCell>{offer.indicativeRate}</TableCell>
                <TableCell>{offer.maxAmount}</TableCell>
                <TableCell>{offer.maxDuration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
