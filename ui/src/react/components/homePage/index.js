import React, {useEffect} from "react";
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import TableComponent from "../table/index.js";
import { useDispatch} from "react-redux";
import "antd/dist/antd.min.css";
import {fetchActualData, postScrapData} from "../../../redux/components/table/actions";
import './index.css'

const HomePage = () => {
    const dispatch = useDispatch();
    
    setInterval(() => {
        dispatch(fetchActualData())
      }, 3000)
    
    setInterval(() => {
        dispatch(postScrapData())
    }, 5000)
    
    useEffect(()=>{
       dispatch(postScrapData())
       dispatch(fetchActualData())
    }, [])

    return (
        <div>
            <TableComponent />
        </div>
    );
}


export default withRouter(HomePage);