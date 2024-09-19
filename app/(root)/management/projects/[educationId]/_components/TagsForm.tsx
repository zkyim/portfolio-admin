import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import React, { useState, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import TagsElement from './TagsElement';
import { number } from 'zod';
import axios from 'axios';

interface TagsFormProps {
  id: string;
  value: string | null;
  label: string;
}

const TagsForm = ({
  id,
  value,
  label,
}: TagsFormProps) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<string>("");
  const [tags, setTags] = useState<string>(value || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeInputValue = (e: any, action = "add") => {
    if (action === "add") {
      setValueInput(e.target.value);
    }else if (action === "delete") {
      setValueInput("");
      e.target.value = "";
    }
  }
  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let tag = valueInput.replace(/" "/g, "");
      if (tag.length > 1 ) {
        if (!tags.includes(tag)) {
          setTags(tags+valueInput+",");
        }else {
          toast.warning(t("you have already", {var: tag}));
        }
      }
      changeInputValue(e, "delete");
    }
  }
  const removeTag = (index: number) => {
    let tag = tags.split(",")[index];
    setTags(tags.replace(tag, ""));
  }

  const handleSubmit = () => {
    setIsLoading(true);
    axios.patch(`/api/project/${id}`, {tools: tags})
    .then((data) => {
      toast.success(t("Massege_Updated", {var: t("Project")}));
    })
    .catch((err) => {
      toast.error(t("Something went wrong"));
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <div className='col-span-1 bg-muted border border-muted-foreground/20 rounded-md'>
      <div>
        <div className='flex items-center justify-between p-4 px-6 pb-3 border-b border-muted-foreground/20'>
          <span className='font-semibold text-lg px-1'>{t(label)}</span>
          <Button variant={'ghost'} onClick={() => setEdit(!edit)}>
            { edit ? t("Cancel") : t("Edit") }
          </Button>
        </div>
        <div className="p-4 transition-all">
          {!edit ? 
              tags ? 
              <ul className='flex flex-wrap items-center gap-2 p-2 rounded-md'>
                <TagsElement 
                  tags={tags}
                  removeTag={removeTag}
                />
              </ul>
              :
              <>{t("Empty")}</>
           : (
            <>
              <div className='w-full'>
                <div className='w-full border-muted-foreground/25 rounded-md gap-1.5 space-y-2'>
                  <ul className='flex flex-wrap items-center gap-2 p-2 border border-muted-foreground/20 rounded-md'>
                    <TagsElement
                      tags={tags}
                      removeTag={removeTag}
                      isForm
                    />
                    <Input type='text' onKeyUp={(e) => addTag(e)} onChange={(e) => changeInputValue(e)}
                    className='flex-1 border-none bg-transparent focus-visible:ring-offset-0 focus:outline-none focus-visible:ring-0 min-w-20'/>
                  </ul>
                  <div className='flex items-start justify-between'>
                      <Button disabled={isLoading} variant={'destructive'} onClick={() => setTags("")}>
                          {t("Remove all")}
                      </Button>
                      <Button disabled={isLoading} onClick={handleSubmit}>
                          {t("Save")}
                      </Button>
                  </div>
                </div>
              </div>
            
            
            </>
          )}
        </div>
      </div>
    </div>



  )
}

export default TagsForm
