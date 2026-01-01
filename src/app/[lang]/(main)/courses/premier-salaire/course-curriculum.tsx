
"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle, PiggyBank, Briefcase, BarChart, Rocket, Clock } from "lucide-react";

const modules = [
  {
    icon: PiggyBank,
    title: "MODULE 1 : Les Fondations de l'Épargne Intelligente",
    points: [
      "Pourquoi épargner : fixer des objectifs clairs (voyage, achat, retraite)",
      "La méthode 50/30/20 pour maîtriser votre budget sans stress",
      "Où va votre argent ? Créer un budget simple avec nos templates Excel",
      "Constituer son fonds d'urgence : votre bouclier financier",
    ],
  },
  {
    icon: Briefcase,
    title: "MODULE 2 : Ouvrir son Premier Compte d'Investissement au Maroc",
    points: [
      "Différence entre un compte bancaire et un compte-titres",
      "Le guide complet pour choisir sa société de bourse (courtier)",
      "Tutoriel pas à pas : ouvrir son compte-titres en ligne",
      "Comprendre les frais : commissions, droits de garde et fiscalité",
    ],
  },
  {
    icon: BarChart,
    title: "MODULE 3 : Les Bases de l'Investissement en Bourse",
    points: [
      "C'est quoi une action ? Devenir propriétaire d'une partie d'une entreprise",
      "C'est quoi une obligation ? Prêter de l'argent et recevoir des intérêts",
      "Les OPCVM : la solution simple pour diversifier avec un petit budget",
      "Le MASI : comprendre le pouls de la Bourse de Casablanca",
    ],
  },
  {
    icon: Rocket,
    title: "MODULE 4 : Passer à l'Action : Votre Premier Investissement",
    points:
    [
        "Stratégies pour investir avec 500, 1000 ou 2000 DH par mois",
        "Construire un portefeuille simple et diversifié avec 2 ou 3 lignes",
        "Cas pratique : acheter sa première action ou part d'OPCVM",
        "Les erreurs de débutant à éviter absolument",
    ],
  },
];


export function CourseCurriculum() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="font-bold text-lg w-full md:w-auto">
          Voir le Programme & le Prix
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline text-center">
            Programme du Guide Pratique
          </DialogTitle>
          <DialogDescription className="text-center">
            4 modules pour passer de votre premier salaire à votre premier investissement.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-4">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {modules.map((module, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <module.icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{module.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-8">
                    {module.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 items-center pt-4 border-t">
            <div className="text-center">
                 <p className="text-sm text-muted-foreground">Accès à vie à la formation et aux futures mises à jour</p>
                 <p className="text-4xl font-bold font-headline my-2 text-primary">Bientôt</p>
                 <p className="text-xs text-muted-foreground">Le lancement est imminent !</p>
            </div>
          <Button type="button" size="lg" disabled className="w-full mt-4">
            <Clock className="mr-2 h-4 w-4" /> Bientôt disponible
          </Button>
           <DialogClose asChild>
                <Button type="button" variant="ghost" className="text-xs text-muted-foreground">
                    Fermer
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
