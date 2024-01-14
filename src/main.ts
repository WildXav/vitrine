import './styles.scss'
import { createApp } from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from 'chart.js'

dayjs.extend(relativeTime)

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  Title,
  Legend,
  PointElement,
  Filler,
)

createApp(App).mount('#app')
