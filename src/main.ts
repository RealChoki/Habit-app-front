// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

// import vuetify from './plugins/vuetify'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(router)
// app.use(vuetify)
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')