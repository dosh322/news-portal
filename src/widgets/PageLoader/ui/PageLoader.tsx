import { Spinner } from "@/shared/ui/Spinner";
import classes from "./PageLoader.module.scss";

function PageLoader() {
    return (
        <div className={classes.PageLoader}>
            <Spinner />
        </div>
    );
}

export { PageLoader };
