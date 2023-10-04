import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import {
  fetchCountryFilter,
  setSelectedCountry,
  setSelectedWeek,
} from "@/reducers/filters/filterSlice";
import { Select, Space } from "antd";
import { useEffect } from "react";

const { Option } = Select;

export default function CountryDropdown() {
  const { allFilters, selectedFilters, isCountryLoading } = useAppSelector(
    (store) => store.filters
  );
  const { selectedSettings } = useAppSelector((store) => store.settings);

  const defaultSelectedCountry = [
    {
      label: selectedSettings.Country.CountryName,
      value: selectedSettings.Country.Abbreviation,
    },
  ];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allFilters.Country.length === 0) {
      dispatch(fetchCountryFilter()).then(() => {
        dispatch(setSelectedCountry([selectedSettings.Country]));
      });
    }
  }, [
    isCountryLoading,
    dispatch,
    allFilters.Country.length,
    selectedSettings.Country,
  ]);

  function handleChange(e: any) {
    dispatch(
      setSelectedCountry(
        allFilters?.Country?.filter((x: any) => e.includes(x.Abbreviation))
      )
    );
    dispatch(setSelectedWeek(""));
  }

  return (
    <>
      <Space direction="vertical" size="small">
        <small>Country</small>
        <Select
          style={{
            width: "100%",
          }}
          defaultValue={defaultSelectedCountry}
          size="small"
          loading={isCountryLoading}
          placement="bottomLeft"
          value={selectedFilters?.Country?.map((c: any) => ({
            label: c.CountryName,
            value: c.Abbreviation,
          }))}
          className="filter-select"
          maxTagCount="responsive"
          onChange={(e) => handleChange(e)}
        >
          {allFilters?.Country?.length && (
            <>
              {allFilters.Country.map((con: any) => (
                <Option key={con.Abbreviation}>{con.CountryName}</Option>
              ))}
            </>
          )}
        </Select>
      </Space>
    </>
  );
}
