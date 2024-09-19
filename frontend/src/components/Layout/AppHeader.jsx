import React, { useState, useEffect } from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AppHeader = () => {
  const { crypto } = useCrypto();
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  };

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => {
      document.removeEventListener('keypress', keypress);
    };
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add asset
      </Button>

      <Modal open={modal} footer={null} onCancel={() => setModal(false)}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        destroyOnClose
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}>
        <AddAssetForm onClosed={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
