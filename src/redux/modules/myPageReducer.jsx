import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getCookie } from "../shared/cookie";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${}`,
};

export const getMyPosts = createAsyncThunk(
  "myPost/getMyPosts", 
  async () => {
  const response = await axios
    .get("serverUrl/mypage/", { headers })
    .catch((error) => console.log(error));
  return response.data;
});

export const myPostReducer = createSlice({
  name: "myPost",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getMyPosts.fulfilled]: (state, { payload }) => {
      return [...payload];
    },
  },
});

export default myPostReducer.reducer;
