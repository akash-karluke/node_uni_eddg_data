export interface LogBookTableType {
  entries: { rows: []; count: number };
  logBookStatus: "idle" | "pending" | "succeeded" | "failed";
  logBookError: string;
  logbookType: "OSA" | "PICOS";
}

export interface tableProps {
  countryAbb: string;
  current: number;
  pageSize: number;
  end_week: number;
  params: any;
}
