import { useAppSelector } from "@/helper/hooks";
import { DatePicker, Space, Typography } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import { useState } from "react";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const format = "DD.MM.YYYY";

export default function CustomDatePicker({}) {
  const { allFilters, selectedFilters } = useAppSelector(
    (store: any) => store.filters,
  );
  const [dates, setDates] = useState(selectedFilters.dateRange);

  console.log("date", dates);

  function handleDateChange(dates: any) {
    console.log({ dates });
    console.log("week", getFirstDay(dates));
    setDates(getFirstDay(dates));
  }

  return (
    <Space direction="vertical" size="small" className="date-picker">
      <small>Date Range</small>

      <RangePicker
        size="small"
        format={format}
        defaultValue={[dayjs(dates.startDate), dayjs(dates.endDate)]}
        onChange={(date, dates) => {
          console.log({ _: date });
          handleDateChange(date?.map((x: any) => x.$d));
        }}
        value={[dayjs(dates.startDate), dayjs(dates.endDate)]}
        allowClear={false}
      />
    </Space>
  );
}

function getFirstDay(dates: any) {
  let startDate = moment(dates[0]);
  let endDate = moment(dates[1]);

  console.log("currentDate", startDate.format("DD.MMM"));
  let weekStart = startDate.clone().startOf("week");
  let weekEnd = endDate.clone().endOf("week");
  let formattedStart = weekStart.add(1, "day").format("DD.MMM.YYYY");
  let formattedEnd = weekEnd.format("DD.MMM.YYYY");
  return { startDate: formattedStart, endDate: formattedEnd };
}
