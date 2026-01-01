
'use client';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, Star } from "lucide-react";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Skeleton } from "@/components/ui/skeleton";

const staticCourses: Course[] = [
  {
    id: "formation-bourse-casablanca",
    title: "De Zéro à Héros : La Formation Complète sur la Bourse de Casablanca",
    description: "Une formation exhaustive de +12 heures avec des cas pratiques 100% marocains pour maîtriser la Bourse de Casablanca, de l'analyse fondamentale à la construction de portefeuille.",
    level: "Tous Niveaux",
    duration: "12-15 Heures",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-casablanca-bourse')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-casablanca-bourse')?.imageHint || '',
    href: "/courses/formation-bourse-casablanca",
    isNew: true,
  },
  {
    id: "formation-excel-power-bi",
    title: "Excel & Power BI pour la Finance : de Débutant à Avancé",
    description: "Maîtrisez Excel, Power Query et Power BI pour l'analyse de données financières. Une compétence très demandée, incluant un coaching carrière.",
    level: "Tous Niveaux",
    duration: "16 Heures",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-excel-power-bi')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-excel-power-bi')?.imageHint || '',
    href: "/courses/formation-excel-power-bi",
    isNew: true,
  },
  {
    id: "premier-salaire",
    title: "Comment Investir Votre Premier Salaire",
    description: "Un guide pour débutants pour commencer votre parcours d'investissement au Maroc. Apprenez les bases des actions, des obligations et de la création d'un portefeuille équilibré.",
    level: "Débutant",
    duration: "4 Semaines",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-1')?.imageHint || '',
    href: "/courses/premier-salaire",
    isNew: false,
  },
];


function CourseCard({ course, isEnrolled }: { course: Course, isEnrolled: boolean }) {
    return (
        <Card className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
            {course.isNew && (
                <Badge className="absolute top-4 right-4 flex items-center gap-1 z-10 bg-yellow-400 text-yellow-900">
                    <Star className="h-4 w-4" /> NOUVEAU
                </Badge>
            )}
            <CardHeader className="p-0">
                {course.imageUrl && <Link href={course.href} className="block aspect-video overflow-hidden group">
                    <Image
                        src={course.imageUrl}
                        alt={course.title}
                        data-ai-hint={course.imageHint}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>}
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
                <Button asChild className="w-full font-bold mt-auto">
                    <Link href={course.href}>En Savoir Plus</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

function CourseSkeleton() {
    return (
        <Card className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
                <Skeleton className="aspect-video w-full" />
            </CardHeader>
             <CardContent className="p-6 flex flex-col flex-1">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    )
}

export default function CoursesPage() {

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Investissez avec Confiance</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Nos cours sont conçus pour vous doter des connaissances et des compétences nécessaires pour naviguer avec succès dans le paysage de l'investissement marocain.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {staticCourses.map((course) => (
            <CourseCard 
                key={course.id} 
                course={course}
                isEnrolled={false}
            />
        ))}
      </div>
    </div>
  );
}

    
