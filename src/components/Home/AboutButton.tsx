import { useApp, useQuery, useToggle } from "@hooks";
import theme from "@static/theme";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const AboutButton = (): JSX.Element => {
  //   const [visible, setVisible] = useState(false)
  const [visible, toggle] = useToggle(false);
  const { setAppMode } = useApp();

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
        fontSize: theme.widgetFontSize,
        backgroundColor: isSm ? theme.secondary : "",
      }}
      onClick={(e) => {
        toggle();
        setAppMode("projectInfo");
        console.log("clicked about");
      }}
    >
      {isSm ? "" : "About"}
      {/* {appMode === "projectInfo" && } */}
    </motion.div>,
    document.getElementById("top-right") as HTMLDivElement
  );
};

export default React.memo(AboutButton);
