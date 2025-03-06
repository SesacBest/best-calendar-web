# S-Calendar

## 프로젝트 개요
### 프로젝트 목적과 주요 기능
#### 목적
- Calendar를 활용하여 일정, 할 일, 일기를 기록하는 서비스를 구현한다.
#### 주요기능
1. 회원가입 / 로그인(소셜 로그인)
2. 캘린더
3. 일정, 할 일, 일기 기록

### 문제 정의와 타겟
#### 문제
- 시중에 나와있는 대부분의 캘린더 서비스들은 기능이 많고 복잡하여 사용성이 떨어짐
- 필수 기능만 탑재한 심플한 디자인의 캘린더 서비스 제공
#### 타겟
- 심플하고 깔끔한 캘린더 서비스를 사용하고 싶은 누구나

### 기술 스택
#### FrontEnd
- React
- Redux
- TailWind CSS
- Axios
- Vite
- Full Calendar
- Tiptap
#### BackEnd
- Spring Boot
- Spring Data JPA
- Spring Security
- NginX
- OAuth2
#### DB
- Mysql
#### DevOps
- AWS EC2
- Docker Compose
- Github Actions
- Git Hooks

## 서비스 아키텍처
- 

## 설치 및 실행 방법
- 환경변수는 /root, /backend 경로에 있는 .env.example 파일을 참고하여 작성

#### FrontEnd
```
cd fe/
npm install
npm run dev
```

#### BackEnd
```
cd be/
docker compose -f docker-compose-db.yml up
./gradlew bootrun
```

## 주요 기능
1. 회원가입 / 로그인(소셜 로그인)
  - 
2. 캘린더
  - 
3. 일정, 할 일, 일기 기록
  - 
