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

  // 点击保存
  saveImg(){
    wx.showLoading({
      title: '图片保存中',
    })
    let ctx = wx.createCanvasContext('canvas2', this)
    // 在canvas绘制前填充白色背景
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 200, 200);
    ctx.drawImage(this.param.imagePath,10,10,180,180)
    ctx.draw(true, () => {
      wx.canvasToTempFilePath({
        canvasId: 'canvas2',
        fileType: 'jpg',
        success: (res) => {
          console.log(res)
          if (res.tempFilePath) {
            wx.hideLoading()
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                wx.showToast({
                  title: '保存成功'
                })
              },
              fail: function () {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          }

        }
      }, this)
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