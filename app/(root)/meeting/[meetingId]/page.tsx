"use client"

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme,  } from '@stream-io/video-react-sdk';
import React, { FC, useState } from 'react'

type MeetingProps = {
    params: {
        meetingId: string;
    }
}

const Meeting: FC<MeetingProps> = ({params}) => {

  const [isSetUpComplete, setIsSetupComplete] = useState(false);

  const { user, isLoaded } = useUser();

  const { call, isCallLoading } = useGetCallById(params.meetingId);

  if(!isLoaded || isCallLoading) {
    return <Loader />
  }

  return (
    <main className='min-h-screen w-full '>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete  
          ? (<MeetingSetup setIsSetupComplete={setIsSetupComplete} />) 
          : (<MeetingRoom />) }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting