const express = require('express');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
app.use(express.json());

const API_KEY = process.env.BINANCE_API_KEY || 'TU_API_KEY';
const API_SECRET = process.env.BINANCE_API_SECRET || 'TU_API_SECRET';

app.post('/', async (req, res) => {
  try {
    const { symbol = 'BTCUSDT', side = 'BUY', qty = 0.001 } = req.body;
    const timestamp = Date.now();
    const queryString = `symbol=${symbol}&side=${side.toUpperCase()}&type=MARKET&quantity=${qty}&timestamp=${timestamp}`;

    const signature = crypto
      .createHmac('sha256', API_SECRET)
      .update(queryString)
      .digest('hex');

    const response = await axios.post(
      `https://testnet.binancefuture.com/fapi/v1/order?${queryString}&signature=${signature}`,
      {},
      { headers: { 'X-MBX-APIKEY': API_KEY } }
    );

    res.json({ status: 'success', binance_result: response.data });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.response ? error.response.data : error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
