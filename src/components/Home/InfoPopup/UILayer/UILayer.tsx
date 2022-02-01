import React, { useEffect, useMemo, useState } from "react";
import theme from "@static/theme";
import { usePlaylist, useQuery } from "@hooks";
import { motion, Variants } from "framer-motion";
import ChromaticWidget from "./ChromaticWidget";
import TrackStats from "./TrackStats";
import ReactTypingEffect from "react-typing-effect";

const UILayer = ({}: {}): JSX.Element => {
  const { infoDisplayMode, currentTrack } = usePlaylist();

  const [innerText, setInnerText] = useState("");

  useEffect(() => {
    // const { bio, about } = currentTrack;
    if (infoDisplayMode == undefined) {
      setInnerText("");
    } else {
      setInnerText(currentTrack.id);
    }
    // setInnerText(currentTrack.id);
    // console.log(currentTrack.id);
  }, [currentTrack.title, infoDisplayMode]);

  const el = useMemo(() => {
    return (
      <ReactTypingEffect
        cursorRenderer={(cursor) => (
          <h1 style={{ display: "none" }}>{cursor}</h1>
        )}
        speed={100}
        // key={i}
        text={currentTrack.id}
        delay={0}
        // delay={i * 10}
        cursor={""}
        eraseDelay={10000000000000000}
        eraseSpeed={0}
        displayTextRenderer={(text, i) => {
          //   console.log(i);
          return (
            <div
              style={{
                color: "white",
                textTransform: "uppercase",
                fontSize: "3vmin",
                width: "100%",
              }}
            >
              {text}
            </div>
          );
        }}
      />
    );
  }, [currentTrack.title]);

  const variantsbio: Variants = {
    hidden: { opacity: 0, y: "-10vh", pointerEvents: "none" },

    visible: {
      y: "0vh",
      opacity: 1,
      pointerEvents: "all",
      transition: {
        ease: "circOut",
        duration: theme.infoPopupDuraiton,
        // delay: .5,
        repeatType: "reverse",
      },
    },
  };

  const variantsChromatic: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ease: "circOut",
        // duration: theme.infoPopupDuraiton,
        duration: 0.5,
        delay: 1.2,
        // repeatType: "reverse",
      },
    },
  };

  const { isMd, isLg, isSm } = useQuery();
  const { id } = currentTrack;
  return (
    <motion.div
      id="overlay-ui-container"
      initial={false}
      variants={variantsbio}
      animate={infoDisplayMode == undefined || isSm ? "hidden" : "visible"}
      style={{
        // display: "flex",
        flexDirection: "column",
        pointerEvents: "all",
        color: "black",
        position: "absolute",
        overflow: "visible",
        width: "15vw",
        bottom: `${30 + 7}vh`,
        height: "50vh",
        padding: theme.padding,
        justifyContent: "flex-end",
        alignItems: "baseline",
        zIndex: 1000,
        border: "1px solid white",
        // border: "1px solid red",

        // opacity: isSm ? 0 : 1,
      }}
    >
      {infoDisplayMode !== undefined && el}
      {/* <ReactTypingEffect
        cursorRenderer={(cursor) => (
          <h1 style={{ display: "none" }}>{cursor}</h1>
        )}
        speed={100}
        // key={i}
        text={innerText}
        delay={0}
        // delay={i * 10}
        cursor={""}
        eraseDelay={10000000000000000}
        eraseSpeed={0}
        displayTextRenderer={(text, i) => {
          //   console.log(i);
          return (
            <div
              style={{
                color: "white",
                textTransform: "uppercase",
                fontSize: "3vmin",
                width: "100%",
              }}
            >
              {text}
            </div>
          );
        }}
      /> */}
      <motion.div
        // style={{ backgroundColor: "red",o pacity: 0 }}
        variants={variantsChromatic}
        animate={infoDisplayMode == undefined ? "hidden" : "visible"}
      >
        <ChromaticWidget />
      </motion.div>
      {/* <Beats /> */}
      <TrackStats />
    </motion.div>
  );
};

export default UILayer;
