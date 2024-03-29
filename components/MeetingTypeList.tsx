"use client";

import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';

type MeetingState = 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined;

const MeetingTypeList = () => {


    const [meetingState, setMeetingState] = useState<MeetingState>(undefined);

    const router = useRouter();

    const createMeeting = () => {
        
    }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 '>
        <HomeCard 
         image="/icons/add-meeting.svg" 
         title="New Meeting" 
         description="Start an instant meeting" 
         className="bg-orange-1"
         handleClick={() => setMeetingState('isInstantMeeting')}
        />
        <HomeCard 
         image="/icons/add-meeting.svg" 
         title="Schedule Meeting" 
         description="Plan your meeting" 
         className="bg-blue-1"
         handleClick={() => setMeetingState('isScheduleMeeting')}
        />
        <HomeCard 
         image="/icons/add-meeting.svg" 
         title="View Recording" 
         description="Check out your recording" 
         className="bg-purple-1"
         handleClick={() => router.push("/recordings")}
        />
        <HomeCard 
         image="/icons/add-meeting.svg" 
         title="Join Meeting" 
         description="via invitation link" 
         className="bg-yellow-1"
         handleClick={() => setMeetingState('isJoiningMeeting')}
        />


        <MeetingModal 
         isOpen={meetingState === "isInstantMeeting" }
         onClose={() => setMeetingState(undefined) }
         title="Start an Instant Meeting"
         className="text-center"
         buttonText="Start Meeting"
         handleClick={createMeeting}
        >
            <p>Heelo</p>
        </MeetingModal>
        
    </section>
  )
}

export default MeetingTypeList