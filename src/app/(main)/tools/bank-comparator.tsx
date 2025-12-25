import type { Bank } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark } from "lucide-react";

const banks: Bank[] = [
    { name: "Attijariwafa Bank", fees: "Standard", accessibility: "Excellent", logo: <Landmark className="text-yellow-500" /> },
    { name: "BMCE Bank of Africa", fees: "Competitive", accessibility: "Good", logo: <Landmark className="text-blue-600" /> },
    { name: "Banque Populaire", fees: "Low", accessibility: "Very Good", logo: <Landmark className="text-purple-600" /> },
    { name: "CIH Bank", fees: "Very Low (Digital)", accessibility: "Excellent (Digital)", logo: <Landmark className="text-pink-500" /> },
    { name: "Société Générale Maroc", fees: "High", accessibility: "Good", logo: <Landmark className="text-red-600" /> },
];

export function BankComparator() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Checking Account Comparator</CardTitle>
        <CardDescription>Compare Moroccan banks for checking accounts based on fees and accessibility.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Bank</TableHead>
              <TableHead>Annual Fees</TableHead>
              <TableHead>Accessibility (Branch & Digital)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((bank) => (
              <TableRow key={bank.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 flex items-center justify-center">{bank.logo}</div>
                    <span>{bank.name}</span>
                  </div>
                </TableCell>
                <TableCell>{bank.fees}</TableCell>
                <TableCell>{bank.accessibility}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
