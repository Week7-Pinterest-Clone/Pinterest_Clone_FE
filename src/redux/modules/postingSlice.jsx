import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import axios from "axios";
import { getCookie } from "../../shared/cookie";

const headers = {
  accessToken: `${getCookie("accessToken")}`,
  refreshToken: `${getCookie("refreshToken")}`,
};

// ** getList ** //
export const __getList = createAsyncThunk(
  "postingSlice/getList",
  //postId,title,img 가지고온다. acoomment
  async () => {
    const response = await axios.get("https:12.15.49.12/posts", headers);
    return response.data;
  }
);

// ** getPostDetail ** //
// ** detailPage api구성이안된거같다. **//
export const __getPostDetail = createAsyncThunk(
  "postingSlice/getPostDetail",
  async (postId) => {
    const response = await axios
      .get("https:12.15.49.12/posts/${postId}", { headers })
      .catch((error) => console.log(error));
    return response.data;
  }
);

// ** uploadList ** //
// ** 글쓰기 thunk ** //
export const __uploadPost = createAsyncThunk(
  "postingSlice/uploadPost",
  async (new_list) => {
    console.log(new_list);
    const response = await axios.post(
      //줄바꿈입니다. 이미지
      "https:12.15.49.12/posts",
      new_list,
      { headers }
    );
    return response.data;
  }
);

// ** updatePost ** //
// ** 수정 thunk ** //
export const __updatePost = createAsyncThunk(
  "postingSlice/updatePost",
  async (payload) => {
    const response = await axios.put(
      "https:12.15.49.12/${payload.postId}",
      // param.uploadInfo, 이건 확인해봐야한다. put 수정.
      {
        headers: {
          Authorization: ``,
        },
      }
    );
    console.log(response);
    return response;
  }
);

// ** deletePost ** //
export const __deletePost = createAsyncThunk(
  "postingSlice/deletePost",
  async (postId) => {
    const response = await axios
      .delete("https:12.15.49.12/posts/${postId}", { headers })
      .catch((error) => console.log(error));
    console.log(response.data);
    return response.data;
  }
);

//async thunk -< reducer  그데이를활용해서 화면에찍음.

export const postingSlice = createSlice({
  name: "postingList",
  initialState: [],
  reducers: {},
  extraReducers: {
    //state + payload -> ...payload
    //데이터 수정 함수 reducer.
    [__getList.fulfilled]: (state, { payload }) => [...payload],
    [__uploadPost.fulfilled]: (state, { payload }) => [...state, payload],
    [__getPostDetail.fulfilled]: (state, { payload }) => [payload],
    [__deletePost.fulfilled]: (state, { payload }) => [state],
    [__updatePost.fulfilled]: (state, { payload }) => {
      return [payload];
    },
  },
});

export const {} = postingSlice.actions;
export default postingSlice.reducer;

//import { getCookie } from "../shared/cookie"; -> 쿠키 사용할때 가져와야지.
