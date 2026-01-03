
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, Clock, ShoppingCart } from "lucide-react";
import type { Resource } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const resources: Resource[] = [
    {
    id: "6",
    title: "Calculateur de Frais (Wafabourse) & Suivi de Portefeuille",
    description: "Un modèle Excel pour calculer les frais de transaction de Wafabourse, l'impôt sur la plus-value, et suivre la performance de votre portefeuille d'actions.",
    price: "100 DH",
    href: "#",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-financial-model')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-financial-model')?.imageHint || '',
  },
  {
    id: "5",
    title: "كيفية فتح حساب (Compte-Titres) في بورصة الدار البيضاء",
    description: "دليل PDF خطوة بخطوة لفتح حساب الأوراق المالية الخاص بك في المغرب والبدء في الاستثمار.",
    price: "Gratuit",
    href: "https://docs.google.com/uc?export=download&id=1uD9iE1Zq9g-A9kprb5c-L4oX5v7n8mYv",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-guide-account-ar')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-guide-account-ar')?.imageHint || '',
  },
  {
    id: "4",
    title: "Guide : Créer un Compte-Titre à la Bourse de Casablanca",
    description: "Un guide PDF étape par étape pour ouvrir votre compte-titre auprès d'une société de bourse marocaine et commencer à investir.",
    price: "Gratuit",
    href: "https://docs.google.com/uc?export=download&id=1bL4Yam2LfuJISP0_ExyigJyLpeeLhw7s",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-guide-account')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-guide-account')?.imageHint || '',
  },
  {
    id: "3",
    title: "Simulateur d'Intérêts Composés (Excel)",
    description: "Un fichier Excel gratuit pour simuler la croissance de votre épargne sur le long terme grâce à la magie des intérêts composés. Essentiel pour planifier votre retraite.",
    price: "Gratuit",
    href: "https://docs.google.com/spreadsheets/d/10hXt59mH8YaJixCOHUZaGyYCKszxtc_Q/export?format=xlsx",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-3')?.imageHint || '',
  },
  {
    id: "1",
    title: "Simulateur de Frais de Courtage et Commissions",
    description: "Un simulateur Excel avancé pour calculer les coûts d'entrée et de sortie pour chaque courtier bancaire marocain. Planifiez vos transactions avec précision.",
    price: "Bientôt",
    href: "#",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-1')?.imageHint || '',
  },
  {
    id: "2",
    title: "La Liste Comparative Ultime des Courtiers",
    description: "Un PDF complet comparant tous les courtiers bancaires marocains sur les commissions, les frais, les taxes et les fonctionnalités de la plateforme. Faites un choix éclairé.",
    price: "Bientôt",
    href: "#",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-2')?.imageHint || '',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Outils et Ressources Numériques</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Accélérez votre analyse et votre prise de décision avec nos produits numériques téléchargeables, gratuits et payants.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
             <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                      src={resource.imageUrl}
                      alt={resource.title}
                      data-ai-hint={resource.imageHint}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-1">
              <CardTitle className="font-headline text-2xl mb-2" dir={resource.id === '5' ? 'rtl' : 'ltr'}>{resource.title}</CardTitle>
              <CardDescription className="mb-4 flex-1" dir={resource.id === '5' ? 'rtl' : 'ltr'}>{resource.description}</CardDescription>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold font-headline text-primary">{resource.price}</span>
                <Button asChild className="font-bold" disabled={resource.price !== 'Gratuit'}>
                  <Link href={resource.href} target={resource.price === 'Gratuit' ? '_blank' : '_self'} rel="noopener noreferrer">
                    {resource.price === 'Gratuit' && <><Download className="mr-2 h-4 w-4" /> Télécharger</>}
                    {resource.price === 'Bientôt' && <><Clock className="mr-2 h-4 w-4" /> Bientôt</>}
                    {resource.price.endsWith('DH') && <><ShoppingCart className="mr-2 h-4 w-4" /> Acheter</>}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
