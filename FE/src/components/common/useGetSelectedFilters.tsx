import { useAppSelector } from "@/helper/hooks";
import { FilterProps } from "@/reducers/filters/filterSlice";
import useIsEverythingSelected from "./useIsEverythingSelected";

export default function useGetSelectedFilters() {
  const { selectedFilters } = useAppSelector((store) => store.filters);
  const isEverythingSelected = useIsEverythingSelected;

  function getArrayOf(elements: Array<keyof FilterProps>): object {
    const fetchedValues: any = {};
    elements.forEach((ele: keyof FilterProps) => {
      fetchedValues[ele] = isEverythingSelected(ele)
        ? []
        : selectedFilters[ele];
    });
    return fetchedValues;
  }

  return getArrayOf(["BG", "Category", "Retailer", "Store", "SalesRep"]);

  //   label: string;
  //   val: string[];
  // }[] = [
  //   {
  //     label: "salesRepID",
  //     val: [],
  //   },
  //   {
  //     label: "StoreID",
  //     val: [],
  //   },
  //   {
  //     label: "CategoryID",
  //     val: [],
  //   },
  //   {
  //     label: "RetailerID",
  //     val: [],
  //   },
  // ];

  // let allSelectedSalesRep = useIsEverythingSelected("salesReps")
  //   ? []
  //   : selectedFilters?.salesReps?.map((value: any) => value.SalesRepID);

  // let allSelectedRetailers = useIsEverythingSelected("retailers")
  //   ? []
  //   : selectedFilters?.retailers?.map((value: any) => value.RetailerID);

  // let allSelectedCategories = useIsEverythingSelected("categories")
  //   ? []
  //   : selectedFilters?.categories?.map((value: any) => value.CategoryID);
  // let allSelectedStores = useIsEverythingSelected("stores")
  //   ? []
  //   : selectedFilters?.stores?.map((value: any) => value.StoreID);
  // //   selectedFilters?.categories?.map((value) => value.CategoryID);

  // let allGlobalCat: any[] = [];

  // selectedFilters?.globalDivisions?.map((value: any) => {
  //   allGlobalCat = [...allGlobalCat, ...value.CategoryID];
  //   return value?.BG_ID;
  // });

  // allSelectedCategories = [...allGlobalCat, ...allSelectedCategories];

  // allSelectedFilters[0].val = allSelectedSalesRep;
  // allSelectedFilters[1].val = allSelectedStores;
  // allSelectedFilters[2].val = allSelectedCategories;
  // allSelectedFilters[3].val = allSelectedRetailers;
  // return allSelectedFilters;
  return [];
}
