<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold">✅소개</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="sql1" style="width: 500px"></q-img>
    </div>
    <div class="text-h6">
      <div>
        SQL Injection은 웹 애플리케이션이 SQL 쿼리를 실행할 때, 사용자가 입력한 데이터를 적절히
        검증하지 않아 악의적인 SQL 명령어가 실행되는 취약점입니다.
      </div>
      <div class="q-pt-md">
        공격자가 직접 SQL 코드를 주입하여 데이터베이스에서 정보를 탈취하거나, 데이터를 조작, 삭제할
        수 있는 심각한 보안 취약점입니다.
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-mt-xl">✅CSRF 작동 원리</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="sql2" style="width: 400px"></q-img>
    </div>
    <div class="text-h6">
      <div>1. 웹 애플리케이션에서 사용자 입력을 포함한 SQL 쿼리를 실행</div>
      <div>2. 입력값 검증이 부족한 경우, 공격자는 SQL 명령어를 추가하여 쿼리를 조작할 수 있음</div>
      <div>3. 데이터베이스가 조작된 SQL을 실행하면서 정보 유출, 데이터 변조 등의 피해가 발생</div>
    </div>
  </q-page>
</template>

<script setup>
import sql1 from 'src/assets/sql1.png'
import sql2 from 'src/assets/sql2.png'
</script>
