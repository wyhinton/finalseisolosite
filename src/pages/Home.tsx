import React, { useState, useEffect, ReactNode, useContext } from "react";

import tracks from "@static/tracks";
import { useApp, usePlaylist, useQuery } from "@hooks";
import "@css/blockquote.scss";
import { Layout } from "react-grid-layout";
import "@css/Layout.scss";
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import "@css/Body.scss";
import { defaultLayout } from "@static/gridLayouts";
import IntroModal from "@components/Home/Modals/IntroModal";
import HomePanel from "@components/Home/Grid/HomePanel";
import ReturnButton from "@components/ReturnButton";
import appConfig from "@static/appConfig";
import ViolinWidget from "@components/Home/Grid/GridWidgets/ViolinWidget";
import Nav from "@components/Home/Nav/Nav";
import InfoPopup from "@components/Home/InfoPopup";
import AppBar from "@components/Home/AppBar";
export type HomeMode = "player" | "notes" | "about";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@components/ErrorBoundary";
import FlexRow from "@components/UI/FlexRow";
import { motion, Variant, Variants } from "framer-motion";
import { createContextStore } from "easy-peasy";
import LoadingScreen from "@components/Home/LoadingScreen";
import theme from "@static/theme";
import MirrorShape from "@components/Home/Grid/GridWidgets/RemixWidgets/MirrorShape";
import FlowerShape from "@components/Home/Grid/GridWidgets/RemixWidgets/FlowerShape";
import DiamondShape from "@components/Home/Grid/GridWidgets/RemixWidgets/DiamondShape";
import ShapeContainer from "@components/Home/Grid/GridWidgets/RemixWidgets/ShapeContainer";
import HomeContext from "@components/Home/HomeContext";
import TrackControl from "@components/Home/Grid/TrackControl/TrackControl";
import CurveTo from "@components/CurveTo/CurveTo";

const Home = (): JSX.Element => {
  const {
    trackCategory,
    currentTrack,
    pauseTrack,
    pauseCurrent,
    infoDisplayMode,
  } = usePlaylist();
  const { appMode } = useApp();

  useEffect(() => {
    pauseCurrent();
    pauseTrack(tracks[0]);
  }, []);

  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);

  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);

  const violinVariants = {
    start: {
      opacity: [0, 1],
      transition: { duration: 1.1, delay: 1 },
    },
  } as Variants;
  const [name, setName] = React.useState("hello");
  const [progress, setProgress] = React.useState(0.0);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const { isSm } = useQuery();

  const mainFlexRowVariants = {
    in: {
      y: [-299, 0],
      opacity: [0, 1],
      background: [theme.primaryDarkHex, theme.primary],
      transition: {
        delay: 0.75,
        ease: "circOut",
        staggerChildren: 20.3,
      },
    },
  } as Variants;
  return (
    // <StoreProvider store={homeStore}>
    // <
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HomeContext.Provider
        value={{
          name: name,
          setName,
          progress,
          setProgress,
          isLoaded,
          setIsLoaded,
        }}
      >
        <LoadingScreen />

        <motion.section style={{ width: "100vw" }}>
          {appConfig.showIntro && <IntroModal />}
          {/* <AboutButton /> */}
          {/* <TopBar /> */}
          {/* <MediaControls /> */}
          {/* <ReturnButton /> */}
          <InfoPopup />
          <motion.div
            id="main-body-flex-container"
            style={{ height: theme.bodyHeight, display: "flex" }}
            animate={isLoaded ? "in" : ""}
            variants={mainFlexRowVariants}
          >
            <HomePanel />
            <motion.div
              id="all-tracks-container"
              // className="dot-fill"
              className="all-tracks-container"
              style={{
                display: "flex",
                flexDirection: "column",
                // border: "1px solid green",
                width: "35vw",
                paddingTop: "2vmin",
                paddingBottom: "2vmin",
                justifyContent: "center",
              }}
            >
              {tracks
                .sort((a, b) => a.position - b.position)
                .map((track, i) => {
                  const variants = {
                    down: {
                      // y: [-200, 0],
                      opacity: [0, 1],
                      transition: {
                        delay: 1.2 + i * 0.1,
                        ease: "circOut",
                      },
                    },
                  };
                  return (
                    <>
                      <motion.div
                        variants={variants}
                        animate={isLoaded ? "down" : ""}
                      >
                        <TrackControl key={i} track={track} />
                      </motion.div>
                    </>
                  );
                })}
            </motion.div>
            <NodeConnector />
            {/* <CurveTo
              delay={2000}
              from={tracks[0].title}
              to={tracks[1].title}
              fromAnchor="right"
              toAnchor="right"
              borderColor={theme.secondary}
              // within="all-tracks-container"
              curveFrom={[50, 0]}
              curveTo={[50, 0]}
            /> */}
            <motion.div
              variants={mainFlexRowVariants}
              // animate={isLoaded ? "in" : ""}
              id="violin-widget-container"
              // className="grid-fill"
              style={{
                width: "45vw",
                position: "relative",
                zIndex: infoDisplayMode !== undefined ? -1 : 0,
                pointerEvents: "none",
                // opacity: 0,
              }}
              // initial={false}
            >
              <FlexRow
                style={{
                  border: "1px solid red",
                  width: "100%",
                  height: 400,
                  position: "absolute",
                  bottom: 0,
                  left: 0,

                  // height: "100%",
                }}
                justifycontent="end"
              >
                <WidgetContainer />
                <Viewer />
              </FlexRow>
              <ViolinWidget track={currentTrack} />
              {/* </HomeContext.Provider> */}
            </motion.div>
          </motion.div>
          <Nav />
          <AppBar />

          {/* <WaveformWidget /> */}
        </motion.section>
      </HomeContext.Provider>
    </ErrorBoundary>
    // </StoreProvider>
  );
};

