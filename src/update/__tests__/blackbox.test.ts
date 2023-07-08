import { initialState } from "../../index";
import { EActionType, EControlId } from "../../types";
import { compose } from "../index";

describe("Blackbox tests", () => {
  it("should update input state", () => {
    const result = compose(initialState)([
      {
        id: {
          id: EControlId.Input
        },
        type: EActionType.Change,
        payload: "test"
      }
    ]);
    expect(result).toMatchObject({
      input: "test"
    });
  });

  it("should update input state", () => {
    const result = compose(initialState)([
      {
        id: {
          id: EControlId.Input
        },
        type: EActionType.Change,
        payload: "test"
      },
      {
        id: {
          id: EControlId.Input
        },
        type: EActionType.Enter
      }
    ]);
    expect(result).toMatchObject({
      input: "",
      messages: [{ text: "test" }]
    });
  });
});
