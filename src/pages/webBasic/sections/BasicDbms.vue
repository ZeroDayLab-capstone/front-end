<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold">DBMS</div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="dbms1" style="width: 500px"></q-img>
    </div>
    <div class="text-body1">
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        정의: 데이터베이스(데이터가 저장되는 공간) 관리 시스템
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        역할: 데이터베이스에 새로운 정보를 기록하거나, 기록된 내용을 수정, 삭제
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">특징</div>
      <ul class="q-mt-sm" style="list-style-type: circle">
        <li>다수의 사용자가 동시에 접근 가능</li>
        <li>웹 서비스에서 복잡한 검색 기능과 같은 요구사항을 충족하는 데이터 조회 가능</li>
      </ul>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">종류</div>
    </div>
    <div class="row justify-center q-mb-lg">
      <q-img :src="dbms2" style="width: 600px"></q-img>
    </div>

    <div class="text-h5 text-weight-bold q-mt-xl">DBMS</div>
    <div class="text-body1">
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        행(Row)과 열(Column)로 구성된 테이블을 통해 데이터를 관리
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        SQL(Structured Query Language)을 사용하여 데이터를 조작
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-mt-xl">SQL</div>
    <div class="text-body1">
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        Structured Query Language: DBMS의 데이터를 정의하고 질의, 수정 등을 하기 위해 고안된 언어
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        구조화된 형태를 가지는 언어로 웹 어플리케이션이 DBMS와 상호작용할 때 사용
      </div>
    </div>

    <div class="text-h5 text-weight-bold q-mt-xl">NoSQL = NRDBMS</div>
    <div class="text-body1">
      <div class="q-mt-sm" style="display: list-item; list-style-type: disc">
        Not Only SQL: SQL을 사용하지 않고 데이터를 다룰 수 있다
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        비관계형 데이터베이스
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        키-값을 사용해 데이터를 저장
      </div>
      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        SQL를 사용하지 않고 복잡하지 않은 데이터를 저장해 단순 검색 및 추가 검색 작업을 위해 매우
        최적화된 저장 공간
      </div>
    </div>
  </q-page>
</template>

<script setup>
import dbms1 from 'src/assets/dbms1.png'
import dbms2 from 'src/assets/dbms2.png'
</script>
