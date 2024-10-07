import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddHabitView from '@/views/adjust_habits/AddHabitView.vue'
import YesNoView from '@/views/adjust_habits/YesNoView.vue'
import NumericValueView from '@/views/adjust_habits/NumericValueView.vue'
import TimerView from '@/views/adjust_habits/TimerView.vue'
import FrequencyView from '@/views/adjust_habits/FrequencyView.vue'
import TimeFrameView from '@/views/adjust_habits/TimeFrameView.vue'
import DeleteHabitsView from '@/views/adjust_habits/DeleteHabitsView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const today = new Date()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        const formattedDate = `${today.getFullYear()}-${month}-${day}`
        return { name: 'HomeView', params: { date: formattedDate } }
      }
    },
    {
      path: '/home/:date',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        const today = new Date()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        const formattedDate = `${today.getFullYear()}-${month}-${day}`
        return { name: 'HomeView', params: { date: formattedDate } }
      }
    },
    {
      path: '/addhabit',
      name: 'AddHabitView',
      component: AddHabitView
    },
    {
      path: '/addhabit/yesno',
      name: 'YesNoView',
      component: YesNoView
    },
    {
      path: '/addhabit/numericvalue',
      name: 'NumericValueView',
      component: NumericValueView
    },
    {
      path: '/addhabit/timer',
      name: 'TimerView',
      component: TimerView
    },
    {
      path: '/addhabit/yesno/frequency',
      name: 'YesNoFrequencyView',
      component: FrequencyView
    },
    {
      path: '/addhabit/yesno/frequency/timeframe',
      name: 'YesNoTimeFrameView',
      component: TimeFrameView
    },
    {
      path: '/addhabit/numericvalue/frequency',
      name: 'NumericValueFrequencyView',
      component: FrequencyView
    },
    {
      path: '/addhabit/numericvalue/frequency/timeframe',
      name: 'NumericValueTimeFrameView',
      component: TimeFrameView
    },
    {
      path: '/addhabit/timer/frequency',
      name: 'TimerFrequencyView',
      component: FrequencyView
    },
    {
      path: '/addhabit/timer/frequency/timeframe',
      name: 'TimerTimeFrameView',
      component: TimeFrameView
    },
    {
      path: '/deletehabits/:date',
      name: 'DeleteHabitsView',
      component: DeleteHabitsView,
      props: true
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView,
    },
  ]
})

export default router