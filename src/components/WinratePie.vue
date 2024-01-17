<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'

const props = defineProps({
  winrate: {
    type: Number,
    required: true,
  },
})

const pieData = computed(() => {
  return {
    datasets: [
      {
        borderColor: '#9f7736',
        label: 'My First Dataset',
        data: [props.winrate, 1 - props.winrate],
        backgroundColor: ['#dca54c', 'transparent'],
      },
    ],
  }
})

const config = {
  type: 'doughnut',
  maintainAspectRatio: false,
  cutout: 50,
}
</script>

<template>
  <Doughnut :options="config as any" :data="pieData as any" />
</template>

<style scoped></style>
