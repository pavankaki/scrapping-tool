// Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"


import App from "./react/app";
import store from "./redux/store";


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Router basename={process.env.REACT_APP_BASENAME}>
            <App />
        </Router>
    </Provider>
);

// Enable Hot Module Replacement
if (module.hot) {
    module.hot.accept()
}

// expose store in development mode
if (process.env.NODE_ENV === "development") {
    window['__REDUX_DEVTOOLS_EXTENSION__'] = window.parent['__REDUX_DEVTOOLS_EXTENSION__'];
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] = window.parent['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
    window.store = store
  }
    