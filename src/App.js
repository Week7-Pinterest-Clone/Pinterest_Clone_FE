// import {Router} from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "./shared/cookie";

function App() {
  // return (
  //   <>
  //     <GlobalStyle />
  //     <Router />
  //   </>
  //   );
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  
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
      </Routes>
    </div>
  );
}

export default App;
