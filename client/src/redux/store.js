import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducers";
console.log("i am in store");
// (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const reduxDevTool =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk.withExtraArgument()))
    : compose(applyMiddleware(thunk.withExtraArgument()));
const store = createStore(rootReducer, reduxDevTool);

export default store;
