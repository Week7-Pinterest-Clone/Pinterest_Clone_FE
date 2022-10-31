import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  // Authorization: `Bearer ${}`,
};

export const __getMyPosts = createAsyncThunk(
  "myPost/getMyPosts",
  //console.log()
  async () => {
    const response = await axios
      //get확인.
      //여기서 이미지정보도 넘어와야되고.
      .get("serverUrl/users/userId", { headers })
      .catch((error) => console.log(error));
    return response.data;
  }
);

//edit구현 -> axios.put 해야함.

export const myPostReducer = createSlice({
  name: "myPost",
  initialState: [],
  reducers: {},
  extraReducers: {
    [__getMyPosts.fulfilled]: (state, { payload }) => {
      return [...payload];
    },
  },
});

export default myPostReducer.reducer;

//import { getCookie } from "../shared/cookie";
