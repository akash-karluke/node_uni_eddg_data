import useGetSelectedFilters from "@/components/common/useGetSelectedFilters";
import { numberFormat } from "@/helper/helperFunc";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import { clearPicosEntries } from "@/reducers/picosTable/picosTableSlice";
import { Button, Row, Table, Tag, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import DownloadBtn from "../common/DownloadBtn";
import { RightAlignedCell } from "../common/RightAlignedCell";
import { DownArrow, UpArrow } from "../common/icons";
import useFetchData from "../useFetchData";
import PicosGPModal from "./PicosGPModal";

export default function PicosGrowthTable() {
  const { selectedFilters } = useAppSelector((store) => store.filters);

  const {
    entries: { count, rows },
    status: picosStatus,
    picosError,
  } = useAppSelector((store) => store.picosTable);
  const countryAbb = selectedFilters?.Country[0]?.Abbreviation;
  const countryName = selectedFilters?.Country[0]?.CountryName;
  const { tableParams, setTableParams, fetchData } = useFetchData(
    "picos",
    count,
    picosError
  );

  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const end_week = selectedFilters.weeks;
  const getSelectedFilters = useGetSelectedFilters();

  const showModal = (record: any) => {
    setIsModalOpen(true);
    setModalData({
      ...record,
      country: selectedFilters?.Country[0].CountryName,
      end_week,
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    countryAbb,
  ]);
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
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
      dispatch(clearPicosEntries());
    }
  };
  // console.log(tableParams);

  const columns: ColumnsType<any> = [
    {
      title: "Priority Status",
      key: "Priority",
      dataIndex: "ActionPriority",
      align: "center",
      width: 100,
      fixed: "left",
      sorter: (a: any, b: any) => {
        let mapping: { [key: string]: number } = { High: 3, Medium: 2, Low: 1 };
        let newArr = [a["ActionPriority"], b["ActionPriority"]].map(
          (x: string) => mapping[x]
        );
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
      dataIndex: "StoreCode",
      key: "StoreName",
      sorter: (a, b) => a["StoreCode"] - b["StoreCode"],
      render: (code, record: any) =>
        code ? code + "_" + record["StoreName"] : "NA",
    },
    {
      title: "Location",
      dataIndex: "City",
      key: "location",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.City.localeCompare(b.City),
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "ProductCategory",
      sorter: (a, b) => a.Category.localeCompare(b.Category),
    },
    {
      title: "Action",
      dataIndex: "TopKPI",
      key: "ACTION",
      sorter: (a, b) => a["TopKPI"].localeCompare(b["TopKPI"]),
    },

    {
      title: "Current Compliance",
      dataIndex: "Achieved",
      key: "CurrentCompliance",
      render: (text) => <RightAlignedCell text={numberFormat(text)} />,
    },

    {
      title: "vs Last Visit",
      dataIndex: "LW_Diff",
      key: "VsLastWeek",
      render: (text: number, record: any) => {
        return (
          <div style={{ textAlign: "right" }}>
            {numberFormat(text)}
            <span>
              {record.LW_Diff > 0 ? (
                <DownArrow />
              ) : record.LW_Diff < 0 ? (
                <UpArrow />
              ) : null}
            </span>
          </div>
        );
      },
    },
    {
      title: "vs Target ",
      dataIndex: "Target",
      key: "TargetCompliance",
      sorter: (a, b) => a.Target - b.Target,
      render: (text) => <RightAlignedCell text={numberFormat(text)} />,
    },
    {
      title: "KPI Growth Potential",
      dataIndex: "Growth_Potential",
      key: "KPI",
      render: (text) => <RightAlignedCell text={numberFormat(text)} />,
    },
    {
      title: "Sales Uplift Value",
      dataIndex: "LostSalesValue",
      key: "LostSalesValue",
      render: () => "NA", //<RightAlignedCell text={numberFormat(text)} /> ,
    },
    {
      title: "Field Rep",
      dataIndex: "Sales Representative",
      key: "FirstName",
      sorter: (a, b) =>
        a["Sales Representative"].localeCompare(b["Sales Representative"]),
    },
    {
      title: "Action Created",
      dataIndex: "VisitDate",
      key: "Created",
      sorter: (a: any, b: any) =>
        new Date(a["VisitDate"]).getTime() - new Date(b["VisitDate"]).getTime(),
    },

    {
      title: "Action Status",
      dataIndex: "Action Status",
      key: "action",
      width: 110,
      align: "center",
      fixed: "right",
      render: (_status: string, record: any) => (
        <Button
          size="small"
          onClick={() => showModal(record)}
          style={{ fontWeight: "bold", fontSize: "11px", width: "100%" }}
        >
          Take Action
        </Button>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-between" gutter={[16, 16]}>
        <h1>PICOS Growth Potential</h1>
        <DownloadBtn
          title="PicosGP"
          url="action/picos/download"
          payload={{
            Country: countryName,
            Visit: rows != undefined && rows.length && rows[0].Visit,
            end_week,
            params: getSelectedFilters,
          }}
          disabled={!count}
        />
      </Row>
      <Table
        columns={columns}
        dataSource={rows}
        rowKey={(record: any) =>
          (Math.random() * 1e9).toFixed() + record["Store Name"]
        }
        pagination={tableParams.pagination}
        loading={picosStatus == "pending"}
        onChange={handleTableChange}
        size="small"
        scroll={{ x: 1300 }}
        className="table_size_small"
      />
      <PicosGPModal
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
  Category: string;
  Action: string;
  CurrentCompliance: number;
  VsLastWeek: number;
  TargetCompliance: string;
  KPI: number;
  LostSaleValue: number;
  FieldRep: string;
  ActionCreated: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
