Page({
  data: {
    model: '',
    brand: '',
    system: '',
    screenWidth: '',
    screenHeight: '',
    version: '',
    language: '',
    pixelRatio:''
  },
  onLoad: function(options) {
    const self = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        self.setData({
          model: res.model,
          brand: res.brand,
          system: res.system,
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          version: res.version,
          language: res.language,
          pixelRatio: res.pixelRatio
        })
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },
  onShareAppMessage: function() {

  }
})