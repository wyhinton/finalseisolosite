import theme from "@static/theme";
import FlexColumn from "@components/UI/FlexColumn";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef, useContext } from "react";
import { HomeContext } from "../../pages/Home";

const LoadingScreen = (): JSX.Element => {
  const homeContext = useContext(HomeContext);
  const { progress, setIsLoaded } = homeContext;
  useEffect(() => {
    console.log(progress);
    if (progress === 100) {
      setIsLoaded(true);
    }
  }, [progress]);
  const variants = {
    in: {
      //   height: "200px",
      //   width: "200px",

      opacity: 1,
    },
    out: {
      //   height: "0px",
      //   width: "0px",
      opacity: 0,
      y: -100,

      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      variants={variants}
      //   className="dot-fill"
      id="loading-scren-section"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        pointerEvents: "none",
        // border: "5px solid black",
        padding: "5em",
        // border: `5px solid ${theme.secondary}`,
        position: "absolute",
        zIndex: 10000,
        opacity: 0,
      }}
      animate={progress == 100 ? "out" : "in"}
    >
      <FlexColumn
        style={{
          fontSize: "10vmin",
          textAlign: "center",
          whiteSpace: "break-spaces",
          width: "50%",
          margin: "0 !important",
          height: "fit-content",
        }}
      >
        <motion.div
          animate={{ y: -0, opacity: 1 }}
          style={{
            y: 100,
            opacity: 0,
            backgroundColor: theme.primary,
            borderRadius: theme.borderRadius,
          }}
        >
          {`${progress}%`}
        </motion.div>
      </FlexColumn>
    </motion.section>
  );
};

export default LoadingScreen;
