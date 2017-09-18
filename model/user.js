var Sequelize = require('sequelize')
var path = require('path')

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
});


//设置数据的格式
const Note = sequelize.define('note', {
  // email: {
  //   type: Sequelize.STRING
  // },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.OBJECT
  }
}); 

Note.sync({force: true}).then(() => {
  Note.create({
    username: "hello",
    password: "1",
  })
}).then(() => {
  Note.findAll({raw: true}).then(notes => {
    console.log(notes)
  })// raw: true 只查询数据
})


module.exports.Note = Note
