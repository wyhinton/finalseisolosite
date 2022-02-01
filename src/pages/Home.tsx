import React, { useState, useEffect } from "react";

import tracks from "@static/tracks";
import { useApp, usePlaylist } from "@hooks";
import "@css/blockquote.scss";
import { Layout } from "react-grid-layout";
import "@css/Layout.scss";
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import "@css/Body.scss";
import { defaultLayout } from "@static/gridLayouts";
import IntroModal from "@components/Home/Modals/IntroModal";
import HomeWidgetGrid from "@components/Home/Grid/HomeWidgetGrid";
import ReturnButton from "@components/ReturnButton";
import appConfig from "@static/appConfig";
import ViolinWidget from "@components/Home/Grid/GridWidgets/ViolinWidget";
import Nav from "@components/Home/Nav/Nav";
import InfoPopup from "@components/Home/InfoPopup";
import AppBar from "@components/Home/AppBar";
export type HomeMode = "player" | "notes" | "about";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@components/ErrorBoundary";

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
    // audio.current = new AudioContext();
  }, []);

  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);

  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);

  return (
    // <StoreProvider store={homeStore}>
    // <
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section style={{ width: "100vw" }} className="dot-fill">
        {appConfig.showIntro && <IntroModal />}
        {/* <AboutButton /> */}
        {/* <TopBar /> */}
        {/* <MediaControls /> */}
        <ReturnButton />
        <InfoPopup />
        <HomeWidgetGrid />
        <Nav />
        <AppBar />
        <div
          id="violin-widget-container"
          style={{
            height: "100vh",
            // height: "100%",
            // width: "90vmin",
            width: "50%",
            position: "absolute",
            top: "0%",
            // top: "0%",
            right: "0%",
            zIndex: infoDisplayMode !== undefined ? -1 : 0,
            // zIndex: infoDisplayMode !== undefined ? -1 : 10,
            // border: "1px solid red",
          }}
        >
          <ViolinWidget track={currentTrack} />
        </div>
        {/* <WaveformWidget /> */}
      </section>
    </ErrorBoundary>
    // </StoreProvider>
  );
};

export default Home;
