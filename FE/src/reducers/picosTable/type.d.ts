export interface PicosTableType {
  entries: { rows: { [key: string]: any }[]; count: number };
  status: "idle" | "pending" | "succeeded" | "failed";
  picosError: string;
}

export interface tableProps {
  params: any;
  current: number;
  pageSize: number;
  end_week: number;
  filters: any;
}

export interface ActionModalType {
  entries: {
    availability: {
      Available: number;
      Unavailable: number;
    };
    banners: { URL: string }[];
    store: {
      EAN: string;
      EAN_Description: string;
      Status: string;
      Visit_Date: string;
    }[];
    count: number;
  };
  modalDataStatus: "idle" | "pending" | "succeeded" | "failed";
}

export interface modalProps {
  Abbreviation: string;
  end_week: number;
  params: {
    SalesRepID: number;
    StoreID: number;
    CategoryID: number;
  };
}
