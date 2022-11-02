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

  async () => {
    const response = await axios.get("https://pyo00.shop/posts", { headers });
    console.log(response.data);
    return response.data.data;
  }
);

// ** getPostDetail ** //
// ** detailPage api구성이안된거같다. **//
export const __getPostDetail = createAsyncThunk(
  "postingSlice/getPostDetail",
  async (postId) => {
    const response = await axios
      .get(`https://pyo00.shop/posts/${postId}`, { headers })
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
      "https://pyo00.shop/posts/",
      new_list,
      { headers }
    );
    return response.data;
  }
);

//1. 메인페이지 많다. postId + isSaved(false)
//2. 저장눌리면 -> true로바꿔달라 api요청. put요청.
//3. 백에서 true로바꼇음.
//4. 마이페이지와서 백엔드true값만보는api잇는지?
//5. 그게아니면 map(filter(isSaved==true))

export const __isSaved = createAsyncThunk(
  "postingSlice/isSaved",
  async (payload) => {
    const response = await axios.post(
      //줄바꿈입니다. 이미지
      `https://pyo00.shop/save/${payload.postId}`,
      payload,
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
      `https://pyo00.shop/posts/${payload.postId}`,
      // param.uploadInfo, 이건 확인해봐야한다. put 수정.
      { headers }
    );
    console.log(response);
    return response;
  }
);

// ** deletePost ** //
export const __deletePost = createAsyncThunk(
  "postingSlice/deletePost",
  async (postId) => {
    console.log(postId);
    const response = await axios
      .delete(`https://pyo00.shop/posts/${postId}`, { headers })
      .catch((error) => console.log(error));
    console.log(response.data);
    return response.data;
  }
);

export const postingSlice = createSlice({
  name: "postingList",
  initialState: [],
  reducers: {},
  extraReducers: {
    [__getList.fulfilled]: (state, { payload }) => [...payload],
    [__uploadPost.fulfilled]: (state, { payload }) => [...state, payload],
    [__isSaved.fulfilled]: (state, { payload }) => [...payload],
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
