"use client";

import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from "react-datepicker";
import Loader from './Loader';
import { Input } from './ui/input';




type MeetingState = 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined;

const MeetingTypeList = () => {

  
  const [meetingState, setMeetingState] = useState<MeetingState>(undefined);
  
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetail, setCallDetail] = useState<Call>()

  const router = useRouter();
  
  const { user } = useUser();
  const { toast } = useToast();

  const client = useStreamVideoClient();


    const createMeeting = async () => {
     
        if(!client || !user) return;

      try {

        if(!values.dateTime) {
          toast({ title: "Please select a date and a time" });
          return;
        }

        const id = crypto.randomUUID();
        const call = client.call("default", id)



        if(!call) {
          throw new Error("Failed to create call")
        }



        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || "Instant meeting";

        await call.getOrCreate({
          data:  {
            starts_at: startsAt,
            custom: {
              description
            }
          }
        });

        setCallDetail(call);

        if(!values.description) {
          router.push(`/meeting/${call.id}`);
        }
        toast({ title: "Meeting Created" });
      } catch (error) {
        toast({ title: "Failed to create meeting" });
      }
    }

    if(!client || !user) {
      return <Loader />
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

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
         image="/icons/join-meeting.svg"
         title="Schedule Meeting" 
         description="Plan your meeting" 
         className="bg-blue-1"
         handleClick={() => setMeetingState('isScheduleMeeting')}
        />
        <HomeCard 
         image="/icons/schedule.svg"
         title="View Recording" 
         description="Check out your recording" 
         className="bg-purple-1"
         handleClick={() => router.push("/recordings")}
        />
        <HomeCard 
         image="/icons/recordings.svg"
         title="Join Meeting" 
         description="via invitation link" 
         className="bg-yellow-1"
         handleClick={() => setMeetingState('isJoiningMeeting')}
        />

        {
          !callDetail
          ? (
            <MeetingModal 
            isOpen={meetingState === "isScheduleMeeting" }
            onClose={() => setMeetingState(undefined) }
            title="Create Meeting"
            handleClick={createMeeting}
           >
            <div className="flex flex-col gap-2.5 ">
              <label htmlFor="description" className='text-base text-sky-2 font-normal leading-[22px] '>Add a description</label>
              <Textarea 
              className='border-none resize-none bg-dark-3 focus-visble-ring-0 focus-visible-ring-offset-0' 
              onChange={(event) => setValues({...values, description: event.target.value})}
              />
              <div className="flex w-full flex-col gap-2.5 ">
              <label htmlFor="date" className='text-base text-sky-2 font-normal leading-[22px] '>Select date and time</label>
              <ReactDatePicker  
               selected={values.dateTime}
               onChange={(date) => setValues({...values, dateTime: date!})}
               showTimeSelect
               timeFormat='HH:mm'
               timeIntervals={15}
               timeCaption='time'
               dateFormat="MMMM d, yyy h:mm aa"
               className='w-full p-3 rounded bg-dark-3 focus:outline-none'
              />
              </div>
            </div>
           </MeetingModal>
          ) 
          : (
            <MeetingModal 
          isOpen={meetingState === "isScheduleMeeting" }
          onClose={() => setMeetingState(undefined) }
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied"})

          } }
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
         />
           )
        }


      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

        <MeetingModal 
         isOpen={meetingState === "isInstantMeeting" }
         onClose={() => setMeetingState(undefined) }
         title="Start an Instant Meeting"
         className="text-center"
         buttonText="Start Meeting"
         handleClick={createMeeting}
        >
        </MeetingModal>
        
    </section>
  )
}

export default MeetingTypeList