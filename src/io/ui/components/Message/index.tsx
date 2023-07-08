import React from "react";
import { VariantChatgpt } from "../../icons/VariantChatGPT";
import { Avatar } from "../Avatar";
import "./style.css";

export const Message: React.FC<{
  message: string;
  variant: "bot" | "user";
  className: string;
}> = ({ message = "This is text!", variant, className }) => {
  return (
    <div className={`message ${variant} ${className}`}>
      {variant === "user" && (
        <Avatar
          variant="you"
          variantYouClassName="avatar-instance"
          yClassName="instance-node"
        />
      )}

      {variant === "bot" && <VariantChatgpt className="avatar-1" />}

      <div className="this-is-text">{message}</div>
    </div>
  );
};
