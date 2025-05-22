<template>
  <q-page class="column q-pa-md">
    <div class="text-h5"><strong>쿠키 🍪</strong></div>
    <q-img :src="cookie1" class="q-my-lg q-mx-auto" style="width: 550px"></q-img>

    <ul class="text-h6">
      <li>클라이언트 인증 정보</li>
      <li>정의: HTTP에서 상태를 유지하기 위해 사용하는 Key + Value 형태의 값</li>
      <li>용도: 클라인언트의 정보 기록과 상태 정보를 표현</li>
      <li>특징</li>
      <ul>
        <li>
          클라이언트는 쿠키를 조회, 수정, 추가할 수 0 why? 쿠키는 클라이언트에 저장되기 때문에
        </li>
        <li>쿠키의 만료: 클라이언크(브라우저)에서 관리</li>
        <li>쿠키의 설정: 클라이언트, 서버에서 설정</li>
      </ul>
      <li class="q-pt-md">쿠키 열람 방법</li>
      <ul>
        <li>Console 탭 → document.cookie를 입력</li>
        <li>Application 탭 → Cookies를 펼치면 Origin 목록을 확인</li>
      </ul>
    </ul>

    <div class="text-h5 q-mt-xl"><strong>세션</strong></div>
    <q-img :src="cookie2" class="q-my-lg q-mx-auto" style="width: 550px"></q-img>

    <ul class="text-h6">
      <li>
        정의: 인증 정보를 서버에 저장하고 해당 데이터에 접근할 수 있는 키 = Session ID(유추할 수
        없는 랜덤한 문자열)를 만들어 클라이언트에 전달하는 방식
      </li>
      <li class="q-pt-sm">
        용도: 쿠키에 인증 상태를 저장하지만 클라이언트가 인증 정보를 변조할 수 없게 하기 위해
        만들어짐
      </li>

      <li class="q-pt-sm">
        브라우저: 해당 키를 쿠키에 저장하고 이후레 HTTP 요청을 보낼 때 사용 → 서버: 저장한 세션 키와
        대응하는 클라이언트인지 확인하므로 안전한 서비스를 구현
      </li>

      <li class="q-pt-sm">
        세션 하이재킹: 공격자가 이용자의 쿠키를 훔칠 수 있으며 세션에 해당하는 이용자의 인증 상태를
        훔칠 수 있는 공격
      </li>
    </ul>

    <div class="text-h5 q-mt-xl"><strong>SOP</strong></div>
    <ul class="text-h6">
      <li>
        Same Origin Policy = 동일 출처 정책: 현재 페이지의 출처가 아닌 다른 출처로부터 온 데이터를
        읽지 못하게 하는 브라우저의 보안 메커니즘
      </li>
      <li>Origin 구분 방법</li>
    </ul>
    <div class="row justify-center q-my-lg">
      <q-img :src="cookie3" style="width: 700px"></q-img>
    </div>

    <div class="text-h5 q-mt-xl"><strong>CORS</strong></div>
    <ul class="text-h6">
      <li>Same Origin Policy 제한 완화 방법</li>
      <li>
        Cross-Origin Resource Sharing = 교차 출처 리소스 공유: SOP의 제한을 받지 않고 Cross Origin의
        데이터를 처리할 수 있도록 해주는 메커니즘
      </li>
      <li>서버 측 HTTP 응답 결과</li>
    </ul>

    <div class="row justify-center q-my-lg">
      <q-img :src="cookie4" style="width: 700px"></q-img>
    </div>

    <div class="text-h5 q-mt-xl"><strong>JSONP</strong></div>
    <ul class="text-h6">
      <li>Same Origin Policy 제한 완화 방법</li>
      <li>
        JSON with Padding: <code style="color: red">{{ scriptTag }}</code> 태그를 이용해 다른
        페이지의 데이터를 가져오는 방식
      </li>
    </ul>
  </q-page>
</template>

<script setup>
import cookie1 from 'src/assets/cookie1.png'
import cookie2 from 'src/assets/cookie2.png'
import cookie3 from 'src/assets/cookie3.png'
import cookie4 from 'src/assets/cookie4.png'

const scriptTag = '<script>'
</script>
