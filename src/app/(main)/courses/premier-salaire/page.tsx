
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, PiggyBank, BarChart, Rocket } from "lucide-react";
import { CourseCurriculum } from "./course-curriculum";

const courseImage = PlaceHolderImages.find(p => p.id === 'course-1');

const highlights = [
  { icon: PiggyBank, text: "Maîtrisez votre budget" },
  { icon: BarChart, text: "Démystifiez la bourse" },
  { icon: Rocket, text: "Lancez votre premier investissement" },
];

export default function PremierSalairePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-card text-card-foreground py-16 md:py-24">
         <div className="absolute inset-0 bg-black/20" />
         {courseImage && (
             <Image
                src={courseImage.imageUrl}
                alt="Comment Investir Votre Premier Salaire"
                data-ai-hint={courseImage.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
         )}
        <div className="container relative z-10 text-center">
          <Badge variant="secondary">Guide Pratique pour Débutants</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mt-4 max-w-4xl mx-auto">
            Comment Investir Votre Premier Salaire au Maroc
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Apprenez à faire travailler votre argent pour vous dès le début de votre carrière. Un plan simple et actionnable pour les jeunes professionnels au Maroc.
          </p>
          <div className="mt-8">
            <CourseCurriculum />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="h-10 w-10 text-primary mb-3" />
                <p className="font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course For Who Section */}
      <section className="py-16 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Le guide parfait pour démarrer</h2>
            <p className="mt-4 text-muted-foreground">
              Cette formation est spécialement conçue pour ceux qui reçoivent leurs premiers salaires et se sentent perdus face à l'investissement.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span><strong>Jeunes diplômés et professionnels</strong> qui débutent leur carrière.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span>Ceux qui pensent qu'il faut <strong>beaucoup d'argent pour commencer</strong> (spoiler : c'est faux).</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span>Toute personne qui veut <strong>éviter les erreurs coûteuses</strong> et commencer sur des bases solides.</span>
              </li>
            </ul>
          </div>
          <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ce que vous apprendrez à faire</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>✅ Créer un budget qui vous permet d'épargner sans sacrifice.</p>
                    <p>✅ Choisir le bon courtier (société de bourse) au Maroc.</p>
                    <p>✅ Comprendre ce que sont une action et un OPCVM.</p>
                    <p>✅ Acheter votre tout premier investissement en toute confiance.</p>
                    <p>✅ Mettre en place un plan d'investissement simple et régulier.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>

       {/* CTA Final */}
       <section className="py-20 text-center">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Commencez Votre Aventure d'Investisseur Aujourd'hui</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Le meilleur moment pour investir était hier. Le deuxième meilleur moment, c'est maintenant.
          </p>
          <div className="mt-8">
             <CourseCurriculum />
          </div>
        </div>
      </section>
    </div>
  );
}
