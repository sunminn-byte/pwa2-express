import { body } from "express-validator";

// 아이디  필드
export const account = body('account')
  .trim() // trim : 좌우 공백 제거
  .notEmpty() // 필수
  .withMessage('아이디는 필수 항목입니다.')
  .bail() // 위 처리 통과 못하면 더이상 처리 안 함
  .matches(/^[a-zA-Z0-9]{4,8}$/)
  .withMessage('영어 대/소문자, 숫자, 4~8 글자 허용')
;

// 위 처리가 없다며 아래와 같이 if를 계속 붙여서 만들어야 함
// const test = 'sadfsdf'.trim();
// if(!test) {
//   return '아이디는 필수 항목입니다.';
// }
// if(/^[a-zA-Z0-9]{4,8}$/.test(test)) {
//   return '영어 대/소문자, 숫자, 4~8 글자 허용'
// }

// 비밀번호 필드
export const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@]{4,8}$/)
  .withMessage('영어 대/소문자, 숫자, 특수문자(!@), 4~8 글자 허용')
;

// 이름 필드
export const name = body('name')
  .trim()
  .notEmpty()
  .withMessage('이름은 필수 항목입니다.')
  .bail()
  .matches(/^[가-힣]{2,30}$/)
  .withMessage('한글 2~30글자 허용')
;