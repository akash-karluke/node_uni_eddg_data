import { useAppSelector } from "@/helper/hooks";
import { Button, ConfigProvider } from "antd";
import useFetchData from "../useFetchData";

export default function ShowResultBtn() {
  const { isFiltersLoading, selectedFilters } = useAppSelector(
    (store) => store.filters
  );
  const {
    entries: { count: oosCount },
    oosStatus,
    oosError,
  } = useAppSelector((store) => store.oosTable);
  const {
    entries: { count: picosCount },
    status: picosStatus,
    picosError,
  } = useAppSelector((store) => store.picosTable);
  const {
    entries: { count: logbookCount },
    logBookStatus,
    logbookType,
    logBookError,
  } = useAppSelector((store) => store.logBookTable);

  const { fetchData: fetchOosData } = useFetchData("oos", oosCount, oosError);
  const { fetchData: fetchPicosData } = useFetchData(
    "picos",
    picosCount,
    picosError
  );
  const { fetchData: fetchLogbookData } = useFetchData(
    "logbook",
    logbookCount,
    logBookError
  );

  const showResults = () => {
    fetchOosData();
    fetchPicosData();
    fetchLogbookData();
    localStorage.setItem("makeResetLS", "true");
  };

  const isLoading =
    oosStatus === "pending" ||
    picosStatus === "pending" ||
    logBookStatus === "pending";

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainerDisabled: "lightgray",
          },
        }}
      >
        <Button
          onClick={showResults}
          disabled={isFiltersLoading || !selectedFilters.weeks}
          loading={isLoading}
          style={{
            lineHeight: "24px",
            borderRadius: "0",
            padding: "unset",
            alignSelf: "flex-end",
            marginBottom: "0.6rem",
            fontWeight: 700,
            fontSize: "16px",
            color: "#292929",
          }}
        >
          Show Results
        </Button>
      </ConfigProvider>
      {/* <Button onClick={() => setReset((prev) => !prev)}>Switch</Button> */}
    </>
  );
}
