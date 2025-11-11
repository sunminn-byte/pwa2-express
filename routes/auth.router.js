import express from 'express';

const authRouter = express.Router(); // 라우터 객체 인스턴스를 반환
// 인스턴스 : 라우터 객체를 만들어서 메모리에 올려둔 상태

authRouter.post('/login', (request, response, next) => {
  response.status(200).send('로그인 성공');
});

authRouter.post('/registration', (request, response, next) => {
  response.status(200).send('회원가입 성공');
});

// 라우터 정의 .....

export default authRouter;