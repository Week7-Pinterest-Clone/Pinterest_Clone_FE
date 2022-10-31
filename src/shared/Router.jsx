import { useState } from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

import Mypage from "../pages/Mypage";
import PostDetail from "../pages/PostDetail";
import PostMain from "../pages/PostMain";
import Update from "../pages/Update";
import Upload from "../pages/Upload";
import GlobalStyle from "../styles/GlobalStyle";
import Main from "../pages/Main";

function Router() {
  const [isLogin, setIsLogin] = useState(false);

  //로그인토큰구현시에 동작.
  // useEffect(() => {
  //   if (getCookie("myToken")) {
  //     setIsLogin(true);
  //   }
  // }, []);

  //페이지설정필요함.
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {isLogin ? (
          <Route
            path="/"
            element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
          >
            <Route path="/posts" element={<PostMain />} />
            <Route path="/posts/detail/:postId" element={<PostDetail />} />
            <Route path="/update/:postId" element={<Update />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/mypage" element={<Mypage />} />
          </Route>
        ) : (
          <Route
            path="/"
            element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
          >
            <Route path="/main" element={<Main />}></Route>
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
