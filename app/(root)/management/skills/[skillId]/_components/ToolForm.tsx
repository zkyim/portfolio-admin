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
  value: string;
  label: string;
}

const ToolForm = ({
  id,
  value,
  label,
}: ToolFormProps) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [valueTool, setValueTool] = useState(value || t("Empty"));
    const formSchema = z.object({
      tool: z.string().min(1, {message: t("Required")}).max(50, {message: t("less than", {var: 50})}),
    })
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        tool: valueTool || "",
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true)
      axios.patch(`/api/skill/${id}`, values)
      .then((data: any) => {
        toast.success(t("Massege_Updated", {var: t("Skill")}));
        setValueTool(data.data.tool);
      }).catch((error) => {
        toast.error(t("Something went wrong"));
      }).finally(() => setIsLoading(false));
    }
  return (
    <WrapperForm
      label={label}
      value={valueTool}
    >
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
          <FormField
              control={form.control}
              name="tool"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>{t("Tool")}</FormLabel>
                  <FormControl>
                  <Input placeholder="Tool" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground">
                  {t("Massege_Discription_Form", {var: t("Tool")})}
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
