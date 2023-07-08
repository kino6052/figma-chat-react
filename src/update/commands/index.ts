import { IState, TAction } from "../../types";

export const commandMap = new Map<
  string,
  (state: IState, action: TAction<any>) => IState
>();
