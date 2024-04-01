"use client";

import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

type CallListProps = {
    type: "ended" | "upcoming" | "recordings";
}

const CallList:FC<CallListProps> = ({type}) => {

    const { callRecordings, endedCalls, isLoading, upcomingCalls } = useGetCalls();

    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const router = useRouter();

    const { toast } = useToast();

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return recordings;
            
            case 'upcoming':
                return upcomingCalls;
            default:
                return []
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return "No Previous Calls";
            case 'upcoming':
                return "No Recording";
            
            case 'upcoming':
                return "No Upcoming Calls";
            default:
                return []
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
              try {
                const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []);
                const recordings = callData
                .filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings);
                
                setRecordings(recordings);
                
              } catch (error) {
                toast({ title: "Try again later"})
              }
            }

        if(type === 'recordings') {
            fetchRecordings();
        }

    }, [type, callRecordings])

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if(isLoading){
        return <Loader />
    }

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2 '>
        {
            calls && calls.length > 0 
            ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                key={(meeting as Call).id}
                icon={
                    type === "ended" 
                    ? "/icons/previous.svg"
                    : type === "upcoming"
                    ? "/icons/upcoming.svg"
                    : "/icons/recordings.svg"

                }
                title={(meeting as Call).state?.custom?.description?.substring(0, 26) || "No description"}
                date={(meeting as Call).state?.startedAt?.toLocaleString() || (meeting as CallRecording)?.filename?.substring(0, 20) || (meeting as CallRecording)?.start_time}
                isPreviousMeeting={type === "ended" }
                buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined }
                handleClick={type === "recordings" 
                            ? () => router.push(`/meeting/${(meeting as CallRecording).url}`)
                            : () =>  router.push(`/meeting/${(meeting as Call).id}`)    

            }
                link={type === "recordings" ? (meeting as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}` }
                buttonText={type === "recordings" ? "Play" : "Start"}
                />
            ))
            : (  <h1>{noCallsMessage}</h1> )
        }
    </div>
  )
}

export default CallList