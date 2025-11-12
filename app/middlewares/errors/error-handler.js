// errorHandler : 에러를 받아서 유저에게 반환하는 역할
// app.js에서 위치는 대체라우터 뒤, listening 앞에 위치함

export function errorHandler(error, request, response, next) {
  console.log(error.message);

  return response.status(500).send('예외 발생: 에러 핸들러');
}