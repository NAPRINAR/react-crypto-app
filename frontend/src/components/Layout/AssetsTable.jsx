import React from 'react';
import { Table } from 'antd';
import { useCrypto } from '../../context/crypto-context';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
];

const AssetsTable = () => {
  const { assets } = useCrypto();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
    date: a.date && new Date().toLocaleDateString(),
  }));
  return <Table pagination={false} columns={columns} dataSource={data} />;
};

export default AssetsTable;
