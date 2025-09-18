"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import survey from '@/data/survey.json';

type BeliefsData = { [key: string]: number };

interface BeliefsStepProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { beliefs: BeliefsData }) => void;
  initialData: BeliefsData;
}

const { beliefs: beliefStatements } = survey;

const likertOptions = [
  { id: 1, label: 'Totalmente en desacuerdo' },
  { id: 2, label: 'En desacuerdo' },
  { id: 3, label: 'Ni en acuerdo ni desacuerdo' },
  { id: 4, label: 'De acuerdo' },
  { id: 5, label: 'Totalmente de acuerdo' },
];

export function BeliefsStep({ onNext, onBack, updateData, initialData }: BeliefsStepProps) {
  const [responses, setResponses] = useState<BeliefsData>(initialData);
  const [shuffledStatements, setShuffledStatements] = useState<(typeof beliefStatements)>([]);

  useEffect(() => {
    // Shuffle only on initial component mount to maintain order for the user
    // if they navigate away and back.
    if (shuffledStatements.length === 0) {
      const shuffled = [...beliefStatements].sort(() => Math.random() - 0.5);
      setShuffledStatements(shuffled);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResponseChange = (statementId: string, value: string) => {
    setResponses(prev => ({ ...prev, [statementId]: parseInt(value, 10) }));
  };

  const handleNextClick = () => {
    updateData({ beliefs: responses });
    onNext();
  };

  const isComplete = Object.keys(responses).length === beliefStatements.length;
  
  const incompleteStatementNumbers = shuffledStatements
    .map((statement, index) => ({ id: statement.id, number: index + 1 }))
    .filter(item => !responses.hasOwnProperty(item.id))
    .map(item => item.number);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluación de creencias</CardTitle>
        <CardDescription>
          Por favor, indicá tu nivel de acuerdo con las siguientes afirmaciones.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {shuffledStatements.map((statement, index) => (
          <div key={statement.id} className="space-y-4">
            <p className="font-medium"><strong>{`${index + 1}. ${statement.text}`}</strong></p>
            <RadioGroup
              value={responses[statement.id]?.toString()}
              onValueChange={(value) => handleResponseChange(statement.id, value)}
              className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-2 sm:space-y-0"
            >
              {likertOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id.toString()} id={`${statement.id}-${option.id}`} />
                  <Label htmlFor={`${statement.id}-${option.id}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button variant="outline" onClick={onBack}>
          Volver
        </Button>
        <div className="flex flex-col items-end gap-2">
           {!isComplete && (
            <p className="text-xs text-muted-foreground text-right">
              Faltan completar los ítems: {incompleteStatementNumbers.join(', ')}
            </p>
          )}
          <Button onClick={handleNextClick} disabled={!isComplete}>
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
