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
  <AlertError v-if="hasError" :message="errorMessage" />
  <div v-else-if="data.length" class="trades-result">
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
          <td>{{ trade.qty.toFixed(6) }}</td>
          <td>$ {{ trade.price.toFixed(6) }}</td>
          <td>{{ new Date(trade.time).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.trades-result {
  width: 100%;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0 20px;
  overflow-y: scroll;

  table {
    width: 100%;
    border-collapse: collapse;
    td,
    th {
      width: 25%;
      text-align: center;
      padding: 5px;
    }
    td {
      border-left: 1px solid var(--darkerBlue);
      border-right: 1px solid var(--darkerBlue);
    }
  }
}
</style>
