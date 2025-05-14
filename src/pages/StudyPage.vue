<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-my-xl">클라이언트 사이드 취약점</div>

    <!-- 고정 크기 카드들을 감싸는 row -->
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in clientVulns" :key="vuln.id" class="my-card-container">
        <q-card flat bordered class="my-card">
          <!-- 상단 이미지 (고정 높이) -->
          <q-img :src="vuln.image" style="width: 310px; object-fit: cover" />

          <!-- 하단 영역: 취약점 이름 + 수강하기 버튼 -->
          <div class="row items-center justify-between q-pa-sm">
            <div class="text-subtitle2">{{ vuln.name }}</div>
            <q-btn label="수강하기" color="black" size="sm" @click.stop="startCourse(vuln.id)" />
          </div>
        </q-card>
      </div>
    </div>

    <div class="text-h4 q-my-xl">서버 사이드 취약점</div>
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in serverVulns" :key="vuln.id" class="my-card-container">
        <q-card flat bordered class="my-card">
          <!-- 상단 이미지 (고정 높이) -->
          <q-img :src="vuln.image" style="width: 310px; object-fit: cover" />

          <!-- 하단 영역: 취약점 이름 + 수강하기 버튼 -->
          <div class="row items-center justify-between q-pa-sm">
            <div class="text-subtitle2">{{ vuln.name }}</div>
            <q-btn label="수강하기" color="black" size="sm" @click.stop="startCourse(vuln.id)" />
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'VulnerabilitiesGallery',
  setup() {
    const router = useRouter()

    // 1) 클라이언트 사이드 취약점
    const clientVulns = ref([
      { id: 'xss', name: 'XSS', image: '...' },
      { id: 'csrf', name: 'CSRF', image: '...' },
    ])

    // 2) 서버 사이드 취약점
    const serverVulns = ref([
      { id: 'sql-injection', name: 'SQL Injection', image: '...' },
      { id: 'command-injection', name: 'Command Injection', image: '...' },
      { id: 'file-vulnerability', name: 'File Vulnerability', image: '...' },
    ])

    function startCourse(id) {
      if (id === 'xss') {
        router.push('/xss')
      } else if (id === 'csrf') {
        router.push('/csrf')
      } else if (id === 'sql-injection') {
        router.push('/sqlinjection')
      } else if (id === 'command-injection') {
        router.push('/commandinjection')
      } else if (id === 'file-vulnerability') {
        router.push('/filevuln')
      }
    }

    return {
      clientVulns,
      serverVulns,
      startCourse,
    }
  },
}
</script>

<style scoped>
/* 카드 하나를 감싸는 컨테이너에 고정 너비를 지정 */
.my-card-container {
  width: 350px;
}

/* 카드 내부에서 width:100%로 카드 컨테이너에 맞춤 */
.my-card {
  width: 100%;
  height: 220px;
}
</style>
