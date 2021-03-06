import { usePlaylist, useQuery, useSize, useWindowSize } from "@hooks";
import theme from "@static/theme";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import ViewCard from "./ViewCard";
import { layoutLg, layoutSm } from "@static/gridLayouts";
import appConfig from "@static/appConfig";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = ({
  children,
  className,
  layout,
}: {
  children: JSX.Element[];
  className: string;
  layout: Layout[];
}): JSX.Element => {
  const cardContainerStyle = {
    width: "100%",
    height: "100%",
  } as React.CSSProperties;

  const l = layout.map((l) => {
    return { ...l };
  });
  const { homePadding } = appConfig;
  const padding = homePadding;
  const rows = 12;
  const { width, height } = useWindowSize();
  const [rowHeight, setRowHeight] = useState((height - 25 * rows) / 12);

  const wrappedWidgets = useMemo(
    () =>
      layout.map((c, i) => {
        const noBorderArray = [
          "arrow",
          "recitalTracks",
          "remixes",
          "oneRecitalText",
          "threeRemixes",
          "trackInfo",
          "violin",
          "about",
          "infoDisplay",
        ];
        const showOverflowArray = [
          "oneRecitalText",
          "threeRemixes",
          "projectInfo",
          "trackInfo",
          "waveform",
        ];
        const border = !noBorderArray.includes(c.i as string);
        const overflowHidden = showOverflowArray.includes(c.i as string);
        // const overflowHidden = showOverflowArray.includes(c.i as string);
        const id = c.i;
        return (
          <div
            key={id}
            id={id}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <motion.div
              initial={false}
              // initial={{
              //   opacity: 0,
              //   // translateX: i % 2 === 0 ? -50 : 50,
              //   // translateX: `${getRandomIntInclusive(-500, 500)}`,
              //   // translateX: -50,
              //   // translateY: i % 2 === 0 ? -50 : 50
              //   translateY: `${getRandomIntInclusive(-500, 500)}`,
              //   // translateY: -50
              // }}
              // animate={{
              //   opacity: 1,
              //   translateX: 0,
              //   translateY: 0,
              // }}
              // transition={{
              //   duration: 1,
              //   // initiates stagger effect by varying the transition delay for each element in the array
              //   delay: i * 0.2,
              // }}
              //   key={id}
              id={id}
              style={cardContainerStyle}
            >
              <ViewCard
                border={border}
                overflowHidden={overflowHidden}
                radius={undefined}
              >
                {children[i]}
              </ViewCard>
            </motion.div>
          </div>
        );
      }),
    [layout]
  );

  const { isSm } = useQuery();

  useEffect(() => {
    // const ratio = height / (screen.height - 95);
    const ratio = height / screen.height;
    const minRatioWindowToScreen = 0.61;
    if (isSm) {
      setRowHeight(((height - 25 * rows) / 12) * 1.5);
    } else {
      if (ratio > minRatioWindowToScreen) {
        setRowHeight((height - 25 * rows) / 12);
      }
    }
  }, [height]);

  let layouts: Layouts = {
    lg: layoutLg,
    md: layoutLg,
    sm: layoutSm,
    xxs: layoutSm,
  };

  // https://github.com/react-grid-layout/react-grid-layout/issues/233#issuecomment-319995357
  return (
    <ResponsiveGridLayout
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        pointerEvents: !isSm ? "none" : "all",
        height: isSm ? "130vh" : "fit-content",
        // overflowY: "scroll",
      }}
      onWidthChange={(e) => {
        console.log(e);
      }}
      //
      measureBeforeMount={true}
      // allowOverlap
      // isDraggable={false}
      // isDraggable={true}
      className={className}
      layouts={layouts}
      // layouts={ll}
      useCSSTransforms={false}
      // useCSSTransforms={animate}
      margin={[padding / 2, padding / 2]}
      // margin={[padding, padding]}
      // compactType={undefined}
      width={window.innerWidth}
      // rowHeight={200}
      rowHeight={rowHeight}
      cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
      containerPadding={[padding, padding * 4]}
      // verticalCompact={false}
      // onLayoutChange={function () {}}
    >
      {wrappedWidgets}
    </ResponsiveGridLayout>
  );
};
("1=20px");

export default React.memo(GridLayout);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
//288-384
//96
