import { useApp, useQuery, useToggle } from "@hooks";
import theme from "@static/theme";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { HomeContext } from "../../pages/Home";

const AboutButton = (): JSX.Element => {
  //   const [visible, setVisible] = useState(false)
  const [visible, toggle] = useToggle(false);
  const { setAppMode, appMode } = useApp();
  console.log(appMode);
  const { isSm } = useQuery();
  const { isLoaded } = useContext(HomeContext);

  const variants = {
    start: {
      y: "0%",
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      height: "0px",
      width: "0px",
      transition: {
        duration: 0.5,
      },
    },
  };

  const containerVariants = {
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  return ReactDOM.createPortal(
    <motion.div
      whileHover={{
        backgroundColor: theme.primaryDark,
      }}
      animate={isLoaded ? "in" : ""}
      variants={containerVariants}
      style={{
        borderRadius: "40px",
        border: `1px solid ${theme.secondary}`,
        width: "max(10vw, 12vmin)",
        height: "6vmin",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "1vh",
        color: isSm ? "black" : "white",
        fontSize: "max(17px, 3vmin)",
        opacity: 0,
        y: "4min",
        // border: "1px solid red",
        backgroundColor: isSm ? theme.secondary : theme.primary,
      }}
      onClick={(e) => {
        // toggle();
        if (appMode === "projectInfo") {
          console.log("setting to view");
          setAppMode("view");
        } else {
          setAppMode("projectInfo");
        }
        console.log(appMode);
        console.log("clicked about");
      }}
    >
      <AnimatePresence>
        {appMode !== "projectInfo" && (
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // scale: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            About
          </motion.div>
        )}
      </AnimatePresence>
      {/* {isSm || appMode === "projectInfo" ? "" : ""} */}

      <AnimatePresence>
        {appMode === "projectInfo" && (
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              y: "-100%",
              scale: 0,
            }}
            variants={variants}
            initial={"start"}
            animate={{ y: "0%" }}
            exit={{ opacity: 0 }}
          >
            <CloseButton />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.getElementById("top-right") as HTMLDivElement
  );
};

export default React.memo(AboutButton);

const CloseButton = ({}: {}): JSX.Element => {
  // const { appMode, setAppMode } = useApp();

  return (
    <div
      onMouseUp={(e) => {}}
      style={{
        width: "80%",
        height: "80%",
        display: "flex",
      }}
    >
      <svg
        viewBox="0 0 79.3 77.6"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <path
          fill={theme.secondary}
          //   fill="black"
          d="M75.9,60L53.8,37.9l20.4-20.4c3.9-3.9,3.9-10.2,0-14.1S63.9-0.5,60,3.4L39.6,23.8L19.3,3.4
C15.4-0.5,9-0.5,5.1,3.4c-3.9,3.9-3.9,10.2,0,14.1l20.4,20.4L3.4,60c-3.9,3.9-3.9,10.2,0,14.1c3.9,3.9,10.2,3.9,14.1,0l22.1-22.1
 l22.1,22.1c3.9,3.9,10.2,3.9,14.1,0C79.8,70.2,79.8,63.9,75.9,60z"
        />
      </svg>
    </div>
  );
};
