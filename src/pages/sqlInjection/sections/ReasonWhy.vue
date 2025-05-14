<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-pb-sm">✅주요 원인</div>
    <div class="text-body1">
      <div class="q-py-sm">
        <span class="text-weight-bold">1. 입력값 검증 부족</span>: 사용자 입력을 검증하지 않고 SQL
        쿼리에 포함할 경우 취약점이 발생
      </div>
      <div class="q-py-sm">
        <span class="text-weight-bold">2. 동적 SQL 쿼리 사용</span>: 문자열 연결을 이용해 SQL 쿼리를
        생성하면 공격자가 삽입 공격을 시도할 수 있음
      </div>
      <div class="q-py-sm">
        <span class="text-weight-bold">3. 적절한 보안 정책 미적용</span>: 최소 권한 원칙을 적용하지
        않으면 공격자가 DB 전체를 조작할 수 있음
      </div>
      <div class="q-py-sm">
        <span class="text-weight-bold">4. 에러 메시지를 통한 정보 유출</span>: 에러 메시지를 통해 DB
        구조가 유출될 가능성 있음
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
