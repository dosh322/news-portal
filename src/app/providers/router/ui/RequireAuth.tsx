import { getUser } from "@/entities/User";
import { getRouteHome } from "@/shared/constants/router";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }: PropsWithChildren) {
    const user = useSelector(getUser);
    const location = useLocation();

    if (!user) {
        return <Navigate to={getRouteHome()} state={{ from: location }} replace />;
    }
    return children;
}

export { RequireAuth };
