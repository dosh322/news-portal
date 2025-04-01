import { RuleSetRule } from "webpack";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
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

    const babelLoader = buildBabelLoader({ isDev, isTsx: false });
    const TSXBabelLoader = buildBabelLoader({ isDev, isTsx: true });

    return [fileLoader, svgLoader, babelLoader, TSXBabelLoader, cssLoaders];
}
