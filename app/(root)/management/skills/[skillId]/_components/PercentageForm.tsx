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

interface ToolFormProps {
  id: string;
  value: string | null;
  label: string;
}

const ToolForm = ({
  id,
  value,
  label,
}: ToolFormProps) => {
  const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [valuePercentage, setValuePercentage] = useState(Number(value) || 0);
    const formSchema = z.object({
      percentage: z.coerce.number().min(1, {message: t("Required")}).max(100, {message: t("less than", {var: 100})}),
    })
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        percentage: Number(valuePercentage) || undefined,
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true)
      axios.patch(`/api/skill/${id}`, {percentage: String(values.percentage)})
      .then((data: any) => {
        toast.success(t("Massege_Updated", {var: t("Skill")}));
        setValuePercentage(data.data.tool);
      }).catch((error) => {
        toast.error(t("Something went wrong"));
      }).finally(() => setIsLoading(false));
    }
  return (
    <WrapperForm
      label={label}
      value={String(valuePercentage)}
    >
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
          <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>{t("Percentage")}</FormLabel>
                  <FormControl>
                  <Input type="number" step={1} placeholder={t("Percentage")} disabled={isLoading} {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground">
                  {t("Massege_Discription_Form", {var: t("Percentage")})}
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

export default ToolForm
