import getAuthToken from "@/components/api/getToken";
import { BASE_URL } from "@/helper/Constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LogBookTableType, tableProps } from "./type";

const initialState: LogBookTableType = {
  entries: { rows: [], count: 0 },
  logBookStatus: "idle",
  logBookError: "",
  logbookType: "OSA",
};

export const getPicosLogBook: any = createAsyncThunk(
  "logbook/picosTable",
  async (props: tableProps, thunkApi) => {
    // const { countryAbb, current, pageSize, end_week, filters } = props;
    const accessToken = await getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${BASE_URL}action/picos/logBook/`,
        props,
        config
      );
      // console.log("res:", res);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error in getLogBookTable:", error?.response?.data?.message);
      return thunkApi.rejectWithValue("Failed to fetch the data!");
    }
  }
);

export const getOsaLogBook: any = createAsyncThunk(
  "logbook/osaTable",
  async (props: tableProps, thunkApi) => {
    const { countryAbb, current, pageSize, end_week, params } = props;
    const accessToken = await getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${BASE_URL}action/oosAlert/logBook/`,
        props,
        config
      );
      // console.log("res:", res);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error in getLogBookTable:", error?.response?.data?.message);
      return thunkApi.rejectWithValue("Failed to fetch the data!");
    }
  }
);

// export const resetPaginationOnCountryChange: any = createAsyncThunk(
//   "tables/resetpagination",
//   async (props: tableProps, thunkApi) => {
//     const { countryAbb, current, pageSize, end_week, filters } = props;
//     return thunkApi
//       .dispatch(
//         getLogBookTableData({
//           countryAbb,
//           current: 1,
//           pageSize,
//           end_week,
//           filters,
//         })
//       )
//       .unwrap();
//   }
// );

export const logBookTableSlice = createSlice({
  name: "logBookTable",
  initialState,
  reducers: {
    clearLogBookEntries: () => initialState,
    setLogbookType: (state, action) => {
      state.logbookType = action.payload;
    },
    // clearPaginations: (state, action) => state.
  },
  extraReducers: (builder) => {
    builder.addCase(getOsaLogBook.pending, (state) => {
      state.logBookStatus = "pending";
      state.entries = initialState.entries;
    });
    builder.addCase(getOsaLogBook.fulfilled, (state, action) => {
      // console.log({ actionF: action });
      state.logBookStatus = "succeeded";
      state.entries = action.payload;
      state.logBookError = "";
    });
    builder.addCase(getOsaLogBook.rejected, (state, action) => {
      // console.log({ actionR: action });
      state.logBookStatus = "failed";
      state.entries = initialState.entries;
      state.logBookError = "Failed to fetch the data";
    });

    builder.addCase(getPicosLogBook.pending, (state) => {
      state.logBookStatus = "pending";
      state.entries = initialState.entries;
    });
    builder.addCase(getPicosLogBook.fulfilled, (state, action) => {
      // console.log({ actionF: action });
      state.logBookStatus = "succeeded";
      state.entries = action.payload;
      state.logBookError = "";
    });
    builder.addCase(getPicosLogBook.rejected, (state, action) => {
      // console.log({ actionR: action });
      state.logBookStatus = "failed";
      state.entries = initialState.entries;
      state.logBookError = "Failed to fetch the data";
    });
  },
});
export const { clearLogBookEntries, setLogbookType } =
  logBookTableSlice.actions;
export default logBookTableSlice.reducer;
