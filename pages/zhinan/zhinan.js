// pages/zhinan/zhinan.js
Page({
  data: {
    imgList: [
    "/image/kaoyanzhinan2.png"
    ]
},
preview(event) {
  let currentUrl = event.currentTarget.dataset.src;
  wx.previewImage({
  current: '/image/kaoyanzhinan2.png',
  urls: ['https://i.postimg.cc/1RkzgVRK/kaoyanzhinan2.png']
  });
  }
  }
);
