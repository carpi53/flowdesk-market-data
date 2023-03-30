<script setup lang="ts">
import { Trade } from "../frontType";
import AlertError from "./AlertError.vue";
import Loader from "./Loader.vue";
const props = defineProps({
  hasError: Boolean,
  errorMessage: String,
  data: { required: true, type: Array<Trade> },
  isLoading: Boolean,
});
</script>

<template>
  <Loader v-if="isLoading" />
  <div v-if="data.length">
    <div class="trades-result">
      <AlertError v-if="hasError" :message="errorMessage" />
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trade in data" :key="trade.id">
              <td>{{ trade.id }}</td>
              <td>{{ trade.qty }}</td>
              <td>$ {{ (typeof trade.price === 'number') ? trade.price.toFixed(6) : trade.price }}</td>
              <td>{{ new Date(trade.time).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trades-result {
  width: 100%;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  overflow-y: scroll;

  table {
    width: 100%;
    border-collapse: collapse;
    td {
      width: 25%;
      text-align: center;
      border-left: 1px solid var(--darkerBlue);
      border-right: 1px solid var(--darkerBlue);
    }
  }
}
</style>
