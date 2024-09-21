"use client"
import axios from "axios"
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import React, { FormEvent, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import { Loader } from "lucide-react"
import { UploadDropzone } from "@/lib/uploadthing"
import { Image as ImageType } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ImagesContainer from "./ImagesContainer";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

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
  const [mainImage, setMainImage] = useState("");
  useEffect(() => {
    images?.forEach(image => {if(image.isMain) setMainImage(image.id) });
  }, [images])

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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`/api/project/${id}/images/${mainImage}/main`)
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
              <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
                <Label>{t("Message_upload")}</Label>
                <RadioGroup
                  defaultValue={mainImage}
                  className="flex flex-wrap items-center justify-center gap-2"
                >
                  {isLoadingDelete && <div className="absolute bg-slate-50/70 rounded-md flex items-center justify-center inset-0 w-full h-full z-20"><Loader className="w-6 h-6 animate-spin"/></div>}
                  {images?.map((image) => (
                    <div key={image.id}>                              
                      <Label htmlFor={image.id} className="relative font-normal">
                        <RadioGroupItem 
                          id={image.id} 
                          value={image.id} 
                          className="absolute top-1 right-1 z-30"
                          checked={image.id === mainImage}
                          onClick={() => setMainImage(image.id)}
                        />
                        <ImagesContainer
                          id={image.id}
                          onDelete={(e) => deleteImage(e, image.id)}
                          src={image.source}
                          projectId={id}
                        />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <UploadDropzone
                  endpoint="imagesUploader"
                  onClientUploadComplete={(res) => {  
                    uploadImages(res);
                  }}
                />
                <Button disabled={isLoading} type="submit">{t("Save")}</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TitleForm
