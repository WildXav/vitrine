<script setup lang="ts">
import dayjs from 'dayjs'
import PerformanceChart from '@/components/PnlChart.vue'
import type { StatsPanelDef } from '@/components/StatsPanel.vue'
import StatsPanel from '@/components/StatsPanel.vue'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'
import type { PeriodData } from '@/interfaces/period-data'
import TradeData from '@/trade_data.json'

const lastUpdatedStr = dayjs.unix(TradeData.updatedAt).fromNow()
const statsPanels: StatsPanelDef[] = [
  {
    id: 'overall',
    title: 'Overall Evaluation',
    data: TradeData.stats.overall,
  },
  {
    id: 'monthly',
    title: 'Monthly Stats',
    data: TradeData.stats.monthly,
  },
  {
    id: 'weekly',
    title: 'Weekly Stats',
    data: TradeData.stats.weekly,
  },
]
const activePanelId = ref('overall')
const activePanelData: ComputedRef<PeriodData | null> = computed(() => {
  return statsPanels.find((panel) => panel.id === activePanelId.value)?.data ?? null
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col max-w-screen-lg xl:max-w-screen-xl px-3 pb-3 lg:px-0 sm:pt-3"
  >
    <header class="navbar p-1">
      <div class="flex-1">
        <div class="avatar">
          <div class="w-10 mr-2 mask mask-triangle">
            <img src="/avatar.png" alt="avatar" />
          </div>
        </div>
        <h1 class="text-xl font-bold">Xav's Trading Journey</h1>
      </div>

      <div class="flex-none">
        <span class="text-xs">Updated {{ lastUpdatedStr }}</span>
      </div>
    </header>

    <main class="flex flex-col flex-1 overflow-hidden">
      <div class="card w-full basis-2/5 grow-0 overflow-hidden">
        <div class="card-body h-full p-4">
          <h2 class="card-title text-lg">P&L Chart</h2>

          <div class="flex-1">
            <PerformanceChart :profit-evolution="TradeData.profitEvolution" />
          </div>
        </div>
      </div>

      <div class="flex flex-col flex-1 lg:hidden">
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

      <div class="flex-1 justify-between gap-x-0 lg:gap-x-4 hidden lg:grid grid-cols-3">
        <div v-for="panel in statsPanels" :key="panel.id" class="card h-full">
          <div class="card-body h-full p-4">
            <h2 class="card-title text-lg">{{ panel.title }}</h2>
            <div class="flex-1"><StatsPanel :data="panel.data" /></div>
          </div>
        </div>
      </div>

      <footer class="footer items-center justify-end pt-3">
        <span class="block text-xs">
          Generated with ♥ using
          <a class="link" target="_blank" href="https://github.com/WildXav/vitrine">vitrine</a>
        </span>
      </footer>
    </main>
  </div>
</template>
