"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Sparkles, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  articles: z.array(z.object({
      title: z.string(),
      content: z.string(),
      source: z.string(),
  })),
});

type FormValues = z.infer<typeof formSchema>;

export default function SummarizerForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      articles: [{ title: "", content: "", source: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "articles",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Articles de Presse</CardTitle>
          <CardDescription>Ajoutez un ou plusieurs articles à résumer.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8">
              <div className="space-y-6">
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Fonctionnalité en maintenance</AlertTitle>
                    <AlertDescription>
                        Le résumé par IA est temporairement désactivé pour maintenance. Merci de votre compréhension.
                    </AlertDescription>
                </Alert>
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <div className="space-y-4">
                      <Input
                        {...form.register(`articles.${index}.title`)}
                        placeholder="Titre de l'article"
                        disabled
                      />
                      <Textarea
                        {...form.register(`articles.${index}.content`)}
                        placeholder="Contenu de l'article"
                        disabled
                      />
                      <Input
                        {...form.register(`articles.${index}.source`)}
                        placeholder="Source (ex: Le Matin)"
                        disabled
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => remove(index)}
                        disabled
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </Card>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ title: "", content: "", source: "" })}
                  disabled
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un Article
                </Button>
                <Button type="submit" disabled>
                  Résumer
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-accent" />
            Résumé Généré
          </CardTitle>
          <CardDescription>Votre résumé concis prêt pour la newsletter apparaîtra ici.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px]">
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
             <p>Le résumé généré apparaîtra ici.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
