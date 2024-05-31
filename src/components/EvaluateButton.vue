    <template>
  <div class="d-flex flex-column align-items-center m-0" v-for="option in options" :key="option.id">
    <div class="Evaluate-button" @click="navigateToView(option.route)">
      <h1 class="small-title">{{ option.name }}</h1>
    </div>
    <p class="desc">{{ option.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface EvaluateOption {
  id: number
  name: string
  description: string
  route: string
}

const options = ref<EvaluateOption[]>([
  {
    id: 1,
    name: 'With a Yes or No',
    description: 'If you just want to record whether you succeed with an activity or not',
    route: 'YesNoView'
  },
  {
    id: 2,
    name: 'With a numeric value',
    description: 'If you want to establish a value as a daily goal or limit for the habit',
    route: 'NumericValueView'
  },
  {
    id: 3,
    name: 'With a timer',
    description: 'If you want to establish a time value as a daily goal or limit for the habit',
    route: 'TimerView'
  }
])

const navigateToView = (route: string): void => {
  router.push({ name: route })
}
</script>



<style>
.Evaluate-button {
  width: 300px;
  height: 56px;
  background-color: #232323;
  border-radius: 6px;
  box-shadow: 0px 6px 0px #1a1a1b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.small-title {
  color: #fefff7;
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 0px;
}

.desc {
  font-size: 9px;
  color: #c5c5c5;
  margin-top: 8px;
  width: 230px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
