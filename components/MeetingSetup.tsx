"use client";

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { FC, useEffect, useState } from 'react'
import { Button } from './ui/button';

type MeetingSetup = {
    setIsSetupComplete: React.Dispatch<React.SetStateAction<boolean>>
}

const MeetingSetup: FC<MeetingSetup> = ({setIsSetupComplete}) => {

    const [isMicCamToggledOn, setIsMicCamToggeledOn] = useState(false);

    const call = useCall();

    if(!call) {
        throw new Error("useCall must be used within a StreamCall component")
    }

    useEffect(() => {

        if(isMicCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }

    }, [isMicCamToggledOn, call?.camera, call?.microphone ])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview />
        <div className="flex h-16 items-center justify-center gap-3">
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input 
                type="checkbox" 
                checked={isMicCamToggledOn} 
                onChange={(event) => setIsMicCamToggeledOn(event.target.checked)} 
                />
                Join with mic and camera off
            </label>
            <DeviceSettings />
        </div>
        <Button onClick={() => {
            call.join();
            setIsSetupComplete(true);
        } } className='rounded-md bg-green-500 px-4 py-2.5'>
            Join Meeting
        </Button>
    </div>
  )
}

export default MeetingSetup