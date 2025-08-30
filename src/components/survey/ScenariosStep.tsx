"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import survey from '@/data/survey.json';

type ScenariosData = { [key: string]: string };

interface ScenariosStepProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { scenarios: ScenariosData }) => void;
  initialData: ScenariosData;
}

const { scenarios } = survey;

const scenarioOptions = [
    { id: 'ia', label: 'Prefiero IA' },
    { id: 'human', label: 'Prefiero humano' },
    { id: 'both', label: 'Prefiero ambos' },
];

export function ScenariosStep({ onNext, onBack, updateData, initialData }: ScenariosStepProps) {
  const [responses, setResponses] = useState<ScenariosData>(initialData);

  const handleResponseChange = (scenarioId: string, value: string) => {
    setResponses(prev => ({ ...prev, [scenarioId]: value }));
  };

  const handleNextClick = () => {
    updateData({ scenarios: responses });
    onNext();
  };
  
  const isComplete = Object.keys(responses).length === scenarios.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Evaluation</CardTitle>
        <CardDescription>
          For each scenario, please choose the course of action you most agree with.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {scenarios.map((scenario, index) => (
          <div key={scenario.id} className="space-y-4 rounded-lg border p-4 shadow-sm">
            <h3 className="font-semibold">Escenario {index + 1}</h3>
            <p className="text-sm text-muted-foreground">{scenario.text}</p>
            <RadioGroup
              value={responses[scenario.id]}
              onValueChange={(value) => handleResponseChange(scenario.id, value)}
              className="space-y-2"
            >
              {scenarioOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={`${scenario.id}-${option.id}`} />
                  <Label htmlFor={`${scenario.id}-${option.id}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNextClick} disabled={!isComplete}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
