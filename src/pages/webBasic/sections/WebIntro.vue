<template>
  <q-page class="column q-pa-md">
    <!-- 웹(Web)이란? 소제목 -->
    <div class="text-h5 q-mt-md"><span class="text-weight-bold">웹(Web)이란?</span>🕸️</div>

    <q-img :src="web1" class="q-my-lg q-mx-auto" style="width: 500px" />
    <!-- 설명 텍스트 -->
    <div class="q-my-lg text-body1" style="display: list-item; list-style-type: disc">
      정의: 인터넷을 기반으로 구현된 서비스 중 HTTP를 이용하여 정보를 공유하는 서비스
    </div>

    <div class="text-h5 q-mt-xl"><span class="text-weight-bold">웹의 기본 구성 요소</span></div>
    <q-img :src="web2" class="q-my-lg q-mx-auto" style="width: 500px" />
    <div class="text-h5 q-mt-xl"><span class="text-weight-bold">1. 웹 서버</span></div>
    <div class="q-my-lg text-body1" style="display: list-item; list-style-type: disc">
      정의: 정보를 제공하는 주체
    </div>
    <div class="text-h5"><span class="text-weight-bold">2. 웹 클라이언트</span></div>
    <div class="q-my-lg text-body1" style="display: list-item; list-style-type: disc">
      정의: 정보를 받는 이용자
    </div>
    <div class="text-h5"><span class="text-weight-bold">3. HTTP/HTTPS</span></div>
    <div class="q-my-lg text-body1" style="display: list-item; list-style-type: disc">
      정의: 클라이언트와 서버 간의 데이터 전송을 담당하는 프로토콜
    </div>
    <div class="text-h5"><span class="text-weight-bold">4. 웹 리소스</span></div>
    <div class="text-body1">
      <div class="q-mt-sm" style="display: list-item; list-style-type: disc">
        정의: 웹의 갖춰진 정보 자산
      </div>
      <div class="q-mt-sm" style="display: list-item; list-style-type: disc">
        모든 웹 리소스는 고유의 Uniform Resource Identifier(URL)를 가지며, 이를 이용하여 식별됨
      </div>
      <div class="q-my-sm" style="display: list-item; list-style-type: disc">
        ex) HTML, Javascript, CSS 등
      </div>
    </div>

    <div class="text-h5 q-mt-xl"><span class="text-weight-bold">웹의 동작 방식</span></div>
    <q-img :src="web3" class="q-my-lg q-mx-auto" style="width: 500px" />
    <div class="text-body1">
      웹은 <span class="text-weight-bold">클라이언트-서버 모델</span>을 기반으로 동작합니다.
    </div>
    <div class="text-body1">
      사용자가 웹 브라우저에서 URL을 입력하면 다음과 같은 과정이 수행됩니다:
    </div>
    <div class="q-pa-md text-body1">
      <div>
        <span class="text-weight-bold">1. DNS 조회:</span> 입력한 도메인(URL)이 IP 주소로 변환됨
      </div>
      <div>
        <span class="text-weight-bold">2. 서버 요청:</span> 반환된 IP 주소의 웹 서버에 HTTP 요청
        전송
      </div>
      <div>
        <span class="text-weight-bold">3. 서버 응답:</span> 웹 서버가 요청받은 HTML, CSS, JavaScript
        파일을 클라이언트로 전송
      </div>
      <div>
        <span class="text-weight-bold">4. 브라우저 렌더링:</span> 클라이언트가 받은 데이터를
        해석하여 웹 페이지 표시
      </div>
    </div>

    <div class="text-h5 q-pt-xl"><span class="text-weight-bold">웹 기술</span></div>
    <q-img :src="web4" class="q-my-lg q-mx-auto" style="width: 500px"></q-img>

    <div class="text-h5 q-pt-lg"><span class="text-weight-bold">1. HTML</span></div>
    <div class="q-my-sm" style="display: list-item; list-style-type: disc">
      웹 페이지의 구조를 정의하는 마크업 언어
    </div>
    <div class="text-body1">
      <div class="q-my-sm" style="display: list-item; list-style-type: disc">
        ex) 문서의 제목, 단락, 링크, 이미지 등등
      </div>

      <div class="text-h5 q-pt-lg"><span class="text-weight-bold">2. CSS</span></div>
      <div class="q-my-sm" style="display: list-item; list-style-type: disc">
        웹 페이지의 디자인 및 레이아웃을 담당하는 스타일시트 언어
      </div>
      <div class="q-my-sm" style="display: list-item; list-style-type: disc">
        ex) 색상, 폰트, 크기 등
      </div>
    </div>

    <div class="text-h5 q-pt-lg"><span class="text-weight-bold">3. JavaScript</span></div>
    <div class="text-body1">
      <div class="q-my-sm" style="display: list-item; list-style-type: disc">
        웹 페이지에 동적인 기능을 추가하는 프로그램 언어어
      </div>
      <div class="q-my-sm" style="display: list-item; list-style-type: disc">
        ex) 사용자 입력 처리, 애니메이션, API 호출 등
      </div>
    </div>
  </q-page>
</template>

<script setup>
import web1 from 'src/assets/web1.png'
import web2 from 'src/assets/web2.png'
import web3 from 'src/assets/web3.png'
import web4 from 'src/assets/web4.png'
</script>

<style scoped>
/* 필요에 따라 여기에 스타일 추가하세요 */
</style>
