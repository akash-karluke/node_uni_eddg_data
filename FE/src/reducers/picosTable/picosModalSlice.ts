import ApiBase from "@/components/api/Apibase";
import { BASE_URL } from "@/helper/Constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ActionModalType, modalProps } from "./type";

const initialState: ActionModalType = {
  entries: {
    availability: {
      Available: 0,
      Unavailable: 0,
    },
    banners: [],
    store: [],
    count: 0,
  },
  modalDataStatus: "idle",
};

export const getModalData: any = createAsyncThunk(
  "picosGP/modalData",
  async (props: modalProps, thunkApi) => {
    try {
      const res = await axios.post(`${BASE_URL}action/picos/store`, {
        page: 1,
        per_page: 100000,
        ...props,
      });
      if (res.status === 204) {
        return thunkApi.rejectWithValue("No Data Available!");
      }
      const data = res.data.data;
      // console.log("data:", data);

      const availability = data.rows.filter(
        (x: any) => x.Status === "Available"
      );
      const count = data.count;
      const banners = data.images;
      const response = {
        store: data.rows,
        availability: {
          Available: availability.length,
          Unavailable: count - availability.length,
        },
        count,
        banners,
      };

      return res.data.status && response;
    } catch (error: any) {
      console.log(
        "Error in the getPicosModal:",
        error?.response?.data?.message || error
      );
      return thunkApi.rejectWithValue("Failed to fetch the data!");
    }
  }
);

export const updatePicosModal: any = createAsyncThunk(
  "picosGP/updateModalData",
  async (props: modalProps, thunkApi) => {
    ApiBase.post(`${BASE_URL}action/picos/store`, {
      page: 1,
      per_page: 100000,
      ...props,
    });
  }
);

export const picosModalSlice = createSlice({
  name: "picosModal",
  initialState,
  reducers: {
    clearPicosModalData: () => initialState,
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

export const { clearPicosModalData } = picosModalSlice.actions;
export default picosModalSlice.reducer;
