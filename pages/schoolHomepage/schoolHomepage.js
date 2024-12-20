// pages/schoolHomepage/schoolHomepage.js
Page({
  onLoad: function(options) {
    const url = decodeURIComponent(options.url);
    this.setData({
      schoolUrl: url
    });
  },
  onReady: function() {
    // 使用 wx.createWebView 进行页面跳转
    const webview = wx.createWebView({
      url: this.data.schoolUrl,
      success: function(res) {
        console.log('WebView created');
      },
      fail: function(err) {
        console.error('WebView create failed', err);
      }
    });
  }
});
