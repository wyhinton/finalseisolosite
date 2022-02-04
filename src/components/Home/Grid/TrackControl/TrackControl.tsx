import { Track } from "@interfaces/Track";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import PlayPauseControls from "../GridWidgets/TrackItem/PlayPauseControls";

const TrackControl = ({ track }: { track: Track }): JSX.Element => {
  const audioRef = useRef<HTMLMediaElement>();

  const [progress, setProgress] = useState(0);
  //   const [duration, ] = useState(0)

  const seekTo = (time: number) => {
    if (!audioRef.current || audioRef.current.duration === undefined) return;

    const newTime = Math.min(track.duration, Math.max(0, time));
    setProgress(newTime);
    audioRef.current.currentTime = newTime;
  };

  //   const pauseTr

  useEffect(() => {
    if (track.category === "remix") {
      audioRef.current = document.getElementById(
        "audio_" + track.title
      ) as HTMLMediaElement;
      audioRef.current.addEventListener("play", () => {});
      audioRef.current.addEventListener("timeupdate", (e) => {
        // setProgress(e);
        // console.log(e);
        const el = e.target as HTMLAudioElement;
        setProgress(el.currentTime);
      });
      //   console.log(audioRef.current);
    }
  }, [track.title]);

  const bodyStyle = {
    width: 200,
    height: 40,
    position: "absolute",
    backgroundColor: "red",
    display: "flex",
    borderRadius: 5,
    top: "-50%",
  } as React.CSSProperties;

  const cStyle = {
    width: 50,
    height: "100%",
    // padding: "20%",
    // stbg
    backgroundColor: "blue",
  };
  return (
    <motion.div style={bodyStyle}>
      <motion.div style={cStyle}>
        {/* <PlayPauseControls onPlay={()=>{}}}  /> */}
      </motion.div>
      <input
        type="range"
        value={progress}
        min="0"
        max={track.duration}
        onChange={(e) => {
          seekTo(parseInt(e.target.value));
          //   setProgress(parseInt(e.target.value));
          //   console.log(parseInt(e.target.value));
        }}
      />
    </motion.div>
  );
};

export default TrackControl;
