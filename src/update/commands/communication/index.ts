import { commandMap } from "..";
import {
  EActionType,
  EControlId,
  EUser,
  IState,
  TAction
} from "../../../types";
import { generateKey } from "../../utils";
import { nanoid } from "nanoid";

export const execute = (state: IState, action: TAction<string>): IState => {
  const { type, payload } = action;

  if (type !== EActionType.IO) return state;

  if (typeof payload !== "string") return state;

  return {
    ...state,
    messages: [
      ...state.messages,
      { text: payload, user: EUser.Bot, id: nanoid() }
    ],
    isLoading: false,
    input: ""
  };
};

commandMap.set(
  generateKey({ id: EControlId.Communication, type: EActionType.IO }),
  execute
);
