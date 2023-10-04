import { setSelectedCategory } from "@/reducers/filters/filterSlice";
import RenderDropdown from "./RenderDropdown";

export default function CategoryDropdown({ setFilters }: { setFilters: any }) {
  return (
    <RenderDropdown
      component="Category"
      setFilters={setFilters}
      setterFunc={setSelectedCategory}
    />
  );
}
