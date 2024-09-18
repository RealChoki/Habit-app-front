import { ref } from 'vue'

const weekRange = ref<{ startDate: string | null; endDate: string | null }>({
  startDate: null,
  endDate: null
})

export const setWeekRange = (startDate: string, endDate: string) => {
  weekRange.value = { startDate, endDate }
}

export const getWeekRange = () => weekRange.value