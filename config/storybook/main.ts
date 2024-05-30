import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import { RuleSetRule } from "webpack";
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
        config.module.rules = config.module?.rules?.map((rule: RuleSetRule) => {
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i };
            }

            return rule;
        });

        config.module?.rules?.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        config.module?.rules?.push(buildCssLoader(true));

        return config;
    },
};
export default config;
