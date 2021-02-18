import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productDetailsReducer } from "./reducers/productReducers";
import { productListReducer } from "./reducers/productReducers";

const initialState = {};

//introduce reducers to store
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

// connect app to store (see contents of state in redux devtools)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
