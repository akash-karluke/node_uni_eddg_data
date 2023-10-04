import variables from "@/styles/variables.module.scss";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { ConfigProvider, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { navigationRoutes } from "./NavigationRoutes";

interface NavbarMenuType {
  items: any;
  currentPath: string;
  user: any;
  router: any;
}

export default function NavbarMenu({
  items,
  currentPath,
  user,
  router,
}: NavbarMenuType) {
  const [isOpen, setOpen] = useState(false);

  // * Protecting Routes/Pages
  useEffect(() => {
    const pageAllowed = navigationRoutes.find(
      (route) => route.component === currentPath
    );
    if (
      pageAllowed &&
      currentPath &&
      user.role &&
      !pageAllowed.roles.includes(user.role)
    ) {
      console.log(pageAllowed, "Path:", currentPath, "User role:", user.role);
      toast.error("Page is not accessible for your Role!");
      router.push("/");
    }
  }, [router.asPath, user.role, currentPath, router]);

  return (
    <nav className="nav-menu">
      {currentPath && (
        <ConfigProvider
          theme={{
            token: {
              controlItemBgActive: "#0044ac",
              controlItemBgActiveHover: "rgba(0, 0, 0, 0.5)",
              controlItemBgHover: "#0044ac",
              colorPrimary: "#fff",
              colorPrimaryBorder: "#fff",
              colorText: "#fff",
              colorBgElevated: variables.primaryColor,
              borderRadiusOuter: 0,
              borderRadiusLG: 0,
            },
          }}
        >
          <Dropdown
            menu={{
              items,
              selectedKeys: [currentPath],
              onClick: () => setOpen(false),
            }}
            placement="bottomRight"
            className="nav-dropdown pointer"
            trigger={["click"]}
            onOpenChange={() => setOpen((prev) => !prev)}
          >
            <Space>
              Access Reports
              {isOpen ? (
                <CaretUpOutlined className="dropdown-icon" />
              ) : (
                <CaretDownOutlined className="dropdown-icon" />
              )}
            </Space>
          </Dropdown>
        </ConfigProvider>
      )}
    </nav>
  );
}
