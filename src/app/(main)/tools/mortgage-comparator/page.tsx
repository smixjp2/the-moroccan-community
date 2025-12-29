import { MortgageComparator } from "./mortgage-comparator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function MortgageComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur de Crédit Immobilier</h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
                Comparez les offres de prêt immobilier au Maroc pour trouver le meilleur taux et les meilleures conditions pour votre projet.
            </p>
        </div>
      <MortgageComparator />
       <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Choisir le bon crédit immobilier est une décision financière majeure. Voici comment interpréter ce tableau comparatif :</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Taux Annuel Effectif Global (TAEG) :</strong> C'est le coût total du crédit, incluant le taux d'intérêt nominal, les frais de dossier, l'assurance et autres frais. Un TAEG plus bas signifie un crédit moins cher. Les taux "à partir de" sont indicatifs et dépendent de votre profil.</li>
                <li><strong>Flexibilité :</strong> Évalue la possibilité de moduler vos échéances (les augmenter, les baisser ou faire une pause) et d'effectuer des remboursements anticipés sans pénalités excessives.</li>
                <li><strong>Apport Personnel :</strong> Le montant minimum que la banque exige que vous financiez vous-même. Un apport plus élevé permet souvent d'obtenir un meilleur taux.</li>
            </ul>
             <p><strong>Commentaire :</strong> Les banques en ligne comme <strong>CIH Bank</strong> proposent souvent des offres très compétitives. N'hésitez pas à négocier avec plusieurs banques. Votre profil (stabilité de l'emploi, revenus, apport) est le facteur clé pour obtenir les meilleures conditions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
