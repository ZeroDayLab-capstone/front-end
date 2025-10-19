import { defineAsyncComponent } from 'vue'

export const filevulnSections = [
  {
    title: '1️⃣ 취약점 소개/작동 원리',
    component: defineAsyncComponent(
      () => import('src/pages/fileVulnerability/sections/FileVulnIntro.vue'),
    ),
  },
  {
    title: '2️⃣ File Upload Vulnerability',
    component: defineAsyncComponent(
      () => import('src/pages/fileVulnerability/sections/FileUploadVuln.vue'),
    ),
  },
  {
    title: '3️⃣ File Download Vulnerability',
    component: defineAsyncComponent(
      () => import('src/pages/fileVulnerability/sections/FileDownloadVuln.vue'),
    ),
  },
  {
    title: '4️⃣ 실제 보안 사고 사례',
    component: defineAsyncComponent(
      () => import('src/pages/fileVulnerability/sections/ActualEx.vue'),
    ),
  },
  {
    title: '5️⃣ MITRE ATT&CK 연관',
    component: defineAsyncComponent(
      () => import('src/pages/fileVulnerability/sections/MitreAttack.vue'),
    ),
  },
]
