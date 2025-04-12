<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">웹 취약점</div>

    <!-- 고정 크기 카드들을 감싸는 row -->
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in vulnerabilities" :key="vuln.id" class="my-card-container">
        <q-card flat bordered class="my-card">
          <!-- 상단 이미지 (고정 높이) -->
          <q-img :src="vuln.image" style="width: 100%; height: 150px; object-fit: cover" />

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

export default {
  name: 'VulnerabilitiesGallery',
  setup() {
    const vulnerabilities = ref([
      {
        id: 'sql-injection',
        name: 'SQL Injection',
        image: 'https://cdn.quasar.dev/img/parallax2.jpg',
      },
      {
        id: 'xss',
        name: 'XSS',
        image: 'https://cdn.quasar.dev/img/parallax1.jpg',
      },
      {
        id: 'csrf',
        name: 'CSRF',
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
      },
      {
        id: 'idor',
        name: 'IDOR',
        image: 'https://cdn.quasar.dev/img/quasar.jpg',
      },
    ])

    function startCourse(id) {
      // 실제 라우팅 예: this.$router.push(`/course/${id}`)
      alert(`${id} 과목 수강 페이지로 이동합니다.`)
    }

    return {
      vulnerabilities,
      startCourse,
    }
  },
}
</script>

<style scoped>
/* 카드 하나를 감싸는 컨테이너에 고정 너비를 지정 */
.my-card-container {
  width: 250px; /* 예: 250px로 고정 */
}

/* 카드 내부에서 width:100%로 카드 컨테이너에 맞춤 */
.my-card {
  width: 100%;
  /* 필요하면 고정 높이도 지정 가능: height: 250px; */
}
</style>
