import * as Types from './types';
import { message } from "antd";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SCRAPER_API_BASE_URL;

export const fetchActualData = () => {

    return (dispatch) => {
        axios.get(`${BASE_URL}/scraper`)
            .then(response => {
                let scrapped_data = []
                response.data.map((item)=>{
                    scrapped_data.push(JSON.parse(item.replace(/\bNaN\b/g, "null")));
                })
                dispatch({
                    type: Types.TODAY_DATA,
                    payload: {
                        data: scrapped_data,
                    }
                });
            })
            .catch((error) => {
                    message.error("unable to fetch data from scrapper tool")
            });
    }
}


export const postScrapData = () => {

    return (dispatch) => {
        axios.post(`${BASE_URL}/scraper`)
            .then(response => {
                message.success("successfully posted data")
            })
            .catch((error) => {
                    message.error("Error occured while posting the data in  scraping tool")
            });
    }
}