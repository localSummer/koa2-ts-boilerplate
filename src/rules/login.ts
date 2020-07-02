import { SchemaModel, StringType, NumberType } from 'schema-typed';

const model = SchemaModel({
  username: StringType().isRequired('用户名不能为空'),
  email: StringType().isEmail('请输入正确的邮箱'),
  age: NumberType('年龄应该是一个数字').range(18, 30, '年龄应该在 18 到 30 岁之间')
});

export default model;
