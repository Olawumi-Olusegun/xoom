
import React, { type ReactNode, type FC } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
  

type MeetingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
    handleClick: () => void;
    children?: ReactNode;
}

const MeetingModal: FC<MeetingModalProps> = ({ children, image, buttonIcon, isOpen, onClose, title, className, buttonText, handleClick }) => {
  return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="flex flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white w-full max-w-[520px]">
            <div className="flex flex-col gap-6">
                { image ? (
                    <div className='flex items-center justify-center '>
                        <Image src={image} alt={title} width={72} height={72} />
                    </div>
                ) : null }

                <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
                    {title}
                </h1>
                { children && children }
                <Button 
                className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0'
                onClick={handleClick}
                > 
                    {buttonIcon ? (
                        <Image 
                        src={buttonIcon}
                        alt={`${title}-image-icon`}
                        width={24}
                        height={24}
                        />
                        
                    )  : null } &nbsp;
                    {buttonText || 'Schedule Meeting' } 
                </Button>
            </div>
        </DialogContent>
        </Dialog>

  )
}

export default MeetingModal