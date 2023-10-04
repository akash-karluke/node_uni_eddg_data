import { ConfigProvider, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

interface TableRow {
  id: string;
  ProductID: string;
  core_sku_EAN: string;
  core_sku_description: string;
  AvailabilityStatus: number;
}

interface TableProps {
  store: any;
  kpiName: string;
}

export default function MultiselectTable({ store, kpiName }: TableProps) {
  // log("Store:", kpiName, store);

  const coloredStatus = (entry: string) => (
    <ConfigProvider
      theme={{
        token: {
          colorSuccess: "#00b190",
          fontWeightStrong: 500,
        },
      }}
    >
      <Typography.Text
        strong
        type={entry === "Available" ? "success" : "danger"}
      >
        {entry || "NA"}
      </Typography.Text>
    </ConfigProvider>
  );

  let columns: ColumnsType<TableRow> =
    store[0] &&
    Object.keys(store[0]).map((x) => ({
      title: x,
      dataIndex: x,
      ...(x === "Availability Status" && {
        render: (entry: string) => coloredStatus(entry),
      }),
    }));

  return (
    <Table
      columns={columns}
      dataSource={store}
      rowKey={(record) => (Math.random() * 1e9).toFixed() + record.id}
      size="small"
      style={{ marginTop: "0.5rem" }}
      pagination={{ defaultPageSize: 5, showSizeChanger: false }}
      className="table_size_small"
    />
  );
}
