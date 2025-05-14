<template>
  <q-page class="q-pa-md">
    <div class="text-h5">✅소개</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="command1" style="width: 400px"></q-img>
    </div>
    <div class="text-body1">
      <div class="q-py-md" style="display: list-item; list-style-type: disc">
        웹 애플리케이션이
        <span class="text-weight-bold">사용자 입력을 검증하지 않고 시스템 명령어로 실행할 때</span>
        발생하는 취약점입니다.
      </div>
      <div style="display: list-item; list-style-type: disc">
        공격자는 이를 악용하여 서버에서 임의의 명령을 실행하고, 시스템 권한을 탈취하거나 데이터를
        유출할
      </div>
      <div>수 있습니다.</div>
    </div>

    <div class="text-h5 q-pt-xl">✅Command-Injection 작동 원리</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="command2" style="width: 400px"></q-img>
    </div>
    <div class="text-body1">
      <div class="q-py-sm">
        1. 웹 애플리케이션이 시스템 명령어를 실행하는 기능을 제공하는지 확인
      </div>
      <div>2. 정상적인 입력값에 쉘 메타 문자나 추가 명령을 포함하여 실행 시도</div>
      <div class="q-py-sm">
        3. 서버에서 실행된 명령어의 결과를 통해 성공 여부 및 추가적인 공격 방법 탐색
      </div>
    </div>
  </q-page>
</template>

<script setup>
import command1 from 'src/assets/command1.png'
import command2 from 'src/assets/command2.png'
</script>
