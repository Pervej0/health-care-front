"use client";

import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { useRouter } from "next/navigation";

const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
  const [videoCall, setVideoCall] = useState(true);
  const router = useRouter();
  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID || "test", // your Agora App ID
    channel: videoCallingId, // your agora channel
    token: null, // use null or skip if using app in testing mode
  };
  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      router.push("/dashboard");
    },
  };
  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
  );
};

export default VideoCall;
