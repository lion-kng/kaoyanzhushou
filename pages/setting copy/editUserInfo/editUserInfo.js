Page({
  data: {
    username: '',
    school: '',
    major: '',
    targetSchool: '',
    targetMajor: '',
    userInfoId: '' // 用于存储用户信息的文档 ID
  },

  onLoad: function (options) {
    const db = wx.cloud.database();
    const openid = wx.getStorageSync('openid'); // 假设你已经将 openid 存储在本地

    db.collection('UserInfo').where({
      _openid: openid
    }).get({
      success: res => {
        if (res.data.length > 0) {
          // 找到用户信息，设置到 data 中
          const userInfo = res.data[0];
          this.setData({
            username: userInfo.username,
            school: userInfo.school,
            major: userInfo.major,
            targetSchool: userInfo.targetSchool,
            targetMajor: userInfo.targetMajor,
            userInfoId: userInfo._id // 存储用户信息的文档 ID
          });
        } else {
          // 没有找到用户信息，提示用户编辑
          wx.showToast({
            title: '请编辑您的信息',
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.error('查询失败', err);
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        });
      }
    });
  },

  saveUserInfo: function () {
    const { userInfoId, username, school, major, targetSchool, targetMajor } = this.data;

    wx.cloud.callFunction({
      name: 'saveUserInfo',
      data: {
        userInfoId,
        username,
        school,
        major,
        targetSchool,
        targetMajor
      },
      success: res => {
        if (res.result && res.result.success) {
          wx.showToast({
            title: res.result.message,
            icon: 'success'
          });
        } else {
          console.error('操作失败:', res.result)
          wx.showToast({
            title: res.result.message || '操作失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.error('调用云函数失败', err);
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  },

  bindInput: function (e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  }
});