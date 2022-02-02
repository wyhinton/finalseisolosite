import { useApp, useQuery, useToggle } from "@hooks";
import theme from "@static/theme";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const AboutButton = (): JSX.Element => {
  //   const [visible, setVisible] = useState(false)
  const [visible, toggle] = useToggle(false);
  const { setAppMode, appMode } = useApp();

  const { isSm } = useQuery();

  // const variants= {
  //   normal: {
  //     height: "200px",
  //     width: "200px",
  //   },
  //   hidden : {
  //     height: "0px",
  //     width: "0px",
  //     transition: {
  //       duration: duration,
  //     },
  //   },
  // };

  return ReactDOM.createPortal(
    <motion.div
      whileHover={{
        backgroundColor: theme.primaryDark,
      }}
      style={{
        borderRadius: "40px",
        border: `1px solid ${theme.secondary}`,
        height: "max(17px, 3vmax)",
        // height: "5vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "1vh",
        color: isSm ? "black" : "white",
        // fontSize: theme.widgetFontSize,
        fontSize: "max(17px, 3vmin)",
        backgroundColor: isSm ? theme.secondary : "",
      }}
      onClick={(e) => {
        toggle();
        setAppMode("projectInfo");
        console.log("clicked about");
      }}
    >
      {isSm || appMode === "projectInfo" ? "" : "About"}
      {appMode === "projectInfo" && <CloseButton />}
      {/* {appMode === "projectInfo" && } */}
    </motion.div>,
    document.getElementById("top-right") as HTMLDivElement
  );
};

export default React.memo(AboutButton);


const CloseButton = ({ }: {}): JSX.Element => {

  const { appMode, setAppMode } = useApp();

  return (

    <div
      onMouseUp={(e) => {
        setAppMode("create")
      }}
      style={{
        // display: infoDisplayMode !== undefined ? "block" : "none",
        // position: "absolute",
        // top: offset,
        // left: offset,
        width: "80%",
        height: "80%",
        display: "flex",
        // width: "100%",
        // height: "100%",
        // left: "50%",
        // top: "50%",
        // transform: "translate(-50%, -50%)",
        // width: closeSize,
        // height: closeSize,
        // backgroundColor: "red",
        // zIndex: 1000,CloseButton
        // backgroundColor: "red",
        // backgroundColor: "red",
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
          fill={"black"}
          //   fill="black"
          d="M75.9,60L53.8,37.9l20.4-20.4c3.9-3.9,3.9-10.2,0-14.1S63.9-0.5,60,3.4L39.6,23.8L19.3,3.4
C15.4-0.5,9-0.5,5.1,3.4c-3.9,3.9-3.9,10.2,0,14.1l20.4,20.4L3.4,60c-3.9,3.9-3.9,10.2,0,14.1c3.9,3.9,10.2,3.9,14.1,0l22.1-22.1
 l22.1,22.1c3.9,3.9,10.2,3.9,14.1,0C79.8,70.2,79.8,63.9,75.9,60z"
        />
      </svg>
    </div>
  )
}