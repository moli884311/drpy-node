<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { adminApi } from '../api/admin'

const router = useRouter()
const loading = ref(false)
const customData = ref({ sites: [], lives: [] })

const CUSTOM_JSON_PATH = 'public/sub/custom/moli.json'

onMounted(async () => {
  await loadCustomData()
})

const loadCustomData = async () => {
  loading.value = true
  try {
    const result = await adminApi.getCustomSources()
    const data = result.data || result
    if (Array.isArray(data)) {
      customData.value = { sites: [], lives: [] }
    } else {
      customData.value = {
        sites: data.sites || [],
        lives: data.lives || []
      }
    }
  } catch (e) {
    console.error('Load custom sources error:', e)
    customData.value = { sites: [], lives: [] }
  } finally {
    loading.value = false
  }
}

const editJsonFile = () => {
  router.push({
    name: 'source-editor',
    query: { path: CUSTOM_JSON_PATH }
  })
}

const typeLabels = {
  1: '源',
  2: '源',
  3: 'DR2',
  4: 'DS',
  5: 'CatVod',
}

const typeColors = {
  1: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  2: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  3: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  4: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  5: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

const siteTypeMap = {
  3: 'JS (DR2)',
  4: 'JS (DS) / HIPY',
  5: 'PHP / CatVod',
}

const sitesCount = computed(() => customData.value.sites?.length || 0)
const livesCount = computed(() => customData.value.lives?.length || 0)
</script>

<template>
  <div class="custom-source-page">
    <div class="custom-source-header">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold">自定义源管理</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            自动检测 {{ CUSTOM_JSON_PATH }}，管理自定义站点和直播源
          </p>
        </div>
        <button
          @click="loadCustomData"
          :disabled="loading"
          class="btn btn-secondary"
        >
          <svg v-if="loading" class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          刷新
        </button>
      </div>
    </div>

    <div class="custom-source-content space-y-6 mt-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-blue-600">{{ sitesCount }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">站源数量</p>
        </div>
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-green-600">{{ livesCount }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">直播源数量</p>
        </div>
      </div>

      <section>
        <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          站源源文件
        </h3>
        <div class="card p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer" @click="editJsonFile">
          <div class="flex items-center gap-3">
            <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100">moli.json - sites</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">drpy-node/{{ CUSTOM_JSON_PATH }}</p>
            </div>
          </div>
          <button class="btn btn-secondary text-sm">
            编辑
          </button>
        </div>
      </section>

      <section>
        <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          自定义站点列表 ({{ sitesCount }})
        </h3>

        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="sitesCount === 0" class="card p-8 text-center text-gray-500 dark:text-gray-400">
          暂无自定义站点，可通过「源管理」页面添加或在 moli.json 中手动编辑
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="site in customData.sites"
            :key="site.key"
            class="card p-4 hover:shadow-md transition-shadow border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
          >
            <div class="flex items-start gap-3">
              <span
                class="px-2 py-0.5 rounded text-xs font-medium flex-shrink-0"
                :class="typeColors[site.type] || typeColors[1]"
              >
                {{ typeLabels[site.type] || '源' }}
              </span>
              <div class="min-w-0 flex-1">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 truncate" :title="site.name">
                  {{ site.name }}
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono truncate" :title="site.key">
                  {{ site.key }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {{ siteTypeMap[site.type] || '未知类型' }}
                </p>
                <div class="flex flex-wrap gap-1 mt-2">
                  <span v-if="site.searchable" class="px-1.5 py-0.5 text-xs rounded bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">可搜索</span>
                  <span v-if="site.filterable" class="px-1.5 py-0.5 text-xs rounded bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">可筛选</span>
                  <span v-if="site.quickSearch" class="px-1.5 py-0.5 text-xs rounded bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">快搜</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          直播源源文件
        </h3>
        <div class="card p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer" @click="editJsonFile">
          <div class="flex items-center gap-3">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100">moli.json - lives</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">drpy-node/{{ CUSTOM_JSON_PATH }}</p>
            </div>
          </div>
          <button class="btn btn-secondary text-sm">
            编辑
          </button>
        </div>
      </section>

      <section>
        <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553 2.276A1 1 0 0121 13.382V18.62a1 1 0 01-.447.894L15 21m0-11V4m0 0L9 3m6 1L9 3m0 0l-5.447 2.724A1 1 0 003 6.618V11.38a1 1 0 00.447.894L9 15m0-12v12" />
          </svg>
          自定义直播源列表 ({{ livesCount }})
        </h3>

        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="livesCount === 0" class="card p-8 text-center text-gray-500 dark:text-gray-400">
          暂无自定义直播源，可在 moli.json 中手动编辑 "lives" 字段添加
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="live in customData.lives"
            :key="live.name"
            class="card p-4 hover:shadow-md transition-shadow border border-transparent hover:border-green-200 dark:hover:border-green-800"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553 2.276A1 1 0 0121 13.382V18.62a1 1 0 01-.447.894L15 21m0-11V4m0 0L9 3m6 1L9 3m0 0l-5.447 2.724A1 1 0 003 6.618V11.38a1 1 0 00.447.894L9 15m0-12v12" />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 truncate">{{ live.name }}</h4>
                <p v-if="live.url" class="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{{ live.url }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.custom-source-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8rem - 4rem);
  min-height: 500px;
}

.custom-source-header {
  flex-shrink: 0;
  padding-bottom: 1rem;
}

.custom-source-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}
</style>
