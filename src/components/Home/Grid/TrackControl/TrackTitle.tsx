import { useQuery } from "@hooks";
import { Track } from "@interfaces/Track";
import React, { useState, useEffect, useRef } from "react";

// const fontSize = "max(12w, max(58pt, 2vmin))";
// const fontSize = "max(12w, max(58pt, 2vmin))";

// const titleHeight = "max(20pt, 6.5vmin)";
// const fontSize = "calc(1002px + 16 * ((100vw - 568px) / (768 - 568));";
// const fontSize = "max(48pt, 6vmin)";
// const fontSize = "clamp(12vmin, 1vw, 100vmin)";
// const titleHeight = "max(52pt, 6.5vmin)";

const TrackTitle = ({ track }: { track: Track }): JSX.Element => {
  const { isSm } = useQuery();
  const fontSize = "clamp(12vmin, 1vw, 100vmin)";
  return (
    <div
      style={{
        // fontSize: isSm ? "12pt" : fontSize,
        fontSize: isSm ? fontSize : "max(4vmin, 36pt)",
        height: "12vmin",
        display: "flex",
        alignItems: "center",
        overflow: "visible",
        whiteSpace: "pre",
        paddingLeft: "2vmin",
      }}
    >
      {`. ${track.category == "remix" ? track.artist : track.title}`}
    </div>
  );
};

export default TrackTitle;
