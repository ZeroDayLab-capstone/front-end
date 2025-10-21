<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-pt-xl">🔥Capital One 데이터 유출 (2019년)</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="ssrf4" style="width: 100%"></q-img>
    </div>
    <div class="text-h6">
      <div style="display: list-item; list-style-type: disc">
        공격자는 SSRF를 이용해
        <strong>AWS Metadata 서버( <span style="color: red">169.254.169.254</span> )에 요청</strong>
      </div>
      <div style="display: list-item; list-style-type: disc">
        IAM Role을 통해 S3 버킷 접근 → 고객 개인정보 유출
      </div>
      <div style="display: list-item; list-style-type: disc">
        AWS WAF 미설정, 권한 과다 IAM Role 구성 등의 보안 미흡으로 피해 확산
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-pt-xl">🔥GitLab SSRF 취약점 (CVE-2021-22214)</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="ssrf5" style="width: 100%"></q-img>
    </div>
    <div class="text-h6">
      <div style="display: list-item; list-style-type: disc">
        <span style="color: red">Grafana Integration</span> 설정에서 SSRF 가능
      </div>
      <div style="display: list-item; list-style-type: disc">
        공격자는 GitLab 서버로 하여금 공격자가 지정한 주소로
        <span style="color: red">GET</span> 요청을 보내게 함
      </div>
    </div>
  </q-page>
</template>

<script setup>
import ssrf4 from 'src/assets/img/ssrf/incidents/ssrf-incidents-01.png'
import ssrf5 from 'src/assets/img/ssrf/incidents/ssrf-incidents-02.png'
</script>
