// pages/searchschool/searchschool.js
Page({
  data: {
    schools: [
      { "name": "北京大学", "icon": "https://pic.imgdb.cn/item/67656568d0e0a243d4e74116.png", "url": "http://www.pku.edu.cn/" },
      { "name": "清华大学", "icon": "https://pic.imgdb.cn/item/67656594d0e0a243d4e7411d.png", "url": "http://www.tsinghua.edu.cn/" },
      { "name": "中国人民大学", "icon": "https://pic.imgdb.cn/item/676565a1d0e0a243d4e7411e.png", "url": "https://www.ruc.edu.cn/" },
      { "name": "北京航空航天大学", "icon": "https://pic.imgdb.cn/item/676565f3d0e0a243d4e7412d.png", "url": "https://www.buaa.edu.cn/" },
      { "name": "北京理工大学", "icon": "https://pic.imgdb.cn/item/67656600d0e0a243d4e74130.png", "url": "https://www.bit.edu.cn/" },
      { "name": "中国农业大学", "icon": "https://pic.imgdb.cn/item/67656614d0e0a243d4e74137.png", "url": "https://www.cau.edu.cn/" },
      { "name": "北京师范大学", "icon": "https://pic.imgdb.cn/item/6765662bd0e0a243d4e7413f.png", "url": "https://www.bnu.edu.cn/" },
      { "name": "中央民族大学", "icon": "https://pic.imgdb.cn/item/6765663ad0e0a243d4e74144.jpg", "url": "https://www.muc.edu.cn/index.htm" },
      { "name": "南开大学", "icon": "https://pic.imgdb.cn/item/6765664dd0e0a243d4e7414c.png", "url": "https://www.nankai.edu.cn/main.htm" },
      { "name": "天津大学", "icon": "https://pic.imgdb.cn/item/67656660d0e0a243d4e7415a.png", "url": "https://www.tju.edu.cn/index.htm" },
      { "name": "大连理工大学", "icon": "https://pic.imgdb.cn/item/67656674d0e0a243d4e7415e.png", "url": "https://www.dlut.edu.cn/" },
      { "name": "东北大学", "icon": "https://pic.imgdb.cn/item/676566a8d0e0a243d4e74160.png", "url": "https://www.neu.edu.cn/" },
      { "name": "吉林大学", "icon": "https://pic.imgdb.cn/item/676566b9d0e0a243d4e74165.jpg", "url": "https://www.jlu.edu.cn/" },
      { "name": "哈尔滨工业大学", "icon": "https://pic.imgdb.cn/item/676566d3d0e0a243d4e74168.png", "url": "https://www.hit.edu.cn/" },
      { "name": "复旦大学", "icon": "https://pic.imgdb.cn/item/676566e7d0e0a243d4e74170.png", "url": "https://www.fudan.edu.cn/" },
      { "name": "同济大学", "icon": "https://pic.imgdb.cn/item/67656701d0e0a243d4e74173.png", "url": "https://www.tongji.edu.cn/" },
      { "name": "上海交通大学", "icon": "https://pic.imgdb.cn/item/67656716d0e0a243d4e7417e.png", "url": "https://www.sjtu.edu.cn/" },
      { "name": "华东师范大学", "icon": "https://pic.imgdb.cn/item/67656731d0e0a243d4e7418a.png", "url": "https://www.ecnu.edu.cn/" },
      { "name": "南京大学", "icon": "https://pic.imgdb.cn/item/67656742d0e0a243d4e741ad.png", "url": "https://www.nju.edu.cn/" },
      { "name": "东南大学", "icon": "https://pic.imgdb.cn/item/6765674dd0e0a243d4e741ae.png", "url": "https://www.seu.edu.cn/" },
      { "name": "浙江大学", "icon": "https://pic.imgdb.cn/item/67656768d0e0a243d4e741b7.png", "url": "https://www.zju.edu.cn/" },
      { "name": "中国科学技术大学", "icon": "https://pic.imgdb.cn/item/67656773d0e0a243d4e741bd.png", "url": "https://www.ustc.edu.cn/" },
      { "name": "厦门大学", "icon": "https://pic.imgdb.cn/item/676567b4d0e0a243d4e741ca.png", "url": "https://www.xmu.edu.cn/" },
      { "name": "山东大学", "icon": "https://pic.imgdb.cn/item/676567c1d0e0a243d4e741cf.png", "url": "https://www.sdu.edu.cn/index.htm" },
      { "name": "中国海洋大学", "icon": "https://pic.imgdb.cn/item/676567ccd0e0a243d4e741d2.png", "url": "https://www.ouc.edu.cn/main.htm" },
      { "name": "武汉大学", "icon": "https://pic.imgdb.cn/item/676567dbd0e0a243d4e741d5.png", "url": "https://www.whu.edu.cn/" },
      { "name": "华中科技大学", "icon": "https://pic.imgdb.cn/item/676567f6d0e0a243d4e741dc.png", "url": "https://www.hust.edu.cn/" },
      { "name": "湖南大学", "icon": "https://pic.imgdb.cn/item/6765680fd0e0a243d4e741e2.png", "url": "https://www.hnu.edu.cn/" },
      { "name": "中南大学", "icon": "https://pic.imgdb.cn/item/6765681ad0e0a243d4e741e3.png", "url": "https://www.csu.edu.cn/" },
      { "name": "国防科技大学", "icon": "https://pic.imgdb.cn/item/67656824d0e0a243d4e741e5.png", "url": "https://www.nudt.edu.cn/" },
      { "name": "中山大学", "icon": "https://pic.imgdb.cn/item/67656831d0e0a243d4e741e7.png", "url": "https://www.sysu.edu.cn/" },
      { "name": "华南理工大学", "icon": "https://pic.imgdb.cn/item/67656842d0e0a243d4e741eb.png", "url": "https://www.scut.edu.cn/new/" },
      { "name": "重庆大学", "icon": "https://pic.imgdb.cn/item/67656862d0e0a243d4e741f1.png", "url": "https://www.cqu.edu.cn/" },
      { "name": "四川大学", "icon": "https://pic.imgdb.cn/item/67656877d0e0a243d4e741f6.png", "url": "https://www.scu.edu.cn/" },
      { "name": "电子科技大学", "icon": "https://pic.imgdb.cn/item/67656888d0e0a243d4e741f8.png", "url": "https://www.uestc.edu.cn/" },
      { "name": "西安交通大学", "icon": "https://pic.imgdb.cn/item/67656892d0e0a243d4e741fb.png", "url": "https://www.xjtu.edu.cn/" },
      { "name": "西北工业大学", "icon": "https://pic.imgdb.cn/item/676568a3d0e0a243d4e74200.png", "url": "https://www.nwpu.edu.cn/" },
      { "name": "西北农林科技大学", "icon": "https://pic.imgdb.cn/item/676568add0e0a243d4e74201.png", "url": "https://www.nwafu.edu.cn/" },
      { "name": "兰州大学", "icon": "https://pic.imgdb.cn/item/676568c3d0e0a243d4e74206.png", "url": "https://www.lzu.edu.cn/" }
    ]
  },
  goToSchoolHomepage: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/schoolHomepage/schoolHomepage?url=${encodeURIComponent(url)}`
    });
  }
});
