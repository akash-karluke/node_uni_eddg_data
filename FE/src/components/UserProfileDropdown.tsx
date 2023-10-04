import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Dropdown, Space } from "antd";
import { useState } from "react";
import { SignOutButton } from "./SignOutButton";
import UserDetails from "./UserDetails";

export default function UserProfileDropdown({ status }: { status: any }) {
  const [isOpen, setOpen] = useState(false);

  function onOpenChange() {
    setOpen((prev) => !prev);
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <SignOutButton
          type="span"
          style={{ display: "block", textAlign: "right" }}
        />
      ),
    },
    {
      key: "2",
      label: <UserDetails type="small" />,
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            controlItemBgHover: "#0044ac",
            colorPrimary: "#fff",
            colorPrimaryBorder: "red",
            colorText: "#fff",
            colorBgElevated: " #0044ac",
            borderRadiusOuter: 1,
            borderRadiusLG: 1,
          },
        }}
      >
        <Dropdown
          menu={{
            items,
            onClick: () => setOpen(false),
          }}
          placement="bottomLeft"
          className="user-profile pointer"
          trigger={["click"]}
          onOpenChange={onOpenChange}
        >
          <Space>
            <UserDetails type="full" />
            {status !== "failed" && isOpen ? (
              <CaretUpOutlined className="dropdown-icon" />
            ) : (
              <CaretDownOutlined className="dropdown-icon" />
            )}
          </Space>
        </Dropdown>
      </ConfigProvider>
    </>
  );
}
