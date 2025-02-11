import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: string;
  loading: boolean;
}

const initialState: UserState = {
  user: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
