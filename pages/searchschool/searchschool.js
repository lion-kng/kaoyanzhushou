// pages/searchschool/searchschool.js
Page({
  data: {
    schools: [
      { "name": "北京大学", "icon": "/image/university/北京大学.png", "url": "http://www.pku.edu.cn/" },
      { "name": "清华大学", "icon": "/image/university/清华大学.png", "url": "http://www.tsinghua.edu.cn/" },
      { "name": "中国人民大学", "icon": "/image/university/中国人民大学.png", "url": "https://www.ruc.edu.cn/" },
      { "name": "北京航空航天大学", "icon": "/image/university/北京航空航天大学.png", "url": "https://www.buaa.edu.cn/" },
      { "name": "北京理工大学", "icon": "/image/university/北京理工大学.png", "url": "https://www.bit.edu.cn/" },
      { "name": "中国农业大学", "icon": "/image/university/中国农业大学.png", "url": "https://www.cau.edu.cn/" },
      { "name": "北京师范大学", "icon": "/image/university/北京师范大学.png", "url": "https://www.bnu.edu.cn/" },
      { "name": "中央民族大学", "icon": "/image/university/中央民族大学.jpg", "url": "https://www.muc.edu.cn/index.htm" },
      { "name": "南开大学", "icon": "/image/university/南开大学.png", "url": "https://www.nankai.edu.cn/main.htm" },
      { "name": "天津大学", "icon": "/image/university/天津大学.png", "url": "https://www.tju.edu.cn/index.htm" },
      { "name": "大连理工大学", "icon": "/image/university/大连理工大学.png", "url": "https://www.dlut.edu.cn/" },
      { "name": "东北大学", "icon": "/image/university/东北大学.png", "url": "https://www.neu.edu.cn/" },
      { "name": "吉林大学", "icon": "/image/university/吉林大学.jpg", "url": "https://www.jlu.edu.cn/" },
      { "name": "哈尔滨工业大学", "icon": "/image/university/哈尔滨工业大学.png", "url": "https://www.hit.edu.cn/" },
      { "name": "复旦大学", "icon": "/image/university/复旦大学.png", "url": "https://www.fudan.edu.cn/" },
      { "name": "同济大学", "icon": "/image/university/同济大学.png", "url": "https://www.tongji.edu.cn/" },
      { "name": "上海交通大学", "icon": "/image/university/上海交通大学.png", "url": "https://www.sjtu.edu.cn/" },
      { "name": "华东师范大学", "icon": "/image/university/华东师范大学.png", "url": "https://www.ecnu.edu.cn/" },
      { "name": "南京大学", "icon": "/image/university/南京大学.png", "url": "https://www.nju.edu.cn/" },
      { "name": "东南大学", "icon": "/image/university/东南大学.png", "url": "https://www.seu.edu.cn/" },
      { "name": "浙江大学", "icon": "/image/university/浙江大学.png", "url": "https://www.zju.edu.cn/" },
      { "name": "中国科学技术大学", "icon": "/image/university/中国科学技术大学.png", "url": "https://www.ustc.edu.cn/" },
      { "name": "厦门大学", "icon": "/image/university/厦门大学.png", "url": "https://www.xmu.edu.cn/" },
      { "name": "山东大学", "icon": "/image/university/山东大学.png", "url": "https://www.sdu.edu.cn/index.htm" },
      { "name": "中国海洋大学", "icon": "/image/university/中国海洋大学.png", "url": "https://www.ouc.edu.cn/main.htm" },
      { "name": "武汉大学", "icon": "/image/university/武汉大学.png", "url": "https://www.whu.edu.cn/" },
      { "name": "华中科技大学", "icon": "/image/university/华中科技大学.png", "url": "https://www.hust.edu.cn/" },
      { "name": "湖南大学", "icon": "/image/university/湖南大学.png", "url": "https://www.hnu.edu.cn/" },
      { "name": "中南大学", "icon": "/image/university/中南大学.png", "url": "https://www.csu.edu.cn/" },
      { "name": "国防科技大学", "icon": "/image/university/中国人民解放军国防科技大学.png", "url": "https://www.nudt.edu.cn/" },
      { "name": "中山大学", "icon": "/image/university/中山大学.png", "url": "https://www.sysu.edu.cn/" },
      { "name": "华南理工大学", "icon": "/image/university/华南理工大学.png", "url": "https://www.scut.edu.cn/new/" },
      { "name": "重庆大学", "icon": "/image/university/重庆大学.png", "url": "https://www.cqu.edu.cn/" },
      { "name": "四川大学", "icon": "/image/university/四川大学.png", "url": "https://www.scu.edu.cn/" },
      { "name": "电子科技大学", "icon": "/image/university/电子科技大学.png", "url": "https://www.uestc.edu.cn/" },
      { "name": "西安交通大学", "icon": "/image/university/西安交通大学.png", "url": "https://www.xjtu.edu.cn/" },
      { "name": "西北工业大学", "icon": "/image/university/西北工业大学.png", "url": "https://www.nwpu.edu.cn/" },
      { "name": "西北农林科技大学", "icon": "/image/university/西北农林科技大学.png", "url": "https://www.nwafu.edu.cn/" },
      { "name": "兰州大学", "icon": "/image/university/兰州大学.png", "url": "https://www.lzu.edu.cn/" }
    ]
  },
  goToSchoolHomepage: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/schoolHomepage/schoolHomepage?url=${encodeURIComponent(url)}`
    });
  }
});
