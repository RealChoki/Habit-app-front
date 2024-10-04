import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddHabitView from '@/views/AddHabitView.vue'
import YesNoView from '@/views/YesNoView.vue'
import NumericValueView from '@/views/NumericValueView.vue'
import TimerView from '@/views/TimerView.vue'
import FrequencyView from '../views/FrequencyView.vue'
import TimeFrameView from '../views/TimeFrameView.vue'
import DeleteHabitsView from '../views/DeleteHabitsView.vue'

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
      path: '/yesno',
      name: 'YesNoView',
      component: YesNoView
    },
    {
      path: '/numericvalue',
      name: 'NumericValueView',
      component: NumericValueView
    },
    {
      path: '/timer',
      name: 'TimerView',
      component: TimerView
    },
    {
      path: '/frequency',
      name: 'FrequencyView',
      component: FrequencyView
    },
    {
      path: '/timeframe',
      name: 'TimeFrameView',
      component: TimeFrameView
    },
    {
      path: '/deletehabits/:date',
      name: 'DeleteHabitsView',
      component: DeleteHabitsView,
      props: true
    }
  ]
})

export default router
