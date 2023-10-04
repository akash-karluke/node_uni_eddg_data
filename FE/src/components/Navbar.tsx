import { useIsAuthenticated } from "@azure/msal-react";
import { Layout } from "antd";
import Image from "next/image";
import NavbarMenu from "./NavbarMenu";
import UserProfileDropdown from "./UserProfileDropdown";
import ProfileContent from "./ProfileContent";
import { useRouter } from "next/router";
import { useAppSelector } from "@/helper/hooks";
import { navigationRoutes } from "./NavigationRoutes";
import Link from "next/link";
import { useState } from "react";
import { SignOutButton } from "./SignOutButton";
import UserDetails from "./UserDetails";
import { withPermission } from "@/hoc";

const { Header } = Layout;

export default function Navbar() {
  const router = useRouter();
  const { user, status, error } = useAppSelector((store: any) => store.user);
  const [isMobileViewOn, setMobileViewOn] = useState(false);
  const currentPath = router.asPath.split("/")[1];

  // Navigation Items that should come in Navbar dropdown
  const items: any = navigationRoutes
    .filter(
      (route) =>
        route.roles.includes(user.role) && route.visible && currentPath,
    )
    .map((route) => ({
      key: route.component,
      label: (
        <>
          <Link className="nav-route" href={"/" + route.component}>
            <Image
              src={route.iconUrl}
              alt="action"
              width={20}
              height={20}
              style={{ margin: "0.7rem 0", height: "20px" }}
            />
            {route.name}
          </Link>
        </>
      ),
    }));

  // const RenderUserProfile=withPermission(UserProfileDropdown,["canViewLandingPage"])

  return (
    <Header className="main-navbar">
      <div className="wrapper">
        <div className="header_logo" style={{ display: "flex" }}>
          <Image
            alt="Eddgie"
            src="/icons/Logo-Eddgie.svg"
            onClick={() => router.push("/")}
            priority={true}
            width={125}
            height={26}
            className="logo_img"
            style={{ cursor: "pointer" }}
          />
        </div>

        {currentPath !== "notAuthorized" && <ProfileContent />}

        {status === "succeeded" && (
          <NavbarMenu
            items={items}
            currentPath={currentPath}
            user={user}
            router={router}
          />
        )}

        <div className="desk-user-profile">
          <UserProfileDropdown status={status} />
        </div>
        <Image
          src="/icons/MenuIcon.svg"
          alt="navbar icon"
          className="mobile-nav-menu-icon"
          width={30}
          height={30}
          onClick={() => setMobileViewOn((prev) => !prev)}
        />
      </div>
      {isMobileViewOn && (
        <MobileNavbar
          setMobileViewOn={setMobileViewOn}
          currentPath={currentPath}
        />
      )}
    </Header>
  );
}

interface MobNavType {
  setMobileViewOn: any;
  currentPath: string;
}

function MobileNavbar({ setMobileViewOn, currentPath }: MobNavType) {
  return (
    <div className="mobile-nav-menu">
      <div className="mob-user-details">
        <UserDetails type="small" />
      </div>
      <ul className="mob-nav-list">
        {navigationRoutes
          .filter(
            (route) =>
              route.component === "actions" || route.component === "scorecard",
          )
          .map((route) => (
            <li
              className={currentPath === route.component ? "active" : ""}
              key={route.component}
            >
              <Link
                href={route.component}
                className="nav-route"
                onClick={() => setMobileViewOn(false)}
              >
                <Image
                  src={route.iconUrl}
                  alt={route.name}
                  width={30}
                  height={30}
                />
                {route.name}
              </Link>
            </li>
          ))}
      </ul>
      <div className="mob-logout-btn">
        <SignOutButton />
      </div>
    </div>
  );
}
