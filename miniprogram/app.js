//app.js
const app = getApp()
App({
  globalData: {
    openid: "",
    appid: ''
  },

  onLaunch: function () {
    var that = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'f-1fcd37',
        traceUser: true,
      })
    }
    // 当然 promise 方式也是支持的
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: (res) => {
        wx.setStorageSync('openid', res.result.openid)
        that.globalData.openid = res.result.openid
        // console.log(that.globalData.openid)
      },
      fail: console.error

    })
    let permition
    this.globalData = {}
  },
})
