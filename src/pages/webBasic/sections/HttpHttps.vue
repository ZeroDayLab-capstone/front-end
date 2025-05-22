<template>
  <q-page class="column q-pa-md">
    <div class="text-h5 q-mt-lg"><strong>프로토콜</strong></div>
    <ul class="text-h6">
      <li>규격화된 상호작용에 적용되는 약속</li>
      <li>ex)네트워크 통신의 기초 - TCP/IP, 웹 애플리케이션 - HTTP, 파일 주고받을 때 - FTP</li>
      <li>특징</li>
      <ul>
        <li>Connectionless: 하나의 요청에 하나의 응답을 한 후 연결을 종료하는 것</li>
        <li>Stateless: 통신이 끝난 후 상태 정보를 저장하지 않는 것</li>
      </ul>
    </ul>

    <div class="text-h5 q-mt-lg"><strong>HTTP</strong></div>
    <q-img :src="http1" class="q-my-lg q-mx-auto" style="width: 550px" />
    <ul class="text-h6">
      <li>정의: 서버와 클라이언트의 데이터 교환을 요청과 응답 형식으로 정의한 프로토콜</li>

      <li>클라이언트가 서버에게 요쳥하면, 서버가 응답</li>
      <li>포트 번호: 80</li>
    </ul>

    <div class="text-h5 q-mt-xl"><strong>HTTP 요청</strong></div>
    <ul class="text-h6">
      <li>정의: 서버에게 특정 동작을 요구하는 메시지</li>
      <li>시작 줄: 메소드 + 요청 대상 + HTTP 버전</li>
      <ul>
        <li>
          메소드: 요청 대상에 대해 서버가 수행하길 바라는 동작 <br />ex)
          <strong>GET:보안 X (헤더에 저장), POST: 보안 O (바디에 저장)</strong>
        </li>
      </ul>
    </ul>

    <div class="text-h5 q-mt-xl"><strong>HTTP 응답</strong></div>
    <ul class="text-h6">
      <li>정의: HTTP 요청에 대한 결과를 반환하는 메시지</li>
      <li>시작 줄: HTTP 버전 + 상태 코드 + 처리 사유</li>
      <ul>
        <li>상태 코드</li>
      </ul>
    </ul>
    <!-- 표1 -->
    <div class="row justify-center">
      <q-img :src="http2" style="width: 600px"></q-img>
    </div>
    <div class="text-h5 q-mt-xl"><strong>HTTP 메소드</strong></div>
    <!-- 표2 -->
    <div class="row justify-center q-my-lg">
      <q-img :src="http3" style="width: 600px"></q-img>
    </div>

    <div class="text-h5 q-mt-xl"><strong>HTTPS</strong></div>
    <ul class="text-h6">
      <li>HTTP에 보안 게층(SSL/TLS)을 추가한 버전으로, 데이터를 암호화하여 안전한 통신을 제공함</li>
      <li>포트 번호: 443</li>
    </ul>
  </q-page>
</template>

<script setup>
import http1 from 'src/assets/http1.png'
import http2 from 'src/assets/http2.png'
import http3 from 'src/assets/http3.png'
</script>
