import { setSelectedBg } from "@/reducers/filters/filterSlice";
import RenderDropdown from "./actionFilters/RenderDropdown";

export default function BgDropdown({ setFilters }: { setFilters: any }) {
  return (
    <RenderDropdown
      component="BG"
      setFilters={setFilters}
      setterFunc={setSelectedBg}
    />
  );
}
