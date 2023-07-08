import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BehaviorSubject } from "rxjs";
import { decoupler, initialState } from "../..";
import { IState } from "../../types";
import { ChatFrame } from "./components/ChatFrame";
import { selectMainProps } from "./selectors";
import { EventSubject } from "./utils/EventWrapper";
import { useSharedState } from "./utils/useSharedState";
import "./style.css";

// NOTE: Here is the necessary set up for the UI IO agent

const PropsSubject = new BehaviorSubject<ReturnType<typeof selectMainProps>>(
  selectMainProps(initialState)
);

export function handler(state: IState) {
  const props = selectMainProps(state);

  PropsSubject.next(props);
}

const App: React.FC = () => {
  useEffect(() => {
    const subscription = EventSubject.subscribe((event) => {
      decoupler.sendAction(event);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [props] = useSharedState(PropsSubject);

  if (typeof window === undefined) return null;
  return <ChatFrame {...props} />;
};

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
