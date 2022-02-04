import React, { useState, useEffect } from "react";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";
import HeaderLink from "./HeaderLink";
import NavLinks from "./NavLinks";
import AboutButton from "../AboutButton";
import { usePlaylist, useQuery } from "@hooks";
import PlayPauseControls from "../Grid/GridWidgets/TrackItem/PlayPauseControls";
import tracks from "@static/tracks";

const MediaControls = (): JSX.Element => {
  const { currentTrack } = usePlaylist();

  const { isMd, isSm } = useQuery();

  return (
    <FlexRow
      id="media-controls-container"
      style={{
        width: "min-content",
        // position: "absolute",
        // top: 0,
        // left: isMd ? "88%" : "50%",
        // right: isMd?
        // width: "100px",
        // paddingLeft: ".5em",
        height: "100%",
        // margin: "auto",
        // border: "1px solid red",
        zIndex: 10,
        color: "black",
        // marginLeft: "1em",
        // padding: ".5em",
        justifyContent: "space-around",
        paddingLeft: theme.navPadding,
        // backgroundColor: theme.secondary,

        // transform: isMd ? "translate(-50%, 0%)" : ""
      }}
    >
      {/* <PauseTrack /> */}
      <PreviousTrack />
      {/* <div style={{ height: 50, width: 50 }}> */}
      {<PlayPauseControls track={currentTrack} />}
      {/* </div> */}

      <NextTrack />
    </FlexRow>
  );
};

export default MediaControls;

const IconWrapper = ({
  children,
  viewBox,
  onClick,
}: {
  children: JSX.Element | JSX.Element[];
  viewBox: string;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <div
      style={{
        width: "6vmin",
        height: "100%",
        display: "flex",
      }}
      onClick={(e) => {
        onClick();
      }}
    >
      <svg style={{ margin: "auto" }} viewBox={viewBox}>
        {children}
      </svg>
    </div>
  );
};

const PreviousTrack = (): JSX.Element => {
  const { restartCurrent, currentTrack, playPrevious } = usePlaylist();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // console.log(trackIndex);
    // console.log(currentTrack);
    if (currentTrack.position == 0) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [currentTrack.title]);

  return (
    <IconWrapper
      onClick={isActive ? playPrevious : () => {}}
      viewBox="0 0 141 101"
    >
      <path
        opacity={isActive ? 1 : 0.1}
        fill={theme.secondary}
        d="M1.8,45.8c0.8-1.4,2-2.6,3.4-3.4L75.6,1.8c4.5-2.6,10.2-1,12.7,3.4c0.8,1.4,1.2,3,1.2,4.7V23l36.9-21.3
	c4.5-2.6,10.2-1,12.7,3.4c0.8,1.4,1.2,3,1.2,4.7v81.4c0,5.1-4.2,9.3-9.3,9.3c-1.6,0-3.2-0.4-4.6-1.2L89.6,78v13.2
	c0,5.1-4.2,9.3-9.3,9.3c-1.6,0-3.2-0.4-4.6-1.2L5.2,58.6C0.7,56-0.8,50.3,1.8,45.8z"
      />
    </IconWrapper>
  );
};

const NextTrack = (): JSX.Element => {
  const { playNext, currentTrack } = usePlaylist();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // console.log(trackIndex);
    // console.log(currentTrack);
    if (currentTrack.position == 5) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [currentTrack.position]);

  // const trackIndex
  return (
    <IconWrapper onClick={isActive ? playNext : () => {}} viewBox="0 0 141 101">
      <path
        opacity={isActive ? 1 : 0.1}
        fill={theme.secondary}
        // fill="red"
        d="M139.2,45.8c-0.8-1.4-2-2.6-3.4-3.4L65.4,1.8c-4.5-2.6-10.2-1-12.7,3.4c-0.8,1.4-1.2,3-1.2,4.7V23L14.5,1.8
	C10-0.8,4.3,0.7,1.7,5.2c-0.8,1.4-1.2,3-1.2,4.7v81.4c0,5.1,4.2,9.3,9.3,9.3c1.6,0,3.2-0.4,4.6-1.2L51.4,78v13.2
	c0,5.1,4.2,9.3,9.3,9.3c1.6,0,3.2-0.4,4.6-1.2l70.5-40.7C140.3,56,141.8,50.3,139.2,45.8z"
      />
    </IconWrapper>
  );
};
