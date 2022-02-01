import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import theme from "@static/theme";

const ComposerNames = ({
  activeIndex,
  activeTrack,
}: {
  activeIndex: number;
  activeTrack: number;
}): JSX.Element => {
  useEffect(() => {
    // console.log(activeTrack);
  }, [activeTrack]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        //   border: "1px solid red",
        position: "absolute",
        // top: "0%",
        zIndex: 1000,
        fontSize: theme.widgetFontSize,
        color: "grey",
        // transform: "translate(0, 50%)",
        pointerEvents: "none",
        paddingLeft: ".5em",
        paddingRight: ".5em",
        alignItems: "center",
        height: "100%",

        // border: "1px solid red",
      }}
    >
      <ComposerTitle
        activeTrack={activeTrack}
        hovered={activeIndex == 0}
        isActiveTrack={activeTrack == 0}
      >
        Bach
      </ComposerTitle>
      <ComposerTitle
        activeTrack={activeTrack}
        hovered={activeIndex == 1}
        isActiveTrack={activeTrack == 1}
      >
        Bartók
      </ComposerTitle>
      <ComposerTitle
        activeTrack={activeTrack}
        hovered={activeIndex == 2}
        isActiveTrack={activeTrack == 2}
      >
        Ysaÿe
      </ComposerTitle>
    </div>
  );
};

export default ComposerNames;

const ComposerTitle = ({
  children,
  hovered,
  isActiveTrack,
  activeTrack,
}: {
  children: string;
  hovered?: boolean;
  isActiveTrack: boolean;
  activeTrack: number;
}): JSX.Element => {
  const variants: Variants = {
    normal: { color: "black" },
    hovered: {
      color: "white",
      backgroundColor: theme.primaryMedium,
      transition: {
        ease: "circOut",
        duration: 0.1,
      },
    },
    repeat: {
      scale: 4,
      color: "black",
      transition: {
        ease: "circOut",
        duration: 0.1,
        repeat: Infinity,
      },
    },
  };

  // console.log(hovered);
  const bubbleSize = "3vmin";
  return (
    <motion.div
      animate={hovered ? "hovered" : "normal"}
      style={{
        padding: ".15em",
        // color: hovered ? "black" : "grey",
        textAlign: "center",
        fontSize: "max(20px, 3vmin)",
        // fontSize: theme.widgetFontSize,
        position: "relative",
        paddingRight: "1em",
      }}
      variants={variants}
    >
      {/* <motion.div
        // initial={isActiveTrack ? "visible" : "hidden"}
        style={{
          backgroundColor: "red",
          width: bubbleSize,
          height: bubbleSize,
          transform: "translate(-50%,-50%)",
          top: "50%",
          left: "50%",
          position: "absolute",
          borderRadius: "50%",
          zIndex: -1,
        }}
        variants={variants}
        animate={isActiveTrack ? "active" : "hidden"}
      ></motion.div> */}
      {children}
    </motion.div>
  );
};
