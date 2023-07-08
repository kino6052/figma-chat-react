import { commandMap } from "..";
import { EActionType, EControlId, IState, TAction } from "../../../types";
import { generateKey } from "../../utils";

export const execute = (state: IState, action: TAction<string>): IState => {
  const { type, payload } = action;

  if (type !== EActionType.Change) return state;

  if (typeof payload !== "string") return state;

  return {
    ...state,
    input: payload
  };
};

commandMap.set(
  generateKey({ id: EControlId.Input, type: EActionType.Change }),
  execute
);
