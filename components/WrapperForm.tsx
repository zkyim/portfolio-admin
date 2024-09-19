import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { Preview } from './preview';
import { useTranslation } from 'react-i18next';

interface WrapperFormProps {
    label: string;
    value: string;
    children: React.ReactNode;
    isDescription?: boolean;
}

export const WrapperForm = ({
    label,
    value,
    children,
    isDescription,
}: WrapperFormProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const { t } = useTranslation();
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
          {!edit ? isDescription ? (
            <>
              <Preview value={value}/>
            </>
          ) : (
            <div className='text-muted-foreground'>{value}</div>
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    </div>
  )
}
