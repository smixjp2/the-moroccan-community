'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          Envoyer le Message <Send className="ml-2" />
        </>
      )}
    </Button>
  );
}

export default function ContactPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitContactForm, {
    message: '',
    errors: {},
    status: '',
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Message envoyé !',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === 'error' && state.message && !state.errors) {
       toast({
        title: 'Erreur',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Contactez-nous</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Vous avez une question, une suggestion ou une proposition de partenariat ? Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
          </p>
        </div>

        <form ref={formRef} action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" name="name" type="text" placeholder="Votre nom complet" required />
            {state?.errors?.name && <p className="text-sm font-medium text-destructive mt-2">{state.errors.name[0]}</p>}
          </div>

          <div>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input id="email" name="email" type="email" placeholder="votre@email.com" required />
             {state?.errors?.email && <p className="text-sm font-medium text-destructive mt-2">{state.errors.email[0]}</p>}
          </div>

          <div>
            <Label htmlFor="subject">Sujet</Label>
            <Input id="subject" name="subject" type="text" placeholder="Sujet de votre message" required />
            {state?.errors?.subject && <p className="text-sm font-medium text-destructive mt-2">{state.errors.subject[0]}</p>}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Tapez votre message ici." required className="min-h-[150px]" />
            {state?.errors?.message && <p className="text-sm font-medium text-destructive mt-2">{state.errors.message[0]}</p>}
          </div>
          
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
