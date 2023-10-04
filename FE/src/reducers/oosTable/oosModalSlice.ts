import { BASE_URL } from "@/helper/Constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ActionModalType, modalProps } from "./type";

const initialState: ActionModalType = {
  entries: {
    availability: {
      AGG_PROD_ID: "",
      ActionStatus: "Pending",
      Due_date: "",
      OSAPercentage: 0,
      TargetOSA: 0,
    },
    store: [
      {
        AvailabilityStatus: 0,
        Factless_Fact_ID: "",
        ProductID: "",
        RootCause: "",
        core_sku_EAN: "",
        core_sku_description: "",
      },
    ],
  },
  modalDataStatus: "idle",
};

export const getModalData: any = createAsyncThunk(
  "oosAlert/modalData",
  async (props: modalProps, thunkApi) => {
    const { Abbreviation, end_week, params } = props;
    try {
      const { data } = await axios.post(`${BASE_URL}action/oosAlert/store`, {
        Abbreviation,
        end_week,
        params,
      });
      // console.log("Data:", data);
      if (data.status === 204 || data.data.store.length === 0) {
        return thunkApi.rejectWithValue("No Data found");
      }
      return data.data;
    } catch (error: any) {
      console.log("Error in the getOosmodal:", error?.response?.data?.message);
      return thunkApi.rejectWithValue("Failed to fetch the data!");
    }
  }
);

export const oosModalSlice = createSlice({
  name: "oosModal",
  initialState,
  reducers: {
    clearOosModalData: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getModalData.pending, (state) => {
      state.modalDataStatus = "pending";
      state.entries = initialState.entries;
    });
    builder.addCase(getModalData.fulfilled, (state, action) => {
      // console.log({ actionS: action.payload });
      state.modalDataStatus = "succeeded";
      state.entries = action.payload;
    });
    builder.addCase(getModalData.rejected, (state, action) => {
      // console.log({ actionF: action.payload });
      state.modalDataStatus = "failed";
      state.entries = initialState.entries;
    });
  },
});

export const { clearOosModalData } = oosModalSlice.actions;
export default oosModalSlice.reducer;
