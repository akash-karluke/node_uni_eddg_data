import { useAppSelector } from "@/helper/hooks";

import useIsEverythingSelected from "./useIsEverythingSelected";

//Use this filter for OSA logbook

export default function useGetPSelectedFilters() {
  const { allFilters, selectedFilters } = useAppSelector(
    (store) => store.filters,
  );

  // function getAllSelectedCat(): any[] {
  //   let categories = [];

  //   categories = selectedFilters.categories.map((item) => item.CategoryID);

  //   let allGlobalCat: any[] = [];

  //   selectedFilters?.globalDivisions?.map((value: any) => {
  //     allGlobalCat = [...allGlobalCat, ...value?.CategoryID];
  //   });

  //   return [...categories, ...allGlobalCat];
  // }

  // const allSelectedFilters = {
  //   CategoryId: useIsEverythingSelected("categories")
  //     ? []
  //     : getAllSelectedCat(),

  //   RetailerId: useIsEverythingSelected("retailers")
  //     ? []
  //     : selectedFilters.retailers.map((item) => item.RetailerID),

  //   SalesRepId: useIsEverythingSelected("salesReps")
  //     ? []
  //     : selectedFilters.salesReps.map((item) => item.SalesRepID),

  //   StoreId: useIsEverythingSelected("stores")
  //     ? []
  //     : selectedFilters.stores

  //         .filter((item) => item.Cat === "OSA")

  //         .map((item) => item.StoreCode),
  // };

  //   console.log("allSelectedFilters:", allSelectedFilters);

  return [];
}
