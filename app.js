import express from 'express'; // express 모듈 가져오기
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
import { eduTest, eduUsersTest } from './app/middlewares/edu/edu.middleware.js';
import { errorHandler } from './app/middlewares/errors/error-handler.js';

const app = express();
app.use(express.json()); // JSON으로 요청이 올 경우 파싱 처리(미들웨어)
app.use(eduTest); // 커스텀 미들웨어 전역 등록

// app.get(); : http method가 get인거만 가져옴
// request : 유저가 보내온 모든 parameter들이 담김(요청)
// response : 유저에게 줄 정보를 셋팅해서 전달(응답)
// next : 미들웨어(다음처리로 이동할 때)

// 클라이언트가 '/api/hi' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/api/hi', (request, response, next) => {
  response.status(200).send({
    code: '00',
    msg: '안녕 익스프레스!'
  });
});

// 클라이언트가 '/api/hi' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/api/hi', (request, response, next) => {
  response.status(200).send('포스트 익스프레스!');
});

// 클라이언트가 '/api/hi' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/api/hi', (request, response, next) => {
  response.status(200).send('풋 익스프레스!');
});

// 클라이언트가 '/api/hi' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/api/hi', (request, response, next) => {
  response.status(200).send('딜리트 익스프레스!');
});


// ---------------------------------------------
// Query Parameter 제어 (RESTful API에서 사용X)
// `Request.query` 를 통해서 접근 가능
// 모든 값을 string으로 받기 때문에 주의 필요
// GET일때만 사용 가능
app.get('/api/posts', (request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age = parseInt(request.query.age); // 백엔드에는 무조건 string으로 넘어오기 때문에 parseInt

  // console.log(name, age); // 서버에서 확인 가능
  response.status(200).send(params); // 포스트맨에서 확인 가능
});

// ---------------------------------------------
// Segment Parameter
// `Request.params` 를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id; // 위의 :뒤에 있는거랑 동일하게 적어줘야 함(/:id -> .id)
  console.log(typeof(postId));
  response.status(200).send(postId);
});

// ---------------------------------------------
// JSON 요청 제어
// `Request.body` 를 통해서 접근 가능(** express.json() 추가 필요 **)
app.post('/api/posts', (request, response, next) => {
  // const data = request.body; // 유저가 보낸 데이터 받기
  // response.status(200).send(data); // 유저가 보낸 데이터를 포스트맨에서 확인
  // 포스트맨에서 raw-JSON 체크

  const {account, password, name} = request.body;
  // const account = request.body.account;
  // const password = request.body.password;
  // const name = request.body.name;
  response.status(200).send({account, password, name});
  // response.status(200).send({
  //   account: account,
  //   password: password,
  //   name: name
  // });
});


// ---------------------------------------------
// 라우트 그룹
// ---------------------------------------------
// 라우트를 모듈로 나누고 그룹핑하여 관리
// 대체 라우트보다 위에 있어야 함.(대체 라우트는 가장 아래에 위치 필수)
// usersRouter 에만 eduUsersTest 미들웨어 적용
app.use('/api', authRouter);
app.use('/api/users', eduUsersTest, usersRouter);


// 에러 테스트용 라우트
app.get('/error', (request, response, next) => {
  // `throw`를 이용하여 에러 핸들링 처리도 가능
  // (throw는 비동기 처리 내부에서는 사용 불가(핸들링 못함))
  // throw new Error('쓰로우로 예외 발생');

  // 비동기 처리 내부에서는 반드시 `next(error)`를 이용해야 서버 crashed 안 일어남
  setTimeout(() => {
    next(new Error('쓰로우로 예외 발생'));
  }, 1000);
});


// ---------------------------------------------
// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
// ---------------------------------------------
// 위에서 정하지 않은 나머지 모든 경로
// use() : 모든 경로
// 위와 다르게 포트 설정 없음
// 미들웨어의 일종
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01',
    msg: '찾을 수 없는 페이지입니다.'
  });
});


// ---------------------------------------------
// Error Handler 등록
// ---------------------------------------------
app.use(errorHandler);


// 서버를 주어진 포트에서 시작
app.listen(3000);
// 3000은 임의로 사용 가능(이 컴퓨터내에서 이미 사용중인 번호는 중복 사용 불가)
// 최초에 서버를 시작할 때
// 유저가 언제 시작할 지 모르기때문에 항상 켜져있어야 함
// 첫번째 : 시작할 포트 number
// 두번째 : hostname, 보통 콜백함수로, 요청할거 없으면 사용x
// app.listen(3000, () => {
//   console.log(`3000포트에서 리스닝`);
// });