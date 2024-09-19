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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios from "axios"
import { toast } from "sonner"
import { WrapperForm } from "@/components/WrapperForm"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next"

interface CategoryFormProps {
  id: string;
  value: string | null;
  label: string;
}

const CategoryForm = ({
  id,
  value,
  label,
}: CategoryFormProps) => {
  const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [valueCategory, setValueCategory] = useState(value || t("Empty"));
    const formSchema = z.object({
      category: z.string().min(1, {message: t("Required")}).max(50, {message: t("less than", {var: 50})}),
    })
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        category: valueCategory || "",
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true)
      axios.patch(`/api/skill/${id}`, values)
      .then((data: any) => {
        toast.success(t("Massege_Updated", {var: t("Skill")}));
        setValueCategory(data.data.tool);
      }).catch((error) => {
        toast.error(t("Something went wrong"));
      }).finally(() => setIsLoading(false));
    }
  return (
    <WrapperForm
      label={label}
      value={valueCategory}
    >
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
          <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>{t("Category")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category tool" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="FRONTEND">FRONTEND</SelectItem>
                    <SelectItem value="BACKEND">BACKEND</SelectItem>
                    <SelectItem value="TOOL">TOOL</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-muted-foreground">
                  {t("Massege_Discription_Form", {var: t("Category")})}
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

export default CategoryForm
