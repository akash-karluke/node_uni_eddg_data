import getAuthToken from "@/components/api/getToken";
import { BASE_URL } from "@/helper/Constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { OosTableType, tableProps } from "./type";

const initialState: OosTableType = {
  entries: { rows: [], count: 0 },
  oosStatus: "idle",
  oosError: "",
};

export const getOosTableData: any = createAsyncThunk(
  "tables/oosTable",
  async (props: tableProps, thunkApi) => {
    const accessToken = await getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(`${BASE_URL}action/oosAlert`, props, config);
      // console.log("res:", res);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error in getOosTable:", error?.response?.data?.message);
      return thunkApi.rejectWithValue("Failed to fetch the data!");
    }
  }
);

export const oosTableSlice = createSlice({
  name: "oosTable",
  initialState,
  reducers: {
    clearOosEntries: () => initialState,
    // clearPaginations: (state, action) => state.
  },
  extraReducers: (builder) => {
    builder.addCase(getOosTableData.pending, (state) => {
      state.oosStatus = "pending";
      state.entries = initialState.entries;
    });
    builder.addCase(getOosTableData.fulfilled, (state, action) => {
      // console.log({ actionF: action });
      state.oosStatus = "succeeded";
      state.entries = action.payload;
      state.oosError = "";
    });
    builder.addCase(getOosTableData.rejected, (state, action) => {
      // console.log({ actionR: action });
      state.oosStatus = "failed";
      state.entries = initialState.entries;
      state.oosError = "Failed to fetch the data";
    });
  },
});
export const { clearOosEntries } = oosTableSlice.actions;
export default oosTableSlice.reducer;
