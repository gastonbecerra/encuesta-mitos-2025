"use client";

import { useState } from "react";
import { submitSurvey } from "@/app/actions";
import { BeliefsStep } from "@/components/survey/BeliefsStep";
import { DemographicsStep } from "@/components/survey/DemographicsStep";
import { ProgressTracker } from "@/components/survey/ProgressTracker";
import { ResultsStep } from "@/components/survey/ResultsStep";
import { ScenariosStep } from "@/components/survey/ScenariosStep";
import { ConsentStep } from "@/components/survey/ConsentStep";
import { Toaster } from "@/components/ui/toaster";
import { ClipboardList, Gavel, User, CheckSquare, Smile } from "lucide-react";
import { AttitudesStep } from "@/components/survey/AttitudesStep";
import { useToast } from "@/hooks/use-toast";

const surveySteps = [
  { id: 1, name: "Consentimiento", icon: CheckSquare },
  { id: 2, name: "Actitudes", icon: Smile },
  { id: 3, name: "Creencias", icon: ClipboardList },
  { id: 4, name: "Escenarios", icon: Gavel },
  { id: 5, name: "Demografía", icon: User },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    startTime: new Date().toISOString(),
    attitudes: {},
    beliefs: {},
    scenarios: {},
    demographics: {},
    completionTimestamp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateSurveyData = (data: object) => {
    setSurveyData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, surveySteps.length + 1));
    window.scrollTo(0, 0);
  };
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };
  const handleRestart = () => {
    setSurveyData({
      startTime: new Date().toISOString(),
      attitudes: {},
      beliefs: {},
      scenarios: {},
      demographics: {},
      completionTimestamp: "",
    });
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  const handleFinish = async (demographicsData: object) => {
    setIsSubmitting(true);
    const finalData = {
      ...surveyData,
      demographics: demographicsData,
      completionTimestamp: new Date().toISOString(),
    };
    updateSurveyData(finalData);

    const result = await submitSurvey(finalData);

    if (result.success) {
      toast({
        title: "¡Encuesta enviada!",
        description: "Tus respuestas han sido guardadas. ¡Gracias!",
      });
      handleNext();
    } else {
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: "No se pudieron guardar tus respuestas. Por favor, intentá de nuevo.",
      });
    }
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ConsentStep onNext={handleNext} />;
      case 2:
        return <AttitudesStep updateData={updateSurveyData} onNext={handleNext} initialData={surveyData.attitudes} onBack={handleBack} />;
      case 3:
        return <BeliefsStep updateData={updateSurveyData} onNext={handleNext} initialData={surveyData.beliefs} onBack={handleBack} />;
      case 4:
        return <ScenariosStep updateData={updateSurveyData} onNext={handleNext} onBack={handleBack} initialData={surveyData.scenarios} />;
      case 5:
        return <DemographicsStep onBack={handleBack} initialData={surveyData.demographics} onFinish={handleFinish} isSubmitting={isSubmitting} />;
      case 6:
        return <ResultsStep data={surveyData} onRestart={handleRestart} />;
      default:
        return null;
    }
  };
  
  const activeStep = currentStep > 1 ? currentStep - 1 : currentStep;
  const displaySteps = surveySteps.filter(step => step.name !== 'Consentimiento');

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl space-y-8">
          <header className="text-center">
            <h1 className="text-3xl font-headline font-semibold text-primary">Encuesta de creencias y actitudes sobre la Inteligencia Artificial</h1>
          </header>

          {currentStep > 1 && currentStep <= displaySteps.length + 1 && (
            <ProgressTracker steps={displaySteps} currentStep={activeStep} />
          )}
          
          <main className="w-full animate-in fade-in-50 duration-500">
            {renderStepContent()}
          </main>
          <footer className="border-t border-border pt-8 mt-12 text-center text-muted-foreground">
            <div className="container mx-auto px-4 text-sm">
                <p className="font-semibold">Proyecto de Investigación: "Incorporación de la IA en el aula" (2023-2026)</p>
                <p>Licenciatura en Sociología <br/> Facultad de Psicología y Ciencias Sociales <br/> Universidad de Flores (Argentina)</p>
                <p>Contacto: gaston.becerra@uflouniversidad.edu.ar</p>
            </div>
          </footer>
        </div>
      </div>
      <Toaster />
    </>
  );
}
