import { useAppSelector } from "@/helper/hooks";
import { FilterProps } from "@/reducers/filters/filterSlice";
import useIsEverythingSelected from "./useIsEverythingSelected";

export default function useGetPSelectedFilters() {
  const { allFilters, selectedFilters } = useAppSelector(
    (store) => store.filters,
  );

  // function makeArray(category: keyof FilterProps, key: string): any[] {
  //   const selected = selectedFilters[category];
  //   if (typeof selected !== "string") {
  //     return (selected as any[]).reduce((acc, item) => {
  //       item[key]?.length && typeof item[key] === "string"
  //         ? acc.push(item[key])
  //         : acc.push(...item[key]);
  //       return acc;
  //     }, []);
  //   }
  //   return [];
  // }

  // const allSelectedFilters = {
  //   Category: makeArray("categories", "P_Category"),
  //   Retailer: makeArray("retailers", "P_Retailer"),
  //   "Sales Representative": useIsEverythingSelected("salesReps")
  //     ? []
  //     : makeArray("salesReps", "SalesRepID"),
  //   "Store Code": useIsEverythingSelected("stores")
  //     ? []
  //     : selectedFilters.stores
  //         .filter((item) => item.Cat === "Picos")
  //         .map((item) => item.StoreCode),
  // };
  // console.log("allSelectedFilters:", allSelectedFilters);
  // return allSelectedFilters;
  return [];
}
