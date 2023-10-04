import { setSelectedRetailer } from "@/reducers/filters/filterSlice";
import RenderDropdown from "./RenderDropdown";

export default function RetailerDropdown({ setFilters }: { setFilters: any }) {
  return (
    <RenderDropdown
      component="Retailer"
      setFilters={setFilters}
      setterFunc={setSelectedRetailer}
    />
  );
}
