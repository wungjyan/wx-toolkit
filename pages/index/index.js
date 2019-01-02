//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    year:'',
    days:'',
    percent:''
  },

  onLoad: function() {
    this.getPercent()
  },

  // 计算时间比
  getPercent() {
    let year = new Date().getFullYear()
    let leap;
    // 闰年或平年
    if (year % 400 === 0) {
      leap = true
    } else if (year % 4 === 0 && year % 100 !== 0) {
      leap = true
    } else {
      leap = false
    }
    // 当年总天数
    let count = leap ? 366 : 365

    // 已过去多少天
    let start = new Date()
    start.setMonth(0)
    start.setDate(1)
    let days = (new Date().getTime() - start.getTime()) / 1000 / 60 / 60 / 24 + 1
    console.log(days)

    // 百分比
    let percent = (days * 100 / count).toFixed(1)

    this.setData({
      year,
      days,
      percent
    })
  },

  // 点击按钮
  gotoFunc(){
    wx.redirectTo({
      url: '../func/index'
    })
  }
})