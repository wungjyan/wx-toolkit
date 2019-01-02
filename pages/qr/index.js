import drawQrcode from "../../utils/qrcode.js";
let rpx;
let self;
Page({
  data: {
    hideCanvas:true
  },
  param:{
    text:'',
    imagePath:''
  },

  onLoad: function (options) {
    self = this
    this.getRpx()
  },

  // 点击生成二维码
  getQrCode(){
    if(!this.param.text){
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
      return;
    }
    drawQrcode({
      width:200*rpx,
      height:200*rpx,
      canvasId: 'mycanvas',
      text:this.param.text,
      callback:function(e){
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            self.param.imagePath = res.tempFilePath;
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    })
    this.setData({
      hideCanvas:false
    })
  },

  previewImg: function (e) {
    let img = this.param.imagePath
    if(!img){
      wx.showToast({
        title: '操作太快，重试',
        icon:'none'
      })
      return;
    }
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },

  // 绑定输入
  handleTextInout(e){
    this.param.text = e.detail.value
  },

  getRpx(){
    wx.getSystemInfo({
      success: function(res) {
        rpx = res.windowWidth/375
      },
    })
  }
})