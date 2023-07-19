import {BuildOptions} from "./types/config";
import { Configuration } from "webpack";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { paths, mode, isDev } = options;
 return {
     mode,
     entry: paths.entry,
     output: {
         filename: "[name].[contenthash].js", // contenthash для генерации хэша бандла. браузеры кэшируют файлы и чтобы при новой версии проекта браузер не отдавал прошлый файл, можно добавить хэш
         path: paths.build,
         clean: true, // удалять прошлые файлы при новой сборке
         publicPath: '/',
     },
     plugins: buildPlugins(options),
     module: {
         rules: buildLoaders(options),
     },
     resolve: buildResolvers(),
     devtool: isDev ? 'inline-source-map' : undefined, // source maps для того, чтобы в дев моде отслеживать сурсы и были понятные ошибки, тк вебпак бандлит все в несколько js файлов
     devServer: isDev ?  buildDevServer(options) : undefined,
 }
}