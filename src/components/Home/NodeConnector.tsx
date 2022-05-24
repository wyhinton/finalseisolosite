import CurveTo from "@components/CurveTo/CurveTo";
import { usePlaylist } from "@hooks";
import theme from "@static/theme";
import tracks from "@static/tracks";
import React, { useState, useEffect, useRef } from "react";

const NodeConnector = (): JSX.Element => {
  const { currentTrack } = usePlaylist();

  const { title, connections } = currentTrack;

  const distMult =
    Math.abs(
      currentTrack.position -
        tracks.filter((t) => t.title === connections[0].target)[0].position
    ) * 50;
  return (
    <CurveTo
      delay={5000}
      from={title}
      to={connections[0].target}
      fromAnchor="right"
      toAnchor="right"
      borderColor={theme.secondary}
      zIndex={0}
      curveFrom={[100 + distMult, 0]}
      curveTo={[100 + distMult, 0]}
    />
  );
};

export default NodeConnector;
