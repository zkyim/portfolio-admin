"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import axios from "axios"
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { Editor } from "@/components/editor"
import { WrapperForm } from "@/components/WrapperForm"
import { useTranslation } from "react-i18next"

interface DescriptionFormProps {
  id: string;
  value: string | null;
  label: string;
}

const DescriptionForm = ({
  id,
  value,
  label,
}: DescriptionFormProps) => {
  const { t } = useTranslation();
  const formSchema = z.object({
    description: z.string().min(1, {message: t("Required")}).max(1500, {message: t("less than", {var: 1500})}),
  })
  const [valueDescription, setValueDescription] = useState(value || t("Empty"));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: valueDescription || "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    axios.patch(`/api/education/${id}`, values)
    .then((data: any) => {
      toast.success(t("Massege_Updated", {var: "Education"}));
      setValueDescription(data.data.description);
    }).catch((error) => {
      toast.error(t("Something went wrong"));
    }).finally(() => setIsLoading(false));
  }

  return (
    <WrapperForm
      label={label}
      value={valueDescription}
      isDescription
    >
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>{t("Description")}</FormLabel>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground">
                  {t("Massege_Discription_Form", {var: t("Description")})}
                  </FormDescription>
                  <FormMessage />
              </FormItem>
              )}
          />
          <div className="w-full flex justify-end">
              <Button type="submit" disabled={isLoading}>{t("Save")}</Button>
          </div>
          </form>
      </Form>
    </WrapperForm>
  )
}

export default DescriptionForm
