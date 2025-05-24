<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-pt-md text-weight-bold">🔥웹 기반 네트워크 도구의 취약점</div>
    <div class="text-h6">
      <ul>
        <li>
          사용자가 특정 IP 주소를 입력하면 <span style="color: red">ping</span> 명령어를 실행하는
          기능에서 Command Injection 취약점이 발견됨
        </li>
        <li>
          공격자는 입력값에 <span style="color: red">; cat /etc/passwd</span> 를 추가하여 서버의
          계정 정보를 유출
        </li>
        <li>이 사건으로 해당 도구의 보안 취약점이 개선되었음</li>
      </ul>
    </div>

    <div class="text-h5 q-pt-md text-weight-bold">🔥CCTV 시스템 해킹</div>
    <div class="text-h6">
      <ul>
        <li>CCTV관리 시스템의 로그 파일을 확인하는 기능에서 Command Injection 취약점이 발견됨</li>
        <li>공격하는 이를 이용해 원격 코드 실행을 수행하고 CCTV영상을 조작</li>
        <li>사건 이후 CCTV 시스템의 보안이 강화되고, 취약점이 패치됨</li>
      </ul>
    </div>

    <div class="text-h5 q-pt-md text-weight-bold">
      🔥OSS(Open Source Software)에서 발견된 취약점
    </div>
    <div class="text-h6">
      <ul>
        <li>
          오픈소스 기반의 웹 애플리케이션에서 관리자 기능을 통해 시스템 명령어를 직접 실행할 수 있는
          취약점 발견
        </li>
        <li>공격자는 이를 악용하여 서버를 장악</li>
        <li>취약점이 패치되었고, 오픈소스 소프트웨어의 보안에 대한 경각심이 커짐</li>
      </ul>
    </div>
  </q-page>
</template>

<script setup></script>
