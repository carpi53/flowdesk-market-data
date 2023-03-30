<script setup lang="ts">
import AlertError from "./AlertError.vue";
import TitleSection from "./TitleSection.vue";
const props = defineProps({
  hasError: Boolean,
  errorMessage: String,
  data: { required: true, type: Object },
  isLoading: Boolean,
  title: String
});
</script>

<template>
  <section class="container">
    <AlertError v-if="hasError" :message="errorMessage" />
    <TitleSection v-if="Object.keys(data).length" :title="title" />
    <div v-if="Object.keys(data).length" class="ticker-result">
      <div class="indicator">
        <h1>Price Change</h1>
        <p :class="{isRed: data.priceChangePercent < 0, isGreen: data.priceChangePercent >= 0}"><span v-if="data.priceChangePercent > 0">+</span>{{ parseFloat(data.priceChangePercent).toFixed(2) }}%</p>
      </div>
      <div class="indicator">
        <h1>Last Price</h1>
        <p>{{ parseFloat(data.lastPrice).toFixed(6) }}</p>
      </div>
      <div class="indicator">
        <h1>High Price</h1>
        <p>{{ parseFloat(data.highPrice).toFixed(6) }}</p>
      </div>
      <div class="indicator">
        <h1>Volume</h1>
        <p>{{ parseFloat(data.volume).toFixed(0) }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  margin-bottom: 20px;
  .ticker-result {
    width: 100%;
    margin-top: 20px;
    display: flex;
    gap: 5px;

    .indicator {
      width: 25%;
      background-color: white;
      border-radius: 10px;
      padding-top: 35px;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;

      p{
        margin-top: 35px;
        font-size: clamp(3rem, 3.6vw, 4rem);
      }

      .isRed {
        color: #cd2c2c;
      }
      .isGreen {
        color: #2b8b1f;
      }
    }
  }
}
</style>
