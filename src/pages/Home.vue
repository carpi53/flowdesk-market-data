<script setup lang="ts">
import { ref } from "vue";
import { Trade, Ticker, Sorting } from "../frontType";
import { useFetch } from "../fetch";
import TitleSection from "../components/TitleSection.vue";
import CurrencyPairSelector from "../components/CurrencyPairSelector.vue";
import RecentTrade from "../components/RecentTrade.vue";
import TradeFilter from "../components/TradeFilter.vue";
import TickerRender from "../components/TickerRender.vue";

async function getData(pairSelected: string) {
  getTicker24hData(pairSelected);
  getRecentTradeData(pairSelected);
}

//init the ticker 24h variables
const ticker24IsLoading = ref(false);
const ticker24Data = ref<Ticker | undefined>();
const ticker24HasError = ref(false);
const ticker24Message = ref("");
// fetch the ticker 24h data
async function getTicker24hData(pairSelected: string) {
  ticker24IsLoading.value = true;
  ticker24Data.value = undefined;
  const { data, hasError, errorMessage, isLoading } = await useFetch<Ticker>(
    "https://api.binance.com/api/v3/ticker/24hr?symbol=" + pairSelected
  );
  if (data.value) {
    ticker24Data.value = data.value;
  }
  ticker24HasError.value = hasError.value;
  ticker24Message.value = errorMessage.value;
  ticker24IsLoading.value = isLoading.value;
  console.log(ticker24Data.value);
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
    tradesData.value = data.value;
  }
  tradeHasError.value = hasError.value;
  tradeErrorMessage.value = errorMessage.value;
  tradeIsLoading.value = isLoading.value;
  sortingTrades("Date");
}

const sort = ref<Sorting>("Date");

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
    <div class="global-container">
      <TitleSection title="Flowdesk - Check the market data" />
      <CurrencyPairSelector
        @response="(pairSelected) => getData(pairSelected)"
      />
      <TickerRender v-if="ticker24Data != undefined"
        :data="ticker24Data"
        :hasError="ticker24HasError"
        :errorMessage="ticker24Message"
        :isLoading="ticker24IsLoading"
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
    </div>
  </main>
</template>

<style lang="scss">
main {
  max-width: 1150px;
  margin: 0 auto;
  padding: 64px 2vw 0px;

  .global-container {
    border-radius: 10px;
    padding: 20px;
  }
}
</style>
