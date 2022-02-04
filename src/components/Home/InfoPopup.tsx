import React, { useState, useEffect } from "react";
import theme from "@static/theme";
import { useMobileDetect, usePlaylist, useQuery } from "@hooks";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";
import FlexRow from "@components/UI/FlexRow";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import WaveformView from "./InfoPopup/WaveformView";
import UILayer from "./InfoPopup/UILayer/UILayer";
import CloseInfoPopupButton from "./InfoPopup/CloseInfoPopupButton";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";

const ResponsiveGridLayout = WidthProvider(Responsive);

const addVh = (a: string, b: string): string => {
  const av = parseInt(a.split("v")[0]);
  const bv = parseInt(b.split("v")[0]);
  const sum = av + bv;
  const final = `${sum}vh`;
  return final;
};

const InfoPopup = () => {
  const { infoDisplayMode, currentTrack, setInfoDisplayMode } = usePlaylist();

  //   const [innerText, setInnerText] = useState("");

  //   useEffect(() => {
  //     // const { bio, about } = currentTrack;
  //     setInnerText(currentTrack.id)
  //   }, [currentTrack]);

  const duration = 0.5;
  const topHeight = "23vh";
  const bottomHeight = theme.aboutBarHeight;
  const middleheight = "70vh";
  //7+23 = 30
  //7-

  const variantsAbout: Variants = {
    hidden: { opacity: 0, x: 0, pointerEvents: "none", y: theme.appBarHeight },
    visible: {
      y: "0vh",
      opacity: 1,
      pointerEvents: "all",
      transition: {
        ease: "circOut",
        duration: duration,
      },
    },
  };

  const variantsGrid: Variants = {
    hidden: { opacity: 0, x: 0, pointerEvents: "none", y: theme.appBarHeight },
    visible: {
      y: "0vh",
      opacity: 1,
      pointerEvents: "all",
      transition: {
        ease: "circOut",
        duration: duration,
        delay: 0.5,
        repeatType: "reverse",
      },
    },
  };

  const { isMd, isLg, isSm } = useQuery();

  useEffect(() => {
    // console.log(isMd);
    // console.log(isLg);
  }, [isMd, isLg]);
  return (
    <>
      <CloseInfoPopupButton />
      <UILayer />
      <motion.div
        id="waveform-view-motion-container"
        initial={false}
        variants={variantsGrid}
        animate={infoDisplayMode == undefined || isSm ? "hidden" : "visible"}
        style={{
          pointerEvents: "all",
          // border: `1px solid ${theme.secondary}`,
          color: "black",
          // zIndex: 0,
          position: "absolute",
          // bottom: theme.appBarHeight,
          padding: "1em",
          overflow: "visible",

          width: "100vw",
          height: isSm ? "0vh" : middleheight,
          // top: "20%",
          bottom: addVh(theme.appBarHeight, bottomHeight),
          zIndex: 110,
          // backgroundColor: "red",
          backgroundColor: isMd ? theme.primaryDark : "red",
          // backgroundColor: theme.primaryDark,
        }}
      >
        <WaveformView />
      </motion.div>
      {/* {about} */}
      <motion.div
        id="text-display-motion-container"
        initial={false}
        variants={variantsAbout}
        animate={infoDisplayMode == undefined ? "hidden" : "visible"}
        style={{
          pointerEvents: "all",
          // border: `1px solid ${theme.secondary}`,
          color: "black",
          zIndex: 10,
          position: "absolute",
          bottom: theme.appBarHeight,
          // padding: "1em",
          overflow: "visible",
          width: "100vw",
          height: isMd ? bottomHeight : "93vh",
          // height: bottomHeight,
          backgroundColor: "yellow",
          top: isSm ? theme.navHeight : "",
          //   border: "1px solid red",
        }}
      >
        <TextDisplay track={currentTrack} />
      </motion.div>
    </>
  );
};

export default InfoPopup;

const TextDisplay = ({ track }: { track: Track }): JSX.Element => {
  const { about } = track;

  const { isSm, isMd, isLg } = useQuery();
  // const parallax = useRef<IParallax>(null);

  // const scroll = (to: number) => {
  //   if (parallax.current) {
  //     parallax.current.scrollTo(to);
  //   }
  // };

  return (
    <div
      id="artist+section-container"
      style={{
        display: "flex",
        flexDirection: isSm ? "column" : "row",
        justifyContent: "space-around",
        // position: "absolute",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100%",
        backgroundColor: "yellow",
      }}
    >
      {isSm ? (
        <Parallax pages={1.6} style={{ overflow: "hidden", top: 0, left: 0 }}>
          <ParallaxLayer
            offset={0}
            speed={0.1}
            style={{ justifyContent: "center" }}
          >
            <ArtistImage key="artist-image" track={track} />
          </ParallaxLayer>
          <ParallaxLayer
            offset={0.5}
            speed={0.4}
            factor={0.1}
            style={{ justifyContent: "center" }}
          >
            <Section
              key="about"
              className="aboutClass"
              text={about}
              header="About"
            />
          </ParallaxLayer>
        </Parallax>
      ) : (
        <>
          <ArtistImage key="artist-image" track={track} />
          {/* <Parallax pages={2} /> */}
          {/* <ParallaxLayer
            offset={0.5}
            speed={0.4}
            factor={0.1}
            style={{ justifyContent: "center" }} */}
          {/* > */}
          <Section
            key="about"
            className="aboutClass"
            text={about}
            header="About"
          />
          {/* </ParallaxLayer> */}
        </>
      )}

      {/* <Parallax pages={1}>
        <ParallaxLayer
          offset={0}
          speed={0.1}
          style={{ justifyContent: "center" }}
        >
          <ArtistImage key="artist-image" track={track} />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.5}
          speed={0.4}
          // factor={0.1}
          style={{ justifyContent: "center" }}
        >
          <Section
            key="about"
            className="aboutClass"
            text={about}
            header="About"
          />
        </ParallaxLayer>
      </Parallax> */}
    </div>
  );
};

