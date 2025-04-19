// intro.js
export default {
  navTitle: '웹',
  title: '1. 웹',
  content: `


      <!-- [1] 웹의 기본 구성 요소 -->
      <h2 style="margin-bottom: 8px; font-size: 1.2rem;">웹(web)이란?</h2>
      <ol style="margin-left: 24px; margin-bottom: 24px;">
        <li><strong>정의:</strong><br/> 인터넷을 기반으로 구현된 서비스 중 HTTP를 이용하여 정보를 공유하는 서비스</li>
      </ol>

      <h2 style="margin-bottom: 8px; font-size: 1.2rem;">웹의 기본 구성 요소</h2>
      <ol style="margin-left: 24px; margin-bottom: 24px;">
        <li><strong>웹 서버</strong><br/>정의: 정보를 제공하는 주체</li>
        <li><strong>웹 클라이언트</strong><br/>정의: 정보를 받는 이용자</li>
        <li><strong>HTTP/HTTPS</strong><br/>정의: 클라이언트와 서버 간의 데이터 전송을 담당하는 프로토콜</li>
        <li><strong>웹 리소스</strong><br/>정의: 웹에 갖춰진 정보 자산<br/>ex) HTML, JavaScript, CSS 등</li>
      </ol>

      <!-- [2] 웹의 동작 방식 -->
      <h2 style="margin-bottom: 8px; font-size: 1.2rem;">웹의 동작 방식</h2>
      <p style="margin-bottom: 8px;">
        웹은 <strong>클라이언트-서버 모델</strong>을 기반으로 동작합니다.
        사용자가 웹 브라우저에서 URL을 입력하면 다음과 같은 과정이 수행됩니다:
      </p>
      <ol style="margin-left: 24px; margin-bottom: 24px;">
        <li>DNS 조회: 입력한 도메인(URL)이 IP 주소로 변환됨</li>
        <li>서버 요청: 변환된 IP 주소의 웹 서버에 HTTP 요청 전송</li>
        <li>서버 응답: 웹 서버가 요청받은 HTML, CSS, JavaScript 파일을 클라이언트로 전송</li>
        <li>브라우저 렌더링: 클라이언트가 받은 데이터를 해석하여 웹 페이지 표시</li>
      </ol>

      <!-- [3] 웹 기술 -->
      <h2 style="margin-bottom: 8px; font-size: 1.2rem;">웹 기술</h2>
      <ol style="margin-left: 24px;">
        <li><strong>HTML</strong><br/>웹 페이지의 구조를 정의하는 마크업 언어</li>
        <li><strong>CSS</strong><br/>웹 페이지의 디자인 및 레이아웃을 담당하는 스타일시트 언어</li>
        <li><strong>JavaScript</strong><br/>웹 페이지에 동적인 기능을 추가하는 프로그래밍 언어</li>
      </ol>

    </section>
  `,
}
