<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold">✅소개</div>
    <div class="row justify-center q-my-lg">
      <q-img :src="xss1" style="width: 500px"></q-img>
    </div>

    <div class="text-h6">
      <div style="display: list-item; list-style-type: disc">
        Cross Site Scripting (XSS)공격은 웹 애플리케이션의 보안 취약점 중 하나로, 공격자가 악의적인
        스크립트를 삽입해 사용자 측에서 실행되도록 유도하는 공격 방식입니다.
      </div>
      <div>
        웹 보안 분야에서 가장 자주 등장하고 위협적인 취약점 중 하나이며, OWASP Top 10에도 지속적으로
        포함되고 있습니다.
      </div>

      <div style="display: list-item; list-style-type: disc">
        XSS는 발생 형태에 따라서 다양한 종류로 구분되는데, 아래에서 XSS 종류와 악성 스크립트가
        삽입되는 위치를 확인할 수 있습니다.
      </div>
    </div>

    <div class="row justify-center q-my-lg">
      <q-img :src="xss2" style="width: 750px"></q-img>
    </div>

    <div class="text-h6">
      <div style="display: list-item; list-style-type: disc">
        Javascript는 웹 문서의 동작을 정의합니다. 이는 이용자가 버튼 클릭 시에 어떤 이벤트를
        발생시킬지와 데이터 입력 시 해당 데이터를 전송하는 이벤트를 구현할 수 있습니다.
      </div>
      <div>
        이러한 기능 외에도 이용자와의 상호 작용 없이 이용자의 권한으로 정보를 조회하거나 변경하는
        등의 행위가 가능합니다.
      </div>
      <div>
        이러한 행위가 가능한 이유는 이용자를 식별하기 위한 세션 및 쿠키가 웹 브라우저에 저장되어
        있기 때문입니다.
      </div>
      <div>
        따라서 공격자는 자바스크립트를 통해 이용자에게 보여지는 웹 페이지를 조작하거나, 웹
        브라우저의 위치를 임의의 주소로 변경할 수 있습니다.
      </div>

      <div class="q-mt-md" style="display: list-item; list-style-type: disc">
        자바스크립트는 다양한 동작을 정의할 수 있기 때문에 XSS 공격에 주로 사용됩니다.
        자바스크립트를 실
      </div>
      <div>
        행하기 위한 태그로는 <span style="color: red">{{ codeSnippet2 }}</span> 가 있습니다
      </div>
      <div class="text-h5 text-weight-bold q-pt-lg">✅XSS 작동 원리</div>
      <div class="text-h6 q-pa-sm">
        <div>
          1. 사용자가 웹사이트에 입력값을 전달 ( <span style="color: red">{{ codeSnippet }}</span> )
        </div>
        <div>2. 서버가 이 입력을 필터링 없이 페이지에 그대로 출력</div>
        <div>3. 브라우저가 HTML과 Javascript를 함께 해석하면서 스크립트가 실행</div>
        <div>4. 쿠키 탈취, 리디렉션, UI변조 등 다양한 악성 행위가 발생</div>
        <div>
          ➡️즉, XSS는 사용자의 입력이 서버에서 검증 없이 출력될 때 브라우저에서 코드가 실행되어
          공격이 일어납니다.
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import xss1 from 'src/assets/xss1.png'
import xss2 from 'src/assets/xss2.png'

const codeSnippet2 = '<script>'
const codeSnippet = '<script>alert("XSS")<' + '/script>'
</script>
