import React, { useState, useEffect } from "react";
import { Track } from "@interfaces/Track";
// import Canvas from 'react-responsive-canvas';
import { usePlaylist, useQuery } from "@hooks";
import theme from "@static/theme";
import FlexRow from "@components/UI/FlexRow";
import Time from "@components/Home/Player/Time";
import MediaControls from "@components/Home/Nav/MediaControls";
import { motion } from "framer-motion";
import InfoPopup from "./InfoPopup";
import { useMediaQuery } from "react-responsive";

function formatTrackText(track: Track): string {
  return `${track.artist} - ${track.title}`;
}
const AppBar = ({}: {}): JSX.Element => {
  const { setInfoDisplayMode, currentTrack } = usePlaylist();

  // const onUiClick = (i: InfoDisplayMode) => {
  //   console.log("DOING ON UI CLICK");
  //   setInfoDisplayMode(i)
  // }
  const [innerText, setInnerText] = useState("");

  useEffect(() => {
    // console.log(myVal)
    // myVal.current = item
    setInnerText(formatTrackText(currentTrack));
  }, [currentTrack]);

  const { isSm } = useQuery();

  return (
    <FlexRow
      // onClick={(e) => {
      //     setInfoDisplayMode("bio")
      // }}
      style={{
        // position: "absolute",
        position: "fixed",
        zIndex: 10000,
        // top: "100%",
        // bottom: 0,
        bottom: "0",
        left: "0%",
        // bottom: "0%",
        // width: "fit-content",
        // height: "fit-content",
        height: isSm ? theme.appBarHeightMobile : theme.appBarHeight,
        backgroundColor: theme.primaryDark,
        borderBottom: "1px solid black",
        width: "100vw",

        // transform: "translate(0%, 50%)",
        // zIndex: 1,
        fontSize: "6vmin",
        // fontSize: theme.titleFont,
        // fontSize: theme.widgetFontSize,
        overflow: "visible",
        justifyContent: "left",

        // border: `1px solid blue`,
      }}
    >
      <FlexRow justifycontent="flex-start">
        <TrackTitle />
        <MediaControls />
        <Time />
      </FlexRow>
    </FlexRow>
  );
};

const TrackTitle = ({}: {}): JSX.Element => {
  const { setInfoDisplayMode, currentTrack, infoDisplayMode } = usePlaylist();
  const [innerText, setInnerText] = useState("");

  useEffect(() => {
    // console.log(myVal)
    // myVal.current = item
    setInnerText(formatTrackText(currentTrack));
  }, [currentTrack]);

  return (
    <motion.div
      style={{
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "nowrap",
        textDecoration: "underline",
        width: "fit-content",
        margin: "auto",
        color: theme.white,
        // color: theme.white,
        // backgroundColor: "red",
        paddingLeft: "3vmin",
        height: "100%",
        display: "flex",
        // paddingLeft: theme.padding,
        // paddingRight: theme.padding,
      }}
      onClick={(e) => {
        if (infoDisplayMode == undefined) {
          setInfoDisplayMode("bio");
        } else {
          setInfoDisplayMode(undefined);
        }
      }}
      whileHover={{
        color: theme.secondary,
        transition: {
          duration: 0.1,
        },
      }}
    >
      <div style={{ height: "fit-content" }}>{innerText}</div>
    </motion.div>
  );
};

export default AppBar;
