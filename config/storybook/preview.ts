import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/constants/theme";
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
        layout: "fullScreen",
    },
    decorators: [ThemeDecorator(Theme.LIGHT), RouterDecorator],
};

export default preview;
