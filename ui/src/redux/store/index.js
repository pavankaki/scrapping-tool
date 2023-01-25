import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import tableReducer from "../components/table/reducers";

const cabmRoot = combineReducers({
  table: tableReducer
});

const rootReducer = combineReducers({ cabmRoot: cabmRoot });

const resetEnhancer = rootReducer => (state, action) => {
  if (action.type !== "LOGOUT") return rootReducer(state, action);
  window.localStorage.clear();
  window.location.reload();
};

const store = createStore(resetEnhancer(rootReducer), composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

export default store;
