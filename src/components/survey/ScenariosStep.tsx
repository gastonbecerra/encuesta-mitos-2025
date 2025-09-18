"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import survey from '@/data/survey.json';

type ScenarioResponse = {
  answer: string;
  optionsCount: number;
};
type ScenariosData = { [key: string]: ScenarioResponse };

interface ScenariosStepProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { scenarios: ScenariosData }) => void;
  initialData: ScenariosData;
}

const { scenarios: allScenarios } = survey;

const baseScenarioOptions = [
    { id: 'ia', label: 'Confío más en una Inteligencia Artificial' },
    { id: 'human', label: 'Confío sólo en un humano' },
];

const allScenarioOptions = [
    ...baseScenarioOptions,
    { id: 'both', label: 'Confio en un humano usando/asistido por Inteligencia Artificial' },
];

export function ScenariosStep({ onNext, onBack, updateData, initialData }: ScenariosStepProps) {
  const [responses, setResponses] = useState<ScenariosData>(initialData);
  const [selectedScenarios, setSelectedScenarios] = useState<(typeof allScenarios[0])[]>([]);
  const [scenarioOptionCounts, setScenarioOptionCounts] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // This logic should only run once on component mount to select scenarios
    // and should not re-run, to avoid re-randomizing if a user goes back and forth.
    if (selectedScenarios.length > 0) return;

    const scenariosByBelief = allScenarios.reduce((acc, scenario) => {
      if (!acc[scenario.belief_id]) {
        acc[scenario.belief_id] = [];
      }
      acc[scenario.belief_id].push(scenario);
      return acc;
    }, {} as Record<string, typeof allScenarios>);

    const randomScenarios = Object.values(scenariosByBelief).map(group => {
      const randomIndex = Math.floor(Math.random() * group.length);
      return group[randomIndex];
    });
    
    setSelectedScenarios(randomScenarios);
    
    const optionCounts: {[key: string]: number} = {};
    randomScenarios.forEach(scenario => {
      optionCounts[scenario.id] = Math.random() < 0.5 ? 2 : 3;
    });
    setScenarioOptionCounts(optionCounts);

    const selectedIds = new Set(randomScenarios.map(s => s.id));
    const relevantInitialData: ScenariosData = {};
    for (const key in initialData) {
      if (selectedIds.has(key)) {
        relevantInitialData[key] = initialData[key];
      }
    }
    setResponses(relevantInitialData);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResponseChange = (scenarioId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [scenarioId]: {
        answer: value,
        optionsCount: scenarioOptionCounts[scenarioId]
      }
    }));
  };
  
  const getOptionsForScenario = (scenarioId: string) => {
      const count = scenarioOptionCounts[scenarioId];
      if (count === 2) {
          return baseScenarioOptions;
      }
      return allScenarioOptions;
  }

  const handleNextClick = () => {
    updateData({ scenarios: responses });
    onNext();
  };
  
  const isComplete = Object.keys(responses).length === selectedScenarios.length;
  
  const incompleteScenarioNumbers = selectedScenarios
    .map((scenario, index) => ({ id: scenario.id, number: index + 1 }))
    .filter(item => !responses.hasOwnProperty(item.id))
    .map(item => item.number);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluación de escenarios</CardTitle>
        <CardDescription>
          Para cada escenario, por favor elegí la opción con la que más estés de acuerdo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {selectedScenarios.map((scenario, index) => (
          <div key={scenario.id} className="space-y-4 rounded-lg border p-4 shadow-sm">
            <h3 className="font-semibold">{index + 1}. {scenario.text}</h3>
            <RadioGroup
              value={responses[scenario.id]?.answer}
              onValueChange={(value) => handleResponseChange(scenario.id, value)}
              className="space-y-2"
            >
              {getOptionsForScenario(scenario.id).map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={`${scenario.id}-${option.id}`} />
                  <Label htmlFor={`${scenario.id}-${option.id}`}>{option.label}</Label>
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
              Faltan completar los ítems: {incompleteScenarioNumbers.join(', ')}
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
