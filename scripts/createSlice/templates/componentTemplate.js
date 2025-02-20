const interfaceConst = 'interface';

module.exports = (componentName) => `import clsx from "clsx";
import { useTranslation } from "react-i18next";
import classes from "./${componentName}.module.scss";
import { memo } from "react";

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo(function ${componentName}({ className }: ${componentName}Props) {
    const { t } = useTranslation();
    
    return (
        <div className={clsx(classes.${componentName}, className)}>
           
        </div>
    );
});`;
