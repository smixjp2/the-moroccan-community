
'use client';

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Video } from "lucide-react";

export function CourseVideo({ videoUrl }: { videoUrl: string }) {
  // Le lecteur vidéo est temporairement remplacé par un placeholder.
  return (
    <div className="w-full max-w-4xl mx-auto">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center">
        <Video className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-lg font-semibold text-muted-foreground">Vidéo de formation</p>
        <p className="text-sm text-muted-foreground">Le contenu sera bientôt disponible ici.</p>
      </AspectRatio>
    </div>
  );
}
