import { defineAsyncComponent } from 'vue'

export const sqliSections = [
  {
    title: '1️⃣ 취약점 소개/작동 원리',
    component: defineAsyncComponent(() => import('src/pages/ssrf/sections/SsrfIntro.vue')),
  },
  {
    title: '2️⃣ 취약점이 발생하는 위치',
    component: defineAsyncComponent(() => import('src/pages/sqlInjection/ssrf/VulnLocation.vue')),
  },
  {
    title: '3️⃣ 발생 이유',
    component: defineAsyncComponent(() => import('src/pages/ssrf/sections/ReasonWhy.vue')),
  },
  {
    title: '4️⃣ 실제 보안 사고 사례',
    component: defineAsyncComponent(() => import('src/pages/ssrf/sections/ActualEx.vue')),
  },
  {
    title: '7️⃣ MITRE ATT&CK 연관',
    component: defineAsyncComponent(() => import('src/pages/ssrf/sections/MitreAttack.vue')),
  },
]
