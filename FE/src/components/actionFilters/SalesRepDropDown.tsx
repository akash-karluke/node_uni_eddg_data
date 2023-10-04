import { setSelectedSalesRep } from "@/reducers/filters/filterSlice";
import RenderDropdown from "./RenderDropdown";

export default function SalesRepDropdown({ setFilters }: { setFilters: any }) {
  return (
    <RenderDropdown
      component="SalesRep"
      setFilters={setFilters}
      setterFunc={setSelectedSalesRep}
    />
  );
}
