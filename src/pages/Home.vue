<script setup lang="ts">
import { ref } from "vue";
import { Trade, Ticker, Sorting } from "../frontType";
import { useFetch, setTickerData } from "../fetch";
import TitleSection from "../components/TitleSection.vue";
import CurrencyPairSelector from "../components/CurrencyPairSelector.vue";
import RecentTrade from "../components/RecentTrade.vue";
import TradeFilter from "../components/TradeFilter.vue";
import TickerRender from "../components/TickerRender.vue";

//init the ticker reactive variables
const tickerIsLoading = ref(false);
const tickerData = ref<Ticker>({});
const tickerHasError = ref(false);
const tickerMessage = ref("");

//init the ticker 24h reactive variables
const ticker24IsLoading = ref(false);
const ticker24Data = ref<Ticker>({});
const ticker24HasError = ref(false);
const ticker24Message = ref("");

// get the market Data, it's emited by the component CurrencyPairSelector on submit
async function getData(pairSelected: string) {
  // set ticker data
  setTickerData(
    pairSelected,
    "https://api.binance.com/api/v3/ticker?symbol=",
    tickerIsLoading,
    tickerData,
    tickerHasError,
    tickerMessage
  );
  // set the ticker 24h data
  setTickerData(
    pairSelected,
    "https://api.binance.com/api/v3/ticker/24hr?symbol=",
    ticker24IsLoading,
    ticker24Data,
    ticker24HasError,
    ticker24Message
  );
  getRecentTradeData(pairSelected);
}

//init recent trade variable
const tradeIsLoading = ref(false);
const tradesData = ref<Trade[]>([]);
const tradeHasError = ref(false);
const tradeErrorMessage = ref("");

// fetch the recent trades
async function getRecentTradeData(pairSelected: string) {
  tradeIsLoading.value = true;
  tradesData.value = [];
  const { data, hasError, errorMessage, isLoading } = await useFetch<Trade[]>(
    "https://api.binance.com/api/v3/trades?symbol=" + pairSelected
  );
  if (data.value) {
    data.value.forEach((element) => {
      tradesData.value.push({
        id: element.id,
        price:
          typeof element.price != "number"
            ? parseFloat(element.price)
            : element.price,
        qty:
          typeof element.qty != "number"
            ? parseFloat(element.qty)
            : element.qty,
        time: element.time,
      });
    });
  }
  tradeHasError.value = hasError.value;
  tradeErrorMessage.value = errorMessage.value;
  tradeIsLoading.value = isLoading.value;
  sortingTrades("Date");
}

const sort = ref<Sorting>("Date");

// sorting the recent trade, it's emited by the component TradeFilter
function sortingTrades(sort: string): void {
  switch (sort) {
    case "Quantity":
      tradesData.value.sort(function (a: Trade, b: Trade) {
        return b.qty - a.qty;
      });
      break;
    case "Price":
      tradesData.value.sort(function (a: Trade, b: Trade) {
        return b.price - a.price;
      });
      break;
    case "Date":
      tradesData.value.sort(function (a: Trade, b: Trade) {
        return b.time - a.time;
      });
      break;
  }
}
</script>

<template>
  <main>
    <TitleSection title="Flowdesk - Check the market data" />
    <CurrencyPairSelector @response="(pairSelected) => getData(pairSelected)" />
    <TickerRender
      :data="tickerData"
      :hasError="tickerHasError"
      :errorMessage="tickerMessage"
      :isLoading="tickerIsLoading"
      title="Ticker"
    />
    <TickerRender
      :data="ticker24Data"
      :hasError="ticker24HasError"
      :errorMessage="ticker24Message"
      :isLoading="ticker24IsLoading"
      title="24Hr Ticker"
    />
    <TradeFilter
      v-if="tradesData.length"
      @response="(sortSelected) => sortingTrades(sortSelected)"
    />
    <RecentTrade
      :data="tradesData"
      :hasError="tradeHasError"
      :errorMessage="tradeErrorMessage"
      :isLoading="tradeIsLoading"
    />
  </main>
</template>

<style lang="scss">
main {
  max-width: 1150px;
  margin: 0 auto;
  padding: 64px 2vw 0px;
}
</style>
