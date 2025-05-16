<template>
  <q-page class="q-pa-md flex tlex-center">
    <!-- 고정 크기 카드들을 감싸는 row -->
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in problems" :key="vuln.id" class="my-card-container">
        <q-card
          flat
          bordered
          class="my-card"
          @click.stop="solveProblem(vuln.id)"
          style="cursor: pointer"
        >
          <!-- 상단 이미지 (고정 높이) -->
          <q-img :src="vuln.image" style="width: 230px; object-fit: cover" />

          <!-- 하단 영역: 취약점 이름 + 수강하기 버튼 -->
          <div class="row items-center justify-between q-pa-sm">
            <div class="text-subtitle2" @click="solveProblem(vuln.id)" style="cursor: pointer">
              {{ vuln.name }}
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import csrf from 'src/assets/problem_csrf.png'
import sql1 from 'src/assets/problem_sql_1.png'
import sql2 from 'src/assets/problem_sql_2.png'
import sql3 from 'src/assets/problem_sql_3.png'
import xss1 from 'src/assets/problem_xss_stored_1.png'
import xss2 from 'src/assets/problem_xss_stored_2.png'
import xss3 from 'src/assets/problem_xss_stored_3.png'
import xss4 from 'src/assets/problem_xss_reflected.png'
import filevuln from 'src/assets/problem_file_vuln.png'
import command from 'src/assets/problem_command.png'

export default {
  name: 'VulnerabilitiesGallery',
  setup() {
    const router = useRouter()

    // 1) 클라이언트 사이드 취약점
    const problems = ref([
      { id: 'csrf', name: 'CSRF', image: csrf },
      { id: 'sql-injection1', name: 'SQL Injection_1', image: sql1 },
      { id: 'sql-injection2', name: 'SQL Injection_2', image: sql2 },
      { id: 'sql-injection3', name: 'SQL Injection_3', image: sql3 },
      { id: 'command-injection', name: 'Command Injection', image: command },
      { id: 'xss-stored1', name: 'XSS Stored_1', image: xss1 },
      { id: 'xss-stored2', name: 'XSS Stored_2', image: xss2 },
      { id: 'xss-stored3', name: 'XSS Stored_3', image: xss3 },
      { id: 'xss-reflected', name: 'XSS Reflected', image: xss4 },
      { id: 'file-vulnerability', name: 'File Vulnerability', image: filevuln },
    ])

    // + 각 문제 클릭 시 War Game 설명 페이지로 이동
    function solveProblem(id) {
      if (id === 'csrf') router.push('/gamecsrf')
      else if (id === 'sql-injection1') router.push('/gamesqlinjection1')
      else if (id === 'sql-injection2') router.push('/gamesqlinjection2')
      else if (id === 'sql-injection3') router.push('/gamesqlinjection3')
      else if (id === 'command-injection') router.push('/gamecommandinjection')
      else if (id === 'xss-stored1') router.push('/gamexssstored1')
      else if (id === 'xss-stored2') router.push('/gamexssstored2')
      else if (id === 'xss-stored3') router.push('/gamexssstored3')
      else if (id === 'xss-reflected') router.push('/gamexssreflected')
      else if (id === 'file-vulnerability') router.push('/gamefilevuln')
    }

    return {
      problems,
      solveProblem,
    }
  },
}
</script>

<style scoped>
/* 카드 하나를 감싸는 컨테이너에 고정 너비를 지정 */
.my-card-container {
  width: 300px;
}

/* 카드 내부에서 width:100%로 카드 컨테이너에 맞춤 */
.my-card {
  width: 230px;
}
</style>
