// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const res = await db.collection('statistics').get()
    return {
      success: true,
      data: res.data
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      error: e
    }
  }
}