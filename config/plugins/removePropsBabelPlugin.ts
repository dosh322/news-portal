import { PluginItem } from "@babel/core";

interface Options {
    props: string[];
}

export default function removePropsBabelPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state: { opts: Options }) {
                const forbidden = state.opts.props || [];

                path.traverse({
                    JSXIdentifier(current) {
                        const nodeName = current.node.name;

                        if (forbidden.includes(nodeName)) {
                            current.parentPath.remove();
                        }
                    },
                });
            },
        },
    };
}
