import CategoryDropdown from "@/components/actionFilters/CategoryDropDown";
import SalesRepDropdown from "@/components/actionFilters/SalesRepDropDown";
import StoreDropdown from "@/components/actionFilters/StoreDropDown";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import { fetchAllFilters, fetchWeeks } from "@/reducers/filters/filterSlice";
import { useEffect, useState } from "react";
import BgDropdown from "./BgDropDown";
import CountryDropdown from "./CountryDropDown";
import RetailerDropdown from "./actionFilters/RetailerDropDown";
import ShowResultBtn from "./actionFilters/ShowResultBtn";
import WeekDropdown from "./actionFilters/WeekDropdown";

export default function FilterBar() {
  const { selectedFilters } = useAppSelector((store) => store.filters);
  const countryAbb = selectedFilters?.Country[0]?.Abbreviation;
  const countryName = selectedFilters?.Country[0]?.CountryName;
  const end_week = selectedFilters.weeks;
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  // console.log("filtersss:", filters);
  useEffect(() => {
    countryAbb &&
      dispatch(fetchWeeks({ Abbreviation: countryAbb, Country: countryName }));
    setFilters({});
  }, [countryAbb, countryName, dispatch]);

  useEffect(() => {
    if (countryAbb && end_week) {
      dispatch(
        fetchAllFilters({
          Abbreviation: countryAbb,
          end_week,
          Country: countryName,
          // params: filters,
        })
      );
    }
  }, [countryAbb, dispatch, end_week, countryName]);

  return (
    <>
      <div className="action-page-filters">
        <div className="filters-dropdown">
          <CountryDropdown />
          <BgDropdown setFilters={setFilters} />
          <CategoryDropdown setFilters={setFilters} />
          <RetailerDropdown setFilters={setFilters} />
          <StoreDropdown setFilters={setFilters} />
          <SalesRepDropdown setFilters={setFilters} />
          <WeekDropdown />

          <ShowResultBtn />
        </div>
      </div>
    </>
  );
}
