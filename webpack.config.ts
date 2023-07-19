import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildPaths } from "./config/build/types/config";
import path from "path";

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'), // шаблон на базе которого строится html в бандле. без него вебпак не бандлит .root
}

const mode = 'development';
const isDev = mode === 'development';
const PORT = 3000;

const config = buildWebpackConfig({ mode, paths, isDev, port: PORT })

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'), // шаблон на базе которого строится html в бандле. без него вебпак не бандлит .root
    }

    const mode = env.mode || 'development';
    const PORT = env.port || 3000;

    const isDev = mode === 'development';

    return  buildWebpackConfig({ mode, paths, isDev, port: PORT });
};
