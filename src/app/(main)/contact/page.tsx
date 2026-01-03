
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitContactForm } from '@/app/actions/contact';
import { useToast } from '@/hooks/use-toast';
import type { FormState } from '@/lib/types';

const initialState: FormState = {
  message: '',
  status: '',
};

export default function ContactPage() {
  const { toast } = useToast();
  const [state, setState] = useState<FormState>(initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formAction = async (formData: FormData) => {
    const result = await submitContactForm(state, formData);
    setState(result);
  }

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Message Envoyé !',
        description: state.message,
      });
      formRef.current?.reset();
      setState(initialState);
    } else if (state.status === 'error' && state.message && !state.errors) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: state.message,
      });
      setState(initialState);
    }
  }, [state, toast]);

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            Contactez-nous
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Vous avez une question, une suggestion ou une proposition de
            partenariat ? Remplissez le formulaire ci-dessous et nous vous
            répondrons rapidement.
          </p>
        </div>

        <form ref={formRef} action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom complet"
              required
            />
            {state.errors?.name && (
              <p className="text-sm font-medium text-destructive mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              required
            />
            {state.errors?.email && (
              <p className="text-sm font-medium text-destructive mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="subject">Sujet</Label>
            {isMounted && (
              <Select name="subject" required>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Choisissez le sujet de votre message" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="question">Question générale</SelectItem>
                  <SelectItem value="partenariat">Partenariat</SelectItem>
                  <SelectItem value="support">Support technique</SelectItem>
                  <SelectItem value="presse">Presse</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            )}
            {state.errors?.subject && (
              <p className="text-sm font-medium text-destructive mt-1">
                {state.errors.subject[0]}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tapez votre message ici."
              required
              className="min-h-[150px]"
            />
            {state.errors?.message && (
              <p className="text-sm font-medium text-destructive mt-1">
                {state.errors.message[0]}
              </p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Envoyer le Message <Send className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
