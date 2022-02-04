import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const PlayPauseSwitch = ({
  paused,
  onPause,
  onPlay,
}: {
  paused: boolean;
  onPause: () => void;
  onPlay: () => void;
}): JSX.Element => {
  // useEffect(() => {
  //   console.log(paused);
  // }, [paused]);
  return (
    <>
      {paused ? (
        <PlayButton handleClick={onPlay} />
      ) : (
        <PauseButton handleClick={onPause} />
      )}
    </>
  );
};

const w = "100%";
// const w = "max(20px, 8vmin)";

export default PlayPauseSwitch;

export const PlayButton = ({
  handleClick,
}: {
  handleClick: () => void;
}): JSX.Element => {
  // const [hovered, sethovered] = useState(initialState)

  return (
    <motion.div
      className={"play-button-item"}
      onClick={(e) => {
        handleClick();
      }}
      whileHover={{}}
      style={{
        // width: "50%",
        // width: "50%",
        // height: "100%",
        width: w,
        height: w,
        padding: 5,
        // backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 1,
        maxHeight: "90%",
      }}
    >
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 67.91 76.24"
        style={{ margin: "auto" }}
      >
        <path
          className="svg-button"
          // fill={theme.secondary}
          d="M170.45,173l-53.71-31a7.1,7.1,0,0,0-10.65,6.15v62a7.1,7.1,0,0,0,10.65,6.14l53.71-31A7.1,7.1,0,0,0,170.45,173Z"
          transform="translate(-106.09 -141)"
        />
      </svg>
    </motion.div>
  );
};
const PauseButton = ({
  handleClick,
}: {
  handleClick: () => void;
}): JSX.Element => {
  return (
    <div
      className={"play-button-item"}
      onClick={() => {
        console.log("got pause click");
        handleClick();
      }}
      style={{
        // width: "50%",
        // height: "100%",
        // backgroundColor: "red",
        width: w,
        height: w,
        padding: 5,
        // backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 1,
        maxHeight: "90%",
      }}
    >
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 67.91 76.24"
        style={{ margin: "auto" }}
      >
        <path
          fill="yellow"
          d="M51.24,0h0c4.64,0,8.41,4.18,8.41,9.34V66.9c0,5.16-3.77,9.34-8.41,9.34h0c-4.65,0-8.42-4.18-8.42-9.34V9.34C42.82,4.18,46.59,0,51.24,0Z"
          // transform="translate(-106.09 -141)"
          //TODO: USE THEME COLORS FOR FILL
        />
        <path
          fill="yellow"
          d="M51.24,0h0c4.64,0,8.41,4.18,8.41,9.34V66.9c0,5.16-3.77,9.34-8.41,9.34h0c-4.65,0-8.42-4.18-8.42-9.34V9.34C42.82,4.18,46.59,0,51.24,0Z"
          transform="translate(-30, 0)"
        />
      </svg>
      {/* <img
          style={{ margin: "auto" }}
          src={`${process.env.PUBLIC_URL}/Icons/PauseButtonIcon.svg`}
        /> */}
    </div>
  );
};
