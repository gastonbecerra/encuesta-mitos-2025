"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type ScenariosData = { [key: string]: string };

interface ScenariosStepProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { scenarios: ScenariosData }) => void;
  initialData: ScenariosData;
}

const scenarios = [
  {
    id: 's1',
    title: 'Autonomous Vehicle Dilemma',
    description: 'An autonomous vehicle is in an unavoidable accident. It must choose between hitting a group of pedestrians or swerving and hitting a single passenger in another car.',
    options: [
      { id: 's1o1', label: 'The AI should minimize loss of life, even if it means sacrificing its own passenger.' },
      { id: 's1o2', label: 'The AI should prioritize the safety of its passenger above all else.' },
      { id: 's1o3', label: 'A human should always make the final decision in such scenarios via remote control.' },
    ],
  },
  {
    id: 's2',
    title: 'AI in Hiring',
    description: 'An AI is used to screen job applicants. It is more efficient but may perpetuate historical biases from its training data.',
    options: [
      { id: 's2o1', label: 'Use the AI for efficiency, but have human oversight to correct for bias.' },
      { id: 's2o2', label: 'Do not use the AI until it can be proven to be completely unbiased.' },
      { id: 's2o3', label: 'Use the AI without oversight; efficiency gains are worth the risk of some bias.' },
    ],
  },
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
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="space-y-4 rounded-lg border p-4 shadow-sm">
            <h3 className="font-semibold">{scenario.title}</h3>
            <p className="text-sm text-muted-foreground">{scenario.description}</p>
            <RadioGroup
              value={responses[scenario.id]}
              onValueChange={(value) => handleResponseChange(scenario.id, value)}
              className="space-y-2"
            >
              {scenario.options.map(option => (
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
