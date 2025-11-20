<template>
  <q-page class="bg-grey-2 q-pa-lg q-pb-xl">
    <div class="page-container">
      <!-- 상단 설명 -->
      <div class="q-mb-xl">
        <div class="text-overline text-grey-7">Web Vulnerability Courses</div>
        <div class="text-h4 text-weight-bold q-mt-xs">웹 취약점 학습</div>
        <div class="text-subtitle2 text-grey-7 q-mt-sm">
          각 취약점 이미지를 클릭해 학습을 시작하세요. 실습 중심으로 공격·방어 흐름을 익힐 수
          있습니다.
        </div>
      </div>

      <!-- 클라이언트 사이드 -->
      <div class="section-block q-mb-xl">
        <div class="row items-center justify-between q-mb-md">
          <div>
            <div class="text-h4 text-weight-bold">클라이언트 사이드 취약점</div>
            <div class="text-caption text-grey-7 q-mt-xs">
              브라우저에서 발생하는 취약점 위주로, 스크립트/요청 위조를 다룹니다.
            </div>
          </div>
          <q-badge color="black" outline class="text-caption"> Client-side </q-badge>
        </div>

        <div class="row q-gutter-md justify-start">
          <div v-for="vuln in clientVulns" :key="vuln.id" class="vuln-card-wrapper">
            <div class="vuln-tile cursor-pointer" @click="startCourse(vuln.id)">
              <q-img :src="vuln.image" fit="contain" style="height: 190px" class="vuln-img">
                <div
                  class="absolute-bottom gradient-overlay q-pa-sm row items-center justify-between"
                >
                  <div class="text-left">
                    <div class="text-subtitle2 text-weight-bold text-white">
                      {{ vuln.name }}
                    </div>
                    <div class="text-caption text-grey-3 q-mt-xs">
                      {{ vuln.desc }}
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </div>

      <!-- 서버 사이드 -->
      <div class="section-block">
        <div class="row items-center justify-between q-mb-md">
          <div>
            <div class="text-h4 text-weight-bold">서버 사이드 취약점</div>
            <div class="text-caption text-grey-7 q-mt-xs">
              서버 자원·DB·내부망에 영향을 주는 고위험 취약점을 실습과 함께 학습합니다.
            </div>
          </div>
          <q-badge color="black" outline class="text-caption"> Server-side </q-badge>
        </div>

        <div class="row q-gutter-md justify-start">
          <div v-for="vuln in serverVulns" :key="vuln.id" class="vuln-card-wrapper">
            <div class="vuln-tile cursor-pointer" @click="startCourse(vuln.id)">
              <q-img :src="vuln.image" fit="contain" style="height: 190px" class="vuln-img">
                <div
                  class="absolute-bottom gradient-overlay q-pa-sm row items-center justify-between"
                >
                  <div class="text-left">
                    <div class="text-subtitle2 text-weight-bold text-white">
                      {{ vuln.name }}
                    </div>
                    <div class="text-caption text-grey-3 q-mt-xs">
                      {{ vuln.desc }}
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import sql from 'src/assets/sqlinjection-study.png'
import xss from 'src/assets/xss-study.png'
import command from 'src/assets/command-study.png'
import filevuln from 'src/assets/filevuln-study.png'
import csrf from 'src/assets/csrf-study.png'
import ssrf from 'src/assets/ssrf-study.png'

export default {
  name: 'VulnerabilitiesGallery',
  setup() {
    const router = useRouter()

    // 사진을 메인으로 쓰되, desc는 이미지 아래쪽 설명용
    const clientVulns = ref([
      {
        id: 'xss',
        name: 'XSS',
        image: xss,
        desc: '스크립트 삽입을 통한 쿠키·세션 탈취 및 UI 변조',
      },
      {
        id: 'csrf',
        name: 'CSRF',
        image: csrf,
        desc: '사용자를 가장해 악의적인 요청을 보내는 공격',
      },
    ])

    const serverVulns = ref([
      {
        id: 'sql-injection',
        name: 'SQL Injection',
        image: sql,
        desc: '쿼리 조작으로 DB 조회·변조·삭제를 유도',
      },
      {
        id: 'command-injection',
        name: 'Command Injection',
        image: command,
        desc: '서버에서 OS 명령어를 실행시키는 취약점',
      },
      {
        id: 'file-vulnerability',
        name: 'File Vulnerability',
        image: filevuln,
        desc: '파일 업·다운로드 기능을 악용한 공격',
      },
      {
        id: 'ssrf',
        name: 'SSRF',
        image: ssrf,
        desc: '서버를 프록시처럼 이용해 내부 자원에 접근',
      },
    ])

    function startCourse(id) {
      if (id === 'xss') router.push('/xss')
      else if (id === 'csrf') router.push('/csrf')
      else if (id === 'sql-injection') router.push('/sqlinjection')
      else if (id === 'command-injection') router.push('/commandinjection')
      else if (id === 'file-vulnerability') router.push('/filevuln')
      else if (id === 'ssrf') router.push('/ssrf')
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
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-block {
  background: #ffffff;
  border-radius: 18px;
  padding: 24px 24px 28px;
}

/* 이미지 타일 */
.vuln-tile {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.vuln-tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
}

/* q-img 자체를 부드럽게 확대 */
.vuln-img {
  transition: transform 0.3s ease;
}

.vuln-tile:hover .vuln-img {
  transform: scale(1.03);
}

/* 이미지 하단 그라디언트 + 텍스트 오버레이 */
.gradient-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0));
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 섹션 카드 */
.section-block {
  background: #ffffff;
  border-radius: 18px;
  padding: 24px 24px 28px;
}

/* 한 개 카드 컨테이너: 고정 너비 */
.vuln-card-wrapper {
  width: 260px;
}

@media (max-width: 600px) {
  .vuln-card-wrapper {
    width: 100%;
  }
}

/* 타일 효과 */
.vuln-tile {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.vuln-tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
}

/* 이미지: 잘리지 않고 전체 보이도록 */
.vuln-img {
  background: #f5f5f5;
}

/* 그라디언트 오버레이 */
.gradient-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
}
</style>
