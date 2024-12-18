Page({
  data: {
    username: '',
    school: '',
    major: '',
    targetSchool: '',
    targetMajor: ''
  },

  onLoad: function (options) {
    // 从数据库获取用户信息并设置到data中
    wx.cloud.database().collection('user').doc('cc3a41796761665e033a80aa4c1ad19f').get({
      success: res => {
        this.setData({
          username: res.data.username,
          school: res.data.school,
          major: res.data.major,
          targetSchool: res.data.targetSchool,
          targetMajor: res.data.targetMajor
        });
      }
    });
  },

  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },

  bindSchoolInput: function (e) {
    this.setData({
      school: e.detail.value
    });
  },

  bindMajorInput: function (e) {
    this.setData({
      major: e.detail.value
    });
  },

  bindTargetSchoolInput: function (e) {
    this.setData({
      targetSchool: e.detail.value
    });
  },

  bindTargetMajorInput: function (e) {
    this.setData({
      targetMajor: e.detail.value
    });
  },

  saveUserInfo: function () {
    const { username, school, major, targetSchool, targetMajor } = this.data;
    wx.cloud.database().collection('user').doc('cc3a41796761665e033a80aa4c1ad19f').update({
      data: {
        username: username,
        school: school,
        major: major,
        targetSchool: targetSchool,
        targetMajor: targetMajor
      },
      success: res => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('更新用户信息失败', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    });
  }
});