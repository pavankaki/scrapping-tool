import axios from "axios"
import Auth from "@aws-amplify/auth";
import * as homeActionTypes from "../components/home/actions/types";
import * as headerActions from "../components/header/actions";
import _ from "lodash"

const store = require("../store")
const BASE_URL = process.env.REACT_APP_SCRAPER_API_BASE_URL
const MAX_AXIOS_FAIL_COUNTER = process.env.REACT_APP_MAX_AXIOS_FAIL_COUNTER
let PENDING_GET_REQUESTS = []


// Axios request interceptor
axios.interceptors.request.use(function (config) {
    let requiresLogin = store.default.getState().cabmRoot.header.requiresLogin;
    // if user needs to login to application again or request is GET and have any pending instance, then cancel all axios requests
    if (requiresLogin || (config.method === "get" && _.find(PENDING_GET_REQUESTS, { "url": config.url, "params": config.params }))) {
        return {
            ...config,
            cancelToken: new axios.CancelToken((cancel) => cancel("Cancel request as application is timeout or duplicate request."))
        };
    }
    if (config.method === "get") {
        PENDING_GET_REQUESTS.push({ "url": config.url, "params": config.params })
    }
    // add cognito authorization headers to all api requests
    return Auth.currentSession().then(data => {
        config.headers.Authorization = `Bearer ${data.accessToken.jwtToken}`;
        return config;
    }).catch(error => {
        store.default.dispatch(headerActions.updateRequiesLogin(true))
        return Promise.reject(error);
    });
}, function (error) {
    return Promise.reject(error);
});

// Axios response interceptor
axios.interceptors.response.use(function (response) {
    let requiresLogin = store.default.getState().cabmRoot.header.requiresLogin;
    // if user need to login to the application again
    if (requiresLogin) {
        return new Promise(() => {});
    }
    // remove call from pending calls, if GET call
    if (_.has(response.config, "method") && response.config.method === "get") {
        _.remove(PENDING_GET_REQUESTS, { "url": response.config.url, "params": response.config.params })
    }
    // Reset Axios fail counter in the store if axios call succeed
    store.default.dispatch({ type: homeActionTypes.UPDATE_AXIOS_FAIL_COUNT, payload: 0 })
    return response;
}, function (error) {
    let requiresLogin = store.default.getState().cabmRoot.header.requiresLogin;
    // if user need to login to the application again
    if (requiresLogin) {
        return new Promise(() => {});
    }
    // remove call from pending calls, if GET call
    if (_.has(error.config, "method") && error.config.method === "get") {
        _.remove(PENDING_GET_REQUESTS, { "url": error.config.url, "params": error.config.params })
    }
    // Capture errors only from BASE_URL domain
    if (_.has(error.config, "url") && _.startsWith(error.config.url, BASE_URL)) {
        let axios_fail_count = _.cloneDeep(store.default.getState().dapsRoot.app.axios_fail_count)
        // update axios fail counter by 1 in the store
        store.default.dispatch({ type: homeActionTypes.UPDATE_AXIOS_FAIL_COUNT, payload: axios_fail_count + 1 })
        // Set error to true if max axios fail retries exceed
        if (axios_fail_count >= MAX_AXIOS_FAIL_COUNTER) {
            store.default.dispatch({ type: homeActionTypes.SET_ERROR_TRUE, payload: { errorType: "500", errorMessage: "Sorry, the backend seems to be temporarily unavailable. If the problem persists, contact the admins :-)" } })
        }
    }
    return Promise.reject(error);
});

export default axios;
