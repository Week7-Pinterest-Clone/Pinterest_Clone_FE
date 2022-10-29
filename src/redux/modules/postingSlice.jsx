import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getCookie } from "../shared/cookie";
import axios from "axios";

const headers = { Authorization: `Bearer` };

// ** getList ** //
export const __getList = createAsyncThunk(
  "postingSlice/getList",
  //postId,title,img 가지고온다.
  async () => {
    const response = await axios.get(`${serverUrl}/posts`, headers);
    return response.data;
  }
);

// ** getPostDetail ** //
// ** detailPage api구성이안된거같다. **//
export const __getPostDetail = createAsyncThunk(
  "postingSlice/getPostDetail",
  async (postId) => {
    const response = await axios
      .get(`${serverUrl}/posts/${postId}`, { headers })
      .catch((error) => console.log(error));
    return response.data;
  }
);

// ** uploadList ** //
export const __uploadList = createAsyncThunk(
  "postingSlice/uploadList",
  async (new_list) => {
    const response = await axios.post(
      //줄바꿈입니다. 이미지
      `${serverUrl}/api/post/upload`,
      new_list,
      { headers }
    );
    return response.data;
  }
);

// ** updatePost ** //
// ** 글수정기능은없음. ** //
export const __updatePost = createAsyncThunk(
  "postingSlice/updatePost",
  async (payload) => {
    const response = await axios.put(
      `${serverUrl}/${payload.postId}`,
      param.uploadInfo,
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
      .delete(`${serverUrl}/posts/${postId}`, { headers })
      .catch((error) => console.log(error));
    console.log(response.data);
    return response.data;
  }
);

export const __postingReducer = createSlice({
  name: "postingList",
  initialState: [],
  reducers: {},
  extraReducers: {
    [__getList.fulfilled]: (state, { payload }) => [...payload],
    [__uploadList.fulfilled]: (state, { payload }) => [...state, payload],
    [__getPostDetail.fulfilled]: (state, { payload }) => [payload],
    [__deletePost.fulfilled]: (state, { payload }) => [state],
    [__updatePost.fulfilled]: (state, { payload }) => {
      return [payload];
    },
  },
});

export const {} = postingSlice.actions;
export default postingSlice.reducer;
