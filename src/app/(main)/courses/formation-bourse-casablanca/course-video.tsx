
'use client';

import { AspectRatio } from "@/components/ui/aspect-ratio";

// Helper function to convert Google Drive link to an embeddable format
function getEmbeddableUrl(googleDriveUrl: string): string | null {
  // Regex pour les deux formats d'URL Google Drive
  const regex1 = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view\?usp=sharing/;
  const regex2 = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view\?usp=drive_link/;
  const regex3 = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;


  let match = googleDriveUrl.match(regex1);
  if (!match) {
    match = googleDriveUrl.match(regex2);
  }
   if (!match) {
    match = googleDriveUrl.match(regex3);
  }

  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // Return null or a fallback URL if the format is not recognized
  return null; 
}


export function CourseVideo({ videoUrl }: { videoUrl: string }) {
    const embedUrl = getEmbeddableUrl(videoUrl);

    if (!embedUrl) {
        return (
            <div className="w-full bg-muted rounded-lg flex items-center justify-center p-8 aspect-[16/9]">
                <p className="text-destructive text-center">L'URL de la vidéo Google Drive est invalide ou n'est pas dans un format reconnu.</p>
            </div>
        )
    }
  
  return (
    <div className="w-full max-w-4xl mx-auto">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden shadow-lg">
            <iframe
                src={embedUrl}
                title="Course Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
            ></iframe>
        </AspectRatio>
    </div>
  );
}

    