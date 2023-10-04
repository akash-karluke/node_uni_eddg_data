import { FilterProps } from "@/reducers/filters/filterSlice";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8001/api/v1/"
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export const OOS_TABLE_ACTION_STATUS = ["Pending", "In Progress", "Completed"];
export const PICOS_TABLE_ACTION_STATUS = ["New", "In Progress", "Completed"];
export const OOS_ROOT_CAUSES = [
  "Out of stock in shelf",
  "Stock in back of store",
  "Delivery required from warehouse to store",
  "No Recent sales in store",
  "Delivery Scheduled, yet to receive the stock",
  "Delay in processing the order from customer to UL",
  "Availablity issue, due to material/capacity",
];

export const FIXED_DECIMAL_POINT = 2;

export const FILTERS_CONSTS: {
  [key: string]: {
    label: string;
    reduxKey: keyof FilterProps;
    keyName: string;
    labelName: string;
  };
} = {
  Category: {
    label: "Category",
    reduxKey: "Category",
    keyName: "CategoryID",
    labelName: "label",
  },
  BG: {
    label: "Business Group",
    reduxKey: "BG",
    keyName: "BG_ID",
    labelName: "label",
  },
  Retailer: {
    label: "Retailer",
    reduxKey: "Retailer",
    keyName: "RetailerID",
    labelName: "label",
  },
  Store: {
    label: "Store",
    reduxKey: "Store",
    keyName: "StoreCode",
    labelName: "StoreName",
  },
  SalesRep: {
    label: "SalesRep",
    reduxKey: "SalesRep",
    keyName: "SalesRepID",
    labelName: "label",
  },
};
