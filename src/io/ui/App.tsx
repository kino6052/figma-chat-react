import { ChatFrame } from "./components/ChatFrame";
import "./style.css";
import { withDecoupler } from "./utils/withDecoupler";

export const App = withDecoupler(ChatFrame);
