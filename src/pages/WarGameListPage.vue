<template>
  <q-page class="q-pa-md">
    <!-- CSRF 문제 카테고리 -->
    <div class="text-h5">CSRF</div>
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in csrfVulns" :key="vuln.id" class="my-card-container">
        <q-card
          flat
          bordered
          class="my-card"
          @click.stop="solveProblem(vuln.id)"
          style="cursor: pointer"
        >
          <q-img :src="vuln.image" style="width: 230px; object-fit: cover" />
          <div class="row items-center justify-between q-pa-sm">
            <div class="text-subtitle2" @click="solveProblem(vuln.id)" style="cursor: pointer">
              {{ vuln.name }}
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- SQL Injection 문제 카테고리 -->
    <div class="text-h5 q-pt-xl">SQL Injection</div>
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in sqlInjectionVulns" :key="vuln.id" class="my-card-container">
        <q-card
          flat
          bordered
          class="my-card"
          @click.stop="solveProblem(vuln.id)"
          style="cursor: pointer"
        >
          <q-img :src="vuln.image" style="width: 230px; object-fit: cover" />
          <div class="row items-center justify-between q-pa-sm">
            <div class="text-subtitle2" @click="solveProblem(vuln.id)" style="cursor: pointer">
              {{ vuln.name }}
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Command Injection 문제 -->
    <div class="text-h5 q-pt-xl">Command Injection</div>
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in commandInjectionVulns" :key="vuln.id" class="my-card-container">
        <q-card
          flat
          bordered
          class="my-card"
          @click.stop="solveProblem(vuln.id)"
          style="cursor: pointer"
        >
          <q-img :src="vuln.image" style="width: 230px; object-fit: cover" />
          <div class="row items-center justify-between q-pa-sm">
            <div class="text-subtitle2" @click="solveProblem(vuln.id)" style="cursor: pointer">
              {{ vuln.name }}
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- XSS 문제 카테고리 -->
    <div class="text-h5 q-pt-xl">XSS</div>
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in xssVulns" :key="vuln.id" class="my-card-container">
        <q-card
          flat
          bordered
          class="my-card"
          @click.stop="solveProblem(vuln.id)"
          style="cursor: pointer"
        >
          <q-img :src="vuln.image" style="width: 230px; object-fit: cover" />
          <div class="row items-center justify-between q-pa-sm">
            <div class="text-subtitle2" @click="solveProblem(vuln.id)" style="cursor: pointer">
              {{ vuln.name }}
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- 기타 취약점 문제 카테고리 -->
    <div class="text-h5 q-pt-xl">File Vulnerability</div>
    <div class="row wrap q-gutter-md justify-start">
      <div v-for="vuln in otherVulns" :key="vuln.id" class="my-card-container">
        <q-card
          flat
          bordered
          class="my-card"
          @click.stop="solveProblem(vuln.id)"
          style="cursor: pointer"
        >
          <q-img :src="vuln.image" style="width: 230px; object-fit: cover" />
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
import path from 'src/assets/problem_path_traversal.png'

export default {
  name: 'VulnerabilitiesGallery',
  setup() {
    const router = useRouter()

    // CSRF 취약점 문제
    const csrfVulns = ref([{ id: 'csrf', name: '관리자 권한 탈취 작전', image: csrf }])

    // SQL Injection 취약점 문제
    const sqlInjectionVulns = ref([
      { id: 'sql-injection1', name: '비밀번호 없이 관리자 로그인', image: sql1 },
      { id: 'sql-injection3', name: 'BookStore: UNION Injection', image: sql3 },
      { id: 'sql-injection2', name: 'VIP 닉네임을 훔쳐라', image: sql2 },
    ])

    const commandInjectionVulns = ref([
      { id: 'command-injection', name: '명령어 주입으로 플래그 탈취', image: command },
    ])

    // XSS 취약점 문제
    const xssVulns = ref([
      { id: 'xss-stored1', name: '악성 게시글로 경고창 띄우기', image: xss1 },
      { id: 'xss-stored2', name: '우회 페이로드를 통한 FLAG 획득', image: xss2 },
      {
        id: 'xss-stored3',
        name: '괸리자 세션 탈취 및 괸리자 전용 게시글 열람을 통한 FLAG 획득',
        image: xss3,
      },
      { id: 'xss-reflected', name: '검색어 기반 XSS 실행을 통한 FLAG 획득', image: xss4 },
    ])

    // 기타 취약점 문제
    const otherVulns = ref([
      { id: 'file-vulnerability2', name: '경로 조작 스크립트를 통한 FLAG 획득', image: path },
      { id: 'file-vulnerability', name: '악성 PHP 스크립트를 통한 FLAG 획득', image: filevuln },
    ])

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
      else if (id === 'file-vulnerability') router.push('/gamefilevuln1')
      else if (id === 'file-vulnerability2') router.push('/gamefilevuln2')
    }

    return {
      csrfVulns,
      sqlInjectionVulns,
      commandInjectionVulns,
      xssVulns,
      otherVulns,
      solveProblem,
    }
  },
}
</script>

<style scoped>
.my-card-container {
  width: 300px;
}
.my-card {
  width: 230px;
}
.my-category-title {
  font-size: 1.25em;
  font-weight: bold;
  margin-top: 20px;
}
</style>
