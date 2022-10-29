import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const [isLogin, setIsLogin] = useState(false);

function Router() {
  useEffect(() => {
    if (getCookie("myToken")) {
      setIsLogin(true);
    }
  }, []);

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
            <Route path="posts" element={<PostDetail />} />
            <Route path="posts/detail/:postId" element={<PostDetail />} />
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
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
