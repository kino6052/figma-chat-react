import { Decoupler } from "./utils/Decoupler";
import { EActionType, EControlId, IState } from "./types";
import { update } from "./update";
import { handler as uiHandler } from "./io/ui";
import { handler as communicationHandler } from "./io/communication";
import { initialState } from "./bridge";

export const decoupler = new Decoupler<
  IState,
  EActionType,
  EControlId,
  unknown
>(initialState, update);

decoupler.registerIOHandler(uiHandler);
decoupler.registerIOHandler(communicationHandler);
decoupler.init();
