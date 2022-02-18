import React, { useState, useEffect } from "react";
import classNames from "classnames";
import theme from "@static/theme";

const ViewCard = ({
  children,
  border,
  overflowHidden,
  radius,
}: {
  children: JSX.Element | JSX.Element[];
  border: boolean;
  overflowHidden: boolean;
  radius: number | undefined;
}): JSX.Element => {
  const noBorderArray = ["arrow"];

  const containerStyle = {
    width: "100%",
    height: "100%",
    border: `1px solid blue`,
    // border: border ? "2px solid black" : "",
    // backgroundColor: theme.primary,JE60NN
    overflow: overflowHidden ? "hidden" : "visible",
    // borderRadius: theme.borderRadius,
  } as React.CSSProperties;

  return (
    <div id="view-card" className={"view-card"} style={containerStyle}>
      {children}
    </div>
  );
};

export default ViewCard;
