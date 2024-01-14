<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { PeriodData } from '@/interfaces/period-data'
import { formatPct } from '@/utils/format'
import WinratePie from '@/components/WinratePie.vue'
import StatsList from '@/components/StatsList.vue'

export interface StatsPanelDef {
  id: string
  title: string
  data: PeriodData
}

const props = defineProps({
  data: {
    type: Object as PropType<PeriodData>,
    required: true,
  },
})

const winrate = computed(() => {
  const total = props.data.winners + props.data.losers
  return total ? props.data.winners / total : 0
})
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex shrink basis-36 justify-center gap-x-8 md:gap-x-2 lg:gap-x-8 overflow-hidden">
      <div class="relative basis-2/5 overflow-hidden">
        <WinratePie :winrate="winrate" />
        <div class="absolute top-0 w-full h-full flex flex-col items-center justify-center">
          <span class="text-xl font-bold">{{ formatPct(winrate, 0) }}</span>
          <span class="text-xs">Winrate</span>
        </div>
      </div>

      <div class="stats py-3">
        <div class="stat pl-0 pr-4">
          <div class="stat-title text-sm">Losers</div>
          <div class="stat-value text-md">{{ data.losers }}</div>
        </div>

        <div class="stat pr-0 pl-4">
          <div class="stat-title text-sm">Winners</div>
          <div class="stat-value text-md">{{ data.winners }}</div>
        </div>
      </div>
    </div>

    <div class="flex-auto shrink-0 mt-5">
      <StatsList :data="data" />
    </div>
  </div>
</template>

<style scoped></style>
