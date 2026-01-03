
'use client';

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
    {
        question: "Quel est le montant minimum pour commencer à investir en bourse au Maroc ?",
        answer: "Il n'y a pas de minimum légal ! Vous pouvez commencer avec quelques centaines de dirhams pour acheter vos premières actions. L'important est de commencer et d'être régulier."
    },
    {
        question: "Comment choisir un bon courtier (société de bourse) au Maroc ?",
        answer: "Le choix dépend de vos besoins. Les critères clés sont les frais de transaction, la qualité de la plateforme et le service client. Utilisez nos comparateurs pour vous aider."
    },
    {
        question: "La bourse marocaine est-elle risquée ?",
        answer: "Tout investissement en actions comporte un risque. Cependant, une bonne stratégie de diversification, que nous enseignons dans nos cours, est essentielle pour gérer ce risque."
    },
    {
        question: "Dois-je payer des impôts sur mes gains en bourse ?",
        answer: "Oui, les plus-values sur les actions sont imposées au Maroc. La fiscalité peut évoluer, il est donc conseillé de se tenir informé."
    },
    {
        question: "Qu'est-ce que le MASI ?",
        answer: "Le MASI (Moroccan All Shares Index) est l'indice principal de la Bourse de Casablanca. Il représente la performance globale du marché."
    }
]

export function FaqSection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">Questions Fréquentes</h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">
                        Trouvez ici les réponses aux questions les plus courantes sur l'investissement au Maroc.
                    </p>
                </div>
                <div className="mt-12 max-w-3xl mx-auto">
                    {isMounted && (
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </div>
            </div>
        </section>
    )
}
