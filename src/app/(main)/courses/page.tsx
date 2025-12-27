import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart } from "lucide-react";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const courses: Course[] = [
  {
    id: "1",
    title: "Comment Investir Votre Premier Salaire",
    description: "Un guide pour débutants pour commencer votre parcours d'investissement au Maroc. Apprenez les bases des actions, des obligations et de la création d'un portefeuille équilibré.",
    level: "Débutant",
    duration: "4 Semaines",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-1')?.imageHint || '',
  },
  {
    id: "2",
    title: "Analyse et Évaluation Avancées des Actions",
    description: "Maîtrisez l'analyse fondamentale et technique pour évaluer les actions marocaines. Ce cours est destiné à ceux qui cherchent à approfondir leurs compétences analytiques.",
    level: "Avancé",
    duration: "8 Semaines",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-2')?.imageHint || '',
  },
];

export default function CoursesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Investissez avec Confiance</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Nos cours sont conçus pour vous doter des connaissances et des compétences nécessaires pour naviguer avec succès dans le paysage de l'investissement marocain.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                    <Image
                        src={course.imageUrl}
                        alt={course.title}
                        data-ai-hint={course.imageHint}
                        width={600}
                        height={400}
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-1">
                <CardTitle className="font-headline text-2xl mb-2">{course.title}</CardTitle>
                <CardDescription className="mb-4 flex-1">{course.description}</CardDescription>
                <div className="flex justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4" />
                        <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                    </div>
                </div>
                <Button asChild className="w-full font-bold">
                    <Link href="#">En Savoir Plus</Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
