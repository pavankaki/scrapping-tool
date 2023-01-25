import * as Types from "../actions/types";


const initialState = {
    todayData: [],
    yesterdayData: [],
    liveSwitch: true
};


const tableReducer = (state = initialState, action) => {
    switch ( action.type) {
        case Types.TODAY_DATA: {
            return {
                ...state,
                todayData: action.payload.data,
            }
        }
        case Types.YESTERDAY_DATA: {
            return {
                ...state,
                yesterdayData: action.payload.data,
            }
        }
        case Types.LIVE_SWITCH: {
            return {
                ...state,
                liveSwitch: action.payload,
            }
        }
        default:
            return state;
    }
}

export default tableReducer;