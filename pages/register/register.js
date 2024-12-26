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

    register: function() {
        const { username, password } = this.data;

        if (!username || !password) {
            wx.showToast({
                title: '请输入用户名和密码',
                icon: 'none'
            });
            return;
        }

        wx.cloud.callFunction({
            name: 'register',
            data: {
                username,
                password
            },
            success: res => {
                if (res.result && res.result.success) {
                    wx.showToast({
                        title: '注册成功',
                        icon: 'success',
                        duration: 2000
                    });
                    // 跳转到登录页
                    setTimeout(() => {
                        wx.redirectTo({
                        url: '/pages/login/login'
                        });
                    }, 2000); // 延迟2秒


                } else {
                    console.log(username, password);
                    wx.showToast({
                        title: res.result.message || '注册失败',
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
    }
});