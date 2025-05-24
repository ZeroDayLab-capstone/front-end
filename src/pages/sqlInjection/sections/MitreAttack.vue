<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-my-lg">
      <q-img :src="sql7" style="width: 750px"></q-img>
    </div>

    <div class="text-h5 q-pt-xl">✅후속 공격</div>
    <div class="text-h6 q-pl-sm">
      <div class="q-py-sm">
        1. <span style="color: red">SELECT INTO OUTFILE, LOAD_FILE</span>을 통한 백도어 심기
      </div>
      <div class="q-py-sm">
        2. <span style="color: red">UPDATE users SET is_admin=1</span> 등의 권한 상승
      </div>
      <div class="q-pt-sm">3. DB 루트 권한 획득 후 시스템 내부 탐색</div>
    </div>

    <div class="text-h5 q-pt-xl">✅보완할 보안 포인트</div>
    <div class="text-h6 q-pl-md">
      <div class="q-py-sm">1. ORM 사용으로 쿼리 추상화</div>
      <div class="q-py-sm">
        2. DB 권한 최소화<span style="color: red">(READ ONLY, NO DELETE)</span>
      </div>
      <div class="q-py-sm">3. SQLi 패턴 탐지용 SIEM 로그 적용</div>
    </div>
  </q-page>
</template>

<script setup>
import sql7 from 'src/assets/sql7.png'
</script>
