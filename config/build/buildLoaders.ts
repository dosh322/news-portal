import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypescript from "react-refresh-typescript";
import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };

    const cssLoaders = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes(".module.")),
                        localIdentName: isDev
                            ? "[path][name]__[local]--[hash:base64:5]" // на деве читаемые имена модулей
                            : "[hash:base64:8]", // на проде 8символьный хэш
                    },
                },
            },
            "sass-loader",
        ],
    };

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
                plugins: [
                    [
                        "i18next-extract",
                        {
                            locales: ["ru", "en"],
                            keyAsDefaultValue: true,
                        },
                    ],
                ],
            },
        },
    };

    const tsLoader = {
        test: /\.tsx?$/, // регулярка на поиск
        use: {
            loader: "ts-loader",
            options: {
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypescript()].filter(Boolean),
                }),
                transpileOnly: isDev,
            },
        }, // сам лоадер
        exclude: /node_modules/,
    };

    return [
        // конфиг лоадеров, файлы которые выходят за рамки JS (ts, svg, scss, etc...)
        fileLoader,
        svgLoader,
        babelLoader,
        tsLoader,
        cssLoaders,
    ];
}
