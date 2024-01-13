<script setup lang="ts">
import dayjs from 'dayjs'
import { Line } from 'vue-chartjs'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Legend, PointElement, Filler)
const lastUpdatedStr = dayjs('1999-01-01').fromNow()

const chartData = {
  datasets: [
    {
      label: 'Number of trades',
      borderColor: '#9f7736',
      backgroundColor: '#dca54c',
      fill: {
        target: { value: 0 },
        above: '#dca54c', // Area will be red above the origin
        below: 'transparent', // And blue below the origin
      },
      data: [
        { x: '1', y: 40 },
        { x: '2', y: 80 },
        { x: '3', y: 20 },
        { x: '4', y: -40 },
        { x: '5', y: -60 },
        { x: '6', y: 20 },
        { x: '7', y: 100 },
        { x: '8', y: 110 },
        { x: '9', y: 65 },
        { x: '10', y: 118 },
        { x: '11', y: 125 },
        { x: '12', y: 116 },
        { x: '13', y: 105 },
        { x: '14', y: 93 },
        { x: '15', y: 45 },
        { x: '16', y: 33 },
        { x: '17', y: -13 },
        { x: '18', y: -28 },
        { x: '19', y: -5 },
        { x: '20', y: -4 },
        { x: '21', y: -38 },
      ],
    },
  ],
}

const chartOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      align: 'end',
      onClick: () => {},
      labels: {
        boxWidth: 0,
      },
    },
  },
}
</script>

<template>
  <div class="w-full h-full flex flex-col max-w-screen-lg p-3 lg:px-0">
    <header class="navbar p-1">
      <div class="flex-1">
        <h1 class="text-xl font-bold">Xav's Vitrine</h1>
      </div>

      <div class="flex-none">
        <span class="text-xs">Last updated {{ lastUpdatedStr }}</span>
      </div>
    </header>

    <main class="flex flex-col flex-1">
      <div class="card w-full basis-2/5 grow-0 overflow-hidden">
        <div class="card-body h-full p-4">
          <h2 class="card-title text-lg">Performance</h2>

          <div class="flex-1">
            <Line :options="chartOptions" :data="chartData" />
          </div>
        </div>
      </div>

      <div role="tablist" class="tabs tabs-lifted flex-1 items-start md:hidden">
        <input
          type="radio"
          name="overall_tab"
          role="tab"
          class="tab text-xs sm:text-base"
          aria-label="Overall Evaluation"
          checked
        />

        <input
          type="radio"
          name="monthly_tab"
          role="tab"
          class="tab text-xs sm:text-base"
          aria-label="Monthly Stats"
        />

        <input
          type="radio"
          name="weekly_tab"
          role="tab"
          class="tab text-xs sm:text-base"
          aria-label="Weekly Stats"
        />
      </div>

      <div class="flex-1 justify-between hidden md:flex">
        <div class="card basis-1/4 h-full">
          <div class="card-body h-full p-4">
            <h2 class="card-title text-lg">Overall Evaluation</h2>
          </div>
        </div>

        <div class="card basis-1/4 h-full">
          <div class="card-body h-full p-4">
            <h2 class="card-title text-lg">Monthly Stats</h2>
          </div>
        </div>

        <div class="card basis-1/4 h-full">
          <div class="card-body h-full p-4">
            <h2 class="card-title text-lg">Weekly Stats</h2>
          </div>
        </div>
      </div>

      <footer class="footer items-center justify-end p-1">
        <span class="block text-xs">Generated with ♥ using <a class="link">vitrine</a></span>
      </footer>
    </main>
  </div>
</template>