const ArtistImage = ({ track }: { track: Track }): JSX.Element => {
  const { isSm, isMd, isLg } = useQuery();
  const [vs, setVs] = useState(track.video);
  const { infoDisplayMode, currentTrack, setInfoDisplayMode } = usePlaylist();

  useEffect(() => {
    //   console.log(myVal)
    //   myVal.current = item

    if (currentTrack.category === "recital") {
      const { isIos } = useMobileDetect();
      if (isIos) {
        setVs(currentTrack.iOSVideo);
      } else {
        setVs(currentTrack.video);
      }

      console.log(currentTrack);
      console.log(currentTrack.video);
      console.log(vs);

      // setVs(currentTrack.visual);
      // console.log(vs);
    }
  }, [currentTrack.title, vs]);

  return (
    // <div id="artist-image-contaienr" style={{ width: "30%", height: isSm ? "50%" : "100%" }}>
    <div
      id="artist-image-contaienr"
      style={{ width: isSm ? "100%" : "30%", height: isSm ? "50%" : "100%" }}
    >
      {track.category === "remix" && (
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={track.visual}
        />
      )}
      {/* {track.category === "recital" &&
        !isSm &&(
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={`${process.env.PUBLIC_URL}/Headshots/VIVEK_HEADSHOT.jpg`}
          />
        )} */}

      <video
        id="recital_video"
        controls={true}
        style={{
          display: track.category == "recital" ? "block" : "none",
          // display: track.category == "recital" ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        autoPlay
        muted={false}
        // crossOrigin
        // crossOrigin="anonymous"
        // src={
        //   "https://firebasestorage.googleapis.com/v0/b/seisolo.appspot.com/o/Ysaye.webm?alt=media&token=93a122c8-97cf-48ba-8ed2-7fc508575604"
        // }
        src={vs}
      >
        <source src={vs} />
      </video>
    </div>
  );
};

const Section = ({
  header,
  text,
  className,
}: {
  header: string;
  text: string;
  className?: string;
}): JSX.Element => {
  const { isSm, isMd, isLg } = useQuery();

  return (
    <div
      className="about-info-container"
      style={{
        display: "flex",
        flexDirection: isSm ? "column" : "row",
        // position: "absolute",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100%",
        // height: "100%",
        backgroundColor: "yellow",
        fontSize: theme.paragraphSize,
        overflowY: "visible",
        paddingTop: "1em",
        padding: isSm ? "6vmin" : "",
      }}
    >
      {/* <FlexRow style={{ color: "black", height: "100%", width: "100%", padding: 0 }} className={className}> */}
      {header !== "" && (
        <h1
          style={{
            fontSize: theme.bigFont,
            margin: 0,
            color: "black",
            paddingRight: "1em",
          }}
        >
          {header}
        </h1>
      )}
      <div
        id="about-text-body-container"
        style={{
          paddingRight: "1em",
          // alignItems: "center",
          display: "flex",
          justifyContent: "center",
          color: "black",
          marginTop: "1em",
          marginBottom: "1em",
          // fontSize: "2vmin",
          // paddingLeft: "7vmin",
          overflowY: !isSm ? "scroll" : "visible",
          // marginTop: "40px",
          fontSize: theme.paragraphSize,
          // paddingTop: "8vmin",
        }}
      >
        {text}
      </div>
      {/* </FlexRow> */}
    </div>
  );
};

// <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="79.3px"
// 	 height="77.6px" viewBox="0 0 79.3 77.6" style="enable-background:new 0 0 79.3 77.6;" xml:space="preserve">
// <style type="text/css">
// 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
// <path class="st0" d="M75.9,60L53.8,37.9l20.4-20.4c3.9-3.9,3.9-10.2,0-14.1S63.9-0.5,60,3.4L39.6,23.8L19.3,3.4
// 	C15.4-0.5,9-0.5,5.1,3.4c-3.9,3.9-3.9,10.2,0,14.1l20.4,20.4L3.4,60c-3.9,3.9-3.9,10.2,0,14.1c3.9,3.9,10.2,3.9,14.1,0l22.1-22.1
// 	l22.1,22.1c3.9,3.9,10.2,3.9,14.1,0C79.8,70.2,79.8,63.9,75.9,60z"/>
// </svg>
