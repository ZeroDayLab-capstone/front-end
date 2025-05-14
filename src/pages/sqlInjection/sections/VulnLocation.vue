<template>
  <q-page class="q-pa-md">
    <div class="text-body1">
      ➡️ SQL Injection 취약점은 사용자 입력이 직접 SQL 쿼리에 포함되는 모든 웹 애플리케이션에서
      발생할 수
      <div>있습니다.</div>
      <div class="q-pt-md">특히, 다음과 같은 환경에서 자주 발견됩니다.</div>
      <div class="text-weight-bold q-py-sm">✅로그인 및 인증 시스템</div>
      <div style="display: list-item; list-style-type: disc">
        ID, 패스워드를 입력받아 SQL 쿼리를 실행하는 로그인 폼
      </div>
      <div class="text-weight-bold q-py-sm">✅검색 기능</div>
      <div style="display: list-item; list-style-type: disc">
        특정 키워드를 입력받아 데이터베이스에서 검색하는 경우
      </div>
      <div class="text-weight-bold q-py-sm">✅게시판, 댓글, 리뷰 시스템</div>
      <div style="display: list-item; list-style-type: disc">
        사용자가 작성한 내용을 데이터베이스에 저장하고 조회하는 경우
      </div>
      <div class="text-weight-bold q-py-sm">✅URL 기반 데이터 조회</div>
      <div style="display: list-item; list-style-type: disc">
        <span style="color: red">example.com/profile?id=1</span>같은 URL에서 id 값을 SQL에 직접
        포함하는 경우
      </div>
      <div class="text-weight-bold q-py-sm">✅관리자 페이지</div>
      <div style="display: list-item; list-style-type: disc">
        관리자 페이지에서 특정 조건에 따라 데이터를 수정하거나 삭제하는 경우
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
