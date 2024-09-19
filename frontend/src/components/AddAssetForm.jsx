import { useRef, useState } from 'react';
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd';
import { useCrypto } from '../context/crypto-context';
import CoinInfo from './CoinInfo';

export default function AddAssetForm({ onClosed }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef('');

  const validateMessages = {
    required: '${label} is required',
    types: {
      number: '${label} is not valid number',
    },

    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const handleAmountChange = (e) => {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(e.target.value * price).toFixed(2),
    });
  };

  const handlePriceChange = (e) => {
    const amount = form.getFieldValue('amount');
    console.log(e);

    form.setFieldsValue({
      total: +(amount * e).toFixed(2),
    });
  };

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      data: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  };

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
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
    );
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClosed}>
            Close
          </Button>,
        ]}
      />
    );
  }
  return (
    <Form
      name="basic"
      form={form}
      validateMessages={validateMessages}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}>
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        placeholder="Enter coin amount"
        onChange={handleAmountChange}
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
