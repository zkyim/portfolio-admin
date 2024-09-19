"use client"
import axios from "axios"
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next"
import { Loader } from "lucide-react"
import { UploadDropzone } from "@/lib/uploadthing"
import { Image as ImageType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import ImagesContainer from "./ImagesContainer";
import { useRouter } from "next/navigation";

interface TitleFormProps {
  id: string;
  dataImages: ImageType[] | null;
}
const TitleForm = ({
  id,
  dataImages,
}: TitleFormProps) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [images, setImages] = useState(dataImages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const uploadImages = (response: any) => {
    const values = response.map((res: any) => ({source: res.url, projectId: id}));
    axios.post(`/api/project/${id}/images`, {values: values})
    .then((data) => {router.refresh();})
    .catch(() => {console.log(t("Something went wrong"))})
  }
  let mainImage = "";
  images?.forEach(image => {if(image.isMain) mainImage = image.id });
  let values: any[] = [];
  images?.forEach(image => {return values.push(image.id)})

  const FormSchema = z.object({
    // update type of enum to eny.
    type: z.enum(values),
  });

  const deleteImage = (e: any,imageId: string) => {
    e.stopPropagation();
    setLoadingDelete(true);
    axios.delete(`/api/project/${id}/images/${imageId}`)
    .then((data) => {
        !edit && toast.success(t("Massege_Deleted", {var: t("Image")}))
        let newImage = images || [];
        setImages(newImage.filter(image => image.id !== data.data.id))
    })
    .catch(() => toast.error(t("Something went wrong")))
    .finally(() => setLoadingDelete(false))
  }
     
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
    
  function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    axios.post(`/api/project/${id}/images/${values.type}/main`)
    .then(() => {
      toast.success(t("Massege_Updated", {var: t("Image")}))
    })
    .catch(() => toast.error(t("Something went wrong")))
    .finally(() => setIsLoading(false))
  }

  return (
    <div className='col-span-1 bg-muted border border-muted-foreground/20 rounded-md'>
      <div>
        <div className='flex items-center justify-between p-4 px-6 pb-3 border-b border-muted-foreground/20'>
          <span className='font-semibold text-lg px-1'>{t("Images for Project")}</span>
          <Button variant={'ghost'} onClick={() => setEdit(!edit)}>
            { edit ? t("Cancel") : t("Edit") }
          </Button>
        </div>
        <div className="p-4 transition-all relative">
        {isLoading && <div className="absolute bg-slate-50/70 rounded-md flex items-center justify-center inset-0 w-full h-full z-20"><Loader className="w-6 h-6 animate-spin"/></div>}
          {!edit 
          ? 
                images?.length !== 0 && images ?
                <div className="flex flex-wrap items-center justify-center gap-2 relative">
                  {isLoadingDelete && <div className="absolute bg-slate-50/70 rounded-md flex items-center justify-center inset-0 w-full h-full z-20"><Loader className="w-6 h-6 animate-spin"/></div>}
                    {images.map((image) => (
                        <ImagesContainer
                          key={image.id}
                          id={image.id}
                          src={image.source}
                          onDelete={(e) => deleteImage(e,image.id)}
                          projectId={id}
                          isChecked={false}
                          isMain={image.isMain}
                        />
                    ))}
                </div>
                :<>{t("Empty")}</>
          : (
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{t("Message_upload")}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={mainImage}
                            className="flex flex-wrap items-center justify-center gap-2"
                          >
                            {isLoadingDelete && <div className="absolute bg-slate-50/70 rounded-md flex items-center justify-center inset-0 w-full h-full z-20"><Loader className="w-6 h-6 animate-spin"/></div>}
                            {images?.map((image) => (
                            <FormItem key={image.id} className="relative cursor-pointer">
                                <FormControl className="absolute top-1 right-1 z-10">
                                  <RadioGroupItem value={image.id}/>
                                </FormControl>
                              <FormLabel className="font-normal">
                                <ImagesContainer
                                  id={image.id}
                                  onDelete={(e) => deleteImage(e, image.id)}
                                  src={image.source}
                                  projectId={id}
                                />
                              </FormLabel>
                            </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <UploadDropzone
                    endpoint="imagesUploader"
                    onClientUploadComplete={(res) => {  
                      uploadImages(res);
                    }}
                  />
                  <Button disabled={isLoading} type="submit">{t("Save")}</Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TitleForm
