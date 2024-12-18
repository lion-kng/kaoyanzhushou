const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const usersCollection = db.collection('users')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { username, password } = event

  console.log('Received event:', event)

  try {
    // 检查用户名是否已存在
    const userCheck = await usersCollection.where({
      username: username
    }).get()

    console.log('User check result:', userCheck)

    if (userCheck.data.length > 0) {
      return {
        success: false,
        message: '用户名已存在'
      }
    }

    // 插入新用户
    const addUserResult = await usersCollection.add({
      data: {
        _openid: wxContext.OPENID,
        username: username,
        password: password
      }
    })

    console.log('Add user result:', addUserResult)

    return {
      success: true,
      message: '注册成功'
    }
  } catch (err) {
    console.error('Error:', err)
    return {
      success: false,
      message: '注册失败',
      error: err
    }
  }
}