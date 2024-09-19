import { X } from 'lucide-react';
import React from 'react'

const TagsElement = ({
    tags,
    removeTag,
    isForm,
}: {
    tags: string;
    removeTag: (index: number) => void;
    isForm?: boolean;
}) => {
  return (
    <>
        {tags.split(",").map((tag, index) => {
            if (tag !== "") {
            return (
                <li key={tag} className='flex items-center border rounded-md px-2.5 py-1.5 w-fit h-fit gap-1.5'> 
                {tag}
                {isForm && (
                    <span onClick={() => removeTag(index)} className='border border-muted-foreground/30 rounded-full p-0.5 cursor-pointer'>
                        <X className='h-3 w-3'/>
                    </span>
                )}
                </li>
            )
            }
        })}
    </>
  )
}

export default TagsElement
