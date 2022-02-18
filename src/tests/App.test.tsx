import App from "../App";
import * as ReactDOM from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";

// describe("App Component Test", () => {
//   let container: HTMLDivElement;

//   beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
//     ReactDOM.render(<App />, container);
//   });
//   afterEach(() => {
//     document.body.removeChild(container);
//     container.remove();
//   });

//   it("Renders correctly initial document", () => {});
// });

test(`App Component Test`, () => {
  render(<App />);
  // const body = screen.getE
});
