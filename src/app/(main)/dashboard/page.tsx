'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Course } from '@/lib/types';


const allCourses: Course[] = [
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
];


function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Link href={course.href}>
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={600}
            height={400}
            className="object-cover w-full aspect-video"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-headline mb-2">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
        <Button asChild className="mt-4 w-full md:w-auto">
          <Link href={course.href}>Commencer la formation <ArrowRight className="ml-2" /></Link>
        </Button>
      </CardContent>
    </Card>
  );
}


export default function DashboardPage() {
  // We assume the user has access to all courses for now.
  const userCourses = allCourses;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold font-headline">Bienvenue sur votre Tableau de Bord</h1>
      <p className="text-muted-foreground mt-2">Prêt à commencer votre apprentissage ? Voici vos formations.</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold font-headline mb-4">Mes Formations</h2>
        {userCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        ) : (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold font-headline">Vous n'êtes inscrit à aucune formation</h3>
                <p className="text-muted-foreground mt-2">Explorez notre catalogue pour trouver la formation qui vous convient.</p>
                <Button asChild className="mt-6">
                    <Link href="/courses">Voir toutes les formations</Link>
                </Button>
            </Card>
        )}
      </div>
    </div>
  );
}
