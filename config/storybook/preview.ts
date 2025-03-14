import { Theme } from "@/app/providers/ThemeProvider";
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import type { Preview } from "@storybook/react";

import "app/styles/index.scss";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [ThemeDecorator(Theme.LIGHT), RouterDecorator],
};

export default preview;
