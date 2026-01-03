
'use client';

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Lock } from "lucide-react";

export function CourseVideo({ videoUrl }: { videoUrl: string }) {
  
  if (!videoUrl) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center">
          <Lock className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-lg font-semibold text-muted-foreground">Contenu Protégé</p>
          <p className="text-sm text-muted-foreground">Inscrivez-vous pour accéder à la vidéo.</p>
        </AspectRatio>
      </div>
    );
  }

  // Simple check for Google Drive link to embed it correctly
  const isGoogleDrive = videoUrl.includes('drive.google.com');
  const embedUrl = isGoogleDrive ? videoUrl.replace("/view", "/preview") : videoUrl;


  return (
    <div className="w-full max-w-4xl mx-auto">
      <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={embedUrl}
          title="Lecteur Vidéo du Cours"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </AspectRatio>
    </div>
  );
}
