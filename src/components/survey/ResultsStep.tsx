"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultsStepProps {
  data: object;
  onRestart: () => void;
}

export function ResultsStep({ data, onRestart }: ResultsStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>¡Gracias por tu participación!</CardTitle>
        <CardDescription>
          Tus respuestas anónimas fueron guardadas. Aquí tenés un resumen de tu envío.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground overflow-x-auto">
          <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onRestart} className="mx-auto">
          Empezar de nuevo
        </Button>
      </CardFooter>
    </Card>
  );
}
