<script setup lang="ts">
import { Line } from 'vue-chartjs'
import type { PropType } from 'vue'

const props = defineProps({
  profitEvolution: {
    type: Array as PropType<number[]>,
    required: true,
  },
})

const chartData = {
  datasets: [
    {
      label: 'Number of trades',
      borderColor: '#9f7736',
      fill: {
        target: { value: 0 },
        above: '#dca54c', // Area will be red above the origin
        below: 'transparent', // And blue below the origin
      },
      data: props.profitEvolution?.map((val, i) => ({ x: `${i}`, y: val })),
      lineTension: 0.4,
    },
  ],
}

const chartOptions = {
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      align: 'end',
      onClick: null,
      labels: {
        boxWidth: 0,
      },
    },
  },
}
</script>

<template>
  <Line :options="chartOptions as any" :data="chartData as any" />
</template>

<style scoped></style>
