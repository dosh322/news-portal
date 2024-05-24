type Mods = Record<string, boolean | string>;

export function classNames(
    mainCls: string,
    mods: Mods = {},
    additional: string[] = [],
): string {
    return [
        mainCls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([cls]) => cls),
    ].join(" ");
}
