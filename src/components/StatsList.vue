<script setup lang="ts">
import type { PeriodData } from '@/interfaces/period-data'
import type { PropType } from 'vue'

interface StatsEntry {
  prop: keyof PeriodData
  label: string
}

defineProps({
  data: {
    type: Object as PropType<PeriodData>,
    required: true,
  },
})

const statsEntries: StatsEntry[] = [
  {
    prop: 'expectancy',
    label: 'Expectancy',
  },
  {
    prop: 'longPnl',
    label: 'Long P&L',
  },
  {
    prop: 'shortPnl',
    label: 'Short P&L',
  },
  {
    prop: 'avgWin',
    label: 'Average Win',
  },
  {
    prop: 'avgLoss',
    label: 'Average Loss',
  },
]
</script>

<template>
  <div class="flex flex-col gap-y-3 items-center">
    <div
      v-for="entry in statsEntries"
      :key="entry.prop"
      class="flex w-full justify-between border-b-primary-content border-b-2 max-w-96"
    >
      <span>{{ entry.label }}</span>
      <span class="font-bold">{{ data[entry.prop].toFixed(2) }}</span>
    </div>
  </div>
</template>

<style scoped></style>