export default Home;

const NodeConnector = (): JSX.Element => {
  const { currentTrack } = usePlaylist();

  const { title, connections } = currentTrack;

  useEffect(() => {
    console.log(title);
  }, [title]);

  const distMult =
    Math.abs(
      currentTrack.position -
        tracks.filter((t) => t.title === connections[0].target)[0].position
    ) * 50;
  return (
    <CurveTo
      delay={2000}
      from={title}
      to={connections[0].target}
      fromAnchor="right"
      toAnchor="right"
      borderColor={theme.secondary}
      // within="all-tracks-container"
      curveFrom={[100 + distMult, 0]}
      curveTo={[100 + distMult, 0]}
    />
  );
};

const WidgetContainer = (): JSX.Element => {
  return (
    <div>
      {/* <ShapeContainer
        track={tracks.filter((t) => t.title === "Believe")[0]}
        viewBox="0 0 261 261"
      >
        <DiamondShape
          track={tracks.filter((t) => t.title === "overandunder (infinity)")[0]}
        />
      </ShapeContainer>
      <ShapeContainer
        track={tracks.filter((t) => t.title === "Believe")[0]}
        viewBox="0 0 261 261"
      >
        <FlowerShape track={tracks.filter((t) => t.title === "Believe")[0]} />
      </ShapeContainer> */}
      <div
        style={{
          backgroundColor: theme.secondary,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ShapeContainer
          track={tracks.filter((t) => t.title === "Believe")[0]}
          viewBox="0 0 261 261"
        >
          <MirrorShape track={tracks.filter((t) => t.title === "Believe")[0]} />
        </ShapeContainer>
      </div>
    </div>
  );
};

const Viewer = (): JSX.Element => {
  return (
    <div
      style={{
        width: "40%",
        height: 100,
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 100000,
      }}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        style={{ width: "fit-content", height: "100%" }}
        // width="971px"
        // height="191px"
        viewBox="0 0 971 191"
      >
        <SVGProcessor>
          <path
            d="M374.2,0.5c-35.4,0-66.4,19.4-82.7,48.2c-6.7,11.3-22,13.8-32,5.3l0,0c-6.6-5.7-15.3-9.1-24.7-9.1c-21,0-38,17-38,38
	c0,0.8,0,1.7,0.1,2.5l0,0c0.6,8.8-7,15.9-15.7,14.8l0,0c-0.8-0.1-1.6-0.2-2.5-0.2c-0.2,0-0.3,0-0.5,0l0,0
	c-8.4,0.2-14.9-7.3-13.5-15.6l0,0c0.3-1.5,0.4-3.1,0.4-4.7c0-15.7-12.8-28.5-28.5-28.5c-8.3,0-15.8,3.6-21,9.2l0,0
	c-6.3,6.8-17.2,6.2-22.7-1.2c-9.4-12.6-24.3-20.7-41.2-20.7c-28.3,0-51.3,23-51.3,51.3s23,51.3,51.3,51.3c21.3,0,39.6-13,47.3-31.5
	c3.7-8.3,14-11.3,21.6-6.3c4.5,3.1,10,4.9,15.9,4.9c2.1,0,4.1-0.2,6-0.6c8.2-1.7,16,4.4,16.2,12.8l0,0c0.2,10.8,9.1,19.5,19.9,19.5
	c9.1,0,16.8-6.1,19.2-14.5l0,0c2.4-8.4,11.9-12.6,19.7-8.6l0,0c5.1,2.6,11,4.1,17.1,4.1c7,0,13.5-1.9,19.1-5.1l0,0
	c11.3-6.6,25.7-1.4,30.4,10.7c12.8,37.3,48.2,64.2,89.9,64.2c52.5,0,95-42.5,95-95S426.6,0.5,374.2,0.5z"
          />
          <circle cx="51.8" cy="89.8" r="51.3" />
          <circle cx="178.8" cy="119.9" r="20" />
          <circle cx="374.2" cy="95.5" r="95" />
          <circle cx="234.8" cy="82.8" r="38" />
          <circle cx="136.7" cy="79.7" r="28.5" />
          <circle cx="547.5" cy="93.1" r="67" />
          <circle cx="650.2" cy="56.2" r="35.7" />
          <circle cx="730.9" cy="109.6" r="52.9" />
          {/* <g> */}
          <path d="M587.8,39.6c10.7,8,25.9,5.9,33.9-4.8L641.9,91c-13-3.1-26.1,4.9-29.2,17.9L587.8,39.6z" />
          <path d="M684.1,44.8c4.2,12.3,17.5,18.9,29.8,14.7l-35.8,54.1c-1-13-12.3-22.7-25.2-21.7L684.1,44.8z" />
          <path d="M748.7,59.8c14.7,5.2,30.9-2.4,36.1-17.1l29.1,44.5c-15.6-1.1-29.1,10.6-30.2,26.2L748.7,59.8z" />
          {/* </g> */}
          <circle cx="816.2" cy="53.9" r="33.4" />
          {/* <g> */}
          <circle cx="547.5" cy="93.1" r="67" />
          <circle cx="650.2" cy="56.2" r="35.7" />
          <circle cx="730.9" cy="109.6" r="52.9" />
          <circle cx="816.2" cy="53.9" r="33.4" />
          {/* </g> */}
          <circle cx="915.5" cy="95.5" r="55" />
        </SVGProcessor>
      </svg>
    </div>
  );
};

interface BasicCircleProps {
  cx: string;
  cy: string;
  r: string;
}

const SVGProcessor = ({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element => {
  const [child, setChild] = useState<BasicCircleProps[]>([]);
  useEffect(() => {
    const realCircs = [];
    children.forEach((child) => {
      console.log(child.type);
      if (child.type === "circle") {
        realCircs.push({ ...child.props, fill: theme.secondary });
        // realCircs.push({ ...child.props, fill: theme.secondary });
      }
    });
    setChild(realCircs);
    // console.log(dep);
  }, []);

  const { isLoaded } = useContext(HomeContext);
  const variants = {
    in: (r) => ({
      // r: "40",
      r: [0, parseInt(r) * 0.75],
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    }),
  };
  // const variants = {
  //   in: {
  //     scale: 1.1,
  //     transition: {
  //       when: "beforeChildren",
  //       staggerChildren: 0.3,
  //     },
  //   },
  // };
  return (
    <>
      {children}
      <motion.g custom="30" variants={variants} animate={isLoaded ? "in" : ""}>
        {child.map((c, i) => {
          // console.log(c);
          return (
            <motion.circle
              custom={c.r}
              variants={variants}
              scale={0}
              cx={c.cx}
              cy={c.cy}
              key={i}
              fill={theme.secondary}
            />
          );
        })}
      </motion.g>
    </>
  );
};
