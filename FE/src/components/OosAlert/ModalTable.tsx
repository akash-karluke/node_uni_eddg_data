import { OOS_ROOT_CAUSES } from "@/helper/Constants";
import { ConfigProvider, Select, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const { Option } = Select;

interface TableRow {
  key: number;
  ProductID: string;
  core_sku_EAN: string;
  core_sku_description: string;
  AvailabilityStatus: number;
  RootCause: string;
}

interface TableProps {
  store: any;
  updatedData: any;
  setUpdatedData: any;
}

export default function MultiselectTable({
  store,
  updatedData,
  setUpdatedData,
}: TableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [data, setData] = useState<TableRow[]>([]);
  // console.log({ store, data });
  useEffect(() => {
    setData(store);
  }, [store]);

  const columns: ColumnsType<TableRow> = [
    {
      title: "SKU EAN",
      dataIndex: "core_sku_EAN",
      render: (text) => text || "NA",
    },
    {
      title: "SKU description",
      dataIndex: "core_sku_description",
      render: (text) => text || "NA",
    },
    {
      title: "Availability",
      dataIndex: "AvailabilityStatus",
      align: "center",
      render: (_: any, record: TableRow) => (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b190",
            },
          }}
        >
          <Switch
            checked={!!record.AvailabilityStatus}
            onChange={(checked) =>
              handleAvailabilityChange(checked, record.ProductID)
            }
          />
        </ConfigProvider>
      ),
    },
    {
      title: "Root cause",
      dataIndex: "RootCause",
      width: 350,
      render: (_: any, record: TableRow) => (
        <Select
          value={record.RootCause}
          size="small"
          placeholder="Select Root Cause"
          onChange={(value) => handleRootCauseChange(value, record.ProductID)}
          style={{ width: "95%" }}
        >
          {OOS_ROOT_CAUSES.map((row) => (
            <Option value={row} key={row}>
              {row}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  function sendUpdatedRow(newRow: any) {
    const newAvaialibily = newRow.AvailabilityStatus;
    const newRootCause = newRow.RootCause;
    let updatedRow = [...updatedData.store];

    const index = updatedRow.findIndex(
      (obj) => obj.Factless_Fact_ID === newRow.Factless_Fact_ID
    );
    const data = {
      Factless_Fact_ID: newRow.Factless_Fact_ID,
      AvailabilityStatus: newAvaialibily,
      RootCause: newRootCause,
    };
    if (index === -1) {
      updatedRow.push(data);
    } else {
      updatedRow[index] = data;
    }

    setUpdatedData((prev: any) => ({
      availability: prev.availability,
      store: [...updatedRow],
    }));
  }

  const handleAvailabilityChange = (checked: boolean, ProductID: string) => {
    const updatedRows = data.map((row) => {
      if (row.ProductID === ProductID) {
        const newRow = { ...row, AvailabilityStatus: checked ? 1 : 0 };
        sendUpdatedRow(newRow);
        return newRow;
      }
      return row;
    });
    setData(updatedRows);
  };

  const handleRootCauseChange = (value: string, ProductID: string) => {
    const updatedRows = data.map((row) => {
      if (row.ProductID === ProductID) {
        const newRow = { ...row, RootCause: value };
        sendUpdatedRow(newRow);
        return newRow;
      }
      return row;
    });
    setData(updatedRows);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.ProductID}
      size="small"
      style={{ marginTop: "1.5rem" }}
      className="table_size_small"
      // scroll={{ y: 200 }}
      pagination={{ defaultPageSize: 5, showSizeChanger: false }}
      rowSelection={{
        selectedRowKeys: selectedRows,
        onChange: (selectedRowKeys: any) => setSelectedRows(selectedRowKeys),
      }}
    />
  );
}
