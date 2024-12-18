Page({
    data: {
        username: '',
        password: '',
        phoneNumber: ''
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

    bindPhoneNumberInput: function(e) {
        this.setData({
            phoneNumber: e.detail.value
        });
    },

    login: function() {
        const { username, password } = this.data;
        if (username === '' || password === '') {
            wx.showToast({
                title: '用户名或密码不能为空',
                icon: 'none'
            });
            return;
        }
    },

    getPhoneNumber: function(e) {
        wx.cloud.callFunction({
            name: 'login',
            data: {
                phoneNumber: this.data.phoneNumber
            },
            success: res => {
                if (res.result && res.result.result && res.result.result.errCode === 0) {
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success'
                    });
                    // 跳转到首页
                    wx.redirectTo({
                        url: '/pages/index/index'
                    });
                } else {
                    wx.showToast({
                        title: '登录失败',
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

