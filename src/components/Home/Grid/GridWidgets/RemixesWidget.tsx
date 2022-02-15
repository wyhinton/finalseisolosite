import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import FlexRow from "@components/UI/FlexRow";
import tracks from "@static/tracks";
import { useApp, usePlaylist, useQuery } from "@hooks";
import TrackItem from "./TrackItem";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";
import DiamondShape from "./RemixWidgets/DiamondShape";
import FlowerShape from "./RemixWidgets/FlowerShape";
import MirrorShape from "./RemixWidgets/MirrorShape";
import ShapeContainer from "./RemixWidgets/ShapeContainer";
import FlexBreak from "@components/UI/FlexBreak";
import ReactAudioPlayer from "react-audio-player";
import TrackControl from "../TrackControl/TrackControl";
import FlexColumn from "@components/UI/FlexColumn";

const RemixesWidget = (): JSX.Element => {
  const remixParts = tracks.filter((track) => track.category === "remix");
  const { currentTrack } = usePlaylist();

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
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "40%",
            border: "1px solid red",
            flexDirection: "row",
          }}
        >
          {remixParts
            .filter((t) => t.title === currentTrack.title)
            .map((track, i) => {
              const { currentTrack } = usePlaylist();
              const [isActive, setIsActive] = useState(
                track.title === currentTrack.title
              );
              const variants = {
                normal: {
                  scale: 1,
                  zIndex: 0,
                },
                active: {
                  scale: 1.5,
                  zIndex: 1,
                },
              };

              useEffect(() => {
                console.log(isActive);
                // if (     track.title === currentTrack.title){}
                setIsActive(track.title === currentTrack.title);
              }, [currentTrack]);

              return (
                <TrackItem key={i} track={track} useBox={false}>
                  {getShape(track)}
                </TrackItem>
              );
            })}
        </div>
        <FlexColumn style={{ width: "100%" }}>
          {remixParts.map((track, i) => {
            const { currentTrack } = usePlaylist();
            const [isActive, setIsActive] = useState(
              track.title === currentTrack.title
            );

            useEffect(() => {
              console.log(isActive);
              // if (     track.title === currentTrack.title){}
              setIsActive(track.title === currentTrack.title);
            }, [currentTrack]);

            return <TrackControl key={i} track={track} />;
          })}
        </FlexColumn>
      </div>
    </FlexBreak>
  );
};

export default RemixesWidget;

const TrackText = ({ track }: { track: Track }): JSX.Element => {
  const { playTrack, setInfoDisplayMode } = usePlaylist();

  const { isSm } = useQuery();

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
      {isSm && (
        <ReactAudioPlayer
          onPlay={(e) => {
            playTrack(track);
          }}
          src={track.src}
          controls
          style={{
            width: "150%",
            height: 20,
            paddingRight: "2vmin",
            zIndex: 100000,
          }}
        />
      )}
      <motion.div
        onClick={(e) => {
          playTrack(track);
          setInfoDisplayMode("bio");
        }}
        // variants={variants}

        style={{
          width: isSm ? "250%" : "auto",
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
