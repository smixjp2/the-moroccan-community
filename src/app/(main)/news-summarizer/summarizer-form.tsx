"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusCircle, Trash2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { summarizeInvestmentNews, type SummarizeInvestmentNewsOutput } from "@/ai/flows/investment-news-summarizer";


const articleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
  source: z.string().min(1, "La source est requise"),
});

const formSchema = z.object({
  articles: z.array(articleSchema).min(1, "Veuillez ajouter au moins un article."),
});

type FormValues = z.infer<typeof formSchema>;

export default function SummarizerForm() {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setError(null);
    setSummary(null);
    try {
      const result: SummarizeInvestmentNewsOutput = await summarizeInvestmentNews(values);
      setSummary(result.summary);
    } catch (e: any) {
      setError("Une erreur est survenue lors de la génération du résumé. Veuillez réessayer.");
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Articles de Presse</CardTitle>
          <CardDescription>Ajoutez un ou plusieurs articles à résumer.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`articles.${index}.source`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Source</FormLabel>
                            <FormControl>
                              <Input placeholder="ex: Le Matin" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`articles.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                              <Input placeholder="Titre de l'article" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`articles.${index}.content`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contenu</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Collez le contenu de l'article ici..." {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                  </Card>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Button type="button" variant="outline" onClick={() => append({ title: "", content: "", source: "" })} disabled={loading}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un Article
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Résumer'}
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
            Résumé Généré par IA
          </CardTitle>
          <CardDescription>Votre résumé concis prêt pour la newsletter apparaîtra ici.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {loading && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
          {error && <Alert variant="destructive"><AlertTitle>Erreur</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          {summary && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{summary}</p>
            </div>
          )}
          {!loading && !summary && !error && (
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
             <p>Le résumé généré apparaîtra ici.</p>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
