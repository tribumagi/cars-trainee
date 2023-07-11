import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import qs from 'qs';


const columns = [
  {
    title: 'ID',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.title} ${name.first} ${name.last}`,

  },
  {
    title: 'Марка/Модель',
    dataIndex: 'gender',
    sorter: true,
  },
  {
    title: 'Модификация',
    dataIndex: 'email',
  },
  {
    title: 'Комплектация',
    dataIndex: 'equipment',
  },
  {
    title: 'Стоимость',
    dataIndex: 'cost',
  },
  {
    title: 'Дата создания',
    dataIndex: 'date',
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
        .then((res) => res.json())
        .then(({ results }) => {
          setData(results);
          setLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: 200,
              // 200 is mock data, you should read it from server
              // total: data.totalCount,
            },
          });
        });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
      <Table
          columns={columns}
          rowKey={(record) => record.login.uuid}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          size={"small"}
      />
  );
};
export default App;