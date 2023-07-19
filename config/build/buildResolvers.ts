import { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'], // при импорте можно не указывать расширения для файлов с этими расширениями
    }
}