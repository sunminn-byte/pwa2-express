import express from 'express';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';

const usersRouter = express.Router(); // 라우터 객체 인스턴스를 반환
// 인스턴스 : 라우터 객체를 만들어서 메모리에 올려둔 상태

// 특정 라우트에만 미들웨어 적용
// usersRouter.get('/', eduUsersTest, (request, response, next) => {
//   response.status(200).send('전체 유저 정보 조회 완료');
// });

usersRouter.get('/', (request, response, next) => {
  response.status(200).send('전체 유저 정보 조회 완료');
});

usersRouter.get('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료');
});

usersRouter.put('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
});

// 라우터 정의 .....

export default usersRouter;