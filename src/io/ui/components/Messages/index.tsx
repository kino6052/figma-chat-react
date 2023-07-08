import React, { useEffect, useRef } from "react";
import { TMessage } from "../../../../types";
import { Message } from "../Message";
import "./style.css";

export const Messages: React.FC<{
  className: string;
  messages: TMessage[];
}> = ({ className, messages }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.scrollTo(0, ref.current?.scrollHeight);
    }
  }, [messages]);

  return (
    <div className={`messages ${className}`} ref={ref}>
      {messages.map((message) => {
        return (
          <Message
            className="message-instance"
            message={message.text}
            variant={message.user}
          />
        );
      })}
    </div>
  );
};
