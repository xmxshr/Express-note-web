var Sequelize = require('sequelize')
var path = require('path')

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
});

// sequelize
// .authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });

//设置数据的格式
const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  }
}); //会自动创建id createdAt updatedAt


// force: true will drop the table if it already exists
// Note.sync({force: true}).then(() => {
// //   // Table created
// //   Note.create({
// //     text: "hello",
// //     uid: "1",
// //     username: "Manager"
// //   })
// }).then(() => {
//   Note.findAll({raw: true}).then(notes => {
//     console.log(notes)
//     console.log('success')
//   })// raw: true 指查询数据
// })

// Note.findAll({raw: true, where: {id:2}}).then(notes => {
//   console.log(notes)
// })

module.exports.Note = Note
