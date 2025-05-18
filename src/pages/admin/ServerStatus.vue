<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="text-h6">Docker 서버 상태</div>
      <q-btn dense flat icon="refresh" class="q-ml-md" @click="fetchStatus" />
    </div>

    <q-card flat bordered class="q-pa-md">
      <div v-if="!status">로딩 중...</div>
      <pre v-else>{{ status }}</pre>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const status = ref(null)

function fetchStatus() {
  status.value = null
  // TODO: api.get('/admin/server-status').then(r => status.value = r.data)
  setTimeout(() => {
    status.value = '{ server: "running", containers: 3 }'
  }, 500)
}

onMounted(fetchStatus)
</script>
