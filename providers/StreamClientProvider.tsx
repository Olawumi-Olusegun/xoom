
import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient
  } from '@stream-io/video-react-sdk';
import { useState, type PropsWithChildren, useEffect } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

    const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
  
const StreamVideoProvider = ({children}: { children: PropsWithChildren}) => {

    const [videoClient, setVideoClient] = useState<StreamVideoClient>();

    const { user, isLoaded } = useUser();

    useEffect(() => {
        if(!isLoaded || !user) return;
        if(!apiKey) {
            throw new Error("Stream API key missing")
        }

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user.id,
                name: user.username || user.id,
                image: user.imageUrl,
            },
            // tokenProvider: process.env.NEXT_PUBLIC_STREAM_API_SECRET,
        })

    }, [user, isLoaded])

    return (
      <StreamVideo client={videoClient}>    
      </StreamVideo>
    );
  };

  export default StreamVideoProvider