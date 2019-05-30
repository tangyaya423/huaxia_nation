// pages/home/nation/abstrict.js
const app = getApp();
wx.cloud.init({
  traceUser: true
})
const db = wx.cloud.database({
  env: 'f-1fcd37'
});
const nation_inf= db.collection('slj_nation');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    font:'',
    nation_inform:[],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    this.setData({
      font: options.name,
    }),
    nation_inf.get({
      success: res => {
        // console.log(res)
        this.setData({
          nation_inform: res.data,
        })

      }
    })
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})