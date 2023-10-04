import { useAppDispatch } from "@/helper/hooks";
import { SelectObject } from "@/reducers/userSettings/settings";
import { Select, Space, Typography } from "antd";
import { useState } from "react";

const { Option } = Select;

interface Props {
  label?: string | number;
  items: string[] | SelectObject[];
  size?: "small" | "middle" | "large" | undefined;
  mode?: any;
  loading?: boolean;
  handleChange?: any;
  defaultVal?: string;
  style?: any;
  value?: any;
}

export default function CustomSelect({
  label,
  items,
  size = "small",
  mode,
  loading,
  handleChange,
  defaultVal,
  style,
  value,
}: Props) {
  // console.log(
  //   "DDDDD:",
  //   items,
  //   defaultVal,
  //   typeof items[0] === "object" ? items[0].label : items[0]
  // );

  return (
    <Space direction="vertical" size="small">
      <small>{label}</small>
      <Select
        defaultValue={
          defaultVal ||
          (typeof items[0] === "object" ? items[0].label : items[0]) ||
          ""
        }
        allowClear={mode === "mulitiple"}
        value={value}
        mode={mode}
        maxTagCount="responsive"
        loading={loading}
        style={{
          width: "100%",
          marginBottom: "2rem",
          borderRadius: undefined,
          ...style,
        }}
        size={size}
        className="filter-select"
        onChange={handleChange}
      >
        {items.length > 0 ? (
          <>
            {mode === "mulitiple" && <Option value="all">All</Option>}
            {items.map((item: any) => (
              <Option key={item.value ? item.value : item}>
                {item.label ? item.label : item}
              </Option>
            ))}
          </>
        ) : (
          ""
        )}
      </Select>
    </Space>
  );
}
