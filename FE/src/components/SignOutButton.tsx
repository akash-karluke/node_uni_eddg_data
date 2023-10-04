import { useMsal } from "@azure/msal-react";
import { Button } from "antd";

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = ({
  type,
  style,
}: {
  type?: string;
  style?: any;
}) => {
  const { instance } = useMsal();

  const handleLogout = (logoutType: string) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
      localStorage.clear();
    }
  };

  return (
    <>
      {type === "button" ? (
        <Button
          type="primary"
          danger
          block
          onClick={() => handleLogout("popup")}
        >
          Sign out
        </Button>
      ) : (
        <span onClick={() => handleLogout("popup")} style={style}>
          Log out
        </span>
      )}
    </>
  );
};
