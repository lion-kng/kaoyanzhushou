//app.js
const defaultTime = {
  defaultWorkTime: 30,
  defaultRestTime: 5
}


App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // 检查本地存储中的登录状态
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (isLoggedIn) {
      // 如果已经登录过，直接跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }

    // 获取 openid 并存储到本地
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        wx.setStorageSync('openid', res.result.openid);
      },
      fail: err => {
        console.error('获取 openid 失败', err);
      }
    });

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
