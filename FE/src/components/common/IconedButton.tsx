import { Button, ConfigProvider, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Link } = Typography;
export default function IconedButton({
  text,
  icon,
  color = "#9c44c0",
  loading,
  ...props
}: ButtonProps) {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: color,
            colorText: "#fff",
          },
        }}
      >
        <Link {...props} className="iconed-btn">
          <Button
            type="primary"
            disabled={props.disabled}
            style={{ borderRadius: 0 }}
          >
            {text}
          </Button>
          <Button
            type="primary"
            className="icon"
            disabled={props.disabled}
            style={{
              borderRadius: 0,
              marginLeft: "1px",
              paddingInline: "9px",
            }}
          >
            {loading ? <LoadingOutlined /> : icon}
          </Button>
        </Link>
      </ConfigProvider>
    </>
  );
}

export interface ButtonProps {
  text: string;
  icon: any;
  color?: string;
  loading?: boolean;
  [x: string]: any;
}
