

'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { BookOpen, BarChart, Target, Gift } from "lucide-react";
import { CourseCurriculum } from "./course-curriculum";

const courseId = "formation-bourse-casablanca";
const courseImage = PlaceHolderImages.find(p => p.id === 'course-casablanca-bourse');

const highlights = [
  { icon: BookOpen, text: "+12 heures de vidéo à la demande" },
  { icon: BarChart, text: "+20 études de cas 100% marocaines" },
  { icon: Target, text: "Fichiers Excel et templates fournis" },
  { icon: Gift, text: "Accès à un groupe privé et des lives mensuels" },
];


export default function FormationBourseCasablancaPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-card text-card-foreground py-16 md:py-24">
         <div className="absolute inset-0 bg-black/20" />
         {courseImage && (
             <Image
                src={courseImage.imageUrl}
                alt="Formation Bourse de Casablanca"
                data-ai-hint={courseImage.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
         )}
        <div className="container relative z-10 text-center">
          <Badge variant="secondary">Formation Vidéo Complète</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mt-4 max-w-4xl mx-auto">
            De Zéro à Héros : La Formation Complète sur la Bourse de Casablanca
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Maîtrisez l'investissement à la Bourse de Casablanca, même en partant de zéro. Une méthode pas à pas avec des cas pratiques 100% marocains.
          </p>
          <div className="mt-8">
            <CourseCurriculum />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="h-10 w-10 text-primary mb-3" />
                <p className="font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
       {/* CTA Final */}
       <section className="py-20 text-center bg-card">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Prêt à Devenir un Expert de la Bourse Marocaine ?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Rejoignez des centaines d'investisseurs et prenez en main votre avenir financier. L'inscription vous donne un accès à vie.
          </p>
          <div className="mt-8">
             <CourseCurriculum />
          </div>
        </div>
      </section>
    </div>
  );
}
