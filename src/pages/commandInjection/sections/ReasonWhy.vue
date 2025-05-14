<template>
  <q-page class="q-pa-md">
    <div class="text-h5">✅주요 원인</div>
    <div class="text-body1">
      <div class="q-py-sm">
        1. <span class="text-weight-bold">사용자 입력 검증 부족</span>: 사용자 입력값을 필터링하거나
        제한하지 않아 발생
      </div>
      <div>
        2. <span class="text-weight-bold">: </span
        ><span style="color: red">system(), sxec(), popen(), shell_exec()</span> 등의 함수를 잘못
        사용하여 발생
      </div>
      <div class="q-py-sm">
        3. <span class="text-weight-bold">쉘 메타 문자 처리 미흡</span>:
        <span style="color: red">; & | $() ``</span> 등의 메타문자를 제대로 처리하지 않으면 발생
      </div>

      <div class="q-py-sm">
        4. <span class="text-weight-bold">보안 설정 미흡</span>: 애플리케이션이 높은 권한으로
        실행되거나, 특정 보호 메커니즘(WAF 등)이 적용되지 않으면 발생
      </div>
    </div>
  </q-page>
</template>
