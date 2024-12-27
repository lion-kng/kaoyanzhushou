// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { date, type, increment } = event
  const collection = db.collection('statistics')
  console.log('event:', event)
  try {
    console.log('date:', date)
    const res = await collection.where({ date }).get()
    if (res.data.length > 0) {
      console.log('length:', res.data.length)
      const doc = res.data[0]
      const updateData = type === 'urgent' ? { urgentTodos_num: db.command.inc(increment) } : { nonUrgentTodos_num: db.command.inc(increment) }

      await collection.doc(doc._id).update({
        data: updateData
      })
      // 输出更新后的任务数量
      const updatedDoc = await collection.doc(doc._id).get()
      console.log('更新后的任务数量:', updatedDoc.data)
    } else {
      console.log('new-todo-type', type)
      const newData = {
        date,
        urgentTodos_num: type === 'urgent' ? increment : 0,
        nonUrgentTodos_num: type === 'non-urgent' ? increment : 0
      }
      await collection.add({
        data: newData
      })
      // 输出新添加的任务数量
      console.log('新添加的任务数量:', newData)
    }
    return { success: true }
  } catch (e) {
    console.error('error:', e)
    console.error(e)
    return { success: false, error: e }
  }
}