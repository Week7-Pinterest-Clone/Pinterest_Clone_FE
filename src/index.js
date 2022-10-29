import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./redux/store/configStore.jsx";
//import axios from "axios";

//axios.defaults.baseURL = "http://sparta-jsb.shop/";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
reportWebVitals();
