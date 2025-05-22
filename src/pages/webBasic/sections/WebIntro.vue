<template>
  <q-page class="column q-pa-md">
    <!-- 웹(Web)이란? 소제목 -->
    <div class="text-h5 q-mt-md"><span class="text-weight-bold">웹(Web)이란?</span>🕸️</div>

    <q-img :src="web1" class="q-my-lg q-mx-auto" style="width: 550px" />
    <!-- 설명 텍스트 -->
    <div class="q-my-lg text-h6" style="display: list-item; list-style-type: disc">
      정의: 인터넷을 기반으로 구현된 서비스 중 HTTP를 이용하여 정보를 공유하는 서비스
    </div>

    <div class="text-h5 q-mt-xl"><span class="text-weight-bold">웹의 기본 구성 요소</span></div>
    <q-img :src="web2" class="q-my-lg q-mx-auto" style="width: 500px" />
    <div class="text-h5 q-mt-xl"><strong>1. 웹 서버</strong></div>
    <ul>
      <li class="text-h6">정의: 정보를 제공하는 주체</li>
    </ul>
    <div class="text-h5 q-pt-sm"><strong>2. 웹 클라이언트</strong></div>
    <ul>
      <li class="text-h6">정의: 정보를 받는 이용자</li>
    </ul>

    <div class="text-h5"><strong>3. HTTP/HTTPS</strong></div>
    <ul>
      <li class="text-h6">정의: 클라이언트와 서버 간의 데이터 전송을 담당하는 프로토콜</li>
    </ul>

    <div class="text-h5"><strong>4. 웹 리소스</strong></div>
    <ul class="text-h6">
      <li>정의: 웹의 갖춰진 정보 자산</li>
      <li>
        모든 웹 리소스는 고유의 Uniform Resource Identifier(URL)를 가지며, 이를 이용하여 식별됨
      </li>

      <li>ex) HTML, Javascript, CSS 등</li>
    </ul>

    <div class="text-h5 q-mt-xl"><strong>웹의 동작 방식</strong></div>
    <q-img :src="web3" class="q-my-lg q-mx-auto" style="width: 500px" />
    <div class="text-h6">
      웹은 <strong>클라이언트-서버 모델</strong>을 기반으로 동작합니다. <br />
      사용자가 웹 브라우저에서 URL을 입력하면 다음과 같은 과정이 수행됩니다:
    </div>

    <div class="q-pa-sm text-h6">
      <div><strong>1. DNS 조회:</strong> 입력한 도메인(URL)이 IP 주소로 변환됨</div>
      <div><strong>2. 서버 요청:</strong> 반환된 IP 주소의 웹 서버에 HTTP 요청 전송</div>
      <div>
        <strong>3. 서버 응답:</strong> 웹 서버가 요청받은 HTML, CSS, JavaScript 파일을 클라이언트로
        전송
      </div>
      <div>
        <strong>4. 브라우저 렌더링:</strong> 클라이언트가 받은 데이터를 해석하여 웹 페이지 표시
      </div>
    </div>

    <div class="text-h5 q-pt-xl"><span class="text-weight-bold">웹 기술</span></div>
    <q-img :src="web4" class="q-my-lg q-mx-auto" style="width: 500px"></q-img>

    <div class="text-h5 q-pt-lg"><strong>1. HTML</strong></div>
    <ul class="text-h6">
      <li>웹 페이지의 구조를 정의하는 마크업 언어</li>
      <li>ex) 문서의 제목, 단락, 링크, 이미지 등등</li>
    </ul>

    <div class="text-h5 q-pt-lg"><strong>2. CSS</strong></div>
    <ul class="text-h6">
      <li>웹 페이지의 디자인 및 레이아웃을 담당하는 스타일시트 언어</li>
      <li>ex) 색상, 폰트, 크기 등</li>
    </ul>

    <div class="text-h5 q-pt-lg"><strong>3. JavaScript</strong></div>
    <ul class="text-h6">
      <li>웹 페이지에 동적인 기능을 추가하는 프로그램 언어</li>
      <li>ex) 사용자 입력 처리, 애니메이션, API 호출 등</li>
    </ul>
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
