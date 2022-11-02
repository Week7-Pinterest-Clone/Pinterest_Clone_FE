import { useState, useEffect } from "react";
import { getCookie } from "../shared/cookie";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "../components/Header";
import Mypage from "../pages/Mypage";
import PostDetail from "../pages/PostDetail";
import PostMain from "../pages/PostMain";
import Update from "../pages/Update";
import Upload from "../pages/Upload";
import GlobalStyle from "../styles/GlobalStyle";
import Main from "../pages/Main";
import axios from "axios";

function Router() {
  const [isLogin, setIsLogin] = useState(false);

  // 로그인토큰구현시에 동작.
  useEffect(() => {
    if (getCookie("accessToken")) {
      setIsLogin(true);
    }
  }, []);

  //axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {isLogin ? (
          //main화면으로 돌아갈수가 없다..
          <Route
            path="/"
            element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
          >
            <Route path="/posts" element={<PostMain />} />
            <Route path="/posts/detail/:postId" element={<PostDetail />} />
            <Route path="/update/:postId" element={<Update />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/users/:usersId" element={<Mypage />} />
          </Route>
        ) : (
          <Route
            path="/"
            element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
          >
            <Route path="/" element={<Main />}></Route>
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
