import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";
// import Upload from "./pages/Upload";
// import PostDetail from "./pages/PostDetail";
import Header from "./components/Header";
import GlobalStyle from "./styles/GlobalStyle";
import { useEffect, useState } from "react";
// import Post from "./pages/Post";
import ButtonEle from "./elements/ButtonEle";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "./shared/cookie";
// import Update from "./pages/Update";
// import Mypage from "./pages/Mypage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  // 쿠키에 토큰있을 시 로그인 변수 상태 true
  useEffect(() => {
    if (getCookie("myToken")) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
          >
            <Route path="/main" element={<Main />}></Route>
        </Route>
        {/* {isLogin ? (
          <Route
            path="/"
            element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
          >
            <Route path="post" element={<Post />} />
            <Route path="post/postdetail/:postId" element={<PostDetail />} />
            <Route path="update/:postId" element={<Update />} />
            <Route path="upload" element={<Upload />} />
            <Route path="mypage" element={<Mypage />} />
          </Route>
        ) : (
          <Route
            path="/"
            element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
          >
            <Route path="/main" element={<Main />}></Route>
          </Route>
        )} */}
      </Routes>
    </div>
  );
}

export default App;
