import React, { useState, useEffect } from "react";

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

type HomeContext = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};
export const HomeContext = React.createContext<HomeContext>(null!);

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

        <motion.section style={{ width: "100vw" }} className="dot-fill">
          {appConfig.showIntro && <IntroModal />}
          {/* <AboutButton /> */}
          {/* <TopBar /> */}
          {/* <MediaControls /> */}
          {/* <ReturnButton /> */}
          <InfoPopup />
          <FlexRow id="panel-canvas" style={{ border: "5px solid #3e3e3e" }}>
            <HomePanel />
            <motion.div
              id="violin-widget-container"
              variants={violinVariants}
              style={{
                height: "100vh",
                width: "100vw",
                position: "absolute",
                top: "0%",
                right: "0%",
                zIndex: infoDisplayMode !== undefined ? -1 : 0,
                pointerEvents: isSm ? "none" : "all",
                border: "1px solid red",
                opacity: 0,
              }}
              animate={isLoaded ? "start" : ""}
              initial={false}
            >
              {/* <HomeContext.Provider
              value={{ name: name, setName, progress, setProgress }}
            > */}
              <ViolinWidget track={currentTrack} />
              {/* </HomeContext.Provider> */}
            </motion.div>
          </FlexRow>
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
