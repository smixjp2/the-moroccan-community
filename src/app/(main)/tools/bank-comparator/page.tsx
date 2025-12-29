import { BankComparator } from "../bank-comparator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function BankComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
       <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur de Banques</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
            Prenez des décisions basées sur les données. Comparez les produits financiers et les services pour trouver la banque qui vous convient.
        </p>
      </div>
      <BankComparator />
      <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Ce comparateur vous aide à choisir une banque pour vos opérations courantes au Maroc. Voici comment interpréter les colonnes :</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Frais de Tenue de Compte :</strong> Il s'agit du coût mensuel ou annuel pour simplement posséder un compte. "Gratuit (Code 30)" chez CIH est une offre très populaire pour les jeunes. Les autres banques proposent souvent des "packs" qui incluent plusieurs services pour un tarif mensuel.</li>
                <li><strong>Plateforme Digitale :</strong> Évalue la qualité de l'application mobile et du site web de la banque pour gérer vos comptes, faire des virements, etc. Une plateforme "Excellente" signifie une expérience utilisateur fluide et complète.</li>
                <li><strong>Réseau d'Agences :</strong> Indique la densité du réseau d'agences physiques. Important si vous avez besoin de vous rendre souvent en agence pour des dépôts d'espèces ou des opérations complexes.</li>
                <li><strong>Carte Bancaire :</strong> Précise si la carte de débit standard est gratuite ou payante. Souvent, elle est "incluse dans le pack" de services.</li>
                <li><strong>Offre Jeunes :</strong> Mentionne si la banque propose des packages spécifiques et avantageux pour les jeunes (généralement moins de 30 ans), souvent avec des frais réduits ou gratuits.</li>
            </ul>
            <p><strong>Commentaire :</strong> Pour une utilisation principalement digitale avec des frais minimaux, <strong>CIH Bank</strong> est souvent un excellent choix, surtout pour les jeunes. Pour un service complet avec un grand réseau d'agences, <strong>Attijariwafa Bank</strong> et <strong>Banque Populaire</strong> sont des options solides, mais leurs frais peuvent être plus élevés si vous n'optez pas pour un pack adapté.</p>
        </CardContent>
      </Card>
    </div>
  );
}
