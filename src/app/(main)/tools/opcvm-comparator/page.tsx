
import { OpcvmComparator } from "./opcvm-comparator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function OpcvmComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur d'OPCVM</h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
                Comparez les fonds d'investissement (OPCVM) disponibles au Maroc pour trouver ceux qui correspondent le mieux à votre profil de risque et à vos objectifs.
            </p>
        </div>
      <OpcvmComparator />
       <Card className="max-w-7xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Un Organisme de Placement Collectif en Valeurs Mobilières (OPCVM) est un portefeuille de titres (actions, obligations, etc.) géré par des professionnels. C'est un excellent moyen de diversifier vos investissements sans avoir à acheter chaque titre individuellement.</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Type :</strong> Indique la stratégie du fonds. <strong>Monétaire</strong> et <strong>Obligataire Court Terme (CT)</strong> sont les moins risqués. <strong>Actions</strong> et <strong>Diversifié</strong> présentent un risque plus élevé mais un potentiel de rendement supérieur. <strong>Obligataire Moyen/Long Terme (MT/LT)</strong> est un compromis.</li>
                <li><strong>VL (Valeur Liquidative) :</strong> C'est le prix d'une part du fonds. Son évolution reflète la performance du portefeuille. Cliquez sur un fonds pour voir son analyse détaillée.</li>
                <li><strong>Perf. (Performance) :</strong> Indique le gain ou la perte du fonds sur différentes périodes (YTD = Year-to-Date, depuis le 1er janvier). Comparez les fonds de même type pour une analyse pertinente.</li>
            </ul>
             <p><strong>Commentaire :</strong> Pour débuter, les fonds monétaires ou obligataires sont une option prudente. Pour viser une performance plus élevée sur le long terme, les fonds actions sont incontournables, à condition d'accepter une plus grande volatilité. Ne vous fiez pas uniquement aux performances passées, elles ne garantissent pas les performances futures.</p>
        </CardContent>
      </Card>
    </div>
  );
}
