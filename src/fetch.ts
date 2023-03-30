import { reactive, toRefs, Ref } from "vue";
import axios from 'axios'
import { Ticker } from "./frontType";

interface State<T> {
    isLoading: boolean,
    hasError: boolean,
    errorMessage: string,
    data: T | null
}

export async function useFetch<T>(url: string) {
  const state = reactive<State<T>>({
    isLoading: true,
    hasError: false,
    errorMessage: '',
    data: null
  })

  const fetchData = async() => {
    state.isLoading = true
    try{
        const response = await axios(url)
        state.data = await response.data
    } catch (error : unknown) {
        state.hasError = true
        state.errorMessage = url
    } finally {
        state.isLoading = false
    }
  }

  await fetchData()

  return {
    ...toRefs(state)
  }
}

export async function setTickerData(pairSelected: string, url: string, tickerisLoading:  Ref<boolean>, tickerData: Ref<Ticker | undefined>, tickerHasError: Ref<boolean>, tickerMessage : Ref<string> ) {
  tickerisLoading.value = true;
  tickerData.value = {};
  tickerHasError.value = false;
  const { data, hasError, errorMessage, isLoading } = await useFetch<Ticker>(
    url + pairSelected
  );
  if (data.value) {
    tickerData.value = data.value;
  }
  tickerHasError.value = hasError.value;
  tickerMessage.value = errorMessage.value;
  tickerisLoading.value = isLoading.value;
}
