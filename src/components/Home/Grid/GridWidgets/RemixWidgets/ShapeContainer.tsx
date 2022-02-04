import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import { useIsPlaying, usePlaylist } from "@hooks";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";

const ShapeContainer = ({
  track,
  viewBox,
  children,
}: {
  track: Track;
  viewBox: string;
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const variants: Variants = {
    paused: { opacity: 1, x: 0 },
    active: {
      rotate: 360,
      transition: {
        ease: "linear",
        duration: 5,
        repeat: Infinity,
        // repeatType: "mirror",
      },
    },
  };

  const containerVari = {
    rest: { scale: 1 },
    hover: { scale: 2 },
  };

  const blockDotVari = {
    rest: {
      height: "200px",
      width: "200px",
    },
    hover: {
      height: "50px",
      width: "50px",
      transition: {
        // duration: duration,
      },
    },
  };
  const { isPlaying, currentTrack } = usePlaylist();

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(currentTrack.title === track.title && isPlaying);
  }, [currentTrack, isPlaying]);

  return (
    <motion.div
      className="shapeContainer"
      style={{
        // backgroundColor: "red",
        // height: "100%",
        height: "fit-content",
        // height: "min-content",
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        // padding: ".5em",
        borderRadius: theme.borderRadius,
        overflow: "visible",
      }}
      // whileHover={{
      //   backgroundColor: theme.secondaryHover,
      //   scale: 1.1,

      //   transition: {
      //     duration: 0.1,
      //     ease: "circOut",
      //   },
      // }}
      whileHover="hover"
    >
      {/* <motion.div
        style={{
          position:"absolute",
          width: 10,
          height: 10,
          backgroundColor: "red",
        }}
        variants= {blockDotVari}
      ></motion.div> */}
      <motion.svg
        variants={variants}
        viewBox={viewBox}
        animate={animate ? "active" : "paused"}
        // vertOriginX={0.5}
        style={{ originX: "50%", originY: "50%" }}
      >
        {children}
      </motion.svg>
    </motion.div>
  );
};

export default ShapeContainer;
