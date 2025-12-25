import type { Brokerage } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark } from "lucide-react";

const brokerages: Brokerage[] = [
    { name: "Attijariwafa Trade", fees: "0.45% per transaction", platform: "Good", responsiveness: "Average", logo: <Landmark className="text-yellow-500" /> },
    { name: "BMCE Capital Bourse", fees: "0.40% per transaction", platform: "Excellent", responsiveness: "Good", logo: <Landmark className="text-blue-600" /> },
    { name: "BP Bourse", fees: "0.50% per transaction", platform: "Basic", responsiveness: "Good", logo: <Landmark className="text-purple-600" /> },
    { name: "CIH Trade", fees: "0.35% (Varies)", platform: "Modern", responsiveness: "Good (Digital)", logo: <Landmark className="text-pink-500" /> },
    { name: "SG Maroc Bourse", fees: "0.55% per transaction", platform: "Good", responsiveness: "Average", logo: <Landmark className="text-red-600" /> },
];

export function BrokerageComparator() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Brokerage Account Comparator</CardTitle>
        <CardDescription>Compare Moroccan brokerages based on fees, trading platform, and service responsiveness.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Brokerage</TableHead>
              <TableHead>Fees & Commissions</TableHead>
              <TableHead>Trading Platform</TableHead>
              <TableHead>Responsiveness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokerages.map((brokerage) => (
              <TableRow key={brokerage.name}>
                <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-6 flex items-center justify-center">{brokerage.logo}</div>
                    <span>{brokerage.name}</span>
                  </div>
                </TableCell>
                <TableCell>{brokerage.fees}</TableCell>
                <TableCell>{brokerage.platform}</TableCell>
                <TableCell>{brokerage.responsiveness}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
