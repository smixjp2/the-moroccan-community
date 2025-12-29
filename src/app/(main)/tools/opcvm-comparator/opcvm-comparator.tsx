import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Opcvm } from "@/lib/types";
import { opcvmData } from "@/lib/data";
import Link from "next/link";


const getTypeBadgeClass = (type: Opcvm['category']) => {
    switch (type) {
        case "Actions": return "bg-blue-100 text-blue-800 border-blue-200";
        case "Obligataire MT/LT": return "bg-green-100 text-green-800 border-green-200";
        case "Diversifié": return "bg-purple-100 text-purple-800 border-purple-200";
        case "Monétaire": return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "Obligataire CT": return "bg-orange-100 text-orange-800 border-orange-200";
        default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
}

const getPerfClass = (perf: number) => {
    if (perf > 0) return "text-green-600 font-medium";
    if (perf < 0) return "text-red-600 font-medium";
    return "text-muted-foreground";
}

export function OpcvmComparator() {
  return (
    <Card className="max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Comparateur d'OPCVM Marocains</CardTitle>
        <CardDescription>Comparez les performances des principaux fonds d'investissement au Maroc.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] min-w-[250px]">OPCVM</TableHead>
                <TableHead className="min-w-[200px]">Société de gestion</TableHead>
                <TableHead className="min-w-[150px]">Type</TableHead>
                <TableHead className="text-right min-w-[100px]">VL (MAD)</TableHead>
                <TableHead className="text-right min-w-[100px]">Perf. 1S</TableHead>
                <TableHead className="text-right min-w-[100px]">Perf. 1M</TableHead>
                <TableHead className="text-right min-w-[100px]">Perf. YTD</TableHead>
                <TableHead className="text-right min-w-[100px]">Perf. 1A</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opcvmData.map((fund) => (
                <TableRow key={fund.id}>
                  <TableCell className="font-medium">
                     <Link href={`/tools/opcvm-comparator/${fund.id}`} className="hover:underline text-primary">
                        {fund.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{fund.managementCompany}</TableCell>
                  <TableCell>
                      <Badge variant="outline" className={getTypeBadgeClass(fund.category)}>{fund.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{fund.nav.toFixed(2)}</TableCell>
                  <TableCell className={`text-right ${getPerfClass(fund.perf1w)}`}>{fund.perf1w.toFixed(2)}%</TableCell>
                  <TableCell className={`text-right ${getPerfClass(fund.perf1m)}`}>{fund.perf1m.toFixed(2)}%</TableCell>
                  <TableCell className={`text-right ${getPerfClass(fund.perfYTD)}`}>{fund.perfYTD.toFixed(2)}%</TableCell>
                  <TableCell className={`text-right ${getPerfClass(fund.perf1y)}`}>{fund.perf1y.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
