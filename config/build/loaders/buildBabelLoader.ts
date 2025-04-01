import removePropsBabelPlugin from "../../plugins/removePropsBabelPlugin";

export const buildBabelLoader = ({
    isDev,
    isTsx,
}: {
    isDev: boolean;
    isTsx: boolean;
}) => ({
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env"],
            plugins: [
                ["@babel/plugin-transform-typescript", { isTsx }],
                ["@babel/plugin-transform-runtime"],
                isTsx &&
                    !isDev && [
                        removePropsBabelPlugin,
                        {
                            props: ["data-testid"],
                        },
                    ],
                [
                    "i18next-extract",
                    {
                        locales: ["ru", "en"],
                        keyAsDefaultValue: true,
                    },
                ],
            ].filter(Boolean),
        },
    },
});
