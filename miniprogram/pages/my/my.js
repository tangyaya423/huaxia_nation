// pages/log/log.js
import listClik from '../template/myList/list'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:{
      list1: [
        {
					url:"/pages/my/wenzhang",
					icon: "/images/wenzhang.png",
          name: "我的发表",
					src: "/images/into.png",
        },

      ],
      list2: [
        {
					url: "/pages/my/mylike",
          icon: "/images/like3.png",
          name: "我的收藏",
					src: "/images/into.png",
        },
      ],
      list3: [
        {
					url: "/pages/my/about",
          icon: "/images/ours.png",
          name: "关于我们",
					src: "/images/into.png",
        }
      ]
    },
			openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
	

	favorate(){
		wx.navigateTo({
			url: '/pages/my/mylike',
		})

	},
	about(){
		wx.navigateTo({
			url: '/pages/my/about',
		})
	}
})