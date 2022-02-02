import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import FlexRow from "@components/UI/FlexRow";
import tracks from "@static/tracks";
import {
  useHomeActions,
  useHomeState,
  useIsPlaying,
  usePlaylist,
  useQuery,
} from "@hooks";
import PlayPauseControls from "./TrackItem/PlayPauseControls";
import TrackAudio from "../../Player/TrackAudio";
import BigText from "./BigText";
import TrackItem from "./TrackItem";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";
import DiamondShape from "./RemixWidgets/DiamondShape";
import FlowerShape from "./RemixWidgets/FlowerShape";
import MirrorShape from "./RemixWidgets/MirrorShape";
import ShapeContainer from "./RemixWidgets/ShapeContainer";
import FlexBreak from "@components/UI/FlexBreak";
import ReactAudioPlayer from "react-audio-player";

const RemixesWidget = (): JSX.Element => {
  const remixParts = tracks.filter((track) => track.category === "remix");

  const getShape = (t: Track) => {
    let el = <></>;
    let vb = "";
    switch (t.title) {
      case "Believe":
        // viewBox="0 0 261 261"
        el = <FlowerShape track={t} />;
        vb = "0 0 261 261";
        break;
      case "Revolving Melody":
        // viewBox="0 0 221 221"
        // el = <DiamondShape track={t} />;
        el = <MirrorShape track={t} />;
        vb = "0 0 200 200";
        // vb = "0 0 257 257";
        break;
      default:
        // viewBox="0 0 257 231.2"
        vb = "0 0 257 257";
        el = <DiamondShape track={t} />;
    }
    return (
      <ShapeContainer track={t} viewBox={vb}>
        {el}
      </ShapeContainer>
    );
  };

  return (
    <FlexBreak
      style={{
        height: "100%",
        width: "100%",
        fontFamily: theme.primaryFont,
        fontSize: "6rem",
        display: "flex",
        pointerEvents: "all",
        justifyContent: "center",
      }}
      break={"sm"}
    >
      {remixParts.map((track, i) => {
        return (
          <TrackItem key={i} track={track} useBox={false}>
            <TrackText track={track} />
            <motion.div
              // scale={0}
              // y={10}
              initial={false}
              animate={{
                scale: [0, 1],
                rotateZ: [0, 90],
                transition: {
                  // duration: 0.5,
                  delay: i * 0.5,
                }
              }}
            >
              {getShape(track)}
            </motion.div>
          </TrackItem>
        );
      })}
    </FlexBreak>
  );
};

export default RemixesWidget;

const TrackText = ({ track }: { track: Track }): JSX.Element => {
  const { playTrack, setInfoDisplayMode } = usePlaylist();

  const { isSm } = useQuery()

  return (
    <div
      style={{
        zIndex: 100,
        width: "100%",
        // height: "10%",
        height: 100,
        position: "relative",
        top: isSm ? "76%" : "0%",
        // top: isSm ? "50%" : "0%",
        left: isSm ? "" : "50%",
        right: isSm ? "-190%" : "",


        transform: "translate(-50%,-50%)",
        textAlign: "left",

        // textAlign: "center",
        // pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
        // fontSize: theme.mediumFont,
        // fontSize: theme.widgetFontSize,


        // backgroundColor: theme.secondary,
        color: theme.primaryDark,
        // color: "black",
      }}
    >
      {isSm && <ReactAudioPlayer

        onPlay={(e) => { playTrack(track) }}
        src={track.src} controls style={{ width: "150%", height: 20, paddingRight: "2vmin", zIndex: 100000 }} />}
      <motion.div
        onClick={(e) => {
          playTrack(track);
          setInfoDisplayMode("bio");
        }}
        // variants={variants}

        style={{
          width: "250%",
          // zIndex: 100,
          // width: "100%",
          // height: "10%",
          // position: "relative",
          // top: isSm ? "50%" : "0%",
          // left: isSm ? "" : "50%",
          // right: isSm ? "-190%" : "",


          // transform: "translate(-50%,-50%)",
          // textAlign: "left",

          // // textAlign: "center",
          // // pointerEvents: "none",
          // display: "flex",
          // flexDirection: "row",
          // alignItems: "center",
          // justifyContent: "center",
          // pointerEvents: "all",
          // fontSize: theme.mediumFont,
          // fontSize: theme.widgetFontSize,


          // backgroundColor: theme.secondary,
          color: theme.primaryDark,
          // color: "black",
        }}
        whileHover={{
          backgroundColor: theme.primaryMedium,
          color: "rgb(255, 255, 255)",
          // scale: 1.1,
        }}
      >

        {track.artist}
      </motion.div>
    </div>
  );
};
