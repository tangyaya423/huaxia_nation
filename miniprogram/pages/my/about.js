// pages/my/about.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: {
			list1: [
				{
					id:"0",
					icon: "/images/wechat.png",
					name: "微信群",
					src: "/images/into.png",
					text:"weixinqun"

				}
			],
			list2: [
				{
					id: "1",
					icon: "/images/qq.png",
					name: "qq群",
					src: "/images/into.png",
					text: "739665894"
				},
			],
			list3: [
				{
					id: "2",
					icon: "/images/phon.png",
					name: "电话客服",
					src: "/images/into.png",
					text:"13894080108"

				}
			]
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	copy(e) {
		let index = e.currentTarget.dataset.id*1
		let list = this.data.list
		var createArr = []
		for (let i in list) {
			createArr.push(list[i]);
		}
	//得到每个选项中的复制内容
		let copyContent = createArr[index][0].text
		wx.setClipboardData({
			data: copyContent,
			success: function (res) {
				wx.getClipboardData({
					success: function (res) {
						console.log(res.data) // data
					}
				})
			}
		})
		console.log(index)
	},
	//复制微信
	coverwx(){
		wx.setClipboardData({
			data: '这是假的微信群信息',
			success(res) {
				wx.getClipboardData({
					success(res) {
						console.log(res.data) // data
					}
				})
			}
		})
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