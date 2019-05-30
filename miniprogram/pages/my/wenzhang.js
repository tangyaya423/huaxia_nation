var util = require('../../utils/util.js');
const app = getApp()
//云数据库初始化
const db = wx.cloud.database({
	env: 'f-1fcd37'
});
var openid = wx.getStorageSync('openid')
const quandata = db.collection('quan_data').where({
	_openid:openid
})

Page({

  /**
   * 页面的初始数据
   */
	data: {
		show: true,
		quan_data: '',
		pics: [],
		show_comment: false,
		openid:""
	},

	//浏览图片
	previewImage: function (e) {
		var that = this;
		var arry = [];
		var dataid = e.currentTarget.dataset.index;
		var pics = that.data.pics;
		wx.previewImage({
			current: pics[dataid], // 当前显示图片的http链接
			urls: pics // 需要预览的图片http链接列表
		})
	},

  //删除一条内容
  delete(event){
    var index = event.currentTarget.dataset.index;

    //在数据库中查询一个节点,并删除
    db.collection("quan_data").doc(
      this.data.quan_data[index]._id
    ).remove()

    // 及时刷新试图
    let quan_data = this.data.quan_data
    quan_data.splice(index,1)
    this.setData({
      quan_data:quan_data
    })

    wx.showToast({
      title: '删除成功',
      duration: 1000,
      mask: true,
      success: function(res) {
        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面显示
  //  */
	onShow: function () {
		var that = this;
		var arry = [];

		const data = quandata.orderBy('time', 'desc').get({
			success: res => {
				// console.log(res)
				that.setData({
					quan_data: res.data,
					pimg_id: res.data.length
				})
				//将图片路径存放在数组里备用
				for (var i = 0; i < res.data.length; i++) {
					arry.push(res.data[i].mpic) //用该方法网数组里面添值
				}
				that.setData({
					pics: arry
				})

			}
    })
  } 

})

