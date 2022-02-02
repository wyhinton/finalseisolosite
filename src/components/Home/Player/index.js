import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

import TrackAudio from "./TrackAudio";

function App() {
  return (
    <div className="App">
      <TrackAudio />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
