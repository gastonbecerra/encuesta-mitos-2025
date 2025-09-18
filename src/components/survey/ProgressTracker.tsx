"use client";
import type { ElementType } from 'react';
import { cn } from "@/lib/utils";
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  icon: ElementType;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressTracker({ steps, currentStep }: ProgressTrackerProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-start">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          return (
            <div key={step.id} className="relative flex-1 flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 z-10",
                isCompleted ? "bg-primary border-primary" : "bg-background",
                isCurrent ? "border-primary" : "border-border"
              )}>
                {isCompleted ? (
                  <Check className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <step.icon className={cn(
                    "w-6 h-6 transition-colors duration-300",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )} />
                )}
              </div>
              <p className={cn(
                "mt-2 text-sm font-medium text-center",
                isCompleted || isCurrent ? "text-primary" : "text-muted-foreground"
              )}>
                {step.name}
              </p>
              {index < steps.length - 1 && (
                <div className={cn(
                  "absolute top-5 left-1/2 w-full h-0.5",
                  isCompleted ? "bg-primary" : "bg-border"
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
