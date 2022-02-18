import React, { useState } from "react";
import theme from "@static/theme";
import tracks from "@static/tracks";
import TrackItem from "./TrackItem";
import BubbleDots from "./RecitalWidgets/BubbleDots";
import FlexColumn from "@components/UI/FlexColumn";
import { usePlaylist, useQuery } from "@hooks";
import ReactAudioPlayer from "react-audio-player";
import { Track } from "@interfaces/Track";
import PlayPauseControls, { PlayButton } from "./TrackItem/PlayPauseControls";
import TrackControl from "../TrackControl/TrackControl";

function getPosition(e: any): [number, number] {
  const rect = e.target.getBoundingClientRect();
  return [
    (e.clientX - rect.left) / rect.width,
    (rect.bottom - e.clientY) / rect.height,
  ];
}

const RecitalWidgets = (): JSX.Element => {
  const recitalParts = tracks.filter((track) => track.category === "recital");
  const colors = ["#363537", "#ef2d56", "#ed7d3a", "#8cd867", "#2fbf71"];
  const [offset, setOffset] = useState<[number, number]>([0, 0]);

  const [hoveredElem, setHoveredElem] = useState<number | undefined>(undefined);
  const { isSm } = useQuery();

  return (
    <div
      style={{
        height: "fit-content",
        // height: "100%",
        width: "100%",
        fontFamily: theme.primaryFont,
        fontSize: "6rem",
        display: "flex",
        position: "relative",
        flexDirection: "column",
      }}
      id="recital-widgets-container"
    >
      <div
        style={{
          // position: "absolute",
          width: "100%",
          height: "100%",
          // border: "1px solid blue",
          // zIndex: 0,
          display: "flex",
          flexDirection: "column",
          zIndex: 100000000,
        }}
        // onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        //   const val = getPosition(e);
        //   // console.log(val);
        //   // console.log(val);
        //   let target = e.target as HTMLDivElement;
        //   const rect = target.getBoundingClientRect();
        //   // const rect = e.target.getBoundingClientRect();
        //   const x = -(e.clientX - rect.left - rect.width / 2) / rect.width;
        //   const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        //   setOffset([x, y]);
        //   // (e.clientY - rect.top - rect.height / 2) / rect.height])
        //   // setOffset(val)
        //   // SettingsPowerSharp()
        //   // posX.set(x, false);
        //   // posY.set(y, false);
        // }}
      >
        {/* {recitalParts.map((t, i) => {
          if (isSm) {
            return <MobileTracks t={t} key={i} />;
          }
        })} */}

        <FlexColumn>
          {recitalParts.map((t, i) => {
            // if (isSm) {
            return (
              <div
                className="recital-track-control-container"
                key={i}
                style={{
                  pointerEvents: "all",
                  zIndex: 100000000,
                  // position: "absolute",
                  // left: !isSm ? `${i * 33}%` : 0,
                  // top: isSm ? `${i * 33}%` : 9,
                  bottom: 0,
                  height: "100%",
                  width: "100%",
                }}
              >
                <TrackControl key={i} track={t} />{" "}
              </div>
            );
          })}
        </FlexColumn>
        {/* <RecitalSvg /> */}
        {/* {<BubbleDots />} */}
      </div>
      {recitalParts.map((track, i) => {
        // let isHovered = false;
        // if (hoveredElem) {
        //   // if (Math.round(hoveredElem) == i) {
        //   //   isHovered = true;
        //   // }
        // }
        return (
          <TrackItem key={i} track={track} useBox={false}>
            {/* <ComposerTitle>Bach</ComposerTitle> */}
          </TrackItem>
        );
      })}
    </div>
  );
};

const MobileTracks = ({ t }: { t: Track }): JSX.Element => {
  const { playTrack, setInfoDisplayMode } = usePlaylist();

  return (
    <div
      style={{
        display: "flex",
        // flex: 1,
        flexDirection: "column",
        fontSize: "max(20px, 15vmin)",
      }}
      onClick={(e) => {
        setInfoDisplayMode("bio");
        playTrack(t);
      }}
    >
      {/* <ReactAudioPlayer
        // onPlay={(e) => {
        //   playTrack(t);
        // }}
        controls
        src={t.audioSrc}
      /> */}
      <div>
        <PlayButton handleClick={() => {}} />
      </div>
      {t.title}
    </div>
  );
};

const ComposerTitle = ({
  children,
  hovered,
}: {
  children: string;
  hovered?: boolean;
}): JSX.Element => {
  return <FlexColumn>{children}</FlexColumn>;
};

export default RecitalWidgets;

const RecitalSvg = (): JSX.Element => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 741 301"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d="M590.5,0.5c-56,0-104.8,30.7-130.6,76.1c-10.6,17.8-34.7,21.8-50.4,8.3l0,0c-10.5-9-24.1-14.4-39-14.4
	c-33.1,0-60,26.9-60,60c0,1.3,0.1,2.6,0.1,3.9l0,0c0.9,13.8-11,25-24.7,23.3l0,0c-1.3-0.2-2.6-0.2-3.9-0.2c-0.3,0-0.5,0-0.8,0l0,0
	c-13.3,0.3-23.5-11.5-21.4-24.6l0,0c0.4-2.4,0.6-4.9,0.6-7.4c0-24.9-20.1-45-45-45c-13.1,0-24.9,5.6-33.1,14.6l0,0
	c-9.9,10.8-27.1,9.9-35.8-1.9c-14.8-19.8-38.4-32.7-65-32.7c-44.7,0-81,36.3-81,81s36.3,81,81,81c33.7,0,62.5-20.5,74.7-49.8
	c5.9-13.1,22.1-17.9,34.1-9.9c7.2,4.9,15.8,7.7,25.2,7.7c3.2,0,6.4-0.4,9.5-1c13-2.8,25.2,7,25.5,20.2l0,0
	c0.4,17.1,14.3,30.8,31.5,30.8c14.4,0,26.5-9.6,30.3-22.8l0,0c3.8-13.3,18.8-19.9,31.2-13.6l0,0c8.1,4.1,17.3,6.4,27.1,6.4
	c11,0,21.3-3,30.1-8.1l0,0c17.8-10.4,40.6-2.2,48,16.8c20.2,58.9,76.1,101.3,141.9,101.3c82.8,0,150-67.2,150-150
	S673.3,0.5,590.5,0.5z"
        />
        <circle fill={theme.secondary} cx="81.5" cy="141.5" r="81" />
        <circle fill={theme.secondary} cx="282" cy="189" r="31.5" />
        <circle fill={theme.secondary} cx="590.5" cy="150.5" r="150" />
        <circle fill={theme.secondary} cx="370.5" cy="130.5" r="60" />
        <circle fill={theme.secondary} cx="215.5" cy="125.5" r="45" />
      </svg>
    </div>
  );
};
