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
        height: "100%",
        width: "100%",
        fontFamily: theme.primaryFont,
        fontSize: "6rem",
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
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
        {<BubbleDots />}
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
