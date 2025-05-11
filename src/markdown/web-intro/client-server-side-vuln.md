[//]: # 'asset-path: ./assets'

# 8️⃣ 클라이언트 사이드 취약점 / 서버 사이드 취약점

| 비교 항목   | **클라이언트 사이드**             | **서버 사이드**                        |
| ----------- | --------------------------------- | -------------------------------------- |
| 공격 대상   | 사용자의 브라우저                 | 웹 서버 및 데이터베이스                |
| 공격 방식   | JavaScript 삽입, HTML 변조        | 서버 명령 실행, 데이터베이스 조작      |
| 주요 취약점 | XSS, CSRF, Clickjacking           | SQL Injection, Command Injection, SSRF |
| 보안 대책   | 입력값 필터링, CSP, SameSite 설정 | Prepared Statement, WAF, 인증 강화     |
