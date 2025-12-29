import type { Bank } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark } from "lucide-react";

interface MortgageOffer {
    bankName: string;
    logo: React.ReactNode;
    indicativeRate: string;
    flexibility: string;
    personalContribution: string;
}

const mortgageOffers: MortgageOffer[] = [
    { bankName: "Attijariwafa Bank", logo: <Landmark className="text-yellow-500" />, indicativeRate: "À partir de 4.25% TAEG", flexibility: "Moyenne", personalContribution: "10-20%" },
    { bankName: "BMCE Bank of Africa", logo: <Landmark className="text-blue-600" />, indicativeRate: "À partir de 4.35% TAEG", flexibility: "Bonne", personalContribution: "10-20%" },
    { bankName: "Banque Populaire", logo: <Landmark className="text-purple-600" />, indicativeRate: "À partir de 4.20% TAEG", flexibility: "Bonne", personalContribution: "10% min" },
    { bankName: "CIH Bank", logo: <Landmark className="text-pink-500" />, indicativeRate: "À partir de 4.10% TAEG", flexibility: "Élevée", personalContribution: "10% min" },
    { bankName: "Société Générale Maroc", logo: <Landmark className="text-red-600" />, indicativeRate: "À partir de 4.40% TAEG", flexibility: "Moyenne", personalContribution: "15-20%" },
];

export function MortgageComparator() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Comparatif des Crédits Immobiliers</CardTitle>
        <CardDescription>Comparez les offres indicatives pour un prêt immobilier au Maroc.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Banque</TableHead>
              <TableHead>Taux Indicatif (TAEG)</TableHead>
              <TableHead>Flexibilité</TableHead>
              <TableHead>Apport Personnel Requis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mortgageOffers.map((offer) => (
              <TableRow key={offer.bankName}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 flex items-center justify-center">{offer.logo}</div>
                    <span>{offer.bankName}</span>
                  </div>
                </TableCell>
                <TableCell>{offer.indicativeRate}</TableCell>
                <TableCell>{offer.flexibility}</TableCell>
                <TableCell>{offer.personalContribution}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
