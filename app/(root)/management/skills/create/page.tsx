"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
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
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"



const CreateEductionPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const formSchema = z.object({
    tool: z.string().min(1, {message: t("Required")}).max(50, {message: t("greater than", {var: 50})}),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tool: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    axios.post(`/api/skill/create`, values)
    .then((data) => {
      toast.success(t("Massege_Created", {var: t("Skills")}));
      router.push(`/management/skills/${data.data.id}`);
    }).catch((error) => {
      toast.error(t("Something went wrong"));
    }).finally(() => setIsLoading(false));
  }

  return (
    <div className='h-full w-full mt-12'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
          <FormField
            control={form.control}
            name="tool"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Tool")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("Tool")} disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription className="text-muted-foreground">
                {t("Massege_Discription_Form", {var: t("Tool")})}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <Button type="submit" disabled={isLoading}>{t("Submit")}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateEductionPage