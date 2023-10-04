import getAuthToken from "@/components/api/getToken";
import { BASE_URL } from "@/helper/Constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

export type Countries = {
  Abbreviation: string;
  CountryName: string;
  CurrencyCode: string;
};

export interface FilterProps {
  Country: Countries[] | any[];
  BG: string[];
  Category: string[];
  Retailer: string[];
  Store: string[];
  SalesRep: string[];
  weeks: string[] | string;
}

const initialState = {
  selectedFilters: {
    Country: [] as Countries[] | any[],
    BG: [] as string[],
    Category: [] as string[],
    Retailer: [] as string[],
    Store: [] as string[],
    SalesRep: [] as string[],
    weeks: "" as string,
  },
  allFilters: {
    Country: [] as Countries[] | any[],
    BG: [] as string[],
    Category: [] as string[],
    Retailer: [] as string[],
    Store: [] as string[],
    SalesRep: [] as string[],
    weeks: [] as string[],
  },
  isFiltersLoading: false,
  isCountryLoading: false,
  isWeeksLoading: false,
};

export const fetchCountryFilter: any = createAsyncThunk(
  "filters/countryFilter",
  async (_, thunkApi) => {
    const accessToken = await getAuthToken();
    const result = await axios.get(`${BASE_URL}dashboard/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data.data;
  }
);

export const fetchAllFilters: any = createAsyncThunk(
  "filters/fetchAllFilters",
  async (props: any, thunkApi) => {
    const { Abbreviation, Country, params, end_week } = props;

    try {
      const accessToken = await getAuthToken();

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}action/filter/`,
        {
          Abbreviation,
          end_week,
          Country,
          params,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return result.data.data;
    } catch (error: any) {
      console.log(
        "Error in the fetchAllFilters:",
        error?.response?.data?.message || error
      );
      return thunkApi.rejectWithValue("Failed to fetch the data!");
    }
  }
);

export const fetchWeeks: any = createAsyncThunk(
  "filters/weeks",
  async (params, thunkApi) => {
    try {
      const accessToken = await getAuthToken();
      const { data } = await axios.post(
        `${BASE_URL}action/filter/week/`,
        params,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (data.data.length) {
        const res = data.data.map((x: any) => ({
          value: x,
          label: moment(x, "YYYYWW").format("DD.MM.YYYY"),
        }));

        return res;
      } else {
        thunkApi.dispatch(clearFilters());
        return thunkApi.rejectWithValue("No data found");
      }
    } catch (error: any) {
      console.log("Error in the fetchWeeks:", error?.response?.data?.message);
      return thunkApi.rejectWithValue("Failed to fetch the data!");
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    clearAllFilters: () => initialState,
    clearFilters: (state) => {
      state.allFilters = {
        ...initialState.allFilters,
        Country: state.allFilters.Country,
      };
      state.selectedFilters = {
        ...initialState.selectedFilters,
        Country: state.selectedFilters.Country,
      };
    },
    setSelectedCountry: (state, action: PayloadAction<any>) => {
      state.selectedFilters.Country = action.payload;
      state.selectedFilters.weeks = "";
    },
    setSelectedWeek: (state, action) => {
      state.selectedFilters.weeks = action.payload;
    },
    setSelectedBg: (state, action: PayloadAction<any>) => {
      // console.log("bgAction", action);
      state.selectedFilters.BG = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<any>) => {
      state.selectedFilters.Category = action.payload;
    },
    setSelectedRetailer: (state, action: PayloadAction<any>) => {
      state.selectedFilters.Retailer = action.payload;
    },
    setSelectedStores: (state, action: PayloadAction<any>) => {
      state.selectedFilters.Store = action.payload;
    },
    setSelectedSalesRep: (state, action: PayloadAction<any>) => {
      state.selectedFilters.SalesRep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountryFilter.pending, (state) => {
      state.allFilters.Country = initialState.allFilters.Country;
      state.selectedFilters.Country = initialState.selectedFilters.Country;
      state.isCountryLoading = true;
    });
    builder.addCase(fetchCountryFilter.fulfilled, (state, action) => {
      state.allFilters.Country = action.payload.Country;
      state.selectedFilters.Country = [action.payload.Country[0]];
      state.isCountryLoading = false;
    });
    builder.addCase(fetchWeeks.pending, (state) => {
      state.allFilters.weeks = [];
      state.selectedFilters.weeks = "";
      state.isWeeksLoading = true;
    });
    builder.addCase(fetchWeeks.fulfilled, (state, action) => {
      state.allFilters.weeks = action.payload;
      state.selectedFilters.weeks = action.payload[0].value;
      state.isWeeksLoading = false;
    });
    builder.addCase(fetchWeeks.rejected, (state, action) => {
      state.allFilters.weeks = [];
      state.selectedFilters.weeks = "";
      state.isWeeksLoading = false;
    });

    builder.addCase(fetchAllFilters.pending, (state, action) => {
      // console.log("bgaction", action);
      state.isFiltersLoading = true;
    });
    builder.addCase(fetchAllFilters.fulfilled, (state, action) => {
      state.allFilters.BG = action.payload.BG;
      state.selectedFilters.BG = action.payload.BG;
      state.allFilters.Category = action.payload.Category;
      state.selectedFilters.Category = action.payload.Category;
      state.allFilters.Retailer = action.payload.Retailer;
      state.selectedFilters.Retailer = action.payload.Retailer;
      state.allFilters.Store = action.payload.Store;
      state.selectedFilters.Store = action.payload.Store;
      state.allFilters.SalesRep = action.payload.SalesRep;
      state.selectedFilters.SalesRep = action.payload.SalesRep;
      state.isFiltersLoading = false;
    });
    builder.addCase(fetchAllFilters.rejected, (state, action) => {
      // console.log("bgRejectedaction", action);
      state.allFilters = {
        ...initialState.allFilters,
        Country: state.allFilters.Country,
        weeks: state.allFilters.weeks,
      };
      state.selectedFilters = {
        ...initialState.selectedFilters,
        Country: state.selectedFilters.Country,
        weeks: state.selectedFilters.weeks,
      };
      state.isFiltersLoading = false;
    });
  },
});
export const {
  clearAllFilters,
  clearFilters,
  setSelectedCountry,
  setSelectedBg,
  setSelectedCategory,
  setSelectedRetailer,
  setSelectedStores,
  setSelectedSalesRep,
  setSelectedWeek,
} = filterSlice.actions;

export default filterSlice.reducer;
