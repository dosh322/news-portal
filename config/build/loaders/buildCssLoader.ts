import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildCssLoader = (isDev: boolean) => ({
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
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
});
