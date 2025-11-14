import dayjs from "dayjs";
import { DataTypes } from "sequelize";

// 모델명
const modelName = 'Title';

// 컬럼 정의
const attributes = {
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4),
    primaryKey: true,
    allowNull: false,
    comment: '직급 코드',
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '직급명',
  },
  createdAt: {
    field: 'created_at',
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

// Options 설정
const options = {
  tableName: 'titles',
  timestamps: true,
  paranoid: true,
};

// 모델 객체 생성
const Title = {
  init: (sequelize) => {
    const defineTitle = sequelize.define(modelName, attributes, options);

    return defineTitle;
  },
  // 모델 관계를 정의
  associate: (db) => {
    db.Title.hasMany(db.TitleEmp, { sourceKey: 'titleCode', foreignKey: 'titleCode', as: 'titleEmps' });
  }
};

export default Title;