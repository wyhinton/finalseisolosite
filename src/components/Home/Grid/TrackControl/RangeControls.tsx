import { usePlaylist } from "@hooks";
import { Track } from "@interfaces/Track";
import theme from "@static/theme";
import React, { useState, useEffect, useRef } from "react";
import { Range } from "react-range";

const RangeControls = ({ track }: { track: Track }): JSX.Element => {
  const audioRef = useRef<HTMLMediaElement>();
  const { playTrack, pauseTrack, currentTrack } = usePlaylist();

  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(true);
  //   const [duration, ] = useState(0)

  const seekTo = (time: number) => {
    if (!audioRef.current || audioRef.current.duration === undefined) return;

    const newTime = Math.min(track.duration, Math.max(0, time));
    setProgress(newTime);
    console.log(newTime);
    audioRef.current.currentTime = newTime;
  };

  return (
    <Range
      step={0.1}
      min={0}
      max={track.duration}
      values={[progress]}
      // values={this.state.values}
      // onChange={(values) => this.setState({ values })}
      onChange={(values) => {
        seekTo(values[0]);
      }}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "max(100%, 90px)",
            width: "inherit",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "100%",
            width: 15,

            // borderRadius: "50%",
            backgroundColor: `${theme.primary}`,
            border: `1px ${theme.secondary}`,
            // backgroundColor: "#999",
          }}
        />
      )}
    />
  );
};

export default RangeControls;
