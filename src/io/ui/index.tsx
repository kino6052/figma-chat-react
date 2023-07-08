import React from "react";
import ReactDOM from "react-dom/client";
import { IState } from "../../types";
import { selectMainProps } from "./selectors";
import "./style.css";
import { App, PropsSubject } from "./App";

// NOTE: Here is the necessary set up for the UI IO agent

export function handler(state: IState) {
  const props = selectMainProps(state);

  PropsSubject.next(props);
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
