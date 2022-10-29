//store/index.js
import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
  } from "@reduxjs/toolkit";
  import { postReducer } from "./postReducer";
  import logger from "redux-logger";
  
  const reducer = combineReducers({ postReducer: postReducer.reducer });
  
  export default configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      logger,
    ],
  });
  