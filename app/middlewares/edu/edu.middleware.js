// 전역 미들웨어
export const eduTest = (request, response, next) => {
  console.log('eduTest 미들웨어 실행'); // 동작 확인
  next(); // (next필수) 다음 미들웨어 또는 처리로 진행
}

// users 기능에서 사용할 미들웨어
export const eduUsersTest = (request, response, next) => {
  console.log('eduUsersTest 미들웨어 실행'); // 동작 확인
  next(); // (next필수) 다음 미들웨어 또는 처리로 진행
}