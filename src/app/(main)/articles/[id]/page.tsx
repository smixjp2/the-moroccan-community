import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find((article) => article.id === params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/articles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux articles
            </Link>
        </Button>
        
        <div className="space-y-4">
            <Badge variant="secondary">{article.category}</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{article.title}</h1>
            <p className="text-muted-foreground">Publié le {new Date(article.date).toLocaleDateString('fr-FR')}</p>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden my-8">
            <Image
                src={article.imageUrl}
                alt={article.title}
                data-ai-hint={article.imageHint}
                fill
                className="object-cover"
                priority
            />
        </div>

        <div 
            className="prose prose-lg dark:prose-invert max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
