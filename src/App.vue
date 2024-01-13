<script setup lang="ts">
import dayjs from 'dayjs'
import PerformanceChart from '@/components/PerformanceChart.vue'

const lastUpdatedStr = dayjs('1999-01-01').fromNow()
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
        <span class="block text-xs">
          Generated with ♥ using
          <a class="link" target="_blank" href="https://github.com/WildXav/vitrine">vitrine</a>
        </span>
      </footer>
    </main>
  </div>
</template>
