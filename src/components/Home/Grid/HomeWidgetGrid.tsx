import React, { useState, useEffect, useRef } from "react";
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

const HomeWidgetGrid = (): JSX.Element => {
  const audio = useRef(null);

  useEffect(() => {
    audio.current = new AudioContext();
  }, []);

  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);
  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);
  const { trackCategory, infoDisplayMode } = usePlaylist();
  const { appMode } = useApp();

  useEffect(() => {
    let newLayout: Layout[] = [...curLayout];
  }, [trackCategory, appMode]);

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
      x: [-500, 0],
    },
  };

  const { isSm } = useQuery();

  return (
    <motion.section
      variants={variants}
      animate={infoDisplayMode !== undefined ? "infoPopup" : "regular"}
      id="home-body"
      style={{
        width: "30vw",
        height: "100vh",
        // width: "100vw",
        maxHeight: "100vh",
        overflowY: "scroll",
        // overflowY: isSm ? "scroll" : "hidden",
        paddingBottom: isSm ? "30em" : "",
        // border: "1px solid black",
        backgroundColor: theme.primary,
        display: "flex",
        flexDirection: "column",

        // backgroundColor: "red",
      }}
      initial={"start"}
    >
      <Title key="title" />
      <OneRecitalTextWidget key="oneRecitalText" />
      <RecitalWidgets key="recitalTracks" />
      <ThreeRemixes key="threeRemixes" />
      <RemixesWidget key="remixes" />
    </motion.section>
  );
};

export default React.memo(HomeWidgetGrid);

type LayoutPos = Pick<Layout, "x" | "y" | "w" | "h">;

function alterLayout(id: string, layout: Layout[], newLayout: LayoutPos) {
  console.log(layout);
  const toGet = layout.filter((l) => l.i === id)[0];
  const ind = layout.indexOf(toGet);
  // layout[ind] = { i: id, ...newLayout };
}

