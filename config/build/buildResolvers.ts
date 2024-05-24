import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: [".tsx", ".ts", ".js"], // при импорте можно не указывать расширения для файлов с этими расширениями
        preferAbsolute: true,
        modules: [options.paths.src, "node_modules"],
        mainFiles: ["index"],
        alias: {},
    };
}
