import getAuthToken from "@/components/api/getToken";
import { BASE_URL } from "@/helper/Constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PicosTableType, tableProps } from "./type";

const initialState: PicosTableType = {
  entries: { rows: [], count: 0 },
  status: "idle",
  picosError: "",
};

export const getPicosTableData: any = createAsyncThunk(
  "tables/PicosTable",
  async (props: tableProps, thunkApi) => {
    const accessToken = await getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${BASE_URL}action/picos/getGrowthPotentialDetails`,
        props,
        config
      );
      // console.log("res:", res);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error in getPicosTable:", error?.response?.data?.message);
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
//         getPicosTableData({
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

export const picosTableSlice = createSlice({
  name: "picosTable",
  initialState,
  reducers: {
    clearPicosEntries: () => initialState,
    // clearPaginations: (state, action) => state.
  },
  extraReducers: (builder) => {
    builder.addCase(getPicosTableData.pending, (state) => {
      state.status = "pending";
      state.entries = initialState.entries;
    });
    builder.addCase(getPicosTableData.fulfilled, (state, action) => {
      // console.log({ actionF: action });
      state.status = "succeeded";
      state.entries = action.payload;
      state.picosError = "";
    });
    builder.addCase(getPicosTableData.rejected, (state, action) => {
      // console.log({ actionR: action });
      state.status = "failed";
      state.entries = initialState.entries;
      state.picosError = "Failed to fetch the data";
    });
  },
});
export const { clearPicosEntries } = picosTableSlice.actions;
export default picosTableSlice.reducer;
