import { commandMap } from "..";
import {
  EActionType,
  EControlId,
  EUser,
  IState,
  TAction
} from "../../../types";
import { nanoid } from "nanoid";
import { generateKey } from "../../utils";

export const execute = (state: IState, action: TAction<string>): IState => {
  const { type, payload } = action;

  if (type !== EActionType.Enter) return state;

  if (typeof payload !== "string") return state;

  return {
    ...state,
    messages: [
      ...state.messages,
      { text: payload, user: EUser.User, id: nanoid() }
    ],
    isLoading: true,
    input: ""
  };
};

commandMap.set(
  generateKey({ id: EControlId.Input, type: EActionType.Enter }),
  execute
);
