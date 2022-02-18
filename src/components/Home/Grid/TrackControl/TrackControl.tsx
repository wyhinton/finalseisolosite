import { usePlaylist } from "@hooks";
import { Track } from "@interfaces/Track";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef, useContext } from "react";
import PlayPauseSwitch from "./PlayPauseSwitch";
import { Range } from "react-range";
import theme from "@static/theme";
import TrackTitle from "./TrackTitle";
import RangeControls from "./RangeControls";
import HomeContext from "@components/Home/HomeContext";

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
    if (track.category === "remix" && audioRef.current) {
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
      if (audioRef.current) {
        console.log(
          document.getElementById("video_" + track.title) as HTMLMediaElement
        );
        // setTimeout
        audioRef.current = document.getElementById(
          "video_" + track.title
        ) as HTMLMediaElement;

        audioRef.current.addEventListener("play", () => {
          setPaused(false);
        });
        audioRef.current.addEventListener("timeupdate", (e) => {
          const el = e.target as HTMLAudioElement;
          setProgress(el.currentTime);
        });
        audioRef.current.addEventListener("pause", (e) => {
          setPaused(true);
        });
      }
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
    // height: "max(4vmin, 50px)",
    height: "min-content",
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
    // borderRight: `1px solid ${theme.secondary}`,
    // backgroundColor: "blue",
  };

  const bStyle = {
    display: "flex",
    height: "40%",
    alignItems: "center",
  };

  return (
    <TrackContainer track={track}>
      <motion.div style={bodyStyle}>
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
            <div
              style={{
                fontSize: fontSize,
                position: "absolute",
                zIndex: 1,
                pointerEvents: "none",
                width: "50%",
                textAlign: "left",
              }}
            ></div>
          </div>
          <TrackTitle track={track} />
        </motion.div>
        <RangeControls track={track} />
      </motion.div>
    </TrackContainer>
  );
};

const TrackContainer = ({
  children,
  track,
}: {
  track: Track;
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const { isLoaded } = useContext(HomeContext);

  const bodyVariants = {
    in: {
      y: 0,
      transition: {
        delay: track.position * 0.4,
        duration: 0.2,
      },
    },
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: `${theme.primary}`,
    display: "flex",
    flexDirection: "column",
    // top: "50%",
    // left: "30%",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "5vmin",
    overflow: "hidden",
    marginBottom: "1vmin",
  } as React.CSSProperties;

  return (
    <motion.div
      animate={isLoaded ? "in" : ""}
      className="track-container"
      whileHover={{ backgroundColor: "#231f20", transition: { duration: 0.1 } }}
      variants={bodyVariants}
      style={{ ...containerStyle, y: -100 }}
    >
      {children}
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
