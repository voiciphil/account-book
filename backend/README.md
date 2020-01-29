# 가계부 REST API

* #### POST /api/auth/sign-in  
> 아이디와 비밀번호를 보내면 토큰이 발급된다.
* 요청
```
{
  "id": "voiciphil",
  "pw": "aaa123"
}
```
* 응답
```
{
  "token": "asdf.asdf.asdf",
  "message": "success"
}
```

* #### GET /api/auth/verify
> 유효한 토큰인지 검사한다.
* 헤더
```
"x-access-token"="asdf.asdf.asdf"
```
* 응답
```
{
  "success": true
}
```

* #### POST /api/auth/sign-up
> 아이디와 비밀번호를 DB에 저장된다.
* 요청
```
{
  "id": "voiciphil",
  "pw": "aaa123"
}
```
* 응답
```
{
  "success": true
}
```
- - -
* #### GET /api/transactions
> 사용자의 거래 내역을 모두 한다.
* 헤더
```
"x-access-token"="asdf.asdf.asdf"
```
* 응답
```
{
  "data": [
    {
      "id": 1,
      "user_id": "voicphil",
      "date": "2020-01-01",
      "category": "수입",
      "breakdown": "월급",
      "price": 5000000
    },
    {
      "id": 2,
      "user_id": "voicphil",
      "date": "2020-01-01",
      "category": "식비",
      "breakdown": "파스타",
      "price": -12000
    }
  ],
  "message": "success"
}
```
* #### POST /api/transactions
> 거래 내역의 정보를 DB에 저장한다.
* 헤더
```
"x-access-token"="asdf.asdf.asdf"
```
* 요청
```
{
  "date": "2020-01-01",
  "category": "식비",
  "breakdown": "파스타",
  "price": -12000
}
```
* 응답
```
{
  "success": true
}
```
* #### DELETE /api/transactions/:id
> id에 해당하는 거래 내역을 삭제한다.
* 헤더
```
"x-access-token"="asdf.asdf.asdf"
```
* 응답
```
{
  "success": true
}
```
* #### PATCH /api/transactions/:id
> id에 해당하는 거래 내역을 수정한다.
* 헤더
```
"x-access-token"="asdf.asdf.asdf"
```
* 요청
```
{
  "date": "2020-01-01",
  "category": "식비",
  "breakdown": "파스타",
  "price": -12000
}
```
* 응답
```
{
  "success": true
}
```
* #### GET /api/transactions/categories
> 카테고리를 모두 반환한다.
* 헤더
```
"x-access-token"="asdf.asdf.asdf"
````
* 응답
````
{
  "data": [
    {
      "category": "수입"
    },
    {
      "category": "식비"
    }
  ],
  "success": true
}
