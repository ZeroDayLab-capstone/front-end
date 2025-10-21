<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-my-lg">
      <q-img :src="sql6" style="width: 100%"></q-img>
    </div>

    <div class="text-h5 q-pt-xl text-weight-bold">✅후속 공격</div>
    <div class="text-h6 q-pl-sm">
      <ul>
        <li>
          내부 시스템 포트 스캐닝 (
          <span style="color: red">http://127.0.0.1:8000 , http://redis:6379</span> )
        </li>
        <li>AWS, GCP 등 클라우드 환경의 메타데이터 서버 접근 → 인증 정보 탈취</li>
        <li>내부 관리 패널에 SSRF를 통한 인증 우회</li>
        <li>HTTP smuggling, cache poisoning 등과 결합 공격</li>
      </ul>
    </div>

    <div class="text-h5 q-pt-xl text-weight-bold">✅방어 기법</div>
    <div class="text-h6 q-pl-md">
      <div class="q-py-sm">1. <strong>. Whitelist 기반으로 허용 도메인 제한 </strong></div>
      <div class="row justify-center q-my-lg">
        <q-img :src="sql7" style="width: 100%"></q-img>
      </div>
      <div class="q-py-sm">
        2. <strong>내부망 주소 차단 (RFC1918, Loopback, Link-Local) </strong>
        <div style="display: list-item; list-style-type: disc">
          127.0.0.1, 10.0.0.0/8, 192.168.0.0/16, 169.254.0.0/16, ::1 등
        </div>
      </div>
      <div class="q-py-sm">
        3. <strong>내부망 주소 차단 (RFC1918, Loopback, Link-Local) </strong>
        <div style="display: list-item; list-style-type: disc">
          입력값에 대해 DNS 재해석 후 필터링 적용 (DNS rebinding 방지)
        </div>
      </div>
      <div class="q-py-sm">
        4. <strong>내부망 주소 차단 (RFC1918, Loopback, Link-Local) </strong>
        <div style="display: list-item; list-style-type: disc">
          요청 후 리디렉션 응답 여부 및 최종 목적지 URL 검사
        </div>
      </div>
      <div class="q-py-sm">
        5. <strong>내부망 주소 차단 (RFC1918, Loopback, Link-Local) </strong>
        <div style="display: list-item; list-style-type: disc">
          서버의 egress 트래픽을 방화벽/보안그룹으로 제어
        </div>
      </div>
      <div class="q-py-sm">
        6. <strong>서버에서 외부 요청을 완전히 분리</strong>
        <div style="display: list-item; list-style-type: disc">
          SSRF 발생 가능성이 있는 기능은 별도의 미러 서버 등으로 분리
        </div>
      </div>
    </div>
    <div class="text-h5 q-pt-xl text-weight-bold">✅정리 요약</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="sql8" style="width: 100%"></q-img>
    </div>
  </q-page>
</template>

<script setup>
import sql6 from 'src/assets/img/ssrf/mitre/ssrf-mitre-01.png'
import sql7 from 'src/assets/img/ssrf/mitre/ssrf-mitre-02.png'
import sql8 from 'src/assets/img/ssrf/mitre/ssrf-mitre-03.png'
</script>
