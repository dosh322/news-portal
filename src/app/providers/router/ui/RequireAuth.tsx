import { getUser } from "entities/User";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { routePaths } from "shared/config/routesConfig";

function RequireAuth({ children }: PropsWithChildren) {
    const user = useSelector(getUser);
    const location = useLocation();

    if (!user) {
        return <Navigate to={routePaths.home} state={{ from: location }} replace />;
    }
    return children;
}

export { RequireAuth };
