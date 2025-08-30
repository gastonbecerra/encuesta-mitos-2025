"use client";

import { useState } from "react";

import { BeliefsStep } from "@/components/survey/BeliefsStep";
import { DemographicsStep } from "@/components/survey/DemographicsStep";
import { ProgressTracker } from "@/components/survey/ProgressTracker";
import { ResultsStep } from "@/components/survey/ResultsStep";
import { ScenariosStep } from "@/components/survey/ScenariosStep";
import { ConsentStep } from "@/components/survey/ConsentStep";
import { Toaster } from "@/components/ui/toaster";
import { ClipboardList, Gavel, User, Mail, Phone, Twitter, Linkedin, CheckSquare } from "lucide-react";

const surveySteps = [
  { id: 1, name: "Consent", icon: CheckSquare },
  { id: 2, name: "Beliefs", icon: ClipboardList },
  { id: 3, name: "Scenarios", icon: Gavel },
  { id: 4, name: "Demographics", icon: User },
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

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, surveySteps.length + 2));
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
        return <ConsentStep onNext={handleNext} />;
      case 2:
        return <BeliefsStep {...commonProps} initialData={surveyData.beliefs} onBack={handleBack} />;
      case 3:
        return <ScenariosStep {...commonProps} onBack={handleBack} initialData={surveyData.scenarios} />;
      case 4:
        return <DemographicsStep {...commonProps} onBack={handleBack} initialData={surveyData.demographics} />;
      case 5:
        return <ResultsStep data={surveyData} onRestart={handleRestart} />;
      default:
        return null;
    }
  };
  
  const activeStep = currentStep > 1 ? currentStep - 1 : currentStep;
  const displaySteps = surveySteps.filter(step => step.id !== 1);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-headline font-bold text-primary">Ethical Compass</h1>
            <p className="mt-2 text-muted-foreground">A survey on AI ethics and you</p>
          </header>

          {currentStep > 1 && currentStep <= displaySteps.length + 1 && (
            <ProgressTracker steps={displaySteps} currentStep={activeStep} />
          )}
          
          <main className="w-full animate-in fade-in-50 duration-500">
            {renderStepContent()}
          </main>
          <footer className="border-t border-border pt-8 mt-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ethical Compass</h3>
                  <p className="text-muted-foreground">Exploring the future of AI ethics, together.</p>
                </div>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Contacto</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>contact@ethicalcompass.com</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>+1 (555) 123-4567</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/3">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Síguenos</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-muted-foreground hover:text-primary"><Twitter /></a>
                    <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></a>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Ethical Compass. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <Toaster />
    </>
  );
}
