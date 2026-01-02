
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères.');
        setIsLoading(false);
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      toast({
        title: 'Inscription réussie !',
        description: 'Bienvenue ! Vous allez être redirigé vers votre tableau de bord.',
      });
      router.push('/dashboard');
    } catch (error: any) {
        switch (error.code) {
            case 'auth/email-already-in-use':
              setError('Cette adresse e-mail est déjà utilisée.');
              break;
            case 'auth/invalid-email':
              setError('Adresse e-mail invalide.');
              break;
            case 'auth/weak-password':
              setError('Le mot de passe est trop faible.');
              break;
            default:
              setError('Une erreur est survenue lors de l\'inscription.');
              break;
      }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Créer un Compte</CardTitle>
          <CardDescription>Rejoignez la communauté et accédez à plus de fonctionnalités</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'S\'inscrire'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Connectez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
