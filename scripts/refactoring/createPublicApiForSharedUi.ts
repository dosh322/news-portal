import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Project } from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files = project.getSourceFiles();
const sharedLayerPath = path.resolve(__dirname, "..", "..", "src", "shared", "ui");
const sharedUIDir = project.getDirectory(sharedLayerPath);
const sharedComponentsDirectories = sharedUIDir?.getDirectories();

function isAbsolute(value: string) {
    const layers = [
        "@/app",
        "@/shared",
        "@/entities",
        "@/features",
        "@/widgets",
        "@/pages",
    ];
    return layers.some((layer) => value.startsWith(layer));
}

sharedComponentsDirectories?.forEach((directory) => {
    const indexFilePath = `${directory.getPath()}/index.ts`;
    const indexFile = directory.getSourceFile(indexFilePath);

    if (!indexFile) {
        const componentName = directory.getBaseName();
        const sourceCode = `export { ${componentName} } from "./${componentName}";\n`;
        const file = directory.createSourceFile(indexFilePath, sourceCode, {
            overwrite: true,
        });

        file.save();
    }
});

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const importFrom = importDeclaration.getModuleSpecifierValue();

        if (importFrom.startsWith("@/shared/ui")) {
            importDeclaration.setModuleSpecifier(
                importFrom.split("/").slice(0, 4).join("/"),
            );
        }
    });
});

project.save();
