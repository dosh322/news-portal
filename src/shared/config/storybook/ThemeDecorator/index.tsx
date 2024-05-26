import { StoryFn } from "@storybook/react/*";
import { Theme, ThemeProvider } from "app/providers/ThemeProvider";
import clsx from "clsx";

export const ThemeDecorator = (theme: Theme) =>
    function ThemeDecoratorComponent(Story: StoryFn) {
        return (
            <ThemeProvider defaultTheme={theme}>
                <div className={clsx("app", `app-${theme}-theme`)}>
                    <Story />
                </div>
            </ThemeProvider>
        );
    };
