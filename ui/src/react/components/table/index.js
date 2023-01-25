import React from "react";
import { Table} from "antd";
import { useSelector } from "react-redux";
import './index.css';

const TableComponent = (props) => {
  
    const {todayData} = useSelector(({ cabmRoot }) => cabmRoot.table);

    const table_columns = [
      {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
      },
      {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '1h%',
        dataIndex: '1h%',
        key: '1h%',
      },
      {
        title: "24h%",
        dataIndex: '24h%',
        key: '24h%',
      },
      {
        title: '7d%',
        dataIndex: '7d%',
        key: '7d%',
      },
      {
        title: 'Market Cap',
        dataIndex: 'Market Cap',
        key: 'Market Cap',
      },
      {
        title: 'Volume(24h)',
        dataIndex: 'Volume(24h)',
        key: 'Volume(24h)',
      },
      {
        title: 'Circulating Supply',
        dataIndex: 'Circulating Supply',
        key: 'Circulating Supply',
      },
    ];
 
    return (
            <Table dataSource={todayData} 
                columns={table_columns} 
                />
    )
}

export default TableComponent;