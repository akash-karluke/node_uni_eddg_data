import { InteractionType } from "@azure/msal-browser";
import {
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";

import { useAppDispatch } from "@/helper/hooks";
import { clearUser } from "@/reducers/userSlice";
import { Spin } from "antd";
import { ReactNode, useEffect } from "react";
import { loginRequest } from "../components/azure/config/authConfig";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const Authentication = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { instance, accounts } = useMsal();

  //const token = useSelector((state:any) => state.auth.token);

  // const login = new AuthService();
  //const [login] = useLoginMutation();

  const isAuthenticated = useIsAuthenticated();

  const { error } = useMsalAuthentication(InteractionType.Silent, loginRequest);

  useEffect(() => {
    if (error) {
      handleLogin("redirect");
      dispatch(clearUser());
    }
    // eslint-disable-next-line
  }, [error, dispatch]);

  function handleLogin(loginType: string) {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {});
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {});
    }
  }

  return <div>{isAuthenticated ? <>{children}</> : <Spin />}</div>;
};
