# 가계부
## 설치
1. 저장소를 클론한다.
```
git clone https://github.com/voiciphil/account-book
```
2. 프론트엔드에서 사용할 모듈을 설치한 후 파일을 빌드한다.
```
cd account-book/frontend
npm install
npm run build
```
3. 백엔드에서 사용할 모듈을 설치한다.
```
cd ../backend
npm install
```
4. MySQL 환경설정 파일을 생성한다.
* backend/db-config.json
```
{
  "development": {
    "username": "root",
    "password": "비밀번호",
    "database": "데이터베이스 이름",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorAliases": false
  }
}
```
5. .env 파일을 생성하여 jwt의 키를 생성한다.
* backend/.env
```
SECRETE_KEY="임의의 비밀 키"
```
6. 서버를 실행한다.
```
npm start
```
`http://localhost:3000`에 접속하면 가계부가 실행된다.
