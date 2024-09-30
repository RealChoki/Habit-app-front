import { ref } from 'vue'

const weekRange = ref<{ startDate: string | null; endDate: string | null }>({
  startDate: null,
  endDate: null
})

const weekOffset = ref<number>(0)

export const setWeekRange = (startDate: string, endDate: string) => {
  weekRange.value = { startDate, endDate }
}

export const getWeekRange = () => weekRange.value

export const setWeekOffset = (offset: number) => {
  weekOffset.value = offset
}

export const getWeekOffset = () => weekOffset.value