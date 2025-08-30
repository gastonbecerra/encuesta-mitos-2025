"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type BeliefsData = { [key: string]: string };

interface BeliefsStepProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { beliefs: BeliefsData }) => void;
  initialData: BeliefsData;
}

const beliefStatements = [
  { id: 'b1', text: 'AI should be developed with human well-being as the primary goal.' },
  { id: 'b2', text: 'It is acceptable for AI to make life-or-death decisions without human oversight.' },
  { id: 'b3', text: 'Governments should strictly regulate the development of advanced AI.' },
  { id: 'b4', text: 'AI-driven job displacement is a necessary consequence of technological progress.' },
  { id: 'b5', text: 'Personal data privacy is more important than the potential benefits of AI-driven services.' },
];

const likertOptions = [
  { id: 'sd', label: 'Strongly Disagree' },
  { id: 'd', label: 'Disagree' },
  { id: 'n', label: 'Neutral' },
  { id: 'a', label: 'Agree' },
  { id: 'sa', label: 'Strongly Agree' },
];

export function BeliefsStep({ onNext, onBack, updateData, initialData }: BeliefsStepProps) {
  const [responses, setResponses] = useState<BeliefsData>(initialData);

  const handleResponseChange = (statementId: string, value: string) => {
    setResponses(prev => ({ ...prev, [statementId]: value }));
  };

  const handleNextClick = () => {
    updateData({ beliefs: responses });
    onNext();
  };
  
  const isComplete = Object.keys(responses).length === beliefStatements.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Belief Assessment</CardTitle>
        <CardDescription>
          Please indicate your level of agreement with the following statements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {beliefStatements.map((statement) => (
          <div key={statement.id} className="space-y-4">
            <p className="font-medium">{statement.text}</p>
            <RadioGroup
              value={responses[statement.id]}
              onValueChange={(value) => handleResponseChange(statement.id, value)}
              className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-2 sm:space-y-0"
            >
              {likertOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={`${statement.id}-${option.id}`} />
                  <Label htmlFor={`${statement.id}-${option.id}`}>{option.label}</Label>
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
