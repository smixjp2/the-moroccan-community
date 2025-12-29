"use server";

import { z } from "zod";

const emailSchema = z.string().email({ message: "Adresse e-mail invalide." });

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  const validatedEmail = emailSchema.safeParse(email);

  if (!validatedEmail.success) {
    return {
      message: validatedEmail.error.errors[0].message,
      status: "error",
    };
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

  if (!BREVO_API_KEY || !BREVO_LIST_ID) {
    return {
      message: "Configuration du service de newsletter manquante.",
      status: "error",
    };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: validatedEmail.data,
        listIds: [Number(BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    });

    if (response.status === 201 || response.status === 204) {
      return {
        message: "Merci pour votre inscription !",
        status: "success",
      };
    }

    const errorData = await response.json();
    console.error("Brevo API Error:", errorData);

    return {
      message: errorData.message || "Une erreur est survenue.",
      status: "error",
    };
  } catch (error) {
    console.error("Subscription Error:", error);
    return {
      message: "Une erreur interne est survenue. Veuillez réessayer plus tard.",
      status: "error",
    };
  }
}
