Page({
  data: {
    boxes: [
      { name: '北京大学', image: '/image/university/北京大学.jpg' , description: '中国顶尖综合性大学，国家首批“双一流”、“985工程”、“211工程”重点建设高校。' },
      { name: '复旦大学', image: '/image/university/复旦大学.jpg', description: '位于上海的顶尖综合性研究型大学，国家首批“双一流”、“985工程”、“211工程”重点建设高校。' },
      { name: '广西民族大学', image: '/image/university/广西民族大学.jpg', description: '北位于广西的民族类大学，非985、211高校，也未入选“双一流”名单。' },
      { name: '黑龙江工程学院', image: '/image/university/黑龙江工程学院.jpg' , description: '位于黑龙江的工科院校，非985、211高校，也未入选“双一流”名单。'},
      { name: '内蒙古财经大学', image: '/image/university/内蒙古财经大学.jpeg', description: '位于内蒙古的财经类大学，非985、211高校，也未入选“双一流”名单。' },
      { name: '清华大学', image: '/image/university/清华大学.jpg', description: '中国顶尖的综合性大学，国家首批“双一流”、“985工程”、“211工程”重点建设高校。' },
      { name: '上海交通大学', image: '/image/university/上海交通大学.jpg', description: '位于上海的顶尖综合性大学，国家首批“双一流”、“985工程”、“211工程”重点建设高校。' },
      { name: '西藏大学', image: '/image/university/西藏大学.jpg', description: '位于西藏的综合大学，非985、211高校，但入选“双一流”世界一流学科建设高校名单。' },
      { name: '浙江大学', image: '/image/university/浙江大学.jpg', description: '位于杭州的顶尖综合性大学，国家首批“双一流”、“985工程”、“211工程”重点建设高校。' }
    ],
    majors: [
      { major: '法律(非法学)', university: '西南大学', image: '/image/university/西南大学.jpg' ,description: '西南大学法学院以案例教学和“法律诊所”为特色，注重法律实务教育和实际操作技能训练。'},
      { major: '会计', university: '苏州大学', image: '/image/university/苏州大学.jpg' ,description: '苏州大学会计学专业历史悠久，拥有完整的人才培养体系，强调会计学与人工智能的交叉融合，培养复合型创新人才。' },
      { major: '电子信息', university: '暨南大学', image: '/image/university/暨南大学.jpg'  ,description: '暨南大学电子信息工程专业是国家特色专业，培养电子信息科学与工程领域的高级专门人才。'},
      { major: '计算机技术', university: '武汉理工大学', image: '/image/university/武汉理工大学.png'  ,description: '武汉理工大学计算机技术专业以科研、开发、设计、工程应用为主，毕业生在IT行业有广泛就业机会。'},
      { major: '计算机科学与技术', university: '南京理工大学', image: '/image/university/南京理工大学.png'  ,description: '南京理工大学计算机科学与技术专业是江苏省品牌专业，注重学科建设、队伍建设和人才培养。'},
      { major: '社会工作', university: '南昌大学', image: '/image/university/南昌大学.jpg' ,description: '南昌大学社会工作专业办学历史悠久，实务与研究特色鲜明，培养社会工作专业精神和伦理取向的专业人才。' },
      { major: '物流工程与管理', university: '南京大学', image: '/image/university/南京大学.png'  ,description: '南京大学物流工程与管理专业依托优质教育资源，培养国家重点行业急需的工程管理骨干人才。'}
    ],
    gridBoxes: [
      { text: '院校查询', image: '/image/院校查询.jpg',url:'/pages/searchschool/searchschool' },
      { text: '备考社群', image: '/image/备考社群.jpg' ,url:'/pages/shequn/shequn'},
      { text: '考研日程', image: '/image/考研日程.jpg' ,url:'/pages/richeng/richeng'},
      { text: '考研指南', image: '/image/考研指南.jpg' ,url:'/pages/zhinan/zhinan'},
    ]
  },

  goToPage: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },
  showBoxInfo: function (e) {
    const info = e.currentTarget.dataset.info;
    const description = info.description || '暂无描述';
    wx.showModal({
      title: info.name || info.major,
      content: description,
      showCancel: false
    });
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