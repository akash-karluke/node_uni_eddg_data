import { setSelectedStores } from "@/reducers/filters/filterSlice";

import RenderDropdown from "./RenderDropdown";

export default function StoreDropdown({ setFilters }: { setFilters: any }) {
  return (
    <RenderDropdown
      component="Store"
      setFilters={setFilters}
      setterFunc={setSelectedStores}
    />
  );
}
