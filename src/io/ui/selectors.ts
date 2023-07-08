import { IState } from "../../types";

export const selectMainProps = (state: IState) => ({
  ...state,
  disabled: state?.isLoading
});
