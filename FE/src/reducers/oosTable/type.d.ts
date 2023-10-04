export interface OosTableType {
  entries: { rows: []; count: number };
  oosStatus: "idle" | "pending" | "succeeded" | "failed";
  oosError: string;
}

export interface tableProps {
  countryAbb: string;
  current: number;
  pageSize: number;
  end_week: number;
  filters: any;
}

export interface ActionModalType {
  entries: {
    availability: {
      AGG_PROD_ID: string;
      ActionStatus: string;
      Due_date: string;
      OSAPercentage: number;
      TargetOSA: number;
    };
    store: [
      {
        AvailabilityStatus: number;
        Factless_Fact_ID: string;
        ProductID: string;
        RootCause: string;
        core_sku_EAN: string;
        core_sku_description: string;
      },
    ];
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
