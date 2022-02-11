import React, { useState, useEffect, useRef } from "react";

// import ReactMetaballs from "react-metaballs";
import * as d3 from "d3";
import ReactMetaballs from "./MetaballsLib";
import "@css/Body.scss";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import { motion } from "framer-motion";

const yPos = 100;
const r = 50;
const smallR = 25;

// const circles = [
//   {
//     cx: 50,
//     cy: 100,
//     r: r,
//   },
//   {
//     cx: 250,
//     cy: 100,
//     r: r,
//   },
//   {
//     cx: 450,
//     cy: 100,
//     r: r,
//   },
// ];

const MetaballsScene = (): JSX.Element => {
  const circRef = useRef<any>(null);
  const smallDist = 50;
  const circles = tracks
    .filter((t) => t.category === "recital")
    .map((t, i) => {
      const pos = i * 200;
      if (t.movements) {
        return t.movements.map((m, j) => {
          const yPlus = (j % 2) * 25;
          return { cx: pos + smallDist * j, cy: yPos, r: smallR };
        });
      } else {
        return { cx: pos, cy: yPos, r: r };
      }
    })
    .flat()
    .sort((a, b) => b.cx - a.cx);
  console.log(circles);

  useEffect(() => {
    console.log(circRef.current);
  }, []);

  return (
    <div
      style={{
        width: 600,
        height: 200,
        border: "1px solid red",
        overflow: "hidden",
        position: "relative",
        // backgroundColor: "blue",
      }}
    >
      {/* <div style={{position: "absolute", top: 0, left:}}> */}
      <ReactMetaballs
        viewBox="0 0 500 500"
        ref={circRef}
        // padding={0}
        easement={d3.easeBackOut}
        circles={circles}
      />
      {/* </div> */}
      <div
        className={"lines"}
        style={{
          border: "5px solid green",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          zIndex: -1,
          // zIndex: 1,
          //   backgroundSize: "40px 40px",
          //   backgroundImage: `
          //   linear-gradient(to right, grey 1px, transparent 1px),
          //   linear-gradient(to bottom, grey 1px, transparent 1px);
          //  `,
        }}
      ></div>
      <Bars />
    </div>
  );
};

const Bars = (): JSX.Element => {
  const lines = tracks.filter((t) => t.category === "recital");
  const totalDur = lines
    .map((t) => t.duration)
    .reduce((partialSum, a) => partialSum + a, 0);
  const ws = lines.map((l) => l.duration / totalDur);
  // const ps = ws.map(w, i =>{

  // })
  const active = 0;

  return (
    <div
      style={{
        border: "1px solid black",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        zIndex: -1,
        display: "flex",
      }}
    >
      {lines.map((t, i) => {
        return (
          <RSection
            track={t}
            total={totalDur}
            active={active}
            ind={i}
            key={i}
          />
        );
      })}
    </div>
  );
};

interface Circle {
  cx: number;
  cy: number;
}

const RSection = ({
  track,
  total,
  active,
  ind,
}: {
  track: Track;
  total: number;
  active?: number;
  ind?: number;
}): JSX.Element => {
  // track.about

  const variants = {
    normal: {
      // height: "200px",
      // width: "200px",
      backgroundColor: "rgba(0,0,0,0)",
    },
    active: {
      backgroundColor: "rgba(255,242,0,255)",
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    console.log();
    if (track.movements) {
      const c = track.movements.map((t, i) => {
        return { cx: i * 100, cy: 100, r: 50 };
      });
      setCircles(c);
    } else {
      setCircles([{ cx: 100, cy: 100, r: 50 }]);
    }
  }, []);
  const [circles, setCircles] = useState();
  return (
    <>
      <motion.div
        variants={variants}
        animate={active == ind ? "active" : "normal"}
        style={{
          border: "1px solid white",
          height: "100%",
          width: `${(track.duration / total) * 100}%`,
          // left:
          zIndex: -1,
          // backgroundColor: "black",
          // border: "1p",
        }}
      >
        <ReactMetaballs
          viewBox="0 0 500 500"
          // ref={circRef}
          // padding={0}
          easement={d3.easeBackOut}
          circles={circles}
        />
        <div
          style={{
            border: "1px solid white",
            width: "100%",
            height: "10%",
            // width: `${(track.duration / total) * 100}%`,
            // left:
            zIndex: -1,
            backgroundColor: "black",
            // border: "1p",
          }}
        >
          {track.title}
        </div>
      </motion.div>
      {/* <div
      style={{
        border: "1px solid white",
        height: "20px",
        width: `${(track.duration / total) * 100}%`,
        // left:
        zIndex: -1,
        backgroundColor: "black",
        // border: "1p",
      }}
    >
      {track.title}
    </div> */}
    </>
  );
};

export default MetaballsScene;
