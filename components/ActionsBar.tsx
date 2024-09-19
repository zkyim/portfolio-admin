'use client';
import React from 'react'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ActionsBarProps {
    isPublic: boolean;
    isLoading: boolean;
    onApi: () => void;
    onDelete: () => void;
}

export const ActionsBar = ({
    isPublic,
    onApi,
    onDelete,
    isLoading
}: ActionsBarProps) => {
  const { t } = useTranslation();
  return (
    <div className='flex items-center justify-between p-3 pb-5'>
      <Button 
        onClick={onApi}
        className='font-semibold text-md'
        disabled={isLoading}
      >
        {!isPublic ? <>{t("Public")}</> : <>{t("Unpublished")}</>}
      </Button>
      <Dialog>
        <DialogTrigger>
          <Button 
            variant={'destructive'}
            className='font-semibold text-md'
          >
          {t("Delete")}
          </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className="p-3 mb-4">
              <DialogTitle>{t("Are you sure?")}</DialogTitle>
              <DialogDescription>{t("This action cannot be undone")}</DialogDescription>
            </DialogHeader>
            <div className='flex justify-between items-center'>
              <DialogClose>
                <Button variant={'ghost'}>
                  {t("Close")}
                </Button>
              </DialogClose>
                <Button variant={'destructive'} onClick={onDelete} disabled={isLoading}>
                  {t("Delete")}
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
