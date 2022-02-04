import { usePlaylist } from "@hooks";
import { Track } from "@interfaces/Track";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import PlayPauseSwitch from "./PlayPauseSwitch";
import { Range } from "react-range";

const TrackControl = ({ track }: { track: Track }): JSX.Element => {
  const audioRef = useRef<HTMLMediaElement>();
  const { playTrack, pauseTrack, currentTrack } = usePlaylist();

  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(true);
  //   const [duration, ] = useState(0)

  const seekTo = (time: number) => {
    if (!audioRef.current || audioRef.current.duration === undefined) return;

    const newTime = Math.min(track.duration, Math.max(0, time));
    setProgress(newTime);
    console.log(newTime);
    audioRef.current.currentTime = newTime;
  };

  //   const pauseTr

  useEffect(() => {
    if (track.category === "remix") {
      audioRef.current = document.getElementById(
        "audio_" + track.title
      ) as HTMLMediaElement;
      audioRef.current.addEventListener("play", () => {
        setPaused(false);
      });
      audioRef.current.addEventListener("timeupdate", (e) => {
        // setProgress(e);
        // console.log(e);
        const el = e.target as HTMLAudioElement;
        setProgress(el.currentTime);
      });

      audioRef.current.addEventListener("pause", (e) => {
        setPaused(true);
      });
      //   console.log(audioRef.current);
    } else {
      console.log(
        document.getElementById(
          "video_" + track.title
          // "recital_video"
        ) as HTMLMediaElement
      );
      // setTimeout
      audioRef.current = document.getElementById(
        "video_" + track.title
        // "recital_video"
      ) as HTMLMediaElement;

      audioRef.current.addEventListener("play", () => {
        setPaused(false);

        // if (track.title === currentTrack.title) {
        //   setPaused(false);
        // } else {
        //   setPaused(true);
        // }
      });
      audioRef.current.addEventListener("timeupdate", (e) => {
        // setProgress(e);
        // console.log(e);
        const el = e.target as HTMLAudioElement;
        setProgress(el.currentTime);

        // if (track.title === currentTrack.title) {
        //   setProgress(el.currentTime);
        // } else {
        //   // setPaused(true)
        // }
      });
      audioRef.current.addEventListener("pause", (e) => {
        setPaused(true);
        // if (track.title === currentTrack.title) {
        //   setPaused(true);
        // } else {
        //   setPaused(true);
        // }
      });
    }
  }, [track.title]);

  const bodyStyle = {
    width: "100%",
    padding: ".1em",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties;

  const containerStyle = {
    width: "max(20vmin, 180px)",
    position: "absolute",
    backgroundColor: "#4b4b4bdb",
    backdropFilter: "blur(1px)",
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    top: "50%",
    left: "30%",
    zIndex: 100,
    alignItems: "center",
    overflow: "hidden",
  } as React.CSSProperties;

  const cStyle = {
    width: 50,
    height: "100%",
    // padding: "20%",
    // stbg
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    // backgroundColor: "blue",
  };

  const bStyle = {
    width: 20,
    height: 30,

    // flexDirection: "column",

    alignItems: "center",
    // backgroundColor: "green",
  };

  const bodyVariants = {
    rest: { x: 0, y: 0 },
    jump: {
      x: 20,
      y: -100,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.div
      // animate={paused ? "rest" : "jump"}
      variants={bodyVariants}
      style={containerStyle}
    >
      <div style={{ fontSize: "12pt" }}>
        {" "}
        {track.category == "remix" ? track.artist : track.title}
      </div>
      <motion.div
        style={{
          position: "absolute",
          width: 10,
          height: 10,
          top: 0,
          left: 0,
          // backgroundColor: "red",
        }}
      ></motion.div>

      <motion.div
        // animate={paused ? "rest" : "jump"}
        // variants={bodyVariants}
        style={bodyStyle}
      >
        <motion.div style={cStyle}>
          <div style={bStyle}>
            <PlayPauseSwitch
              onPlay={() => {
                playTrack(track);
              }}
              onPause={() => {
                pauseTrack(track);
              }}
              paused={paused}
            />
          </div>
        </motion.div>
        <Range
          step={0.1}
          min={0}
          max={track.duration}
          values={[progress]}
          // values={this.state.values}
          // onChange={(values) => this.setState({ values })}
          onChange={(values) => {
            seekTo(values[0]);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "60%",
                // paddingLeft: "1em",
                backgroundColor: "black",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: 15,
                width: 15,
                borderRadius: "50%",

                backgroundColor: "#999",
              }}
            />
          )}
        />
        <div style={{ paddingLeft: "1em", fontSize: "12pt" }}>{`${formatTime(
          track.duration
        )}`}</div>
      </motion.div>
    </motion.div>
  );
};

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
    .filter(Boolean)
    .join(":");
}

export default TrackControl;
