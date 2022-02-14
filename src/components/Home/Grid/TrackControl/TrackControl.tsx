import { usePlaylist } from "@hooks";
import { Track } from "@interfaces/Track";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import PlayPauseSwitch from "./PlayPauseSwitch";
import { Range } from "react-range";
import theme from "@static/theme";

const fontSize = "max(12pt, 6vmin)";

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
        console.log("PUASED", track.title);
        setPaused(false);
      });
      audioRef.current.addEventListener("timeupdate", (e) => {
        // setProgress(e);
        // console.log(e);
        const el = e.target as HTMLAudioElement;
        setProgress(el.currentTime);
      });

      audioRef.current.addEventListener("pause", (e) => {
        console.log("PUASED", track.title);
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

    // padding: ".1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    // paddingRight: "2vmin",
    height: "max(4vmin, 50px)",
  } as React.CSSProperties;

  const containerStyle = {
    width: "100%",
    height: "100%",
    // height: "fit-content",
    // width: "fit-content",
    // width: "max(20vmin, 180px)",
    // position: "absolute",
    backgroundColor: `${theme.primary}`,
    // backgroundColor: "#4b4b4bdb",
    // backdropFilter: "blur(1px)",
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    // border: `1px solid ${theme.secondary}`,
    top: "50%",
    left: "30%",
    zIndex: 100,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
    // padding: "1vmin",
  } as React.CSSProperties;

  const cStyle = {
    // width: 50,
    height: "100%",

    width: "100%",
    // padding: "20%",
    // stbg
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    borderRight: `1px solid ${theme.secondary}`,
    border: "1px solid red",
    // backgroundColor: "blue",
  };

  const bStyle = {
    // width: 20,
    // height: 30,
    display: "flex",
    // width: "40%",
    height: "40%",

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
      whileHover={{ backgroundColor: "#231f20", transition: { duration: 0.1 } }}
    >
      <motion.div style={bodyStyle}>
        <motion.div style={cStyle}>
          <div style={bStyle}>
            <PlayPauseSwitch
              onPlay={() => {
                playTrack(track);
                // setPaused(false);
              }}
              onPause={() => {
                pauseTrack(track);
              }}
              paused={paused}
            />
            <div
              style={{
                fontSize: fontSize,
                position: "absolute",
                zIndex: 1,
                pointerEvents: "none",
                width: "50%",
                textAlign: "left",
              }}
            >
              {/* <div style={{ fontSize: theme.widgetFontSize }}> */}{" "}
            </div>
          </div>
          <div style={{ fontSize: fontSize }}>
            {`${track.position + 1}. ${
              track.category == "remix" ? track.artist : track.title
            }`}
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
                height: "max(100%, 40px)",
                width: "inherit",
                // paddingLeft: "1em",
                // border: `1px solid ${theme.secondary}`,
                // backgroundColor: theme.secondary,
                // background: `repeating-linear-gradient(
                //   45deg,
                //   rgba(0, 0, 0, 0.2),
                //   rgba(0, 0, 0, 0.2) 10px,
                //   rgba(0, 0, 0, 0.3) 10px,
                //   rgba(0, 0, 0, 0.3) 20px
                // )`,
                // backgroundColor: theme.secondary,
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
                height: "100%",
                width: 15,

                // borderRadius: "50%",
                backgroundColor: `${theme.primary}`,
                border: `1px ${theme.secondary}`,
                // backgroundColor: "#999",
              }}
            />
          )}
        />
        {/* <div
          className={"track-duration-container"}
          style={{
            // paddingLeft: ".5em",
            minWidth: "6vmin",
            margin: "auto",
            // fontSize: "12pt",
            fontSize: fontSize,
            textAlign: "right",
            // padding: "1vmin",
          }}
        >{`${formatTime(track.duration)}`}</div> */}
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
