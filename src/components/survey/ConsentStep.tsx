"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ConsentStepProps {
  onNext: () => void;
}

export function ConsentStep({ onNext }: ConsentStepProps) {
  const [isConsented, setIsConsented] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>¡Bienvenido/a!</CardTitle>
        <CardDescription>
          <p className="text-sm text-muted-foreground">
            Somos un equipo de investigadores de la Licenciatura en Sociología de la Universidad de Flores (Argentina). 
            Estamos estudiando las creencias y actitudes acerca de la inteligencia artificial.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <h3 className="font-semibold">Participantes</h3>
            <p className="text-sm text-muted-foreground">
              Esta encuesta está destinada a personas:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4 text-sm text-muted-foreground">
              <li>mayores de 18 años</li>
              <li>que usaron herramientas de IA en los últimos 12 meses</li>
            </ul>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold">Anonimato de los datos</h3>
            <p className="text-sm text-muted-foreground">
              Todas tus respuestas serán registradas de forma anónima. No recopilaremos ninguna información de identificación personal. Los datos agregados y anonimizados podrán ser utilizados en publicaciones e informes de investigación. Tu participación es voluntaria.
            </p>
            <p className="text-sm text-muted-foreground">
              ⏱️ Completar esta encuesta te llevará cerca de 4 minutos.
            </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="consent" checked={isConsented} onCheckedChange={(checked) => setIsConsented(checked as boolean)} />
          <Label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Leí y entiendo la información anterior, y doy mi consentimiento para participar en este estudio.
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext} disabled={!isConsented} className="ml-auto">
          Continuar
        </Button>
      </CardFooter>
    </Card>
  );
}
