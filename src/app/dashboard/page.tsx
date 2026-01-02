
'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/provider';
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline">Bienvenue, {user.displayName || 'Investisseur'} !</h1>
            <p className="text-muted-foreground">Ceci est votre tableau de bord personnel.</p>
        </div>

        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Mon Compte</CardTitle>
                    <CardDescription>Informations sur votre compte.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p><strong>Email:</strong> {user.email}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
