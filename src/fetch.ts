import { reactive, toRefs } from "vue";
import axios from 'axios'

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
        const typedError = error as Error
        state.hasError = true
        state.errorMessage = typedError.message
    } finally {
        state.isLoading = false
    }
  }

  await fetchData()

  return {
    ...toRefs(state)
  }
}
