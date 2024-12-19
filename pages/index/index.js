Page({
  data: {
    boxes: [
      { name: '北京大学', image: '/image/university/北京大学.jpg' },
      { name: '复旦大学', image: '/image/university/复旦大学.jpg' },
      { name: '广西民族大学', image: '/image/university/广西民族大学.jpg' },
      { name: '黑龙江工程学院', image: '/image/university/黑龙江工程学院.jpg' },
      { name: '内蒙古财经大学', image: '/image/university/内蒙古财经大学.jpeg' },
      { name: '清华大学', image: '/image/university/清华大学.jpg' },
      { name: '上海交通大学', image: '/image/university/上海交通大学.jpg' },
      { name: '西藏大学', image: '/image/university/西藏大学.jpg' },
      { name: '浙江大学', image: '/image/university/浙江大学.jpg' }
    ],
    majors: [
      { major: '法律(非法学)', university: '西南大学', image: '/image/university/西南大学.jpg' },
      { major: '会计', university: '苏州大学', image: '/image/university/苏州大学.jpg' },
      { major: '电子信息', university: '暨南大学', image: '/image/university/暨南大学.jpg' },
      { major: '计算机技术', university: '武汉理工大学', image: '/image/university/武汉理工大学.png' },
      { major: '计算机科学与技术', university: '南京理工大学', image: '/image/university/南京理工大学.png' },
      { major: '社会工作', university: '南昌大学', image: '/image/university/南昌大学.jpg' },
      { major: '物流工程与管理', university: '南京大学', image: '/image/university/南京大学.png' }
    ],
    gridBoxes: [
      { text: '院校查询', image: '/image/院校查询.jpg' },
      { text: '备考社群', image: '/image/备考社群.jpg' },
      { text: '考研日程', image: '/image/考研日程.jpg' },
      { text: '考研指南', image: '/image/考研指南.jpg' }
    ]
  },

  onLoad: function (options) {
    // 页面加载时的逻辑
  },

  onReady: function () {
    // 页面初次渲染完成时的逻辑
  },

  onShow: function () {
    // 页面显示时的逻辑
  },

  onHide: function () {
    // 页面隐藏时的逻辑
  },

  onUnload: function () {
    // 页面卸载时的逻辑
  },

  onPullDownRefresh: function () {
    // 下拉刷新时的逻辑
  },

  onReachBottom: function () {
    // 页面上拉触底时的逻辑
  },

  onShareAppMessage: function () {
    // 用户点击右上角分享时的逻辑
  }
});