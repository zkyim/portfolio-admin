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
import { Input } from "@/components/ui/input"
import axios from "axios"
import { toast } from "sonner"
import { WrapperForm } from "@/components/WrapperForm"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next"

interface TitleFormProps {
  id: string;
  value: string;
  label: string;
}

const TitleForm = ({
  id,
  value,
  label,
}: TitleFormProps) => {
  const { t } = useTranslation();
  const formSchema = z.object({
    title: z.string().min(1, {message: t("Required")}).max(50, {message: t("less than", {var: 50})}),
  })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [valueTitle, setValueTitle] = useState(value || t("Empty"));
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: valueTitle || "",
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true)
      axios.patch(`/api/project/${id}`, values)
      .then((data: any) => {
        toast.success(t("Massege_Updated", {var: t("Project")}));
        setValueTitle(data.data.title);
      }).catch((error) => {
        toast.error(t("Something went wrong"));
      }).finally(() => setIsLoading(false));
    }
  return (
    <WrapperForm
      label={label}
      value={valueTitle}
    >
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
          <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>{t("Title")}</FormLabel>
                  <FormControl>
                  <Input placeholder={t("Title")} disabled={isLoading} {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground">
                  {t("Massege_Discription_Form", {var: t("Title")})}
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

export default TitleForm
