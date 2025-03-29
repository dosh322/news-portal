import { StoryFn } from "@storybook/react/*";
// eslint-disable-next-line imports-checker/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import clsx from "clsx";
import { Theme } from "@/shared/constants/theme";

export const ThemeDecorator = (theme: Theme) =>
    function ThemeDecoratorComponent(Story: StoryFn) {
        return (
            <ThemeProvider initialTheme={theme}>
                <div className={clsx("app", theme)}>
                    <Story />
                </div>
            </ThemeProvider>
        );
    };
