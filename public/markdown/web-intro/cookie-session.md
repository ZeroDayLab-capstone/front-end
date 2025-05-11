[//]: # 'asset-path: ./assets'

# 5️⃣ 쿠키 / 세션

## **쿠키 🍪**

![ChatGPT Image 2025년 4월 19일 오후 05_15_51.png](119c89d1-8adb-4c50-99b4-f49b309aee88.png)

- 클라이언트의 인증 정보
- 정의: HTTP에서 상태를 유지하기 위해 사용하는 Key + Value 형태의 값
- 용도: 클라이언트의 정보 기록과 상태 정보를 표현
- 특징
  - 클라이언트는 쿠키를 조회, 수정, 추가할 수 0 why? 쿠키는 클라이언트에 저장되기 때문에
  - 쿠키의 만료: 클라이언트(브라우저)에서 관리
  - 쿠키의 설정: 클라이언트, 서버에서 설정
- 쿠키 열람 방법
  - `Console` 탭 → `document.cookie`를 입력
  - `Application` 탭 → `Cookies`를 펼치면 Origin 목록을 확인

## 세션

![image.png](image%201.png)

- 정의: 인증 정보를 서버에 저장하고 해당 데이터에 접근할 수 있는 키 = Session ID(유추할 수 없는 랜덤한 문자열)를 만들어 클라이언트에 전달하는 방식
- 용도: 쿠키에 인증 상태를 저장하지만 클라이언트가 인증 정보를 변조할 수 없게 하기 위해 만들어짐
- 브라우저: 해당 키를 쿠키에 저장하고 이후에 HTTP 요청을 보낼 때 사용 → 서버: 저장한 세션 키와 대응하는 클라이언트인지 확인하므로 안전한 서비스를 구현
- **세션 하이재킹**: 공격자가 이용자의 쿠키를 훔칠 수 있으며 세션에 해당하는 이용자의 인증 상태를 훔칠 수 있는 공격

## SOP

- Same Origin Policy = 동일 출처 정책: 현재 페이지의 출처가 아닌 다른 출처로부터 온 데이터를 읽지 못하게 하는 브라우저의 보안 메커니즘
- Origin 구분 방법
  | **URL** | **결과** | **이유** |
  | -------------------------------------------- | ----------------- | -------- |
  | https://same-origin.com/frame.html | Same Origin |
  | (현재 페이지와 동일한 출처) | Path만 다름 |
  | **http://**same-origin.com/frame.html | Cross Origin |
  | (현재 페이지와 다른 출처) | **Scheme**이 다름 |
  | https://**cross.**same-origin.com/frame.html | Cross Origin |
  | (현재 페이지와 다른 출처) | **Host**가 다름 |
  | https://same-origin.com**:1234**/ | Cross Origin |
  | (현재 페이지와 다른 출처) | **Port**가 다름 |

## CORS

- Same Origin Policy 제한 완화 방법
- Cross-Origin Resource Sharing = 교차 출처 리소스 공유: SOP의 제한을 받지 않고 Cross Origin의 데이터를 처리할 수 있도록 해주는 메커니즘
- 서버 측 HTTP 응답 결과
  | **Header** | **설명** |
  | -------------------------------- | --------------------------------------------------------- |
  | Access-Control-Allow-Origin | 헤더 값에 해당하는 Origin에서 들어오는 요청만 처리합니다. |
  | Access-Control-Allow-Methods | 헤더 값에 해당하는 메소드의 요청만 처리합니다. |
  | Access-Control-Allow-Credentials | 쿠키 사용 여부를 판단합니다. |
  | Access-Control-Allow-Headers | 헤더 값에 해당하는 헤더의 사용 가능 여부를 나타냅니다. |

## JSONP

- Same Origin Policy 제한 완화 방법
- JSON with Padding: `<script>` 태그를 이용해 다른 페이지의 데이터를 가져오는 방식
