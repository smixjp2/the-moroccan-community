
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Bookmark, Shield, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const user = {
      displayName: 'Investisseur',
      email: 'exemple@email.com'
  }

  // NOTE: La logique de redirection a été temporairement retirée
  // pour faciliter la prévisualisation du design.
  //   const { user, isUserLoading } = useUser();
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (!isUserLoading && !user) {
  //       router.push('/login');
  //     }
  //   }, [user, isUserLoading, router]);

  //   if (isUserLoading || !user) {
  //     return (
  //       <div className="flex items-center justify-center min-h-screen">
  //         <p>Chargement...</p>
  //       </div>
  //     );
  //   }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline">Bienvenue, {user.displayName || 'Utilisateur'} !</h1>
            <p className="text-muted-foreground">Ceci est votre tableau de bord personnel.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <UserIcon className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Mon Compte</CardTitle>
                        <CardDescription>Informations sur votre compte.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p><strong>Email:</strong> {user.email}</p>
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
                    {/* This would be dynamic based on user's quiz results */}
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
                    {/* This would be populated from user's saved items in Firestore */}
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
                    {/* This would be populated from user's enrolled courses */}
                    <p className="text-center text-sm text-muted-foreground mt-4">Le suivi de la progression sera bientôt disponible.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
