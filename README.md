# S-Calendar

## 프로젝트 개요
### 프로젝트 목적과 주요 기능
#### 목적
- Calendar를 활용하여 일정, 할 일, 일기를 기록하는 서비스 구현
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
- MySQL
#### DevOps
- AWS EC2
- Docker Compose
- Github Actions
- Git Hooks

## 서비스 아키텍처
![Image | 100](https://github.com/user-attachments/assets/970540e7-5ce3-4d3e-9465-34fc639ab9ae)

## 로컬 설치 및 실행 방법
- 환경변수는 /be 경로에 있는 .env.example 파일을 참고하여 작성

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

#### 메인 페이지 및 회원가입 
https://github.com/user-attachments/assets/5e327392-3997-4297-9674-efb8a220b28e

#### 로그인
https://github.com/user-attachments/assets/16300cca-5ccb-4ef4-a149-b3d916d7306a

#### 소셜 로그인
https://github.com/user-attachments/assets/2cccf531-23a7-4804-b462-4a9b502fcdbf

#### 일정
https://github.com/user-attachments/assets/87b9a189-44f6-47c8-803f-1301dd9f05de

#### 할 일
https://github.com/user-attachments/assets/7d88b05f-68aa-4fb2-abfd-e00fd4516117

#### 일기
https://github.com/user-attachments/assets/85b7f399-46ad-481e-8e1b-2637fafed372

#### 달력 표시
https://github.com/user-attachments/assets/5099270e-4d60-4847-badc-d241e5e3a1fd

#### 달력 설정
https://github.com/user-attachments/assets/e5dbed87-d758-4611-9cc7-414eca640078
