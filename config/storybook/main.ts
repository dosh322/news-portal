import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import { DefinePlugin } from "webpack";
import { buildCssLoader } from "../build/loaders/buildCssLoader";

const config: StorybookConfig = {
    stories: ["../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: "automatic",
                },
            },
        },
        inputSourceMap: true,
    }),
    webpackFinal: (config) => {
        const srcPath = path.resolve(__dirname, "..", "..", "src");

        config.resolve?.modules?.push(path.resolve(srcPath));
        config.resolve?.extensions?.push(".ts", ".tsx");
        config.module!.rules = config.module!.rules!.map((rule) => {
            // Ensure the rule is a RuleSetRule before modifying it
            if (
                typeof rule === "object" &&
                rule !== null &&
                "test" in rule &&
                /svg/.test(rule.test as string)
            ) {
                return { ...rule, exclude: /\.svg$/i };
            }

            return rule;
        });

        config.module?.rules?.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        config.module?.rules?.push(buildCssLoader(true));

        config.plugins?.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify(""),
                __PROJECT__: JSON.stringify("storybook"),
            }),
        );

        return config;
    },
};
export default config;
