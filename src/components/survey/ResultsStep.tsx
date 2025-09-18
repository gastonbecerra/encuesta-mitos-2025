"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";

interface ResultsStepProps {
  data: object;
  onRestart: () => void;
}

export function ResultsStep({ data, onRestart }: ResultsStepProps) {
  const { toast } = useToast();
  
  const handleShare = async () => {
    const shareData = {
      title: 'Resultados de la Encuesta IA',
      text: 'Completé la encuesta sobre creencias y actitudes hacia la IA. ¡Te invito a participar!',
      url: window.location.href,
    };
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "¡Enlace copiado!",
          description: "El enlace a la encuesta fue copiado a tu portapapeles.",
        })
      } catch (err) {
        console.error('Error al copiar enlace:', err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo copiar el enlace al portapapeles.",
        })
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>¡Gracias por tu participación!</CardTitle>
        <CardDescription>
          Tus respuestas anónimas fueron guardadas! 
        </CardDescription>
      </CardHeader>
      
      {/* <CardContent>
        <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground overflow-x-auto">
          <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
        </div>
      </CardContent> */}
      
      <CardFooter>
        <div className="mx-auto flex flex-col items-center gap-4">
            <Button onClick={onRestart}>
              Empezar de nuevo
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2" />
              Compartir encuesta
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
