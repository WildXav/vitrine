<script setup lang="ts">
import dayjs from 'dayjs'
import PerformanceChart from '@/components/PerformanceChart.vue'
import type { StatsPanelDef } from '@/components/StatsPanel.vue'
import StatsPanel from '@/components/StatsPanel.vue'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'
import type { PeriodData } from '@/components/interfaces/period-data'

const lastUpdatedStr = dayjs('1999-01-01').fromNow()
const statsPanels: StatsPanelDef[] = [
  {
    id: 'overall',
    title: 'Overall Evaluation',
    data: {
      losers: 40,
      winners: 28,
      expectancy: 2.13,
      avgWinPerf: 7.77,
      avgLosPerf: -4.05,
      return: 36.3,
      maxDrawdown: 62.9,
    },
  },
  {
    id: 'monthly',
    title: 'Monthly Stats',
    data: {
      losers: 36,
      winners: 25,
      expectancy: 2.84,
      avgWinPerf: 7.95,
      avgLosPerf: -3.82,
      return: 46.67,
      maxDrawdown: 62.9,
    },
  },
  {
    id: 'weekly',
    title: 'Weekly Stats',
    data: {
      losers: 15,
      winners: 15,
      expectancy: 2.84,
      avgWinPerf: 7.95,
      avgLosPerf: -3.82,
      return: 46.67,
      maxDrawdown: 62.9,
    },
  },
]
const activePanelId = ref('overall')
const activePanelData: ComputedRef<PeriodData | null> = computed(() => {
  return statsPanels.find((panel) => panel.id === activePanelId.value)?.data ?? null
})
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
            <PerformanceChart />
          </div>
        </div>
      </div>

      <div class="flex flex-col flex-1 md:hidden">
        <div role="tablist" class="tabs tabs-lifted">
          <a
            v-for="panel in statsPanels"
            :key="panel.id"
            role="tab"
            :class="[
              'tab',
              'text-xs',
              'sm:text-base',
              { 'tab-active': panel.id === activePanelId },
            ]"
            @click="activePanelId = panel.id"
          >
            {{ panel.title }}
          </a>
        </div>

        <div class="flex-1 mt-4">
          <StatsPanel v-if="activePanelData" :data="activePanelData" />
        </div>
      </div>

      <div class="flex-1 justify-between gap-x-0 lg:gap-x-4 hidden md:flex">
        <div v-for="panel in statsPanels" :key="panel.id" class="card basis-1/3 h-full">
          <div class="card-body h-full p-4">
            <h2 class="card-title text-lg">{{ panel.title }}</h2>
            <div class="flex-1"><StatsPanel :data="panel.data" /></div>
          </div>
        </div>
      </div>

      <footer class="footer items-center justify-end p-1">
        <span class="block text-xs">
          Generated with ♥ using
          <a class="link" target="_blank" href="https://github.com/WildXav/vitrine">vitrine</a>
        </span>
      </footer>
    </main>
  </div>
</template>
