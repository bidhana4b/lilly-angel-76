
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea";
  placeholder?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
}

interface DataFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  submitLabel?: string;
  defaultValues?: Record<string, any>;
}

export function DataForm({
  fields,
  onSubmit,
  submitLabel = "Submit",
  defaultValues = {},
}: DataFormProps) {
  // Dynamically generate Zod schema based on fields
  const generateSchema = () => {
    const schemaObj: Record<string, any> = {};
    
    fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny = z.string();
      
      if (field.type === "number") {
        fieldSchema = z.coerce.number();
      } else if (field.type === "email") {
        fieldSchema = z.string().email();
      }
      
      if (field.validation?.required) {
        fieldSchema = fieldSchema.min(1, "This field is required");
      }
      
      if (field.type === "number" && field.validation?.min !== undefined) {
        fieldSchema = (fieldSchema as z.ZodNumber).min(field.validation.min);
      }
      
      if (field.type === "number" && field.validation?.max !== undefined) {
        fieldSchema = (fieldSchema as z.ZodNumber).max(field.validation.max);
      }
      
      if (field.validation?.pattern && field.type !== "number") {
        fieldSchema = (fieldSchema as z.ZodString).regex(field.validation.pattern);
      }
      
      schemaObj[field.name] = fieldSchema;
    });
    
    return z.object(schemaObj);
  };

  const form = useForm({
    resolver: zodResolver(generateSchema()),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
