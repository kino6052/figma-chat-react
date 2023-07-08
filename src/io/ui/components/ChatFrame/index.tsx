import React from "react";
import { TMessage } from "../../../../types";
import { Messages } from "../../components/Messages";
import { EventWrapper } from "../../utils/EventWrapper";
import "./style.css";

export const ChatFrame: React.FC<{
  disabled: boolean;
  messages: TMessage[];
  input: string;
}> = ({ messages, disabled, input }) => {
  return (
    <div className="chat-frame">
      <div className="title-frame">
        <div className="title">Figma Chat</div>
      </div>
      <Messages className="messages-instance" messages={messages} />
      <div className="input-frame">
        <EventWrapper id={{ id: "input" }}>
          <input disabled={disabled} className="input" value={input} />
        </EventWrapper>
      </div>
    </div>
  );
};
