import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const articles: Article[] = [
  {
    id: "1",
    title: "Analyse du MASI : Tendances du T3 et Perspectives",
    category: "Analyse de Marché",
    excerpt: "Une analyse approfondie de la performance de l'indice Moroccan All Shares au troisième trimestre et les prévisions à venir.",
    author: "Fatima Zahra",
    date: "2023-10-15",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-1')?.imageHint || ''
  },
  {
    id: "2",
    title: "Analyse du Secteur Bancaire : Quelle Action Bancaire Marocaine Acheter ?",
    category: "Analyse d'Actions",
    excerpt: "Nous comparons les principales banques cotées à la Bourse de Casablanca pour identifier les opportunités d'investissement les plus prometteuses.",
    author: "Youssef Alaoui",
    date: "2023-10-12",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-2')?.imageHint || ''
  },
  {
    id: "3",
    title: "L'Impact des Tendances Immobilières sur les Actions du BTP",
    category: "Analyse Sectorielle",
    excerpt: "Le marché immobilier marocain est en pleine évolution. Découvrez comment ces changements affectent la valorisation des grandes entreprises de construction.",
    author: "Amina Saadi",
    date: "2023-10-10",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-3')?.imageHint || ''
  },
];

export default function ArticlesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Aperçus et Analyses du Marché</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Restez informé grâce à nos analyses d'experts sur le marché boursier marocain, les actions individuelles et les secteurs clés.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link href="#" key={article.id} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    data-ai-hint={article.imageHint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                <h2 className="font-headline text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                <div className="text-xs text-muted-foreground">
                  Par {article.author} le {new Date(article.date).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
