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
        <CardTitle>Welcome to the Ethical Compass Study</CardTitle>
        <CardDescription>
          Thank you for your interest in our study on artificial intelligence ethics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <h3 className="font-semibold">Objectives of the Study</h3>
            <p className="text-sm text-muted-foreground">
                This survey aims to gather diverse perspectives on the ethical challenges posed by AI. Your responses will help us understand public opinion and contribute to the development of more responsible AI systems.
            </p>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold">Data Anonymity</h3>
            <p className="text-sm text-muted-foreground">
                All your responses will be recorded anonymously. We will not collect any personally identifiable information. The aggregated, anonymized data may be used in research publications and reports.
            </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="consent" checked={isConsented} onCheckedChange={(checked) => setIsConsented(checked as boolean)} />
          <Label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I have read and understood the information above, and I consent to participate in this study.
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext} disabled={!isConsented} className="ml-auto">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
