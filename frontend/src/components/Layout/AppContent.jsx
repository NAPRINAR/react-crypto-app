import React from 'react';
import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from './PortfolioChart';
import AssetsTable from './AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: '91.5vh',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

const AppContent = () => {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title style={{ textAlign: 'left', color: '#fff' }} level={3}>
        Portfolio:
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, val) => {
            return (acc += val);
          }, 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
};

export default AppContent;
