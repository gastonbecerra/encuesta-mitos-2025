"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  age: z.coerce.number().min(13, { message: "Tenés que tener al menos 13 años." }).max(120),
  gender: z.string().min(1, { message: "Por favor, seleccioná un género." }),
  education: z.string().min(1, { message: "Por favor, seleccioná un nivel educativo." }),
  studyArea: z.string().min(1, { message: "Por favor, seleccioná un área de estudios." }),
  workArea: z.string().min(1, { message: "Por favor, seleccioná un área de desempeño laboral." }),
  country: z.string().min(1, { message: "Por favor, seleccioná un país." }),
  uso_ia_frecuencia: z.string().min(1, { message: "Por favor, seleccioná una frecuencia." }),
});

type DemographicsData = z.infer<typeof formSchema>;

interface DemographicsStepProps {
  onBack: () => void;
  onFinish: (data: DemographicsData) => void;
  initialData: Partial<DemographicsData>;
  isSubmitting?: boolean;
}

const studyAreas = [
    { value: "ciencias-sociales-humanidades", label: "Ciencias Sociales y Humanidades" },
    { value: "ciencias-economicas-administracion", label: "Ciencias Económicas y Administración" },
    { value: "ingenieria-tecnologia", label: "Ingeniería y Tecnología" },
    { value: "ciencias-salud", label: "Ciencias de la Salud / Psicología" },
    { value: "ciencias-exactas-naturales", label: "Ciencias Exactas y Naturales" },
    { value: "arte-diseno", label: "Arte y Diseño" },
    { value: "derecho-ciencias-juridicas", label: "Derecho y Ciencias Jurídicas" },
    { value: "ciencias-educacion", label: "Ciencias de la Educación" },
    { value: "comunicacion-periodismo", label: "Comunicación y Periodismo" },
    { value: "informatica-programacion", label: "Informática y Programación" },
    { value: "otra-no-aplica", label: "Otra / No aplica / No estudio" },
];

const workAreas = [
    { value: "tecnologia-informatica", label: "Tecnología e Informática" },
    { value: "salud-servicios-sociales", label: "Salud y Servicios Sociales" },
    { value: "educacion", label: "Educación" },
    { value: "comercio-ventas", label: "Comercio y Ventas" },
    { value: "administracion-finanzas", label: "Administración y Finanzas" },
    { value: "industria-manufactura", label: "Industria y Manufactura" },
    { value: "arte-cultura-diseno", label: "Arte, Cultura y Diseño" },
    { value: "consultoria-servicios-profesionales", label: "Consultoría y Servicios Profesionales" },
    { value: "gobierno-sector-publico", label: "Gobierno y Sector Público" },
    { value: "comunicacion-marketing", label: "Comunicación y Marketing" },
    { value: "otra-no-aplica", label: "Otra / No aplica / No trabajo" },
];

const countries = [
    { value: "Argentina", label: "Argentina" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Brasil", label: "Brasil" },
    { value: "Chile", label: "Chile" },
    { value: "Colombia", label: "Colombia" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Cuba", label: "Cuba" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "España", label: "España" },
    { value: "Estados Unidos", label: "Estados Unidos" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Honduras", label: "Honduras" },
    { value: "México", label: "México" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Panamá", label: "Panamá" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Perú", label: "Perú" },
    { value: "República Dominicana", label: "República Dominicana" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Otro", label: "Otro" },
];

const iaFrequencyOptions = [
    { value: "nunca", label: "Nunca" },
    { value: "esporadicamente", label: "Esporádicamente (≤1/mes)" },
    { value: "ocasional", label: "Ocasional (semanalmente)" },
    { value: "frecuente", label: "Frecuente (a diario)" },
]


export function DemographicsStep({ onBack, onFinish, initialData, isSubmitting = false }: DemographicsStepProps) {
  const form = useForm<DemographicsData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: initialData.age || undefined,
      gender: initialData.gender || "",
      education: initialData.education || "",
      studyArea: initialData.studyArea || "",
      workArea: initialData.workArea || "",
      country: initialData.country || "Argentina",
      uso_ia_frecuencia: initialData.uso_ia_frecuencia || "",
    },
  });

  function onSubmit(values: DemographicsData) {
    onFinish(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información demográfica</CardTitle>
        <CardDescription>Esta información nos ayuda a analizar los resultados de la encuesta. Será mantenida de forma anónima.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ej: 25"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná tu género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="non-binary">No binario</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefiero no decir</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel de educación más alto</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná tu nivel de educación" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high-school">Secundario</SelectItem>
                      <SelectItem value="bachelors">Universitario</SelectItem>
                      <SelectItem value="masters">Maestría</SelectItem>
                      <SelectItem value="doctorate">Doctorado (PhD, etc.)</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="uso_ia_frecuencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Con qué frecuencia utilizás herramientas de IA?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná una frecuencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {iaFrequencyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studyArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de estudios</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná tu área de estudios" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studyAreas.map(area => (
                        <SelectItem key={area.value} value={area.value}>{area.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de desempeño laboral</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná tu área de desempeño laboral" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workAreas.map(area => (
                        <SelectItem key={area.value} value={area.value}>{area.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País de residencia</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná tu país" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onBack} disabled={isSubmitting}>
              Volver
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Finalizar"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
