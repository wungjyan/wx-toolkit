Page({

  data: {

  },

  // 选择功能
  chooseFunc(e){
    console.log(e)
    wx.navigateTo({
      url: `../${e.target.dataset.key}/index`
    })
  },

  onLoad: function (options) {

  }
})