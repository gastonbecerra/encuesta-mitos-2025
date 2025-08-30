"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultsStepProps {
  data: object;
  onRestart: () => void;
}

export function ResultsStep({ data, onRestart }: ResultsStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thank you for your participation!</CardTitle>
        <CardDescription>
          Your anonymous responses have been recorded. Here is a summary of your submission.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground overflow-x-auto">
          <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onRestart} className="mx-auto">
          Start Over
        </Button>
      </CardFooter>
    </Card>
  );
}
