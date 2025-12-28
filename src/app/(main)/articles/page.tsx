import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const articles: Article[] = [
  {
    id: "1",
    title: "MASI 2025 : Analyse des perspectives post-budgétaires et impact des taux",
    category: "Analyse de Marché",
    excerpt: "Une analyse approfondie de la trajectoire attendue de l'indice MASI en 2025, en tenant compte des nouvelles mesures budgétaires et de la politique monétaire de Bank Al-Maghrib.",
    date: "2025-01-20",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-1')?.imageHint || ''
  },
  {
    id: "2",
    title: "Secteur Bancaire Marocain 2025 : Marges, Digitalisation et Nouveaux Risques",
    category: "Analyse Sectorielle",
    excerpt: "Comparaison des grandes valeurs bancaires (Attijariwafa, BCP, BMCE) face aux défis de la digitalisation, à l'évolution des marges d'intérêt et aux nouvelles réglementations prudentielles.",
    date: "2025-01-18",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-2')?.imageHint || ''
  },
  {
    id: "3",
    title: "Immobilier et BTP : Les valeurs à surveiller après la relance du crédit",
    category: "Analyse Sectorielle",
    excerpt: "Le marché immobilier montre des signes de reprise. Découvrez quelles actions (Addoha, Alliances, TGCC) sont les mieux positionnées pour bénéficier de cette nouvelle dynamique.",
    date: "2025-01-15",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-3')?.imageHint || ''
  },
  {
    id: "4",
    title: "Énergies Renouvelables : Taqa Morocco et Nareva, qui mène la course en 2025 ?",
    category: "Analyse d'Actions",
    excerpt: "Analyse comparative des stratégies d'investissement, des rendements et des perspectives de croissance pour les leaders marocains de l'énergie verte dans un contexte de transition énergétique.",
    date: "2025-01-12",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-4')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-4')?.imageHint || ''
  },
  {
    id: "5",
    title: "Technologie : HPS et la dynamique des paiements digitaux en Afrique",
    category: "Analyse d'Actions",
    excerpt: "Focus sur HPS, sa position sur le marché africain des solutions de paiement et les catalyseurs potentiels pour son action en 2025, face à une concurrence accrue.",
    date: "2025-01-10",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-5')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-5')?.imageHint || ''
  },
  {
    id: "6",
    title: "Tourisme : Risma profite-t-elle pleinement du rebond post-pandémique ?",
    category: "Analyse Sectorielle",
    excerpt: "Évaluation de la performance des actifs hôteliers de Risma, de son taux d'occupation et de sa stratégie de gestion de la dette pour l'année 2025.",
    date: "2025-01-08",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-6')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-6')?.imageHint || ''
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
                  Publié le {new Date(article.date).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
