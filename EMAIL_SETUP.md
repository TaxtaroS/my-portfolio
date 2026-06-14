# 포트폴리오 웹사이트 이메일 설정 가이드

## 이메일 기능 설정 단계

### 1단계: Gmail App Password 생성

1. Google 계정에 로그인: https://myaccount.google.com/
2. 왼쪽 메뉴에서 **"보안"** 선택
3. **"2단계 인증"** 활성화 (이미 활성화되어 있다면 다음 단계로)
4. **"앱 비밀번호"** 로 이동
5. 드롭다운에서:
   - 앱: **메일**
   - 기기: **Windows 컴퓨터** (또는 사용 중인 기기)
6. **"생성"** 클릭
7. 16자리 비밀번호 복사

### 2단계: .env 파일 설정

`.env` 파일을 열고 다음과 같이 수정:

```
EMAIL_USER=cwhsin76@gmail.com
EMAIL_PASS=생성된16자리비밀번호
EMAIL_TO=cwhsin76@gmail.com
PORT=3000
```

예: `EMAIL_PASS=abcd efgh ijkl mnop`

### 3단계: 서버 실행

터미널에서 두 개의 탭/창을 열어 실행:

**탭 1 - 이메일 서버:**
```bash
npm start
```
출력: `Email server running on port 3000`

**탭 2 - 개발 서버:**
```bash
npm run dev
```
출력: `Local: http://localhost:5174/`

### 4단계: 테스트

1. 브라우저에서 http://localhost:5174/ 열기
2. 아래로 스크롤하여 "Contact" 섹션 찾기
3. 이름, 이메일, 메시지 입력
4. **"Send Message"** 버튼 클릭
5. 성공 메시지 확인
6. Gmail에서 메시지 수신 확인

## 트러블슈팅

- **"계정으로 로그인할 수 없습니다"** 오류
  → Gmail App Password를 올바르게 입력했는지 확인
  → 공백 제거하고 정확히 입력

- **이메일을 받지 못함**
  → Gmail 스팸 폴더 확인
  → 서버가 실행 중인지 확인 (`npm start`)
  → 포트 3000이 이미 사용 중이 아닌지 확인

- **포트 3000이 이미 사용 중**
  ```bash
  netstat -ano | findstr :3000
  ```
  또는 `.env`에서 포트를 다른 번호로 변경

## 프로덕션 배포

Vercel, Heroku 등에 배포할 때는 환경 변수를 설정하는 대시보드에서:
- `EMAIL_USER`: cwhsin76@gmail.com
- `EMAIL_PASS`: App Password
- `EMAIL_TO`: cwhsin76@gmail.com
- `PORT`: 3000
