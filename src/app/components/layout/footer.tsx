
'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Instagram, Youtube, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="default" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : "S'abonner"}
    </Button>
  );
}

export function Footer() {
  const { toast } = useToast();
  const [state, setState] = useState({ message: '', status: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    const result = await subscribeToNewsletter(null, formData);
    setState(result);
  };

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Inscription réussie !',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === 'error' && state.message) {
      toast({
        title: "Erreur d'inscription",
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="The Moroccan Community Logo"
                width={200}
                height={40}
              />
            </Link>
            <p className="text-muted-foreground text-sm">
              Votre source de premier plan pour l'analyse du marché marocain et
              l'intelligence d'investissement.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.youtube.com/@The_Moroccan_Analyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="The Moroccan Analyst YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.youtube.com/@TheMoroccanCFO"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="The Moroccan CFO YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.instagram.com/the_moroccananalyst/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-headline font-semibold">
              Abonnez-vous à notre newsletter mensuelle
            </h3>
            <p className="text-muted-foreground text-sm">
              Recevez chaque mois des informations sur le marché, des offres
              promotionnelles et des mises à jour sur les nouveaux services.
            </p>
            <form
              ref={formRef}
              action={formAction}
              className="flex w-full max-w-md items-center space-x-2"
            >
              <Input
                name="email"
                type="email"
                placeholder="Entrez votre email"
                className="flex-1"
                required
              />
              <SubmitButton />
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} The Moroccan Community. Tous
            droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
