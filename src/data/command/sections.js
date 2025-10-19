import { defineAsyncComponent } from 'vue'

export const cmdSections = [
  {
    title: '1️⃣ 취약점 소개/작동 원리',
    component: defineAsyncComponent(
      () => import('src/pages/commandInjection/sections/CommandIntro.vue'),
    ),
  },
  {
    title: '2️⃣ 취약점이 발생하는 위치',
    component: defineAsyncComponent(
      () => import('src/pages/commandInjection/sections/VulnLocation.vue'),
    ),
  },
  {
    title: '3️⃣ 발생 이유',
    component: defineAsyncComponent(
      () => import('src/pages/commandInjection/sections/ReasonWhy.vue'),
    ),
  },
  {
    title: '4️⃣ 실제 보안 사고 사례',
    component: defineAsyncComponent(
      () => import('src/pages/commandInjection/sections/ActualEx.vue'),
    ),
  },
  {
    title: '5️⃣ 공격 기법',
    component: defineAsyncComponent(
      () => import('src/pages/commandInjection/sections/AttackTech.vue'),
    ),
  },
  {
    title: '6️⃣ 방어 기법',
    component: defineAsyncComponent(
      () => import('src/pages/commandInjection/sections/DefendTech.vue'),
    ),
  },
  {
    title: '7️⃣ MITRE ATT&CK 연관',
    component: defineAsyncComponent(
      () => import('src/pages/commandInjection/sections/MitreAttack.vue'),
    ),
  },
]
