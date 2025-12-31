'use client';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { loginWithEmail } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Se connecter
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginWithEmail, null);
  const { toast } = useToast();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // If the user is successfully logged in, redirect to the dashboard.
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    if (state?.status === 'error') {
      toast({
        title: 'Erreur de connexion',
        description: state.message,
        variant: 'destructive',
      });
    } else if (state?.status === 'success') {
      toast({
        title: 'Connexion réussie',
        description: 'Vous allez être redirigé...',
      });
      // The redirect is handled by the other useEffect when the `user` object becomes available.
    }
  }, [state, toast]);

  // While checking user state or if user is found (and about to be redirected), show a loader.
  if (isUserLoading || user) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>Accédez à votre compte pour suivre vos cours.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="votre@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
