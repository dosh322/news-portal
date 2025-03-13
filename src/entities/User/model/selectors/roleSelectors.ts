import { createSelector } from "@reduxjs/toolkit";
import { userSelectors } from "../slice/userSlice";
import { UserRole } from "../types/user";

export const selectIsUserAdmin = createSelector(userSelectors.selectUserRoles, (roles) =>
    roles.includes(UserRole.ADMIN),
);

export const selectIsUserManager = createSelector(
    userSelectors.selectUserRoles,
    (roles) => roles.includes(UserRole.MANAGER),
);
