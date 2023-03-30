<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Exchange, SelectOptions } from "../frontType";
import { useFetch } from "../fetch";
import { ModelSelect } from "vue-search-select";
import AlertError from "../components/AlertError.vue";
import Loader from "./Loader.vue";
const allPairs = ref<SelectOptions[]>([]);
const isError = ref(false);
const pairSelected = ref("");
const isLoadingPair = ref(false);
const errorPairMessage = ref("");
const errorFormInput = ref("");
const emit = defineEmits(["response"]);

onMounted(async () => {
  // fetch the endpoint exchangeInfo in order to get the currency pairs
  const { data, hasError, errorMessage, isLoading } = await useFetch<Exchange>(
    "https://api.binance.com/api/v3/exchangeInfo"
  );
  if (!hasError.value) {
    data.value?.symbols.forEach((element) => {
      allPairs.value.push({ value: element.symbol, text: element.symbol });
    });
  }
  isError.value = hasError.value;
  errorPairMessage.value = errorMessage.value;
  isLoadingPair.value = isLoading.value;
});

watch(pairSelected, async (newPair) => {
  if (newPair) {
    errorFormInput.value = "";
  }
})

function onSubmit() {
  if (!pairSelected.value) {
    errorFormInput.value = "empty input"
  } else {
    errorFormInput.value = ""
    emit("response", pairSelected.value);
  }
}
</script>

<template>
  <div class="form-container">
    <AlertError v-if="isError" :message="errorPairMessage" />
    <div v-else-if="allPairs.length != 0">
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <label for="pair">Select the currency pair: </label>
          <ModelSelect
            :options="allPairs"
            placeholder="Search"
            name="pair"
            id="pair"
            v-model="pairSelected"
            :class="{ redInput: errorFormInput }"
          />
          <p class="error-msg" v-if="errorFormInput">{{ errorFormInput }}</p>
        </div>
        <button class="btn-primary btn-summary">Submit</button>
      </form>
    </div>
    <Loader v-else />
  </div>
</template>

<style lang="scss">
.form-container {
  width: 100%;
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  margin: 15px 0 15px;

  form {
    display: flex;
    align-items: center;
    gap: 1vw;

    .input-group {
      width: 50%;
      display: flex;
      align-items: center;
      position: relative;

      label {
        width: 60%;
      }

      input {
        width: 40%;
      }

      .error-msg {
        position: absolute;
        top: -20px;
        right: 0px;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #cd2c2c;;
      }

      .redInput {
        border: 2px solid #cd2c2c;
      }

      .ui.fluid.search.selection.dropdown.visible,
      .ui.selection.dropdown .menu.visible {
        border: 1px solid var(--darkerBlue) !important;
      }
    }
  }
}
</style>
