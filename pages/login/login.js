Page({
    data: {
        username: '',
        password: '',
        usernamePlaceholder: '请输入用户名',
        passwordPlaceholder: '请输入密码'
    },

    bindUsernameInput: function(e) {
        this.setData({
            username: e.detail.value
        });
    },

    bindPasswordInput: function(e) {
        this.setData({
            password: e.detail.value
        });
    },
    handleFocus: function (e) {
        const field = e.currentTarget.dataset.field;
        if (field === 'username') {
          this.setData({
            usernamePlaceholder: ''
          });
        } else if (field === 'password') {
          this.setData({
            passwordPlaceholder: ''
          });
        }
    },
    handleBlur: function (e) {
        const field = e.currentTarget.dataset.field;
        if (field === 'username' && !this.data.username) {
          this.setData({
            usernamePlaceholder: '请输入用户名'
          });
        } else if (field === 'password' && !this.data.password) {
          this.setData({
            passwordPlaceholder: '请输入密码'
          });
        }
    },

    login: function() {
        const { username, password } = this.data;

        if (!username || !password) {
            wx.showToast({
                title: '请输入用户名和密码',
                icon: 'none'
            });
            return;
        }

        wx.cloud.callFunction({
            name: 'login',
            data: {
                username,
                password
            },
            success: res => {
                if (res.result && res.result.success) {
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    });
                    // 存储登录状态到本地存储
                    wx.setStorageSync('isLoggedIn', true);
                    wx.setStorageSync('openid', res.result.openid);

                    // 跳转到首页
                    setTimeout(() => {
                        wx.switchTab({
                        url: '/pages/index/index'
                        });
                    }, 2000); // 延迟2秒
                } else {
                    wx.showToast({
                        title: res.result.message || '登录失败',
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

    goToRegister: function () {
        wx.navigateTo({
          url: '/pages/register/register'
        });
      },

    onLoad: function() {
        // 检查本地存储中的登录状态
        const isLoggedIn = wx.getStorageSync('isLoggedIn');
        if (isLoggedIn) {
            // 如果已经登录过，直接跳转到首页
            wx.switchTab({
                url: '/pages/index/index'
            });
        }
    }
});