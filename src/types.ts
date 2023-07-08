export enum EUser {
  User = "user",
  Bot = "bot"
}

export type TMessage = {
  id: string;
  user: EUser;
  text: string;
};

export enum EControlId {
  Input = "input",
  Communication = "remote"
}

export enum EActionType {
  Click = "click",
  Change = "change",
  Enter = "enter",
  IO = "io"
}

export type TAction<T> = {
  type: EActionType;
  id: { id: EControlId; uid?: string };
  payload?: T;
};

export interface IState {
  input: string;
  isLoading: boolean;
  messages: TMessage[];
}
export interface ICommand {
  execute(): IState;
}
