import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import {
  clearLogBookEntries,
  getOsaLogBook,
  getPicosLogBook,
} from "@/reducers/logBookTable/logBookTableSlice";
import {
  clearOosEntries,
  getOosTableData,
} from "@/reducers/oosTable/oosTableSlice";
import {
  clearPicosEntries,
  getPicosTableData,
} from "@/reducers/picosTable/picosTableSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OosTableParams } from "./OosAlert/OosAlertTable";
import useGetSelectedFilters from "./common/useGetSelectedFilters";

export default function useFetchData(
  table: "oos" | "picos" | "logbook",
  count: number,
  error: string
) {
  const { selectedFilters } = useAppSelector((store) => store.filters);
  const { logbookType } = useAppSelector((store) => store.logBookTable);
  const [makeReset, setReset] = useState<boolean>(false);
  const [endWeekLoaded, setEndWeekLoaded] = useState<boolean>(false);
  const [tableParams, setTableParams] = useState<OosTableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    },
  });
  const countryAbb = selectedFilters?.Country[0]?.Abbreviation;
  const countryName = selectedFilters?.Country[0]?.CountryName;
  const end_week = selectedFilters.weeks;
  const dispatch = useAppDispatch();

  const getSelectedFilters = useGetSelectedFilters();
  const reset = !!localStorage.getItem("makeResetLS");

  useEffect(() => {
    if (reset) {
      setReset(reset);
    }
  }, [reset]);

  const actions = {
    oos: getOosTableData,
    picos: getPicosTableData,
    logbook: logbookType === "OSA" ? getOsaLogBook : getPicosLogBook,
  };

  const clearEntries = {
    oos: clearOosEntries,
    picos: clearPicosEntries,
    logbook: clearLogBookEntries,
  };

  const fetchData = async () => {
    if (countryAbb && end_week) {
      try {
        const res = await dispatch(
          actions[table]({
            Abbreviation: countryAbb,
            page: tableParams.pagination?.current,
            per_page: tableParams.pagination?.pageSize,
            Country: countryName,
            params: getSelectedFilters,
            end_week,
          })
        ).unwrap();

        updateTableParams(res.count);
      } catch (error: any) {
        console.log({ error });
        toast.error(
          `${table.charAt(0).toUpperCase() + table.substring(1)}: ${error}`,
          { toastId: "error" }
        );
      }
    } else {
      dispatch(clearEntries[table]());
      updateTableParams(0);
      // toast.info("No Data found!");
    }
    // eslint-disable-next-line
  };

  function clearReset() {
    localStorage.removeItem("makeResetLS");
    setTimeout(() => {
      setReset(false);
    }, 1000);
  }

  const updateTableParams = (count: number) => {
    const details = {
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        ...(makeReset && { current: 1 }),
        total: count,
      },
    };
    setTableParams(details);
    clearReset();
  };
  //   [count, makeReset]
  // );

  useEffect(() => {
    updateTableParams(count);
    // eslint-disable-next-line
  }, [count]);

  useEffect(() => {
    setEndWeekLoaded(!!end_week);
    // eslint-disable-next-line
  }, [end_week]);

  useEffect(() => {
    if (endWeekLoaded) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [endWeekLoaded]);

  return { tableParams, setTableParams, fetchData };
}
