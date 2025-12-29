"use client";

import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Newspaper, Wrench, GraduationCap, Crown, Loader2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
const featureImages = {
  articles: PlaceHolderImages.find(p => p.id === 'feature-articles'),
  tools: PlaceHolderImages.find(p => p.id === 'feature-tools'),
  courses: PlaceHolderImages.find(p => p.id === 'feature-courses'),
}
const privateCommunityImage = PlaceHolderImages.find(p => p.id === 'private-community');

const features = [
  {
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    title: "Articles Approfondis",
    description: "Explorez l'analyse d'experts du marché boursier marocain, les tendances sectorielles et la performance de l'indice MASI.",
    link: "/articles",
    image: featureImages.articles,
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "Simulateurs Puissants",
    description: "Comparez les banques, les courtiers et simulez l'impact des frais sur vos investissements avec nos outils alimentés par l'IA.",
    link: "/tools",
    image: featureImages.tools,
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Cours d'Investissement",
    description: "De votre premier salaire aux stratégies avancées, nos cours vous permettent d'investir avec confiance.",
    link: "/courses",
    image: featureImages.courses,
  },
];

const faqItems = [
    {
        question: "Quel est le montant minimum pour commencer à investir en bourse au Maroc ?",
        answer: "Il n'y a pas de minimum légal ! Vous pouvez commencer avec quelques centaines de dirhams pour acheter vos premières actions. L'important est de commencer et d'être régulier. Nos outils peuvent vous aider à simuler des petits investissements."
    },
    {
        question: "Comment choisir un bon courtier (société de bourse) au Maroc ?",
        answer: "Le choix dépend de vos besoins. Les critères clés sont les frais de transaction, la qualité de la plateforme de trading et la réactivité du service client. Utilisez notre comparateur de courtiers pour trouver celui qui vous convient le mieux."
    },
    {
        question: "La bourse marocaine est-elle risquée ?",
        answer: "Tout investissement en actions comporte un risque de perte en capital. Cependant, le marché marocain est généralement moins volatil que de grands marchés internationaux. Une bonne stratégie de diversification, que nous enseignons dans nos cours, est essentielle pour gérer ce risque."
    },
    {
        question: "Dois-je payer des impôts sur mes gains en bourse ?",
        answer: "Oui, les plus-values sur les actions sont imposées au Maroc. La fiscalité peut évoluer. Il est recommandé de consulter nos articles ou un conseiller fiscal pour connaître les dernières réglementations et optimiser votre déclaration."
    },
    {
        question: "Qu'est-ce que le MASI et pourquoi est-il important ?",
        answer: "Le MASI (Moroccan All Shares Index) est l'indice principal de la Bourse de Casablanca. Il représente la performance globale de toutes les actions cotées. Le suivre vous donne une idée de la tendance générale du marché, un peu comme le CAC 40 en France ou le S&P 500 aux États-Unis."
    }
]

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : "S'abonner"}
        </Button>
    );
}

export default function Home() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(subscribeToNewsletter, {
    message: "",
    status: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Inscription réussie !",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast({
        title: "Erreur d'inscription",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <>
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-md">
              Débloquez le Potentiel du Marché Marocain
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/90 md:text-xl">
              Votre source d'analyses d'experts, d'outils puissants et de ressources pédagogiques pour investir au Maroc.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/articles">Explorer les Analyses <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/tools">Utiliser les Outils</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">L'Intelligence pour Chaque Investisseur</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Que vous soyez débutant ou professionnel chevronné, The Moroccan Community vous apporte la clarté dont vous avez besoin pour naviguer sur le marché marocain.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  {feature.image && (
                     <div className="aspect-video overflow-hidden">
                        <Image
                            src={feature.image.imageUrl}
                            alt={feature.title}
                            data-ai-hint={feature.image.imageHint}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                     </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-2">{feature.description}</CardDescription>
                    <Button asChild variant="link" className="px-0 mt-4 font-bold">
                        <Link href={feature.link}>Découvrir <ArrowRight className="ml-2" /></Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative rounded-lg overflow-hidden p-8 md:p-12 text-center text-white bg-card">
              {privateCommunityImage && (
                <Image
                  src={privateCommunityImage.imageUrl}
                  alt={privateCommunityImage.description}
                  data-ai-hint={privateCommunityImage.imageHint}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-primary/80" />
              <div className="relative z-10 max-w-2xl mx-auto">
                  <div className="mb-4">
                      <Crown className="h-12 w-12 mx-auto text-yellow-300" />
                  </div>
                  <h2 className="font-headline text-3xl font-bold md:text-4xl text-primary-foreground">
                      Rejoignez notre Communauté Privée
                  </h2>
                  <p className="mt-4 text-lg text-primary-foreground/90">
                      Accédez à du contenu exclusif, des analyses approfondies et interagissez directement avec nous en devenant membre payant sur YouTube.
                  </p>
                  <Button asChild size="lg" className="mt-8 font-bold bg-background text-foreground hover:bg-background/90">
                      <a href="https://www.youtube.com/channel/UCK6m2fe2txUxNFxpn65rURg/join" target="_blank" rel="noopener noreferrer">
                          Devenir Membre
                      </a>
                  </Button>
              </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">Questions Fréquentes</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    Trouvez ici les réponses aux questions les plus courantes sur l'investissement au Maroc.
                </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="font-headline text-3xl font-bold md:text-4xl">Restez à l'Avant-Garde du Marché</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    Abonnez-vous à notre newsletter mensuelle gratuite pour recevoir les dernières actualités du marché, des analyses et des offres exclusives.
                </p>
            </div>
            <form ref={formRef} action={formAction} className="flex w-full max-w-md items-center space-x-2 mx-auto">
              <Input name="email" type="email" placeholder="Votre meilleure adresse e-mail" className="flex-1 py-6" required />
              <SubmitButton />
            </form>
        </div>
      </section>
    </>
  );
}
