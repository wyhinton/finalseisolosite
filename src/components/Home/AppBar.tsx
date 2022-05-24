import React, { useState, useEffect, useContext } from "react";
import { Track } from "@interfaces/Track";
// import Canvas from 'react-responsive-canvas';
import { usePlaylist, useQuery } from "@hooks";
import theme from "@static/theme";
import FlexRow from "@components/UI/FlexRow";
import Time from "@components/Home/Player/Time";
import MediaControls from "@components/Home/Nav/MediaControls";
import { motion, Variants } from "framer-motion";
import InfoPopup from "./InfoPopup";
import { useMediaQuery } from "react-responsive";
import timeLoop from "@canvasLoop";
import { Surface } from "gl-react-dom";
import { GLSL, Shaders, Uniform, Node } from "gl-react";
import HomeContext from "./HomeContext";

function formatTrackText(track: Track): string {
  return `${track.artist} - ${track.title}`;
}
const AppBar = ({}: {}): JSX.Element => {
  const { setInfoDisplayMode, currentTrack } = usePlaylist();
  const { isLoaded } = useContext(HomeContext);

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

  const variants = {
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      id="app-bar-container"
      animate={isLoaded || isSm ? "in" : ""}
      style={{
        position: "fixed",
        zIndex: 1000000,
        display: "flex",
        // bottom: "0",
        // left: "0%",
        borderTop: `1px solid ${theme.secondary}`,
        height: isSm ? theme.appBarHeightMobile : theme.appBarHeight,
        backgroundColor: theme.primary,
        // borderBottom: "1px solid black",
        width: "100vw",
        fontSize: "6vmin",
        overflow: "visible",
        justifyContent: "left",
        opacity: 0,
        y: 100,
      }}
    >
      <FlexRow justifycontent="flex-start">
        {/* <GlowyButton /> */}
        <MediaControls />
        <TrackTitle />

        <Time />
      </FlexRow>
    </motion.div>
  );
};

const shaders = Shaders.create({
  render: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float time;
    void main() {
      // gl_FragColor = vec4(sin(time));
    gl_FragColor = vec4(uv.x, uv.y, fract(time*.001), 1.0);
}
`,
  },
});

export const GlowShader = ({ time }: { time: number }) => (
  <Node
    shader={shaders.render}
    uniforms={{ resolution: Uniform.Resolution, time }}
  />
);

const GlowShaderTimed = timeLoop(GlowShader);

const GlowyButton = (): JSX.Element => {
  return (
    <div
      style={{ height: 30, width: 30, borderRadius: "50%", overflow: "hidden" }}
    >
      <Surface width={20} height={20}>
        <GlowShaderTimed />
      </Surface>
    </div>
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

  const variants: Variants = {
    normal: { opacity: 1, x: 0 },
    scrolling: {
      // opacity: 0,
      x: -200,
      //   x: "-100%",
      // backgroundColor: "rgba(255, 242, 0, 150)",
      transition: {
        ease: "linear",
        duration: 10,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    flashing: {
      color: theme.secondaryRGBCSS,
      transition: {
        ease: "linear",
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const { isSm } = useQuery();

  return (
    <motion.div
      variants={variants}
      animate={
        currentTrack.title === "overandunder (infinity)" && isSm
          ? "scrolling"
          : "flashing"
      }
      style={{
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "nowrap",
        textDecoration: "underline",
        width: "fit-content",
        margin: "auto",
        color: "rgb(255, 255, 255)",
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
      {/* <ReactAudioPlayer
        controls
        src={currentTrack.src}
        style={{ width: "100px", height: "40px" }}
      /> */}
      <div style={{ height: "fit-content" }}>{innerText}</div>
    </motion.div>
  );
};

export default AppBar;
