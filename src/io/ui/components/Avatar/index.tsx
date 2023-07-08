import React from "react";
import { VariantChatgpt } from "../../icons/VariantChatGPT";
import "./style.css";

export const Avatar: React.FC<{
  variant: "chat-GPT" | "you";
  variantYouClassName: string;
  yClassName: string;
}> = ({ variant, variantYouClassName, yClassName }) => {
  return (
    <>
      {variant === "chat-GPT" && <VariantChatgpt className="variant-chatgpt" />}

      {variant === "you" && (
        <div className={`avatar ${variantYouClassName}`}>
          <div className={`y ${yClassName}`}>Y</div>
        </div>
      )}
    </>
  );
};
