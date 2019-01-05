Page({

  data: {

  },

  // 选择功能
  chooseFunc(e) {
    console.log(e)
    if (e.target.dataset.key) {
      wx.navigateTo({
        url: `../${e.target.dataset.key}/index`
      })
    }else {
      wx.navigateToMiniProgram({
        appId:'wx95fec7a0442601f2',
        success:function(res){
          console.log(res)
        },
        fail:function(e){
          console.log(e)
        }
      })
    }

  },

  onLoad: function(options) {

  }
})