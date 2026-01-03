
'use client';

import { useRef } from 'react';
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

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  // La logique de soumission est temporairement désactivée pour la stabilité.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Soumission du formulaire désactivée pour le moment.");
    // Vous pouvez ajouter un toast ici pour informer l'utilisateur.
  };

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

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom complet"
              required
            />
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
          </div>

          <div>
            <Label htmlFor="subject">Sujet</Label>
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
          </div>

          <Button type="submit" size="lg" className="w-full">
            Envoyer le Message <Send className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
