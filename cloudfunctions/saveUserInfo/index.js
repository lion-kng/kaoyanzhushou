const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const usersCollection = db.collection('UserInfo')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { userInfoId, username, school, major, targetSchool, targetMajor } = event

  console.log('Received event:', event)

  try {
    if (userInfoId) {
      // 更新用户信息
      const updateResult = await usersCollection.doc(userInfoId).update({
        data: {
          username: username,
          school: school,
          major: major,
          targetSchool: targetSchool,
          targetMajor: targetMajor
        }
      })
      console.log('Update result:', updateResult)
      return {
        success: true,
        message: '更新成功'
      }
    } else {
      // 添加新用户信息
      const addResult = await usersCollection.add({
        data: {
          _openid: wxContext.OPENID,
          username: username,
          school: school,
          major: major,
          targetSchool: targetSchool,
          targetMajor: targetMajor
        }
      })
      console.log('Add result:', addResult)
      return {
        success: true,
        message: '保存成功'
      }
    }
  } catch (err) {
    console.error('Error:', err)
    return {
      success: false,
      message: '操作失败',
      error: err
    }
  }
}