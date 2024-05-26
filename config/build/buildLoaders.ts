import ReactRefreshTypescript from "react-refresh-typescript";
import { RuleSetRule } from "webpack";
import { buildCssLoader } from "./loaders/buildCssLoader";
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

    const cssLoaders = buildCssLoader(isDev);

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
