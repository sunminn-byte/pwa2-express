import express from 'express';
// import pool from '../db/my-db.js';
import db from '../app/models/index.js';
const { sequelize, Employee } = db;

const usersRouter = express.Router(); // 라우터 객체 인스턴스를 반환
// 인스턴스 : 라우터 객체를 만들어서 메모리에 올려둔 상태

// 특정 라우트에만 미들웨어 적용
// usersRouter.get('/', eduUsersTest, (request, response, next) => {
//   response.status(200).send('전체 유저 정보 조회 완료');
// });

usersRouter.get('/', (request, response, next) => {
  response.status(200).send('전체 유저 정보 조회 완료');
});

// usersRouter.get('/:id', (request, response, next) => {
//   response.status(200).send('유저 정보 조회 완료');
// });
usersRouter.get('/:id', async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    
    // -----------------------
    // Sequelize로 DB연동
    // -----------------------
    const result = await Employee.findByPk(id);
    return response.status(200).send(result);


    // -----------------------
    // mysql2로 DB연동
    // -----------------------
    // 쿼리 작성

    // 아래와 같이 작성할 경우 sql injection 문제 발생
    // const sql = `
    //   SELECT *
    //   FROM employees
    //   WHERE
    //     emp_id = ${id}
    // `;
    // const [result] = await pool.query(sql);
    // 아래와 같이 바꿔서 작성하면 보완 가능
    // const sql = `
    //   SELECT *
    //   FROM employees
    //   WHERE
    //     emp_id = ?
    // `;
    // // Prepared Statement
    // const [result] = await pool.execute(sql, [id]);

    // return response.status(200).send(result);

  } catch(error) {
    next(error);
  }
});

usersRouter.put('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
});

// 라우터 정의 .....

export default usersRouter;