import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  AGG_PROD_ID: string;
  Priority: string;
  StoreID: string;
  location: string;
  category: string;
  OOS: number;
  sale: number;
  ActionsRequired: number;
  rootCause: string;
  fieldRep: string;
  lastVisit: string;
}

interface TableProps {
  columns: ColumnsType<DataType>;
  data: DataType[];
  size: "small" | "middle" | "large" | undefined;
}

export default function CustomTable({ columns, data, size }: TableProps) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.AGG_PROD_ID}
      size={size}
      scroll={{ x: 1300 }}
      className={`table_size_${size === "small" ? "small" : "middle"}`}
    />
  );
}
