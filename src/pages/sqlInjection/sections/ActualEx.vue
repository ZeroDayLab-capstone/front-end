<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold">🔥2008년 Heartland Payment Systems 해킹 사건</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="sql3" style="width: 300px"></q-img>
    </div>
    <div class="text-body1">
      <div style="display: list-item; list-style-type: disc">
        해커들이 SQL Injection을 이용해 결제 정보 시스템을 해킹
      </div>
      <div style="display: list-item; list-style-type: disc">
        1억 3,400만 개 이상의 신용카드 정보가 유츌됨
      </div>
      <div style="display: list-item; list-style-type: disc">
        이 사건으로 Heartland는 막대한 벌금과 보안 강화 비용을 부담해야 했음
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-pt-lg">🔥2014년 eBay 데이터 유출</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="sql4" style="width: 300px"></q-img>
    </div>
    <div class="text-body1">
      <div style="display: list-item; list-style-type: disc">
        공격자들이 SQL Injection을 통해 eBay의 데이터베이스에 접근
      </div>
      <div style="display: list-item; list-style-type: disc">
        약 1억 4,500만 명의 사용자 계정 정보(이름, 주소, 이메일, 전화번호, 암호화된 비밀번호)가
        유출됨
      </div>
      <div style="display: list-item; list-style-type: disc">
        이후 eBay는 비밀번호 변경을 요구하고 보안 강화를 시행함
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-pt-lg">🔥2019년 Suprema BioStar 2 데이터 유출</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="sql5" style="width: 300px"></q-img>
    </div>
    <div class="text-body1">
      <div style="display: list-item; list-style-type: disc">
        생체 인증 시스템(BioStar 2)이 SQL Injection 공격에 노출됨
      </div>
      <div style="display: list-item; list-style-type: disc">
        약 2,300만 개의 사용자 데이터(지문, 얼굴 인식 정보, 보안 인증 데이터)가 유출됨
      </div>
      <div style="display: list-item; list-style-type: disc">
        이 사건은 생체 인증 시스템조차도 SQL Injection에 취약할 수 있음을 보여줌
      </div>
    </div>
  </q-page>
</template>

<script setup>
import sql3 from 'src/assets/sql3.png'
import sql4 from 'src/assets/sql4.png'
import sql5 from 'src/assets/sql5.png'
</script>
