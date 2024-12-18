//app.js
const defaultTime = {
  defaultWorkTime: 30,
  defaultRestTime: 5
}


App({
  onLaunch: function() {
    wx.cloud.init({
      env: 'kaoyanzhushou-0gjcwizg6a48443a'
    })
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
  // viblong: function(){

  //   var vibison = wx.getStorageSync('vibison')
  //   console.log(vibison)
  // }
})