const Title = (): JSX.Element => {
  const { isSm } = useQuery();

  return (
    <FlexColumn id="title-container">
      <svg>
        <g>
          <path
            fill={theme.secondary}
            d="M47.5,0.5H35.8c-0.7,0-1.3,0.5-1.8,1.4c-0.5,1-0.8,2-0.8,3.2v2.3l-3.9-6.9H13.6L0.5,16.6v36.7l19.6,11.5h10.5
		l2.6-6.9v13.8H21.4L7,62.4H3.1c-0.7,0-1.3,0.5-1.8,1.4c-0.5,1-0.8,2-0.8,3.2v27.5c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4
		h13.1c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2v-2.3l3.9,6.9h14.4l13.1-22.9V46.4L30.6,32.6H20.1l-2.6,9.2V28h13.1l13.1,9.2h3.9
		c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2V5.1c0-1.1-0.3-2.2-0.8-3.2C48.8,1,48.2,0.5,47.5,0.5z"
          />
          <path
            fill={theme.secondary}
            d="M93.3,0.5H72.4l-3.9,4.2c-0.1-1-0.3-1.9-0.8-2.7c-0.5-1-1.1-1.4-1.8-1.4H55.4c-0.7,0-1.3,0.5-1.8,1.4
		c-0.5,1-0.8,2-0.8,3.2v20.6c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4H57l-4.3,6.9v34.4l12.4,27.5h3.3h24.8
		c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2V73.9c0-1.1-0.3-2.2-0.8-3.2c-0.5-1-1.1-1.4-1.8-1.4H68.4V45.9L75,62.4h17
		c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2V39.5c0-1.1-0.3-2.2-0.8-3.2c-0.5-1-1.1-1.4-1.8-1.4H72.4l-2.2-4.6h23.1
		c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2V5.1c0-1.1-0.3-2.2-0.8-3.2C94.5,1,93.9,0.5,93.3,0.5z"
          />
          <path
            fill={theme.secondary}
            d="M122,0.5h-20.9c-0.7,0-1.3,0.5-1.8,1.4c-0.5,1-0.8,2-0.8,3.2V28c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4
		h0.2l-2.8,11.5v50.5c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4H122c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2V78.5
		c0-1.1-0.3-2.2-0.8-3.2c-0.5-1-1.1-1.4-1.8-1.4h-1.3l3.9-11.5V5.1c0-1.1-0.3-2.2-0.8-3.2C123.3,1,122.7,0.5,122,0.5z"
          />
          <path
            fill={theme.secondary}
            d="M174.3,0.5h-11.8c-0.7,0-1.3,0.5-1.8,1.4c-0.5,1-0.8,2-0.8,3.2v2.3L156,0.5h-15.7l-13.1,16.1v36.7l19.6,11.5
		h10.5l2.6-6.9v13.8h-11.8l-14.4-9.2h-3.9c-0.7,0-1.3,0.5-1.8,1.4c-0.5,1-0.8,2-0.8,3.2v27.5c0,1.1,0.3,2.2,0.8,3.2
		c0.5,1,1.1,1.4,1.8,1.4h13.1c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2v-2.3l3.9,6.9h14.4l13.1-22.9V46.4l-19.6-13.8h-10.5
		l-2.6,9.2V28h13.1l13.1,9.2h3.9c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2V5.1c0-1.1-0.3-2.2-0.8-3.2C175.5,1,174.9,0.5,174.3,0.5
		z"
          />
          <path
            fill={theme.secondary}
            d="M221.3,0.5H190l-10.5,18.4v75.7c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4h31.4l10.5-18.4V5.1
		c0-1.1-0.3-2.2-0.8-3.2C222.6,1,222,0.5,221.3,0.5z M209.6,69.3H203l-1.3-9.2h-7.8V30.3h6.5l1.3,9.2h7.8V69.3z"
          />
          <path
            fill={theme.secondary}
            d="M264.5,46.4H254l-10.5,18.4V46.4l5.3-9.3c0.4-0.8,0.8-1.6,0.9-2.4c0.2-0.8,0.3-1.9,0.3-3.1V5.1
		c0-1.1-0.3-2.2-0.8-3.2c-0.5-1-1.1-1.4-1.8-1.4h-18.3c-0.7,0-1.3,0.5-1.8,1.4c-0.5,1-0.8,2-0.8,3.2V28c0,1.1,0.3,2.2,0.8,3.2
		c0.5,1,1.1,1.4,1.8,1.4h0.2l-2.8,11.5v50.5c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4h18.3l5.2-6.9v2.3c0,1.1,0.3,2.2,0.8,3.2
		c0.5,1,1.1,1.4,1.8,1.4h9.1c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2V51c0-1.1-0.3-2.2-0.8-3.2C265.7,46.9,265.1,46.4,264.5,46.4
		z"
          />
          <path
            fill={theme.secondary}
            d="M311.5,0.5h-31.4l-10.5,18.4v75.7c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4h31.4l10.5-18.4V5.1
		c0-1.1-0.3-2.2-0.8-3.2C312.7,1,312.1,0.5,311.5,0.5z M299.7,69.3h-6.5l-1.3-9.2h-7.8V30.3h6.5l1.3,9.2h7.8V69.3z"
          />
          <path
            fill={theme.secondary}
            d="M335,69.3h-14.4c-0.7,0-1.3,0.5-1.8,1.4c-0.5,1-0.8,2-0.8,3.2v20.6c0,1.1,0.3,2.2,0.8,3.2
		c0.5,1,1.1,1.4,1.8,1.4H335c0.7,0,1.3-0.5,1.8-1.4c0.5-1,0.8-2,0.8-3.2V73.9c0-1.1-0.3-2.2-0.8-3.2C336.3,69.8,335.7,69.3,335,69.3
		z"
          />
          <path
            fill={theme.secondary}
            d="M365.1,0.5h-20.9c-0.7,0-1.3,0.5-1.8,1.4c-0.5,1-0.8,2-0.8,3.2V28c0,1.1,0.3,2.2,0.8,3.2
		c0.5,1,1.1,1.4,1.8,1.4h0.2l-2.8,11.5v50.5c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4h20.9c0.7,0,1.3-0.5,1.8-1.4
		c0.5-1,0.8-2,0.8-3.2V78.5c0-1.1-0.3-2.2-0.8-3.2c-0.5-1-1.1-1.4-1.8-1.4h-1.3l3.9-11.5V5.1c0-1.1-0.3-2.2-0.8-3.2
		C366.3,1,365.7,0.5,365.1,0.5z"
          />
          <path
            fill={theme.secondary}
            d="M413.9,1.9c-0.5-1-1.1-1.4-1.8-1.4h-31.4l-10.5,18.4v75.7c0,1.1,0.3,2.2,0.8,3.2c0.5,1,1.1,1.4,1.8,1.4h31.4
		l10.5-18.4V5.1C414.7,3.9,414.5,2.9,413.9,1.9z M400.3,69.3h-6.5l-1.3-9.2h-7.8V30.3h6.5l1.3,9.2h7.8V69.3z"
          />
        </g>
      </svg>

      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: "0%",
          paddingLeft: isSm ? "10vmin" : "2vmin",
          // width: isSm ? "100%" : "fit-content",
          fontWeight: "bold",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
          // border: `1px solid ${theme.secondary}`,
          borderRight: `1px solid ${theme.secondary}`,
          borderBottom: `1px solid ${theme.secondary}`,
          // borderRadius: 10,
          fontFamily: theme.titleFontFamily,
          color: theme.secondary,
          backgroundColor: theme.primary,
          fontSize: "max(15px, 3vmin)",
          textTransform: "uppercase",
          WebkitTextStroke: `1px solid ${theme.secondary}`,
          zIndex: 100,
          height: theme.navHeight,
        }}
      >
        {"Seisolo.io"}
      </div> */}
      {/* <img
        id="title-logo"
        src={`${process.env.PUBLIC_URL}/SVG/LogoText.svg`}
      ></img> */}
      {/* <div>Remixing the Recital</div> */}
    </FlexColumn>
  );
};
// const Title = (): JSX.Element => {
//   const { isSm } = useQuery();

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         left: "0%",
//         // top: 0,
//         // left: 0,
//         // padding: ".5rem",
//         // paddingLeft: theme.padding,
//         // paddingRight: theme.padding,
//         paddingLeft: isSm ? "10vmin" : "2vmin",
//         // height: "fit-content",
//         width: isSm ? "100%" : "fit-content",
//         fontWeight: "bold",
//         // paddingLeft: "1em",
//         margin: "auto",
//         display: "flex",
//         alignItems: "center",
//         // width: "100%",
//         textAlign: "left",
//         // border: `1px solid ${theme.secondary}`,
//         borderRight: `1px solid ${theme.secondary}`,
//         borderBottom: `1px solid ${theme.secondary}`,
//         // borderRadius: 10,
//         fontFamily: theme.titleFontFamily,
//         color: theme.secondary,
//         // color: "black",
//         // backgroundColor: theme.secondary,
//         backgroundColor: theme.primary,
//         // border:
//         // backgroundColor: theme.primaryDark,
//         // fontSize: 100,
//         // fontSize: 30,
//         fontSize: "max(15px, 3vmin)",
//         // fontSize: theme.titleFont,
//         // transform: "translate(-50%, 0%)",
//         // fontStyle: "ca"
//         textTransform: "uppercase",
//         // fontSize: theme.titleFont,
//         WebkitTextStroke: `1px solid ${theme.secondary}`,
//         zIndex: 100,
//         height: theme.navHeight,

//         // backgroundColor: theme.secondary,
//       }}
//     >
//       {/* <Logo />  */}
//       {isSm ? " Seisolo.io" : "Seisolo.io: Remixing the Recital"}

//       {/* Seisolo.io: Remixing the Recital */}
//     </div>
//   );
// };

// <!-- Generator: Adobe Illustrator 24.1.1, SVG Export Plug-In  -->
