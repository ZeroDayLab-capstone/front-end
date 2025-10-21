<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-my-lg">
      <q-img :src="ssrf1" style="width: 100%"></q-img>
    </div>
    <div class="text-h5 text-weight-bold">✅소개</div>
    <div class="text-h6">
      <div>
        <ul>
          <li>
            <strong>SSRF(Server-Side Request Forgery)</strong>는 웹 애플리케이션이 서버 측에서 외부
            자원 에 요청을 보낼 수 있는 기능을 악용하여, 공격자가
            <strong>내부 네트워크 자원 또는 민감한 정보에 접근하도록 서버를 속이는 공격 방식</strong
            >입니다.
          </li>
          <li>
            사용자가 직접 접근할 수 없는 주소(IP, 메타데이터 서버 등)에 서버가 대신 요청을 보내도 록
            유도할 수 있습니다.
          </li>
          <li>
            주로 이미지 업로드, URL 프리뷰, 외부 API 호출 등의 기능에서 발생하며, 공격자는 이를 통해
            내부망 스캔, 인증 우회, 민감 정보 탈취 등을 시도할 수 있습니다
          </li>
        </ul>
      </div>
      <div class="q-pt-md">
        공격자가 직접 SQL 코드를 주입하여 데이터베이스에서 정보를 탈취하거나, 데이터를 조작, 삭제할
        수 있는 심각한 보안 취약점입니다.
      </div>
    </div>
    <div class="row justify-center q-my-lg">
      <q-img :src="ssrf2" style="width: 100%"></q-img>
    </div>

    <div class="text-h5 text-weight-bold q-mt-xl">✅SSRF 작동 원리</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="ssrf3" style="width: 100%"></q-img>
    </div>
    <div class="text-h6 q-pl-md">
      <div>
        1. 웹 애플리케이션이 사용자 입력으로부터 외부 리소스에 요청을 보낼 수 있는 기능을 제공
      </div>
      <div>2. 공격자가 입력값을 조작하여, 서버가 의도하지 않은 내부 주소로 요청을 보내게 함</div>
      <div>3. 서버가 내부망, 로컬 IP, 메타데이터 서버 등으로 요청을 전송하고 그 결과를 반환</div>
      <div>4. 공격자는 응답 데이터를 통해 내부 정보를 수집하거나, 인증 우회 등 추가 공격 시도</div>
    </div>
    <div class="text-h6">
      ➡️ 즉, SSRF는 서버가 공격자의 조작된 입력에 따라 <strong>제3의 주소로 요청을 보내고</strong>,
      그 결과를 <strong>공격자가 간접적으로 확인</strong>할 수 있을 때 발생합니다.
    </div>
  </q-page>
</template>

<script setup>
import ssrf1 from 'src/assets/img/ssrf/intro/ssrf-intro-01.png'
import ssrf2 from 'src/assets/img/ssrf/intro/ssrf-intro-02.png'
import ssrf3 from 'src/assets/img/ssrf/intro/ssrf-intro-03.png'
</script>
