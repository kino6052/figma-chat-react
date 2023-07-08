import { decoupler } from "../../";
import { EActionType, EControlId, IState } from "../../types";

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

const getRandomMessage = () => {
  const messages = [
    "I see, I see...",
    "Hm...",
    "Are you impressed yet?",

    "Well, I don't know what to say to you",
    "Okay, okay",
    "Keep going",

    "I'm listening, go on",
    "Tell me more",
    "Is that all you have to say?",

    "Be right back",
  ];

  const index = Math.floor(Math.random() * messages.length);

  return messages[Math.min(index, messages.length - 1)];
};

export const handler = async (state: IState) => {
  if (!state.isLoading) return;

  await wait(1000);

  decoupler.sendAction({
    type: EActionType.IO,
    id: { id: EControlId.Communication },
    payload: getRandomMessage(),
  });

  await wait(1000);
};
