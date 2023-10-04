import DownloadBtn from "@/components/common/DownloadBtn";
import useGetSelectedFilters from "@/components/common/useGetSelectedFilters";
import {
  convertToEngineeringUnit,
  percentageFormat,
} from "@/helper/helperFunc";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import {
  clearLogBookEntries,
  setLogbookType,
} from "@/reducers/logBookTable/logBookTableSlice";
import { Row, Table, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import { useEffect } from "react";
import { RightAlignedCell } from "../common/RightAlignedCell";
import { DownArrow, UpArrow } from "../common/icons";
import useFetchData from "../useFetchData";

export default function LogBookTable() {
  const { selectedFilters } = useAppSelector((store) => store.filters);
  const countryAbb = selectedFilters?.Country[0]?.Abbreviation;
  const countryName = selectedFilters?.Country[0]?.CountryName;

  const {
    entries: { count, rows },
    logBookStatus: status,
    logBookError,
    logbookType,
  } = useAppSelector((store) => store.logBookTable);
  const dispatch = useAppDispatch();
  let end_week = selectedFilters.weeks;
  const getSelectedFilters = useGetSelectedFilters();
  const {
    tableParams,
    setTableParams,
    fetchData: fetchLogbookData,
  } = useFetchData("logbook", count, logBookError);

  useEffect(() => {
    if (countryAbb && end_week) {
      fetchLogbookData();
    }

    // eslint-disable-next-line
  }, [
    countryAbb,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    logbookType,
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
      dispatch(clearLogBookEntries());
    }
  };
  // console.log(tableParams);

  const osaColumns: ColumnsType<DataType> = [
    {
      title: "Store Code & Name",
      dataIndex: "StoreName",
      key: "StoreName",
      sorter: (a: any, b: any) => (a.StoreName < b.StoreName ? 1 : -1),
    },
    {
      title: "Location",
      dataIndex: "City",
      key: "location",
      // ellipsis: {
      //   showTitle: false,
      // },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Action Performed",
      dataIndex: "Action",
      key: "Action",
    },
    {
      title: "Current OSA",
      dataIndex: "OSAPercentage",
      align: "right",
      key: "OSAPercentage",
      sorter: (a: any, b: any) => a.OSAPercentage - b.OSAPercentage,
      render: (text) => percentageFormat(text),
    },
    {
      title: "Previous OSA",
      dataIndex: "PrevWkOSAPercentage",
      align: "right",
      key: "PrevWkOSAPercentage",
      sorter: (a: any, b: any) => a.PrevWkOSAPercentage - b.PrevWkOSAPercentage,
      render: (val: number) => (
        <span>
          {percentageFormat(Math.abs(val))}
          {val <= 0 ? <DownArrow /> : <UpArrow />}
        </span>
      ),
    },
    {
      title: "Sales Uplift Value",
      dataIndex: "SalesUplift",
      align: "right",
      key: "SalesUplift",
      sorter: (a: any, b: any) => a.SalesUplift - b.SalesUplift,
      render: (text) => convertToEngineeringUnit(text),
    },
    {
      title: "Sales Uplift",
      dataIndex: "SalesUpliftPerc",
      align: "right",
      key: "SalesUpliftPerc",
      sorter: (a: any, b: any) => a.SalesUpliftPerc - b.SalesUpliftPerc,
      render: (val: number) => (
        <span>
          {percentageFormat(Math.abs(val))}
          {val <= 0 ? <DownArrow /> : <UpArrow />}
        </span>
      ),
    },

    {
      title: "Action Created On",
      dataIndex: "Date",
      key: "Date",
      align: "center",
      sorter: (a: any, b: any) =>
        new Date(a.Date).getTime() - new Date(b.Date).getTime(),
    },
    {
      title: "Completed On",
      dataIndex: "CompleatedDate",
      key: "CompleatedDate",
      align: "center",
      sorter: (a: any, b: any) =>
        new Date(a.CompleatedDate).getTime() -
        new Date(b.CompleatedDate).getTime(),
    },
  ];

  const picosColumns: ColumnsType<DataType> = [
    {
      title: "Store Code & Name",
      dataIndex: "StoreCode",
      key: "StoreName",
      sorter: (a: any, b: any) => (a["StoreCode"] < b["StoreCode"] ? 1 : -1),
      render: (_, record: any) =>
        record["StoreCode"] + "_" + record["StoreName"],
    },
    {
      title: "Location",
      dataIndex: "city",
      key: "location",
      // ellipsis: {
      //   showTitle: false,
      // },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Action Performed",
      dataIndex: "Action_performed",
      key: "Action",
    },
    {
      title: "Current Compliance",
      dataIndex: "Achieved",
      align: "right",
      key: "OSAPercentage",
      sorter: (a: any, b: any) => a.Achieved - b.Achieved,
      render: (text) => <RightAlignedCell text={text} />,
    },
    {
      title: "Previous Compliance",
      dataIndex: "LW_Acheived",
      align: "right",
      key: "LW_Acheived",
      sorter: (a: any, b: any) => a.LW_Acheived - b.LW_Acheived,
      render: (val: number) => (
        <span>
          {Math.abs(val)}
          {val <= 0 ? <DownArrow /> : <UpArrow />}
        </span>
      ),
    },
    {
      title: "Target Compliance",
      dataIndex: "Target",
      align: "right",
      key: "Target",
      sorter: (a: any, b: any) => a.Target - b.Target,
      render: (text) => convertToEngineeringUnit(text),
    },
    {
      title: "vs Target",
      dataIndex: "Growth_Potential",
      align: "right",
      key: "Growth_Potential",
      sorter: (a: any, b: any) => a.Growth_Potential - b.Growth_Potential,
      render: (val: number) => (
        <span>
          {Math.abs(val)}
          {val <= 0 ? <DownArrow /> : <UpArrow />}
        </span>
      ),
    },

    {
      title: "Action Created On",
      dataIndex: "VisitDate",
      key: "VisitDate",
      align: "center",
      sorter: (a: any, b: any) =>
        new Date(a["VisitDate"]).getTime() - new Date(b["VisitDate"]).getTime(),
    },
    {
      title: "Completed On",
      dataIndex: "Completed_On",
      key: "Completed_On",
      align: "center",
      sorter: (a: any, b: any) =>
        new Date(a["Completed_On"]).getTime() -
        new Date(b["Completed_On"]).getTime(),
    },
  ];

  return (
    <>
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <h1 style={{ fontSize: "18px" }}>Logbook</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "spaceBetween",
            alignItems: "center",
            flexWrap: "wrap",
            gap: " 1rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "1.5rem",
              height: "24px",
            }}
          >
            <div
              onClick={(e) => {
                setTableParams({
                  pagination: {
                    current: 1,
                    pageSize: 10,
                  },
                });
                dispatch(setLogbookType("OSA"));
              }}
              className={`${
                logbookType === "OSA" ? "selectedGroup" : ""
              } logbook_TableSelection`}
            >
              OSA
            </div>
            <div
              onClick={(e) => {
                setTableParams({
                  pagination: {
                    current: 1,
                    pageSize: 10,
                  },
                });
                dispatch(setLogbookType("PICOS"));
              }}
              className={`${
                logbookType === "PICOS" ? "selectedGroup" : ""
              } logbook_TableSelection`}
            >
              PICOS
            </div>
          </div>
          <DownloadBtn
            title={logbookType === "OSA" ? "OsaLogbook" : "PicosLogbook"}
            url={
              logbookType === "OSA"
                ? "action/oosAlert/logBook/download"
                : "action/picos/logBook/download"
            }
            payload={{
              Abbreviation: countryAbb,
              end_week,
              Country: countryName,
              params: getSelectedFilters,
            }}
            disabled={!count}
          />
        </div>
      </Row>
      <Table
        columns={logbookType === "OSA" ? osaColumns : picosColumns}
        dataSource={rows}
        rowKey={(record: any) =>
          logbookType === "OSA"
            ? (Math.random() * 1e9).toFixed() + record.StoreCode
            : (Math.random() * 1e9).toFixed() + record["Store Code"]
        }
        pagination={tableParams.pagination}
        loading={status == "pending"}
        onChange={handleTableChange}
        size="small"
        scroll={{ x: 1300 }}
        className="table_size_small"
      />
    </>
  );
}

export interface DataType {
  StoreName: string;
  location: string;
  Action: string;
  LastWeekOsa: number;
  LastToLastWeekOsa: number;
  SalesUpliftValue: number;
}
export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
