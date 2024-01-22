const budaService = require("../services/budaServices");

// Ruta para obtener el spread de un mercado específico
/* exports.getMarketSpread = async (req, res) => {
  try {
    const marketId = req.params.marketId;
    console.log("VER QUE PASA ACÁ:", marketId);
    const orderBook = await budaService.getBookOrders(marketId);
    console.log("ESTE ES EL ORDER BOOK:", orderBook);

    if (
      !orderBook ||
      !orderBook.asks ||
      !orderBook.bids ||
      orderBook.asks.length === 0 ||
      orderBook.bids.length === 0
    ) {
      return res.json({ marketId, spread: null });
    }

    const lowestAsk = parseFloat(orderBook.asks[0][0]);
    const highestBid = parseFloat(orderBook.bids[0][0]);
    console.log("Lowest ask:", lowestAsk);
    console.log("Highest bid:", highestBid);

    if (isNaN(lowestAsk) || isNaN(highestBid)) {
      return res.json({ marketId, spread: null });
    }

    const spread = lowestAsk - highestBid;
    res.json({ marketId, spread });
  } catch (error) {
    console.error("Error en getMarketSpread:", error);
    res.status(500).send("Error al procesar la solicitud");
  }
}; */
// Ruta para obtener los tickers de todos los mercados

/* exports.getMarketSpread = async (req, res) => {
  try {
    const marketId = req.params.marketId;
    const orderBook = await budaService.getBookOrders(marketId);

    if (
      !orderBook ||
      !orderBook.asks ||
      !orderBook.bids ||
      orderBook.asks.length === 0 ||
      orderBook.bids.length === 0
    ) {
      return res.json({ marketId, spread: null });
    }

    // Imprimir los primeros elementos de asks y bids
    console.log("First ask:", orderBook.asks[0]);
    console.log("First bid:", orderBook.bids[0]);

    const lowestAsk = parseFloat(orderBook.asks[0][0]);
    const highestBid = parseFloat(orderBook.bids[0][0]);

    // Imprimir los valores convertidos para verificar
    console.log("Lowest ask (number):", lowestAsk);
    console.log("Highest bid (number):", highestBid);

    if (isNaN(lowestAsk) || isNaN(highestBid)) {
      return res.json({ marketId, spread: null });
    }

    const spread = lowestAsk - highestBid;
    res.json({ marketId, spread });
  } catch (error) {
    console.error("Error en getMarketSpread:", error);
    res.status(500).send("Error al procesar la solicitud");
  }
}; */

exports.getMarketSpread = async (req, res) => {
  try {
    const marketId = req.params.marketId;
    const orderBook = await budaService.getBookOrders(marketId);
    console.log("ACÁ ESTOY", orderBook);
    // Aquí puedes devolver una respuesta básica para probar que la función se ejecuta correctamente.

    if (orderBook.asks && orderBook.asks.length > 0) {
      lowestAsk = orderBook.asks;
      console.log("Lowest ask price:", lowestAsk);
    } else {
      console.log("No asks available");
    }

    res.json({ message: "Función ejecutada correctamente" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

exports.getAllMarketSpreads = async (req, res) => {
  try {
    const allMarketsData = await budaService.getAllMarketData();
    console.log("All Markets Data:", allMarketsData);

    const spreads = await Promise.all(
      allMarketsData.tickers.map(async (ticker) => {
        console.log("Procesando mercado:", ticker.market_id);
        const marketData = await budaService.getMarketData(ticker.market_id);
        console.log(`Datos del mercado ${ticker.market_id}:`, marketData);

        // Ajuste: Verificar si marketData y marketData.ticker son no nulos
        if (!marketData || !marketData.ticker) {
          console.log(
            `Datos no disponibles para el mercado ${ticker.market_id}`
          );
          return { market_id: ticker.market_id, spread: null };
        }

        const minAsk = marketData.ticker.min_ask
          ? marketData.ticker.min_ask[0]
          : null;
        const maxBid = marketData.ticker.max_bid
          ? marketData.ticker.max_bid[0]
          : null;
        console.log(
          `minAsk: ${minAsk}, maxBid: ${maxBid} para el mercado ${ticker.market_id}`
        );

        // Ajuste: Permitir spreads de cero
        if (
          minAsk === null ||
          maxBid === null ||
          isNaN(minAsk) ||
          isNaN(maxBid)
        ) {
          console.log(
            `Uno de los valores es nulo o no es un número para el mercado ${ticker.market_id}`
          );
          return { market_id: ticker.market_id, spread: null };
        }
        const spread = parseFloat(minAsk) - parseFloat(maxBid);
        console.log(`Spread calculado para ${ticker.market_id}:`, spread);

        return { market_id: ticker.market_id, spread };
      })
    );

    res.json(spreads);
  } catch (error) {
    console.error("Error en getAllMarketSpreads:", error);
    res.status(500).send("Error al procesar la solicitud de tickers");
  }
};

exports.setAlertSpread = (req, res) => {
  // Lógica para configurar un nuevo spread de alerta
};

exports.getAlertSpread = (req, res) => {
  // Lógica para consultar el spread de alerta
};
