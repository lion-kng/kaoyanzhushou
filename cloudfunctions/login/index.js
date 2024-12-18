const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const usersCollection = db.collection('users')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { username, password } = event

  try {
    const user = await usersCollection.where({
      _openid: wxContext.OPENID,
      username: username,
      password: password
    }).get()

    if (user.data.length > 0) {
      return {
        openid: wxContext.OPENID,
        success: true,
        message: '登录成功'
      }
    } else {
      return {
        success: false,
        message: '用户名或密码错误'
      }
    }
  } catch (err) {
    return {
      success: false,
      message: '查询数据库失败',
      error: err
    }
  }
}