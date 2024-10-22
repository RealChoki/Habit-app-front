// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

export default createVuetify({
  components: {
    VNumberInput,
  },
})