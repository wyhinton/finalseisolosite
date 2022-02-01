import { usePlaylist } from "@hooks";
import { Track } from "@interfaces/Track";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactTypingEffect from "react-typing-effect";

// const formatBpm()

const renderText = (t: Track): string[] => {
  // id: string;
  const {
    artist,
    title,
    samples,
    bpm,
    origin,
    composer,
    performer,
    composition,
    category,
    year,
  } = t;

  let form = [];
  //performer
  //composer
  //composition
  //
  if (category === "recital") {
    form.push(`performer: ${performer}`);
    form.push(`composer: ${composer}`);
    form.push(`composition: ${composition}`);
  }
  if (category === "remix") {
    form.push(`artist: ${artist}`);
    form.push(`title: ${title}`);
    form.push(`BPM: ${bpm.toString()}`);
    form.push(`samples: ${samples}`);
  }
  form.push(`origin: ${origin} (${year})`);

  return form;
};

const TrackStats = (): JSX.Element => {
  // const { cur } = variable
  const { currentTrack, infoDisplayMode } = usePlaylist();

  const { title, artist, bpm, link, origin, composition, performer, composer } =
    currentTrack;

  const bpmText = (b: number | undefined): undefined | string => {
    if (b) {
      return `bpm: ${bpm.toString()}`;
    } else {
      return undefined;
    }
  };
  //   const text = [title, `artist: ${artist}`, bpmText(bpm)].filter(
  //     (t) => t !== undefined
  //   );
  const [textArr, setTextArr] = useState<string[]>(renderText(currentTrack));

  useEffect(() => {
    //   console.log(myVal)
    //   myVal.current = item
    if (infoDisplayMode) {
      //   const textToSet = [
      //     title,
      //     `artist: ${artist}`,
      //     bpmText(bpm),
      //     `origin: ${origin}`,
      //   ].filter((t) => t !== undefined);

      //   const set = ["composer: ", "performer: ", "composition: "];
      //   const justThings = [composer, performer, composition];
      //   justThings.forEach((t, i) => {
      //     if (t) {
      //       textToSet.push(set[i] + t);
      //     }
      //   });
      setTextArr(renderText(currentTrack));
    } else {
      setTextArr([]);
    }
  }, [infoDisplayMode]);

  // const text
  const variants = {
    normal: {
      opacity: 0,
    },
    active: {
      height: "0px",
      width: "0px",
      transition: {
        duration: 0.1,
        // duration: duration,
      },
    },
  };

  return (
    <>
      <motion.div
        animate={{
          opacity: [0, 1, 0, 1],
          transition: {
            duration: 0.1,
          },
        }}
      >
        {textArr.map((t, i) => {
          //   const fontSize = i == 0 ? "3vmin" : "1vmin";

          return (
            <span
              key={i}
              style={{
                width: "100%",
                display: "block",
                lineHeight: "3vmin",
                // height: "1.4vmin",
                // border: "1px solid red",
              }}
            >
              <ReactTypingEffect
                cursorRenderer={(cursor) => (
                  <h1 style={{ display: "none" }}>{cursor}</h1>
                )}
                speed={100}
                // key={i}
                text={t}
                //   delay={0}
                delay={i * 100}
                cursor={""}
                eraseDelay={10000000000000000}
                eraseSpeed={0}
                displayTextRenderer={(text, i) => {
                  // console.log(i);
                  return (
                    <div
                      style={{
                        color: "white",
                        textTransform: "uppercase",
                        width: "100%",
                        fontSize: "1.5vmin",
                        lineHeight: 1,
                        // lineHeight: "3vmin",
                      }}
                    >
                      {text}
                      {/* <div
                      style={{
                        display: "inline-block",
                        width: "100%",
                      }}
                    ></div> */}
                      {/* {text.split('').map((char, i) => {
                                            const key = `${i}`;
                                            return (
                                                <span
                                                    key={key}
                                                    style={i % 2 === 0 ? { color: 'magenta' } : {}}
                                                >{char}</span>
                                            );
                                        })} */}
                    </div>
                  );
                }}
              />
            </span>
          );
        })}
      </motion.div>
      {/* <ReactTypingEffect
                text={["Hello.", "World!"]}
            />

            <br />

            <ReactTypingEffect
                text={["Hello.", "World!!!"]}
                cursorRenderer={cursor => <h1>{cursor}</h1>}
                displayTextRenderer={(text, i) => {
                    return (
                        <h1>
                            {text.split('').map((char, i) => {
                                const key = `${i}`;
                                return (
                                    <span
                                        key={key}
                                        style={i % 2 === 0 ? { color: 'magenta' } : {}}
                                    >{char}</span>
                                );
                            })}
                        </h1>
                    );
                }}
            /> */}
    </>
  );
};

export default TrackStats;
