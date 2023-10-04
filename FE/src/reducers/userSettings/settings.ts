import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Countries, fetchCountryFilter } from "../filters/filterSlice";

export type SelectObject = {
  label: string;
  value: string;
};

const initialState = {
  allSettings: {
    Country: [] as Countries[],
    Currency: [{ label: "", value: "" }] as SelectObject[],
    Language: [{ label: "", value: "" }] as SelectObject[],
  },
  selectedSettings: {
    Country: {} as Countries,
    Currency: { label: "", value: "" } as SelectObject,
    Language: { label: "", value: "" } as SelectObject,
  },
  isLoading: false,
};

export const fetchSetting: any = createAsyncThunk(
  "user/settings",
  async (_, thunkApi) => {
    try {
      const result = await thunkApi.dispatch(fetchCountryFilter()).unwrap();
      console.log("result:", result);
      return result;
    } catch (error) {
      console.log({ error });
      return thunkApi.rejectWithValue("Error!");
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettings: () => initialState,
    setSelectedCountry: (state, { payload }) => {
      state.selectedSettings.Country = payload;
    },
    setSelectedCurrency: (state, { payload }) => {
      state.selectedSettings.Currency = payload;
    },
    setSelectedLanguage: (state, { payload }) => {
      state.selectedSettings.Language = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSetting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSetting.fulfilled, (state, { payload }) => {
      state.allSettings = payload;
      state.selectedSettings.Country = payload.Country[0];
      state.selectedSettings.Currency = payload.Currency[0];
      state.selectedSettings.Language = payload.Language[0];
      state.isLoading = false;
    });
  },
});

export const {
  clearSettings,
  setSelectedCountry,
  setSelectedCurrency,
  setSelectedLanguage,
} = settingsSlice.actions;
export default settingsSlice.reducer;
