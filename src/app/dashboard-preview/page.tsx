
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Bookmark, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPreviewPage() {
  const fakeUser = {
    displayName: 'Investisseur',
    email: 'exemple@email.com',
  };

  const enrolledCourses = [
    { id: 'formation-bourse-casablanca', title: 'De Zéro à Héros : La Formation Complète sur la Bourse de Casablanca', progress: 25 }
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline">Aperçu du Tableau de Bord</h1>
            <p className="text-muted-foreground">Ceci est un aperçu de ce à quoi ressemblera le tableau de bord personnel. Cliquez sur un cours pour voir la salle de classe.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <User className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Mon Compte</CardTitle>
                        <CardDescription>Informations sur votre compte.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p><strong>Email:</strong> {fakeUser.email}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Mon Profil d'Investisseur</CardTitle>
                        <CardDescription>Votre tolérance au risque et style.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold font-headline text-yellow-500">Équilibré</p>
                    <Button variant="link" className="p-0 h-auto" asChild>
                        <Link href="/tools/investor-profile-quiz">Refaire le quiz</Link>
                    </Button>
                </CardContent>
            </Card>

             <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center gap-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Mes Cours</CardTitle>
                        <CardDescription>Reprenez là où vous vous êtes arrêté.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {enrolledCourses.map(course => (
                            <li key={course.id}>
                                <Link href={`/dashboard/my-courses/${course.id}`} className="block p-4 rounded-lg hover:bg-accent">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{course.title}</p>
                                        <Button variant="secondary">Accéder au cours</Button>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
