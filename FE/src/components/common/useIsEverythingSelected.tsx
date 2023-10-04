import { useAppSelector } from "@/helper/hooks";
import { FilterProps } from "@/reducers/filters/filterSlice";

export default function useIsEverythingSelected(entity: keyof FilterProps) {
  const { allFilters, selectedFilters } = useAppSelector(
    (store) => store.filters
  );
  return allFilters[entity].length === selectedFilters[entity].length;
}
