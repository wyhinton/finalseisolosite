import React, { useState } from "react";
import { useMetronome, usePlaylist } from "@hooks";
import FlexRow from "@components/UI/FlexRow";
import { motion } from "framer-motion";

const BeatsMetronome = ({}: {}): JSX.Element => {
  const { currentTrack, isPlaying } = usePlaylist();
  const boxes = Array.from(Array(4).keys());
  const [curBeat, setCurBeat] = useState(1);
  useMetronome(currentTrack.bpm ?? 100, (b) => {
    // console.log(b);
    if (isPlaying) {
      setCurBeat(b);
    }
  });
  const variants = {
    notplaying: {
      opacity: 0.5,
      transition: {
        duration: 0.3,
      },
    },
    active: {
      opacity: 1,
    },
  };
  return (
    <FlexRow style={{ width: "100%", height: "auto" }}>
      {/* <FlexRow style={{ width: "100%", height: "auto", border: "1px solid red", }}> */}
      {boxes.map((b, i) => {
        return (
          <motion.div
            key={i}
            variants={variants}
            animate={i + 1 == curBeat && !isPlaying ? "notplaying" : "active"}
            style={{
              border: "1px solid white",
              width: 10,
              height: 10,
              backgroundColor: i + 1 == curBeat ? "white" : "",
            }}
          ></motion.div>
        );
      })}
    </FlexRow>
  );
};

export default BeatsMetronome;
