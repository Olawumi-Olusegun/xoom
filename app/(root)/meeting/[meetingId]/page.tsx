import React, { FC } from 'react'

type MeetingProps = {
    params: {
        meetingId: string;
    }
}

const Meeting: FC<MeetingProps> = ({params}) => {
  return (
    <div>Meeting Room: #{ params.meetingId } </div>
  )
}

export default Meeting