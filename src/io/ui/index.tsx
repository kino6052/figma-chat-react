import React from "react";
import ReactDOM from "react-dom/client";
import { IState } from "../../types";
import { selectMainProps } from "./selectors";
import "./style.css";
import { App } from "./App";
import { BehaviorSubject } from "rxjs";
import { initialState } from "../../bridge";

// NOTE: Here is the necessary set up for the UI IO agent
export const PropsSubject = new BehaviorSubject<
  ReturnType<typeof selectMainProps>
>(selectMainProps(initialState));

export function handler(state: IState) {
  const props = selectMainProps(state);

  PropsSubject.next(props);
}

const init = () => {
  try {
    const rootElement = document.getElementById("root")!;
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (e) {
    console.error(e);
  }
};

init();
