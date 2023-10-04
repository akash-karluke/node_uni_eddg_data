import { FILTERS_CONSTS } from "@/helper/Constants";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Select, Space } from "antd";

const { Option } = Select;

interface DropdownProps {
  setFilters: any;
  setterFunc: any;
  component: string;
}

export default function RenderDropdown({
  component,
  setFilters,
  setterFunc,
}: DropdownProps) {
  const {
    allFilters,
    selectedFilters,
    isFiltersLoading: isLoading,
  } = useAppSelector((store) => store.filters);
  const { label, reduxKey } = FILTERS_CONSTS[component];
  const selectedData =
    (reduxKey !== "weeks" && selectedFilters[reduxKey]) || [];
  // const [currentFilters, setCurruentFilters] = useState<any>({
  //   [reduxKey]: selectedData,
  // });

  const dispatch = useAppDispatch();
  // console.log("allfilters:", allFilters);

  const filters = (reduxKey !== "weeks" && allFilters[reduxKey]) || [];
  const isEverythingSelected: boolean = filters.length === selectedData.length;

  function handleChange(selected: any) {
    // setCurruentFilters((prev: any) => ({ ...prev, [reduxKey]: filters }));
    // console.log("selected:", selected, reduxKey, currentFilters, filters);
    if (selected.includes("all")) {
      dispatch(setterFunc(isEverythingSelected ? [] : filters));
      setFilters((prev: any) => ({ ...prev, [reduxKey]: [] }));
    } else {
      const newEntries = filters.filter((obj: any) => {
        if (selected.includes(obj)) {
          return obj;
        }
      });
      let entries: string[] = [];
      newEntries.forEach((x: any) => entries.push(x));
      // console.log("newEntriesss", newEntries);
      setFilters((prev: any) => ({ ...prev, [reduxKey]: entries }));
      dispatch(setterFunc(newEntries));
    }
  }
  // console.log({ currentFilters });
  return (
    <>
      <Space direction="vertical" size="small">
        <small>{label}</small>
        <Select
          style={{
            width: "100%",
          }}
          size="small"
          mode="multiple"
          loading={isLoading}
          placement="bottomLeft"
          maxTagPlaceholder={
            selectedData.length === 1 ? selectedData[0] : "Multiple Selection"
          }
          value={
            filters.length && !isLoading && isEverythingSelected
              ? [{ label: "All", value: "" }]
              : selectedData.map((obj: any) => ({
                  label: obj,
                  value: obj,
                }))
          }
          className="filter-select"
          maxTagCount="responsive"
          onChange={handleChange}
        >
          {filters.length && (
            <>
              <Option key="all">
                <Space
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  All
                  <CheckCircleTwoTone
                    twoToneColor={isEverythingSelected ? "" : "#aaa"}
                  />
                </Space>
              </Option>
              {filters.map((obj: any) => (
                <Option
                  key={obj}
                  label={obj}
                  className={
                    isEverythingSelected
                      ? "ant-select-item-option-selected"
                      : ""
                  }
                >
                  {obj}
                </Option>
              ))}
            </>
          )}
        </Select>
      </Space>
    </>
  );
}
