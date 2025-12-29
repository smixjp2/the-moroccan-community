import { ConsumerLoanComparator } from "./consumer-loan-comparator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function ConsumerLoanComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur de Crédit à la Consommation</h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
                Besoin d'un financement pour un projet personnel ? Comparez les taux des crédits à la consommation au Maroc.
            </p>
        </div>
      <ConsumerLoanComparator />
       <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Le crédit à la consommation peut être utile, mais il est essentiel de bien comparer les offres pour maîtriser son coût.</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Taux d'Intérêt (TAEG) :</strong> Comme pour le crédit immobilier, le TAEG est le meilleur indicateur du coût total. Pour un crédit à la consommation, les taux sont généralement plus élevés.</li>
                <li><strong>Montant Maximum :</strong> Le montant que vous pouvez emprunter. Il dépend de votre capacité de remboursement et de la politique de la banque.</li>
                <li><strong>Durée de Remboursement :</strong> La période sur laquelle vous étalez vos paiements. Une durée plus longue signifie des mensualités plus faibles, mais un coût total du crédit plus élevé.</li>
            </ul>
             <p><strong>Commentaire :</strong> Les sociétés de financement spécialisées (comme Wafasalaf, Sofac) sont souvent très compétitives sur ce segment. Prenez le temps de simuler votre crédit auprès de plusieurs organismes. Attention à ne pas surcharger votre capacité d'endettement.</p>
        </CardContent>
      </Card>
    </div>
  );
}
