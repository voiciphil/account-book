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
4. .env 파일을 생성하여 jwt의 키와 데이터베이스 정보를 입력한다.  
입력하지 않으면 기본값으로 생성된다.
* backend/.env
```
SECRET_KEY='임의의 비밀 키'
MYSQL_USERNAME='MySQL 사용자 이름' (기본값: 'root')
MYSQL_PASSWORD='MySQL 비밀번호' (기본값: '')
MYSQL_DATABASE='MySQL 스키마 이름' (기본값: 'account-book')
MYSQL_HOST='MySQL 서버 주소' (기본값: '127.0.0.1')
```
5. 서버를 실행한다.
```
npm start
```
`http://localhost:3000`에 접속하면 가계부가 실행된다.
