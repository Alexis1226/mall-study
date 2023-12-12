# Mall

![Mall image](/public/mall.png)

React의 페이지기반 라우팅을 적용한 쇼핑몰 [배포 링크 클릭!](https://mall-study-client-ilou.vercel.app/products)

## 설치 및 실행

```
$ git clone https://github.com/Alexis1226/mall-study.git

# for client-side
$ yarn client

# for server-side
$ yarn server
```

http://localhost:5173 으로 접속

## 기술 스택

Frontend: React.js, Typescript, Vite, Recoil, React-Query, SCSS

Backend: GraphQL, AplloClient, Firebase

Deployment: Vercel & Heroku

# 화면구성

|               상품목록               |          어드민 상품목록           |
| :----------------------------------: | :--------------------------------: |
| ![상품목록](/public/productList.png) | ![상품목록](/public/adminList.png) |
|               장바구니               |                결제                |
|  ![상품목록](/public/cartList.png)   |    ![상품목록](/public/pay.png)    |

# 주요 기능

✨ 어드민 페이지에서 상품 등록, 수정, 삭제할 수 있는 기능

✨ 상품을 장바구니에 다고 장바구니에서 수량 조절 기능

✨ 장바구니에 있는 상품 중 선택해서 주문하는 결제 기능
