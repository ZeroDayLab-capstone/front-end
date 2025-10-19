import { defineAsyncComponent } from 'vue'

export const xssSections = [
  {
    title: '1️⃣ 취약점 소개/작동 원리',
    component: defineAsyncComponent(() => import('src/pages/xss/sections/XssIntro.vue')),
  },
  {
    title: '2️⃣ 취약점이 발생하는 위치',
    component: defineAsyncComponent(() => import('src/pages/xss/sections/VulnLocation.vue')),
  },
  {
    title: '3️⃣ 발생 이유',
    component: defineAsyncComponent(() => import('src/pages/xss/sections/ReasonWhy.vue')),
  },
  {
    title: '4️⃣ Stored Xss 와 Reflected Xss',
    component: defineAsyncComponent(() => import('src/pages/xss/sections/VariousXss.vue')),
  },
  {
    title: '5️⃣ 실제 보안 사고 사례',
    component: defineAsyncComponent(() => import('src/pages/xss/sections/ActualEx.vue')),
  },
  {
    title: '6️⃣ MITRE ATT&CK 프레임 워크 연관',
    component: defineAsyncComponent(() => import('src/pages/xss/sections/MitreAttack.vue')),
  },
]
