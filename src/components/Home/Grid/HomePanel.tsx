import React, { useState, useEffect, useRef, useContext } from "react";
import { useApp, usePlaylist, useQuery } from "@hooks";
import { motion, Variants } from "framer-motion";
import "@css/blockquote.scss";
// import Model from "@components/Home/Model";
import { Layout } from "react-grid-layout";
import "@css/Layout.scss";
export type HomeMode = "player" | "notes" | "about";
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import GridLayout from "@components/Home/Grid/GridLayoutTools/GridLayout";
import RecitalWidgets from "@components/Home/Grid/GridWidgets/RecitalWidgets";
import ThreeRemixes from "@components/Home/Grid/GridWidgets/ThreeRemixes";
import OneRecitalTextWidget from "@components/Home/Grid/GridWidgets/OneRecitalTextWidget";
import RemixesWidget from "@components/Home/Grid/GridWidgets/RemixesWidget";
import "@css/Body.scss";
import { defaultLayout } from "@static/gridLayouts";
import theme from "@static/theme";
import FlexColumn from "@components/UI/FlexColumn";
import TitleIcon from "./GridWidgets/TitleIcon";
import HomeContext from "../HomeContext";
import TrackControl from "./TrackControl/TrackControl";
import tracks from "@static/tracks";

const HomePanel = (): JSX.Element => {
  const { infoDisplayMode } = usePlaylist();
  const { isLoaded } = useContext(HomeContext);

  const variants: Variants = {
    regular: { opacity: 1, x: 0 },
    infoPopup: {
      opacity: 0.0,
      transition: {
        ease: "linear",
        duration: 0.5,
      },
    },
    start: {
      x: "0%",
      y: "0%",
      opacity: 1,
      // x: [-500, 0],
      transition: {
        duration: 0.5,
        delay: 1,
        delayChildren: 0.1,
      },
    },
  };

  const { isSm } = useQuery();

  const [animation, setAnimation] = useState("");

  useEffect(() => {
    console.log(isLoaded, infoDisplayMode);
    if (isLoaded && animation !== "start") {
      setAnimation("start");
    } else if (infoDisplayMode !== undefined) {
      setAnimation("infoPopup");
    } else if (isLoaded) {
      console.log("SETING TO REGULAR");
      setAnimation("regular");
    }
  }, [isLoaded, infoDisplayMode]);

  return (
    <motion.section
      // variants={variants}
      // animate={animation}
      id="home-body"
      // className="grid-fill"

      style={{
        width: isSm ? "100vw" : "33vw",
        height: "100vh",
        maxHeight: "100vh",
        paddingBottom: isSm ? "30em" : "",
        backgroundColor: theme.primary,
        display: "flex",
        // y: "10%",
        // opacity: 0,

        flexDirection: "column",
      }}
      // initial={false}
      // animate={isLoaded ? "start" : ""}
    >
      <TitleIcon key="title" />
      {/* <OneRecitalTextWidget key="oneRecitalText" /> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tracks.map((track, i) => {
          <TrackControl key={i} track={track} />;
        })}
      </div>
      {/* <RecitalWidgets key="recitalTracks" /> */}
      {/* <ThreeRemixes key="threeRemixes" /> */}
      {/* <RemixesWidget key="remixes" /> */}
    </motion.section>
  );
};

export default React.memo(HomePanel);
