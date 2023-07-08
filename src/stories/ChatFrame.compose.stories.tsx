import type { Meta, StoryObj } from "@storybook/react";

import { ChatFrame } from "../io/ui/components/ChatFrame";
import { compose } from "../update";
import { initialState } from "../bridge";
import { EActionType, EControlId, TAction } from "../types";
import { selectMainProps } from "../io/ui/selectors";

function withCompose<T>(
  WrappedComponent: React.FC<ReturnType<typeof selectMainProps>>
) {
  return function ({
    __actions__ = [],
  }: T & { __actions__: TAction<string>[] }) {
    const _props = selectMainProps(compose(initialState)(__actions__));

    console.warn(_props, __actions__);

    return <WrappedComponent {..._props} />;
  };
}

const WithCompose = withCompose(ChatFrame);

const meta: Meta<typeof WithCompose> = {
  title: "Decoupler/Compose",
  component: WithCompose,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ChatFrame>;

export const Initial: Story = {
  args: { __actions__: [] },
};

export const SomeInput: Story = {
  args: {
    __actions__: [
      {
        type: EActionType.Change,
        id: { id: EControlId.Input },
        payload: "Some input",
      },
    ],
  },
};

export const OneMessage: Story = {
  args: {
    __actions__: [
      {
        type: EActionType.Change,
        id: { id: EControlId.Input },
        payload: "Some input",
      },
      {
        type: EActionType.Enter,
        id: { id: EControlId.Input },
      },
    ],
  },
};

export const TwoMessage: Story = {
  args: {
    __actions__: [
      {
        type: EActionType.Change,
        id: { id: EControlId.Input },
        payload: "Some input",
      },
      {
        type: EActionType.Enter,
        id: { id: EControlId.Input },
      },
      {
        type: EActionType.Change,
        id: { id: EControlId.Input },
        payload: "Some input",
      },
      {
        type: EActionType.Enter,
        id: { id: EControlId.Input },
      },
    ],
  },
};

export const Response: Story = {
  args: {
    __actions__: [
      {
        type: EActionType.Change,
        id: { id: EControlId.Input },
        payload: "Some input",
      },
      {
        type: EActionType.Enter,
        id: { id: EControlId.Input },
      },
      {
        type: EActionType.IO,
        id: { id: EControlId.Communication },
        payload: "Hey threre",
      },
    ],
  },
};
