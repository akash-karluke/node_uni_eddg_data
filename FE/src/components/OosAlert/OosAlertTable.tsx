import DownloadBtn from "@/components/common/DownloadBtn";
import {
  convertToEngineeringUnit,
  percentageFormat,
} from "@/helper/helperFunc";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import { clearOosEntries } from "@/reducers/oosTable/oosTableSlice";
import { Button, Row, Table, Tag, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { RightAlignedCell } from "../common/RightAlignedCell";
import useGetSelectedFilters from "../common/useGetSelectedFilters";
import useFetchData from "../useFetchData";
import OosAlertModal from "./OosAlertModal";

export default function OosAlertTable() {
  const { selectedFilters } = useAppSelector((store) => store.filters);

  const {
    entries: { count, rows },
    oosStatus: status,
    oosError,
  } = useAppSelector((store) => store.oosTable);
  const countryAbb = selectedFilters?.Country[0]?.Abbreviation;

  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState("");

  const end_week = selectedFilters.weeks;
  const getSelectedFilters = useGetSelectedFilters();

  const showModal = (record: any) => {
    setIsModalOpen(true);
    setModalData({ ...record, countryAbb, end_week });
  };

  const { tableParams, setTableParams, fetchData } = useFetchData(
    "oos",
    count,
    oosError
  );

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, [
    countryAbb,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
  ]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setTableParams({
      pagination,
      filters,
      ...(sorter["order"] && {
        sort: {
          key: sorter.columnKey,
          order: sorter.order,
        },
      }),
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      dispatch(clearOosEntries());
    }
  };
  // console.log(tableParams);

  const columns: ColumnsType<DataType> = [
    {
      title: "Priority Status",
      key: "Priority",
      dataIndex: "Priority",
      align: "left",
      width: 100,
      fixed: "left",
      sorter: (a, b) => {
        let mapping: { [key: string]: number } = { High: 3, Medium: 2, Low: 1 };
        let newArr = [a.Priority, b.Priority].map((x: string) => mapping[x]);
        return newArr[0] - newArr[1];
      },
      render: (priority) => {
        let color;
        switch (priority) {
          case "Low":
            color = "#37bba9";
            break;
          case "Medium":
            color = "#f1a33a";
            break;

          case "High":
            color = "#ec6157";
            break;
          default:
            color = "#3333";
            break;
        }
        return (
          <Tag
            color={color}
            key={priority}
            style={{
              width: "100%",
              textAlign: "center",
              borderRadius: "1px",
              fontSize: "11px",
              fontWeight: 500,
            }}
          >
            {priority ? priority : "NA"}
          </Tag>
        );
      },
    },
    {
      title: "Store Code & Name",
      dataIndex: "StoreName",
      key: "StoreName",
      sorter: (a, b) => (a.StoreName < b.StoreName ? 1 : -1),
    },
    {
      title: "Location",
      dataIndex: "City",
      key: "location",
      // ellipsis: {
      //   showTitle: false,
      // },
      sorter: (a, b) => (a.StoreName < b.StoreName ? 1 : -1),
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Category",
      dataIndex: "ProductCategory",
      key: "ProductCategory",
      sorter: (a, b) => (a.StoreName < b.StoreName ? 1 : -1),
    },
    {
      title: "OSA",
      dataIndex: "OOS",
      align: "left",
      width: 70,
      key: "OOS",
      sorter: (a, b) => a.OOS - b.OOS,
      render: (text) => <RightAlignedCell text={percentageFormat(text)} />,
    },
    {
      title: () => <div style={{ textAlign: "left" }}>Sales Uplift Value</div>,
      dataIndex: "LostSalesValue",
      key: "LostSalesValue",
      sorter: (a, b) => a.LostSalesValue - b.LostSalesValue,
      render: (text) => (
        <RightAlignedCell text={convertToEngineeringUnit(text)} />
      ),
    },

    {
      title: "#Actions Recommended",
      dataIndex: "#ActionsRequired",
      // align: "right",
      width: 110,
      key: "#ActionsRequired",
      render: (text) => <RightAlignedCell text={text} />,
      // sorter: (a: any, b: any) => a["#ActionsRequired"] - b["#ActionsRequired"],
    },
    {
      title: "Root Cause",
      dataIndex: "RC",
      key: "RC",
      sorter: (a, b) => (a.StoreName < b.StoreName ? 1 : -1),
    },
    {
      title: "Field Rep",
      dataIndex: "FieldRep",
      key: "FieldRep",
      sorter: (a, b) => (a.StoreName < b.StoreName ? 1 : -1),
      render: (text) => text.trim(),
    },
    {
      title: "Last Visit",
      dataIndex: "LastVisit",
      key: "LastVisit",
      sorter: (a, b) =>
        new Date(a.LastVisit).getTime() - new Date(b.LastVisit).getTime(),
    },
    {
      title: "Action Status",
      key: "action",
      width: 110,
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => showModal(record)}
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            color: "#292929",
            width: "100%",
          }}
        >
          Take Action
        </Button>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-between" gutter={[16, 16]}>
        <h1>OOS Alerts</h1>
        <DownloadBtn
          title="OosAlert"
          url="action/oosAlert/download"
          payload={{
            Abbreviation: countryAbb,
            end_week: end_week,
            params: getSelectedFilters,
          }}
          disabled={!count}
        />
      </Row>
      <Table
        columns={columns}
        dataSource={rows}
        rowKey={(record) => record.AGG_PROD_ID}
        pagination={tableParams.pagination}
        loading={status == "pending"}
        onChange={handleTableChange}
        size="small"
        scroll={{ x: 1300 }}
        className="table_size_small"
      />
      <OosAlertModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalData={modalData}
      />
    </>
  );
}

export interface DataType {
  key: string;
  AGG_PROD_ID: string;
  Priority: string;
  StoreName: string;
  location: string;
  ProductCategory: string;
  OOS: number;
  LostSalesValue: number;
  "#ActionsRequired": number;
  RC: string;
  FieldRep: string;
  LastVisit: string;
}
export interface OosTableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
