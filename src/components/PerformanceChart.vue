<script setup lang="ts">
import { Line } from 'vue-chartjs'

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
