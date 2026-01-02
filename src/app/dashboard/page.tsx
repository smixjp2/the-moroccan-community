
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Bookmark, Shield, User } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Données factices pour la prévisualisation
  const fakeUser = {
    displayName: 'Investisseur',
    email: 'exemple@email.com',
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline">Bienvenue, {fakeUser.displayName} !</h1>
            <p className="text-muted-foreground">Ceci est votre tableau de bord personnel.</p>
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
                    {/* Future functionality:
                    <Button variant="link" className="p-0 h-auto mt-2">Modifier le profil</Button> 
                    */}
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
                    <p className="text-sm text-muted-foreground mt-1">Vous recherchez un bon compromis entre la performance et le risque.</p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Bookmark className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Mes Articles Favoris</CardTitle>
                        <CardDescription>Vos analyses et articles sauvegardés.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center hover:bg-accent p-2 rounded-md">
                            <Link href="/articles/1" className="text-primary hover:underline">MASI 2025 : Analyse des perspectives post-budgétaires</Link>
                            <span className="text-xs text-muted-foreground">Analyse de Marché</span>
                        </li>
                         <li className="flex justify-between items-center hover:bg-accent p-2 rounded-md">
                            <Link href="/articles/3" className="text-primary hover:underline">Immobilier et BTP : Les valeurs à surveiller</Link>
                            <span className="text-xs text-muted-foreground">Analyse Sectorielle</span>
                        </li>
                    </ul>
                    <p className="text-center text-sm text-muted-foreground mt-4">La fonctionnalité de sauvegarde sera bientôt disponible.</p>
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
                     <ul className="space-y-3">
                        <li className="flex justify-between items-center hover:bg-accent p-2 rounded-md">
                            <Link href="/courses/formation-bourse-casablanca" className="text-primary hover:underline">De Zéro à Héros : La Formation Complète sur la Bourse de Casablanca</Link>
                            {/* Future functionality:
                            <Progress value={25} className="w-1/4" />
                            */}
                        </li>
                    </ul>
                    <p className="text-center text-sm text-muted-foreground mt-4">Le suivi de la progression sera bientôt disponible.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
