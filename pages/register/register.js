Page({
    data: {
        username: '',
        password: ''
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
                        icon: 'success'
                    });
                    // 跳转到登录页
                    wx.redirectTo({
                        url: '/pages/login/login'
                    });
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