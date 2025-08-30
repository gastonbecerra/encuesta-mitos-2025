"use client";

import { useState } from "react";

import { BeliefsStep } from "@/components/survey/BeliefsStep";
import { DemographicsStep } from "@/components/survey/DemographicsStep";
import { ProgressTracker } from "@/components/survey/ProgressTracker";
import { ResultsStep } from "@/components/survey/ResultsStep";
import { ScenariosStep } from "@/components/survey/ScenariosStep";
import { Toaster } from "@/components/ui/toaster";
import { ClipboardList, Gavel, User } from "lucide-react";

const surveySteps = [
  { id: 1, name: "Beliefs", icon: ClipboardList },
  { id: 2, name: "Scenarios", icon: Gavel },
  { id: 3, name: "Demographics", icon: User },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    beliefs: {},
    scenarios: {},
    demographics: {},
  });

  const updateSurveyData = (data: object) => {
    setSurveyData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, surveySteps.length + 1));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleRestart = () => {
    setSurveyData({ beliefs: {}, scenarios: {}, demographics: {} });
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    const commonProps = {
      updateData: updateSurveyData,
      onNext: handleNext,
    };
    switch (currentStep) {
      case 1:
        return <BeliefsStep {...commonProps} initialData={surveyData.beliefs} />;
      case 2:
        return <ScenariosStep {...commonProps} onBack={handleBack} initialData={surveyData.scenarios} />;
      case 3:
        return <DemographicsStep {...commonProps} onBack={handleBack} initialData={surveyData.demographics} />;
      case 4:
        return <ResultsStep data={surveyData} onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-headline font-bold text-primary">Ethical Compass</h1>
            <p className="mt-2 text-muted-foreground">A survey on AI ethics and you</p>
          </header>

          {currentStep <= surveySteps.length && (
            <ProgressTracker steps={surveySteps} currentStep={currentStep} />
          )}
          
          <main className="w-full animate-in fade-in-50 duration-500">
            {renderStepContent()}
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}
