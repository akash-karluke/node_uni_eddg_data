import { useAppSelector } from "@/helper/hooks";
import { useEffect, useState } from "react";
import { Select, Typography, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import _ from "lodash";

const { Option } = Select;

export default function MultiSelect() {
  const {
    allFilters,
    selectedFilters,
    isFiltersLoading: isLoading,
  } = useAppSelector((store) => store.filters);

  // console.log({ allFilters, selectedFilters });
  const [filters, setFilters] = useState<any>(selectedFilters);

  useEffect(() => {
    setFilters(selectedFilters);
  }, [selectedFilters]);

  // useEffect(() => {
  //   debounce1();
  // }, [filters, debounce1]);

  // const debounce1 = _.debounce(() => {
  //   console.log("fire API to fetch Data");
  // }, 2000);

  function handleChange(e: any) {
    if (e.includes("all")) {
      setFilters({ ...filters, countries: allFilters?.Country });
    } else {
      setFilters({
        ...filters,
        countries: allFilters?.Country?.filter((x: any) =>
          e.includes(x.Abbreviation),
        ),
      });
    }
  }

  return (
    <>
      <Space direction="vertical" size="small">
        <Typography>Countries</Typography>
        <Select
          style={{
            width: "100%",
            marginBottom: "2rem",
            borderRadius: undefined,
          }}
          size="small"
          mode="multiple"
          allowClear
          loading={isLoading}
          placement="bottomLeft"
          value={filters?.countries?.map((c: any) => ({
            label: c.CountryName,
            value: c.Abbreviation,
          }))}
          className="filter-select"
          maxTagCount="responsive"
          onChange={(e) => handleChange(e)}
        >
          {allFilters.Country.length ? (
            <>
              <Option key="all">
                <Space
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  All
                  <CheckCircleTwoTone
                    twoToneColor={
                      allFilters.Country.length === filters?.countries?.length
                        ? ""
                        : "#aaa"
                    }
                  />
                </Space>
              </Option>
              {allFilters.Country.map((con: any) => (
                <Option key={con.Abbreviation}>{con.CountryName}</Option>
              ))}
            </>
          ) : (
            ""
          )}
        </Select>
      </Space>
    </>
  );
}
