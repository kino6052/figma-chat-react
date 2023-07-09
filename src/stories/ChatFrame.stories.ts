// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { ChatFrame } from "../io/ui/components/ChatFrame";

const meta: Meta<typeof ChatFrame> = {
  title: "Decoupler/StateVisualization",
  component: ChatFrame,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ChatFrame>;

export const Initial: Story = {
  args: {
    disabled: false,
    messages: [],
    input: "",
  },
};

export const SomeInput: Story = {
  args: {
    disabled: false,
    messages: [],
    input: "Some input",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    messages: [],
    input: "Some input",
  },
};

export const OneMessage: Story = {
  args: {
    disabled: false,
    messages: [
      {
        user: "user",
        text: "First message",
      },
    ],
    input: "",
  },
};

export const TwoMessage: Story = {
  args: {
    disabled: false,
    messages: [
      {
        user: "user",
        text: "Second message",
      },
      {
        user: "bot",
        text: "Second message",
      },
    ],
    input: "",
  },
};
