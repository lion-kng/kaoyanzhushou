Page({
  data: {
    showPopup: false,
    popupInfo: ''
  },

  showPopup: function(event) {
    const info = event.currentTarget.dataset.info;
    this.setData({
      showPopup: true,
      popupInfo: info
    });
  },

  hidePopup: function() {
    this.setData({
      showPopup: false,
      popupInfo: ''
    });
  }
});