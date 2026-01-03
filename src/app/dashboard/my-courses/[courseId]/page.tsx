
'use client';

import { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, PlayCircle, FileText, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { courses as coursesData } from "@/lib/courses-data";
import { notFound } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Lesson, CourseResource } from '@/lib/types';

// This is a placeholder for the full curriculum structure
const courseCurriculum: Record<string, {
  title: string;
  modules: {
    title: string;
    lessons: Lesson[];
  }[];
  resources: CourseResource[];
}> = {
  "formation-bourse-casablanca": {
    title: "De Zéro à Héros : La Formation Complète sur la Bourse de Casablanca",
    modules: [
        {
            title: "MODULE 1 : Comprendre la Bourse",
            lessons: [
                { title: "Leçon 1.1: Histoire & rôle économique", duration: "12:34", videoUrl: "https://storage.googleapis.com/votre-projet-firebase.appspot.com/placeholder.mp4" }, // TODO: Remplacer par la vraie URL Firebase
                { title: "Leçon 1.2: Structure du marché marocain", duration: "15:02", videoUrl: "" },
                { title: "Leçon 1.3: Les acteurs clés", duration: "10:51", videoUrl: "" },
            ]
        },
        {
            title: "MODULE 2 : Comment fonctionne l'investissement",
            lessons: [
                { title: "Leçon 2.1: Les types de comptes", duration: "08:20", videoUrl: "" },
                { title: "Leçon 2.2: Frais & fiscalité", duration: "18:45", videoUrl: "" },
            ]
        }
    ],
    resources: [
        { title: "Template de suivi de portefeuille", fileUrl: "#" },
        { title: "Checklist d'analyse d'action", fileUrl: "#" },
    ]
  }
};


export default function CoursePlayerPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  
  const curriculum = courseCurriculum[courseId];

  const announcementVideoUrl = "https://drive.google.com/file/d/1gwYtICDrJTRVDc-pI4qxQ3HCZLut9EOs/preview";
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  if (!curriculum) {
    return notFound();
  }

  const videoSourceUrl = selectedLesson?.videoUrl || announcementVideoUrl;
  const isAnnouncement = !selectedLesson || !selectedLesson.videoUrl;


  return (
    <div className="flex h-[calc(100vh-4rem)] bg-muted/40">
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-6 flex flex-col gap-6">
            <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                 <iframe
                    src={videoSourceUrl}
                    title="Lecteur Vidéo du Cours"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </AspectRatio>
            <div className="flex-1">
                <Tabs defaultValue="description" className="w-full">
                    <TabsList>
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="resources">Ressources</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="p-4 border rounded-b-md rounded-tr-md bg-background">
                         <h1 className="text-2xl font-bold font-headline">{isAnnouncement ? "Annonce de la Formation" : selectedLesson?.title}</h1>
                         <p className="text-muted-foreground mt-2">
                             {isAnnouncement 
                                ? "Bienvenue ! Regardez cette vidéo d'introduction avant de commencer votre formation."
                                : "Ceci est une description de la leçon. Elle peut contenir des points clés, des résumés ou des instructions."
                             }
                        </p>
                    </TabsContent>
                    <TabsContent value="resources" className="p-4 border rounded-b-md rounded-tr-md bg-background">
                         <h2 className="text-xl font-semibold mb-4">Fichiers à Télécharger</h2>
                         <ul className="space-y-3">
                             {curriculum.resources.map((resource: CourseResource, index: number) => (
                                 <li key={index}>
                                     <Button variant="outline" asChild>
                                         <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                             <Download className="mr-2 h-4 w-4" />
                                             {resource.title}
                                         </a>
                                     </Button>
                                 </li>
                             ))}
                         </ul>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 border-l flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold font-headline truncate">{curriculum.title}</h2>
          <p className="text-sm text-muted-foreground">0/15 Leçons complétées</p>
        </div>
        <ScrollArea className="flex-1">
          <Accordion type="multiple" defaultValue={['module-0']} className="w-full">
            {curriculum.modules.map((module, moduleIndex) => (
              <AccordionItem value={`module-${moduleIndex}`} key={moduleIndex}>
                <AccordionTrigger className="px-4 text-left hover:no-underline bg-background">
                  <div className="flex-1">
                    <h3 className="font-semibold">{module.title}</h3>
                    <p className="text-xs text-muted-foreground">0/{module.lessons.length} | {module.lessons.reduce((acc, l) => acc + parseFloat(l.duration), 0).toFixed(2)} min</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ul className="space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex}>
                        <button
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full text-left flex items-start gap-3 p-4 text-sm transition-colors hover:bg-primary/10 ${selectedLesson?.title === lesson.title ? 'bg-primary/10' : ''}`}
                        >
                          <PlayCircle className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-500 opacity-20 flex-shrink-0" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </aside>
    </div>
  );
}
