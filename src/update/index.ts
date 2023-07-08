import { IState, TAction } from "../types";
import { commandMap } from "./commands";
import { generateKey } from "./utils";

import "./commands/input";
import "./commands/communication";

export function update<T>(state: IState, action: TAction<T>): IState {
  const command = commandMap.get(
    generateKey({ id: action.id?.id, type: action.type })
  );

  if (!command) return state;

  return command(state, action);
}

export function compose<T>(state: IState) {
  return (actions: TAction<T>[]) =>
    actions.reduce((_state, action) => update(_state, action), state);
}
