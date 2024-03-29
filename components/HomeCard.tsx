
import { cn } from '@/lib/utils';
import Image from 'next/image'
import React, { type FC } from 'react'

type HomeCardProps = {
    image: string;
    title: string;
    description: string;
    handleClick: () => void;
    className: string;
}

const HomeCard: FC<HomeCardProps> = ({ image, title, description,  handleClick, className }) => {
  return (
    <div onClick={handleClick} className={cn("px-4 py-4 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer", className)}>
        <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image src={image} alt={title} width={27} height={27} />
        </div>
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold ">{title}</h1>
            <p className="text-base font-normal">{description}</p>
        </div>
    </div>
  )
}

export default HomeCard