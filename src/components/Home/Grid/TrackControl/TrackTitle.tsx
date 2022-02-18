import { Track } from "@interfaces/Track";
import React, { useState, useEffect, useRef } from "react";

const fontSize = "max(48pt, 2vmin)";
const titleHeight = "max(20pt, 6.5vmin)";
// const fontSize = "max(48pt, 6vmin)";
// const titleHeight = "max(52pt, 6.5vmin)";

const TrackTitle = ({ track }: { track: Track }): JSX.Element => {
  return (
    <div
      style={{
        fontSize: fontSize,

        // fontFamily: "Klostro",
        height: titleHeight,
        display: "flex",
        alignItems: "center",
        overflow: "visible",
        whiteSpace: "pre",
        paddingLeft: "2vmin",
      }}
    >
      {`${track.position + 1}. ${
        track.category == "remix" ? track.artist : track.title
      }`}
    </div>
  );
};

export default TrackTitle;
