import getAuthToken from "@/components/api/getToken";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface userProps {
  user: {
    userId: string | null;
    displayName: string;
    emailId: string;
    avatarUrl?: string;
    role: string;
    profile: string;
  };
  tokenExpiry: number;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string;
  token: string;
}

export const fetchUser: any = createAsyncThunk(
  "user/details",
  async (_, thunkApi) => {
    const accessToken = await getAuthToken();
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log({ resp });
      if (!resp.ok) {
        return thunkApi.rejectWithValue("User don't have access");
      }
      let avatarUrl: string | null = null;
      if (accessToken) {
        avatarUrl = await thunkApi.dispatch(getImageUrl(accessToken)).unwrap();
      }
      // try {
      // } catch (error) {
      //   avatarUrl = "";
      // }
      const { data } = await resp.json();

      const { userId, EmailID, FirstName, LastName, UserPersona } = data;
      const user = {
        userId: userId || null,
        displayName: `${FirstName ?? ""} ${LastName ?? ""}`,
        emailId: EmailID,
        avatarUrl,
        role: UserPersona,
        profile:
          "SalesRep" === UserPersona
            ? "Sales Rep"
            : "SalesManager" === UserPersona
            ? "Sales Manager"
            : "Global User",
      };
      // localStorage.setItem("accessToken", accessToken);
      let d = new Date();
      return {
        user,
        tokenExpiry: d.setHours(d.getHours() + 1),
        token: "",
      };
    } catch (error) {
      console.log({ error });

      return thunkApi.rejectWithValue("User don't have access");
    }
  }
);

export const getImageUrl = createAsyncThunk(
  "user/fetchProfilePic",
  async (accessToken: string, thunkApi) => {
    return axios
      .get("https://graph.microsoft.com/v1.0/me/photo/$value", {
        headers: { Authorization: "Bearer " + accessToken },
        responseType: "arraybuffer",
      })
      .then((res) => {
        const image = Buffer.from(res.data, "binary").toString("base64");
        return "data:image/jpeg;base64, " + image;
      })
      .catch((err) => {
        return null;
      });
  }
);

const initialState: userProps = {
  user: {
    userId: null,
    displayName: "",
    emailId: "",
    avatarUrl: "",
    role: "",
    profile: "",
  },
  tokenExpiry: 0,
  token: "",
  status: "idle",
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearUser: () => {
      console.log("Clearing user");
      // localStorage.removeItem("accessToken");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // * Fetch User cases
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "pending";
      // console.log('state Pending:::', state)
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        // console.log('state success', state)
        state.user = action.payload.user;
        state.tokenExpiry = action.payload.tokenExpiry;
        state.token = action.payload.token;
        state.status = "succeeded";
        state.error = "";
      }
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = initialState.user;
      state.token = "";
      state.tokenExpiry = 0;
      // console.log('state failedddd', state)
    });
    // * Get Image Cases
    builder.addCase(getImageUrl.rejected, (state) => {
      state.user.avatarUrl = "";
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
