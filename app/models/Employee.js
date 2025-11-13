import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Employee'; // 모델명 (JS 내부에서 사용하는 이름)

// 컬럼 정의
const attributes = {
  empId: { // 컬럼명을 카멜기법으로 작성
    field: 'emp_id', // DB의 컬럼 물리명
    type: DataTypes.BIGINT.UNSIGNED, // 컬럼 데이터 타입 지정
    primaryKey: true, // PK 지정
    allowNull: false, // NULL 비허용
    autoIncrement: true, // AUTO_INCREMENT 지정
    comment: '사원 ID', // 코멘트 설정
  },
  name: {
    field: 'name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '사원명',
  },
  birth: {
    field: 'birth',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '사원 생년월일',
    get() {
      const val = this.getDataValue('birth');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  gender: {
    field: 'gender',
    type: DataTypes.CHAR(1),
    allowNull: false,
    comment: '사원 성별',
  },
  hireAt: {
    field: 'hire_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '입사일',
    get() {
      const val = this.getDataValue('hireAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  fireAt: {
    field: 'fire_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '퇴직일',
    get() {
      const val = this.getDataValue('fireAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  supId: {
    field: 'sup_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
    comment: '사수 번호',
  },
  createdAt: {
    field: 'created_at',
    // type: DataTypes.NOW,
    // 레코드 생성시점의 날짜(NOW설정시 defaultValue 필요없음)
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
    comment: '작성일',
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
    comment: '수정일',
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

// Options 설정 (테이블 관련 설정)
const options = {
  tableName: 'employees', // 실제 테이블명
  timestamps: true, // createdAt, updatedAt 자동 관리 (컬럼명이 바뀌면 안됨)
  // createdAt: 'empCreatedAt', // 컬럼명이 다르면 이렇게 추가 설정해줘야 함
  // updatedAt: false, // timestamps에서 말고 따로 관리가 필요할 때
  paranoid: true, // Soft Delete 설정 (deletedAt 자동 관리), false면 물리적 삭제 가능
}

// 모델 객체 작성
const Employee = {
  init: (sequelize) => { // 모델 초기화할때 호출되는 함수
    const defineEmployee = sequelize.define(modelName, attributes, options);
    // index.js에서 sequelize 받아서 sequelize안에 있는 define method를 사용
    // (modelName, attributes, options) : 위에서 정의한거 가져와서 사용

    return defineEmployee;
  },
};

export default Employee;