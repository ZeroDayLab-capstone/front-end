export default {
  navTitle: '쿠키 / 세션',
  title: '5. 쿠키 / 세션',
  content: `
    <h3>쿠키</h3>
    <p>쿠키(Cookie)는 웹 브라우저에 저장되는 작은 데이터 조각으로,
    사용자 식별이나 설정 정보를 보관하는 데 사용됩니다.</p>

    <h3>세션</h3>
    <p>서버 측에서 유지되는 사용자 상태를 말하며, 세션 ID를 통해
    클라이언트-서버 간 연결 상태를 추적합니다.</p>

    <h4>SOP (Same-Origin Policy)</h4>
    <p>동일 출처(Origin)에서만 자원 접근을 허용하는
    웹 보안 정책입니다.</p>

    <h4>CORS (Cross-Origin Resource Sharing)</h4>
    <p>서로 다른 출처 간 요청을 제한적으로 허용하기 위한
    메커니즘입니다.</p>

    <h4>JSONP</h4>
    <p>과거 CORS가 등장하기 전,
    <code>&lt;script&gt;</code> 태그를 통해 JSON 응답을 받는 방식으로
    크로스 도메인 요청을 우회하는 기법이었습니다.</p>
  `,
}
