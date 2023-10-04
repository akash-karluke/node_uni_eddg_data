import getAuthToken from "@/components/api/getToken";
import { BASE_URL } from "@/helper/Constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ScoreCardFilters {
  filters: {
    Category: string[];
    Version: string[];
  };
  filterStatus: "idle" | "pending" | "succeeded" | "failed";
  filterErr: string;
  details: {}[];
  detailsStatus: "idle" | "pending" | "succeeded" | "failed";
  detailsErr: string;
}

const initialState: ScoreCardFilters = {
  filters: {
    Category: [],
    Version: [],
  },
  details: [],
  filterStatus: "idle",
  detailsStatus: "idle",
  filterErr: "",
  detailsErr: "",
};

export const scoreCardDetails: any = createAsyncThunk(
  "scoreCard/details",
  async (props: any, thunkApi) => {
    // const { Abbreviation } = props;

    const accessToken = await getAuthToken();
    try {
      const result = await axios.post(`${BASE_URL}scoreCard/`, props, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (result.status === 204) {
        return thunkApi.rejectWithValue("No data found!");
      }
      return result.data.data;
    } catch (error) {
      console.log({ error });
      return thunkApi.rejectWithValue("Error fetching Data!");
    }
  }
);

export const scoreCardFilters: any = createAsyncThunk(
  "scoreCard/filters",
  async (props: any, thunkApi) => {
    // const { Abbreviation } = props;
    const accessToken = await getAuthToken();
    try {
      const result = await axios.post(`${BASE_URL}scoreCard/filters`, props, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (result.status === 204) {
        return thunkApi.rejectWithValue("No data found!");
      }
      const data = result.data.data;

      let ar = {
        Category: data.categories.map((x: any) => x.label),
        Version: data.versions.map((x: any) => x.label),
      };
      return ar;
    } catch (error) {
      console.log({ error });
      return thunkApi.rejectWithValue("Error fetching Data!");
    }
  }
);

export const scoreCardSlice = createSlice({
  name: "scoreCard",
  initialState,
  reducers: {
    clearScoreCardDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(scoreCardDetails.pending, (state) => {
      state.detailsStatus = "pending";
    });
    builder.addCase(
      scoreCardDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.details = action.payload;
        state.detailsStatus = "succeeded";
      }
    );
    builder.addCase(scoreCardDetails.rejected, (state, { payload }) => {
      state.detailsStatus = "failed";
      state.details = initialState.details;
      state.detailsErr = payload;
    });

    builder.addCase(scoreCardFilters.pending, (state) => {
      state.filterStatus = "pending";
      state.details = initialState.details;
      state.filters = initialState.filters;
    });

    builder.addCase(scoreCardFilters.fulfilled, (state, action) => {
      state.filters = action.payload;
      state.filterStatus = "succeeded";
    });

    builder.addCase(scoreCardFilters.rejected, (state, { payload }) => {
      state.filterStatus = "failed";
      state.filters = initialState.filters;
      state.filterErr = payload;
    });
  },
});

export const { clearScoreCardDetails } = scoreCardSlice.actions;
export default scoreCardSlice.reducer;
