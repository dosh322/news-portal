import { RuleSetRule } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
    const cssLoaders = {
            test: /\.s[ac]ss$/i,
            use: [
                // По дефолту css в билде находится в самом js файле. MiniCssExtractPlugin плагин экстрактит css в отдельные файлы. в деве это бессмысленно
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            auto: (resPath: string) => Boolean(resPath.includes('.module.')), // когда нужно генерить файл как модуль
                            localIdentName: isDev ?
                                '[path][name]__[local]--[hash:base64:5]' // на деве читаемые имена модулей
                                : '[hash:base64:8]', // на проде 8символьный хэш
                        },
                    }
                },
                "sass-loader",
            ],
        };

    // если не используется ts - нужен babel для парсинга jsx
    const tsLoader = {
        test: /\.tsx?$/, // регулярка на поиск
        use: 'ts-loader', // сам лоадер
        exclude: /node_modules/,
    };

    return [ // конфиг лоадеров, файлы которые выходят за рамки JS (ts, svg, scss, etc...)
        tsLoader,
        cssLoaders,
    ]
}