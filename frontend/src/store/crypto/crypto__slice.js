import { createSlice } from '@reduxjs/toolkit';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    assets: [],
    crypto: [],
    loading: false,
  },
});
