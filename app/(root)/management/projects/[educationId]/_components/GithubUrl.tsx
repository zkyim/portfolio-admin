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

interface GithubUrlFormProps {
  id: string;
  value: string | null;
  label: string;
}

const GithubUrlForm = ({
  id,
  value,
  label,
}: GithubUrlFormProps) => {
  const { t } = useTranslation();
  const formSchema = z.object({
    githubUrl: z.string().min(1, {message: t("Required")}).max(250, {message: t("less than", {var: 250})}),
  })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [valueGithubUrl, setValueGithubUrl] = useState(value || t("Empty"));
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        githubUrl: valueGithubUrl || "",
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true)
      axios.patch(`/api/project/${id}`, values)
      .then((data: any) => {
        toast.success(t("Massege_Updated", {var: t("Project")}));
        setValueGithubUrl(data.data.githubUrl);
      }).catch((error) => {
        toast.error(t("Something went wrong"));
      }).finally(() => setIsLoading(false));
    }
  return (
    <WrapperForm
      label={label}
      value={valueGithubUrl}
    >
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
          <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>{t("GithubUrl")}</FormLabel>
                  <FormControl>
                  <Input type="url" placeholder={t("GithubUrl")} disabled={isLoading} {...field} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground">
                  {t("Massege_Discription_Form", {var: t("GithubUrl")})}
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

export default GithubUrlForm
