
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Opcvm {
    name: string;
    managementCompany: string;
    type: "Monétaire" | "Obligataire CT" | "Obligataire MT/LT" | "Diversifié" | "Actions";
    nav: number; // Net Asset Value (Valeur Liquidative)
    perf1w: number;
    perf1m: number;
    perfYTD: number;
    perf1y: number;
}

const opcvmData: Opcvm[] = [
    { name: "FCP AVENIR ACTIONS", managementCompany: "ATTIJARIWAFA GESTION", type: "Actions", nav: 142.75, perf1w: 0.25, perf1m: 1.5, perfYTD: 8.5, perf1y: 15.2 },
    { name: "FCP SG ACTIONS", managementCompany: "SOGECAPITAL GESTION", type: "Actions", nav: 180.4, perf1w: 0.3, perf1m: 1.8, perfYTD: 9.1, perf1y: 16.5 },
    { name: "FCP CAP OBLIGATAIRE", managementCompany: "BMCE CAPITAL GESTION", type: "Obligataire MT/LT", nav: 1250.1, perf1w: 0.05, perf1m: 0.4, perfYTD: 3.5, perf1y: 5.1 },
    { name: "FCP VALOR", managementCompany: "WAFA GESTION", type: "Diversifié", nav: 215.6, perf1w: 0.15, perf1m: 0.9, perfYTD: 6.2, perf1y: 11.8 },
    { name: "FCP MONETAIRE PLUS", managementCompany: "Upline Capital Management", type: "Monétaire", nav: 105.2, perf1w: 0.02, perf1m: 0.2, perfYTD: 2.8, perf1y: 3.1 },
    { name: "FCP SHORT TERM PLUS", managementCompany: "CDG CAPITAL GESTION", type: "Obligataire CT", nav: 112.8, perf1w: 0.03, perf1m: 0.3, perfYTD: 3.0, perf1y: 3.8 },
];

const getTypeBadgeClass = (type: Opcvm['type']) => {
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">OPCVM</TableHead>
              <TableHead>Société de gestion</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">VL (MAD)</TableHead>
              <TableHead className="text-right">Perf. 1S</TableHead>
              <TableHead className="text-right">Perf. 1M</TableHead>
              <TableHead className="text-right">Perf. YTD</TableHead>
              <TableHead className="text-right">Perf. 1A</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opcvmData.map((fund) => (
              <TableRow key={fund.name}>
                <TableCell className="font-medium">{fund.name}</TableCell>
                <TableCell className="text-muted-foreground">{fund.managementCompany}</TableCell>
                <TableCell>
                    <Badge variant="outline" className={getTypeBadgeClass(fund.type)}>{fund.type}</Badge>
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
      </CardContent>
    </Card>
  );
}
