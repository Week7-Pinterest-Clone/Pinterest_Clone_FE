import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../shared/cookie";
//import { postReducer } from "./postReducer";
import { createSlice } from "@reduxjs/toolkit";

export const searchPost = createAsyncThunk("SEARCH_POST", async (word) => {
  console.log(word);
  const response = await axios
    .get(`http://dlckdals04.shop/api/post/search/${word}`, {
      headers: {
        Authorization: `Bearer ${getCookie("myToken")}`,
      },
    })
    .catch((error) => console.log(error));
  console.log(response.data);
  return response.data;
});

export const searchReducer = createSlice({
  name: "searchResult",
  initialState: [],
  reducers: {},
  extraReducers: {
    [searchPost.fulfilled]: (state, { payload }) => [...payload],
  },
});

export default searchReducer.reducer;
