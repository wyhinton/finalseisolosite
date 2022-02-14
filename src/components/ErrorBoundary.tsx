import theme from "@static/theme";
import React, { useState, useEffect, useRef } from "react";
import "@css/Body.scss";
import { ErrorBoundary } from "react-error-boundary";
import FlexColumn from "@components/UI//FlexColumn";
import { motion } from "framer-motion";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <motion.section
      className="dot-fill"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        // border: "5px solid black",
        padding: "5em",
        border: `5px solid ${theme.secondary}`,
      }}
    >
      <FlexColumn
        style={{
          fontSize: "10vmin",
          textAlign: "center",
          whiteSpace: "break-spaces",
          width: "50%",
          margin: "0 !important",
          height: "fit-content",
        }}
      >
        <motion.div
          animate={{ y: -0, opacity: 1 }}
          style={{
            y: -100,
            opacity: 0,
            backgroundColor: theme.primary,
            borderRadius: theme.borderRadius,
          }}
        >
          Something went wrong :(
          <br></br>
          <div style={{ fontSize: `min(40px, 10vmin)` }}>
            (Maybe try refreshing the page?)
          </div>
        </motion.div>

        {/* <p
          style={{
            fontSize: "10vmin",
            textAlign: "center",
            whiteSpace: "break-spaces",
            width: "50%",
            margin: "auto",
          }}
        >
          We're sorry!
        </p>
        <p
          style={{
            fontSize: "10vmin",
            textAlign: "center",
            whiteSpace: "break-spaces",
            width: "50%",
            margin: "auto",
          }}
        >
          Something went wrong :(
        </p> */}
        <br />
        {/* <pre>{error.message}</pre>
        <br />
        <div>Please come back later!</div>
        <br /> */}
        {/* <button onClick={resetErrorBoundary}>Try again</button> */}
      </FlexColumn>
    </motion.section>
  );
}

export default ErrorFallback;
