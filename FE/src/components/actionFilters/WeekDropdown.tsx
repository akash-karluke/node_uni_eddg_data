import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import { setSelectedWeek } from "@/reducers/filters/filterSlice";
import { Select, Space } from "antd";
const { Option } = Select;

export default function WeekDropdown() {
  const { allFilters, selectedFilters, isWeeksLoading } = useAppSelector(
    (store) => store.filters
  );
  const dispatch = useAppDispatch();

  function handleWeekChange(week: string) {
    dispatch(setSelectedWeek(week));
  }
  return (
    <>
      <Space direction="vertical" size="small">
        <small>Date</small>
        <Select
          style={{
            width: "100%",
            marginBottom: "2rem",
            borderRadius: undefined,
          }}
          size="small"
          className="filter-select"
          loading={isWeeksLoading}
          value={selectedFilters.weeks}
          onChange={(e: string) => handleWeekChange(e)}
        >
          {allFilters?.weeks?.map((item: any) => (
            <Option key={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Space>
    </>
  );
}
