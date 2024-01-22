const axios = require("axios");

const BASE_URL = "https://www.buda.com/api/v2";

const getMarketData = async (market_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/markets/${market_id}/ticker.json`
    );
    const data = response.data.ticker;

    let minAsk = null;
    let maxBid = null;
    console.log("data del ticker en especifico", maxBid);
    // Revisar si min_ask y max_bid existen y no son nulos
    if (data.min_ask && data.min_ask.length > 0) {
      minAsk = parseFloat(data.min_ask[0]);
    }

    if (data.max_bid && data.max_bid.length > 0) {
      maxBid = parseFloat(data.max_bid[0]);
    }

    return {
      market_id: data.market_id,
      min_ask: minAsk,
      max_bid: maxBid,
    };
  } catch (error) {
    console.log("Error al obtener los datos del mercado:", error);
    throw error;
  }
};

const getAllMarketData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tickers.json`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos de los mercados:", error);
    throw error;
  }
};

const getBookOrders = async (market_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/markets/${market_id}/order_book.json`
    );
    const orderBook = response.data;
    console.dir(orderBook, { depth: null }); // Esto imprimirá todo el contenido del order book
    return orderBook; // Contiene las listas de asks y bids
  } catch (error) {
    console.error("Error al obtener el libro de órdenes:", error);
    throw error;
  }
};

module.exports = { getMarketData, getAllMarketData, getBookOrders };
