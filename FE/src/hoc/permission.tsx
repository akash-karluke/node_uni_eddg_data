import React from "react";
import { useSelector } from "react-redux";
import allPermissions from "./config.js";

const withPermission = (
  Component: any,
  requiredPermissions: any,
  permissionsAlgorithm = "every",
) => {
  const ComponentParent = (props: any) => {
    // const userRole = useSelector(({ store }) => user.userRole || [])

    //Fetch all the permissions according to the userRole
    const permissions = allPermissions["SalesManager"];

    if (["every", "some"].indexOf(permissionsAlgorithm) === -1) {
      throw new Error("Only Every/some permissionsAlgorithm supported");
    }

    const hasPermission = requiredPermissions[permissionsAlgorithm]((r: any) =>
      permissions.includes(r),
    );

    return hasPermission ? <Component {...props} /> : null;
  };

  return ComponentParent;
};

export default withPermission;
