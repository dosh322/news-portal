import { getUser } from "@/entities/User";
import { routePaths } from "@/shared/constants/router";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }: PropsWithChildren) {
    const user = useSelector(getUser);
    const location = useLocation();

    if (!user) {
        return <Navigate to={routePaths.home} state={{ from: location }} replace />;
    }
    return children;
}

export { RequireAuth };
