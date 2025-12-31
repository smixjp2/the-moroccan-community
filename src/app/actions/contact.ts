'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
  email: z.string().email({ message: 'Adresse e-mail invalide.' }),
  subject: z.string().min(5, { message: 'Le sujet doit contenir au moins 5 caractères.' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Veuillez corriger les erreurs dans le formulaire.',
      status: 'error',
    };
  }

  // --- Simulation d'envoi ---
  // L'intégration Brevo a été retirée à la demande de l'utilisateur.
  // Aucun e-mail ne sera envoyé. Nous retournons un message de succès simulé.
  console.log("Formulaire de contact soumis (simulation) :");
  console.log(validatedFields.data);

  // Simuler une petite latence réseau
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.",
    status: 'success',
  };
}
