import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import {
  scoreCardDetails,
  scoreCardFilters,
} from "@/reducers/scoreCard/scoreCardSlice";
import { WarningOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomSelect from "./common/select";

export default function RenderScoreCard() {
  const { filters, filterStatus, details, detailsStatus } = useAppSelector(
    (store) => store.scoreCard
  );

  const [payload, setPayload] = useState<any>({
    Category: [],
    Version: [],
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(scoreCardFilters());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filters.Category.length && filters.Version.length) {
      const newPayload = {
        ...payload,
        ...(!payload.Category.length && { Category: filters.Category[0] }),
        ...(!payload.Version.length && { Version: filters.Version[0] }),
      };

      dispatch(scoreCardDetails(newPayload));
    }
    // eslint-disable-next-line
  }, [payload.Category, payload.Version, filters.Category, filters.Version]);

  const NoImageFound = () => (
    <span style={{ display: "flex", justifyContent: "center" }}>
      No Scorecard Image Available
    </span>
  );

  return (
    <>
      <div className="action-page-filters">
        <div className="filters-dropdown">
          {filterStatus === "pending" ? (
            "Loading..."
          ) : (
            <>
              <CustomSelect
                label="Phase Filter"
                items={filters.Version}
                size="small"
                handleChange={(val: string) => {
                  return setPayload((prev: any) => ({ ...prev, Version: val }));
                }}
              />
              <CustomSelect
                label="Category"
                items={filters.Category}
                size="small"
                handleChange={(val: string) =>
                  setPayload((prev: any) => ({ ...prev, Category: val }))
                }
                defaultVal={filters.Category[0]}
              />
            </>
          )}
        </div>
      </div>
      <main className="section scorecard">
        {detailsStatus === "succeeded" ? (
          details.length ? (
            details.map(
              (obj: any, index) =>
                (
                  <Image
                    src={obj?.URL}
                    key={obj?.ULR}
                    height={200}
                    width={200}
                    alt="Failed to Display!"
                    className="scorecard-img"
                  />
                ) && (
                  <div key={index}>
                    <WarningOutlined style={{ fontSize: "3rem" }} />
                    <h4>Cannot load Image!</h4>
                  </div>
                )
            )
          ) : (
            <NoImageFound />
          )
        ) : detailsStatus === "pending" ? (
          "Loading..."
        ) : (
          <NoImageFound />
        )}
      </main>
    </>
  );
}
