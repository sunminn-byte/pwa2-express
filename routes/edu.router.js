import express from 'express';
import db from '../app/models/index.js';
import { Op } from 'sequelize';
import dayjs from 'dayjs';
const { sequelize, Employee } = db;

const eduRouter = express.Router();

eduRouter.get('/api/edu', async (request, response, next) => {
  try {
    const fireDate = request.query.date;

    let result = null;


    // -----------------------
    // 평문으로 실행하고 싶을 경우
    // -----------------------
    // 평문(원시 sql) : 아래와 같이 sql을 직접 입력
    // const sql = `SELECT * FROM employees WHERE fire_at >= ?`;
    // // Prepared Statement
    // result = await sequelize.query(
    //   sql,
    //   {
    //     replacements: [fireDate], // ?가 여러개면 ? 순서대로 적어줘야 함
    //     type: sequelize.QueryTypes.SELECT, // 평문일때 type 필수
    //   }
    // );

    // -----------------------
    // Model 메소드
    // -----------------------

    // findAll(options) : 조건에 맞는 `전체` 레코드 조회
    // 결과는 `배열`로 만들어짐
    // SELECT emp_id, `name`, birth FROM employees WHERE emp_id = 1;
    // 위와 같이 평문으로 만든 후 아래와 같이 적용    
    // result = await Employee.findAll({ // await로 비동기를 동기처리로 바꿔줘야 함
    //   attributes: ['empId', 'name', 'birth'], // 조회할 컬럼 지정(SELECT 절)
    //   where: {
    //     // empId: 1 // emp_id = 1
    //     empId: {
    //       // [Op.lte]: 100 // emp_id <= 100
    //       [Op.between]: [50, 100] // emp_id BETWEEN 50 AND 100
    //     }
    //   },
    // });

    // findOne(options) : 조건에 맞는 `첫번째` 레코드 조회
    // 결과는 `객체`로 만들어짐
    // result = await Employee.findOne({
    //   attributes: ['empId', 'name', 'birth'],
    //   where: {
    //     empId: {
    //       [Op.between]: [50, 100]
    //     }
    //   },
    // });

    // findByPk(id, options) : PK 기준 단일 레코드 조회
    // result = await Employee.findByPk(50000, {
    //   attributes: ['empId', 'name'],
    // });

    // count(options), sum(field, options), max(field, options), min(field, options), avg(field, options)
    // GROUP BY절과 상관없음
    // SELECT COUNT(*) FROM employees WHERE deleted_at IS NULL;
      // 모델 파일의 Soft Delete 설정 때문에 deleted_at IS NULL이 들어가 있음
    // result = await Employee.count();
    // Soft Delete를 false로 설정하면 deleted_at 조건없이 모두 확인 가능
    // result = await Employee.count({
    //   paranoid: false,
    // });
    // result = await Employee.max('empId');

    // create(values, options) : 새 레코드 생성 후 생성된 레코드를 반환
    // result = await Employee.create({
    //   name: '테스트',
    //   birth: '2000-01-01',
    //   // hireAt: new Date(),
    //   hireAt: dayjs().format('YYYY-MM-DD'),
    //   gender: 'F',
    // });

    // update(values, options) : options 조건에 맞는 기존 레코드 수정 후 영향받은 레코드 수를 반환
    // UPDATE INTO employees SET name = "사자" WHERE emp_id >= 100007;
    // result = await Employee.update(
    //   {
    //     name: '사자'
    //   }
    //   ,{
    //     where: {
    //       empId: 100006
    //       // empId: {
    //       //   [Op.gte]: 100007
    //       // }
    //     }
    //   }
    // );

    // update와 save의 차이점 : save는 모델을 먼저 가져와야 함, 반환 값이 다름, 둘 중 내가 편한거 사용하면 됨
    // update : 대량의 데이터 수정 할 때 사용하기 좋음
    // save : 하나의 데이터 수정 할 때 사용하기 좋음

    // save() : 모델 인스턴스를 기반으로 레코드 생성 및 수정 후 수정된 레코드를 반환
    // const employee = await Employee.findByPk(100007); // employee는 모델 객체
    // employee.name = '둘리';
    // employee.birth = '1900-12-12';
    // result = await employee.save();

    // // build() : save()를 이용한 새로운 데이터 생성
    // const employee = await Employee.build(); // 빈 모델 객체 인스턴스
    // employee.name = '또치';
    // employee.birth = '1980-01-01';
    // employee.gender = 'F';
    // employee.hireAt = dayjs().format('YYYY-MM-DD');
    // result = await employee.save();

    // -----------------------
    // destroy(options) : 조건에 맞는 레코드 삭제 후 영향받은 레코드 수를 반환
    // deleted_at 에 값이 들어감 (soft delete 설정 때문에)
    // result = await Employee.destroy({
    //   where: {
    //     empId: 100009
    //   },
    //   // destroy에서 paranoid(soft delete) 해제하는 방법
    //   // force: true // 모델에 `paranoid: true`일 경우에 물리적 삭제를 위한 옵션
    // });

    // -----------------------
    // restore(options) : Soft Delete 된 레코드를 복원
    // result = await Employee.restore({
    //   where: {
    //     empId: 100009
    //   }
    // });

    // where 옵션 : 조건 지정 (AND)
    // 이름이 '강가람'이고, 성별이 여자인 사원 정보 조회
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'gender'],
    //   where: {
    //     name: '강가람',
    //     gender: 'F',
    //     // [Op.and]: [
    //     //   { name: '강가람' },
    //     //   { name: '신서연' }
    //     // ],
    //   }
    // });

    // where 옵션 : 조건 지정 (OR)
    // 이름이 '강가람' 또는 '신서연'인 사원 조회
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'gender'],
    //   where: {
    //     [Op.or]: [
    //       { name: '강가람' },
    //       { name: '신서연' }
    //     ],
    //   }
    // });

    // where 옵션 : 조건 지정 (AND와 OR 동시 사용)
    // 성별이 여자이고, 이름이 '강가람' 또는 '신서연'인 사원 조회
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'gender'],
    //   where: {
    //     gender: 'F',
    //     [Op.or]: [
    //       { name: '강가람' },
    //       { name: '신서연' },
    //     ]
    //   }
    // });

    // result = await Employee.findAll({
    //   where: {
    //     // empId: {
    //     //   // [Op.between]: [1, 100] // 1~100
    //     //   // [Op.notBetween]: [1, 100] // 1~100을 제외한 전체
    //     //   [Op.in]: [1, 2, 3] // 1,2,3
    //     //   // [Op.notIn]: [1, 2, 3] // 1,2,3을 제외한 전체
    //     // },
    //     name: {
    //       [Op.like]: '%가람'
    //       // [Op.iLike]: '%가람' // 대소문자 무시
    //     },
    //     fireAt: {
    //       // null 조건
    //       [Op.is]: null
    //       // [Op.not]: null
    //     }
    //   }
    // });

    // orderby, limit(offset)
    // result = await Employee.findAll({
    //   where: {
    //     empId: {
    //       [Op.gte]: 10000
    //     }
    //   },
    //   order: [
    //     ['name', 'ASC'],
    //     ['birth', 'DESC'],
    //   ],
    //   limit: 10,
    //   offset: 10,
    // });

    // groupby, having
    result = await Employee.findAll({
      attributes: [
        'gender',
        [sequelize.fn('COUNT', sequelize.col('*')), 'cnt_gender']
      ],
      group: ['gender'],
      having: sequelize.literal('cnt_gender >= 40000'),
    });



    return response.status(200).send({
      msg: '정상 처리',
      data: result,
    });
  } catch(error) {
    next(error);
  }
});

export default eduRouter;