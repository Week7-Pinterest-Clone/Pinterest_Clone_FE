// //import GlobalStyle from "../styles/GlobalStyle";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Main from "../pages/main";
// import Header from "../components/Header";
// import { CookiesProvider } from "react-cookie";
// import { getCookie } from "./cookie";

// function Router() {
//     const [isLogin, setIsLogin] = useState(false);
//     const dispatch = useDispatch();

//     // 쿠키에 토큰있을 시 로그인 변수 상태 true
//     useEffect(() => {
//         if (getCookie("myToken")) {
//         setIsLogin(true);
//         }
//         }, 
//     []);

//     return (
//         <CookiesProvider>
//         <BrowserRouter>    
//             {/* <GlobalStyle /> */}
//             <Routes>
//                 <Route
//                 path="/"
//                 element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
//                 >
//                 <Route path="/main" element={<Main />}></Route>
//                 </Route>
//             {/* {isLogin ? (
//             <Route
//                 path="/"
//                 element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
//             >
//                 <Route path="post" element={<Post />} />
//                 <Route path="post/postdetail/:postId" element={<PostDetail />} />
//                 <Route path="update/:postId" element={<Update />} />
//                 <Route path="upload" element={<Upload />} />
//                 <Route path="mypage" element={<Mypage />} />
//             </Route>
//             ) : (
//             <Route
//                 path="/"
//                 element={<Header isLogin={isLogin} setIsLogin={setIsLogin} />}
//             >
//                 <Route path="/main" element={<Main />}></Route>
//             </Route>
//             )} */}
//             </Routes>
//         </BrowserRouter>
//         </CookiesProvider>
//     );    
// }

// export default Router;