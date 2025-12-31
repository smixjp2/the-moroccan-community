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

  const { name, email, subject, message } = validatedFields.data;

  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error("Brevo API key is missing. Cannot send contact email.");
    return {
        message: "Le service de messagerie n'est pas configuré. Veuillez réessayer plus tard.",
        status: 'error',
    };
  }

  const emailPayload = {
    sender: {
        name: name,
        email: "contact@themoroccan.community" // Adresse d'expéditeur validée dans Brevo
    },
    to: [{
        email: "themoroccananalyst@gmail.com",
        name: "The Moroccan Community"
    }],
    replyTo: {
        email: email,
        name: name
    },
    subject: `[Contact Form] ${subject}`,
    htmlContent: `
        <html>
            <body>
                <h1>Nouveau message depuis le formulaire de contact</h1>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Sujet:</strong> ${subject}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            </body>
        </html>
    `
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(emailPayload),
    });

    if (response.ok) {
        return {
            message: "Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.",
            status: 'success',
        };
    } else {
        const errorData = await response.json();
        console.error("Brevo API Error:", errorData);
        return {
            message: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
            status: 'error',
        };
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
        message: "Une erreur interne est survenue. Veuillez réessayer plus tard.",
        status: 'error',
    };
  }
}
