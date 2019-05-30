var util = require('../../utils/util.js');
//云数据库初始化
const db = wx.cloud.database({
  env: 'f-1fcd37'
});
const quandata = db.collection('quan_data')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    quan_data: '',
    pics: [],
    show_comment: false,
    cmt_name: '',
    cmt_con: '',
    clecte: [],
    isClick: false,
    zan: [],
    _id: ""
  },
 
  ToPublish: function (event) {
    wx.navigateTo({
      url: '../publish/publish',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 点赞
  select_zan: function (event) {
    var that = this;
    let a = that.data.a
    var zandata = that.data.quan_data;
    var zan = that.data.zan;
    var index = event.currentTarget.dataset.index;
    for (let i in zandata) {
      if (i == index) { //根据下标找到目标
        if (zandata[i].zanst == 0) { //如果是没点赞+1
          zandata[i].zanst = 1;
          zan.push(zandata[i])
        } else {
          zandata[i].zanst = 0
          for (let j = 0; j < zan.length; j++) {
            if (zan[j]._id == zandata[index]._id) {
              zan.splice(j, 1)
            }
          }

        }
        that.setData({
          zan: zan
        })
        wx.setStorageSync('zan', zan);//设置缓存
        wx.showToast({
          title: zandata[i].zanst == 1 ? '点赞成功' : '取消点赞'
        })
      }
    }
    that.setData({
      quan_data: zandata

    })
  },

  // 收藏
  select: function (event) {
    //获得当前点击的
    var that = this;
    console.log(that.data.clecte.length)
    var data = that.data.quan_data;
    var index = event.currentTarget.dataset.index;
    var clecte = that.data.clecte
    for (let i in data) {
      if (i == index) { //根据下标找到目标
        if (!data[i].isClick) {
          data[i].isClick = !data[i].isClick
          clecte.push(data[i])

          //去掉收藏过的内容
          var obj = {};
          clecte = clecte.reduce(function (item, next) {
            obj[next._id] ? '' : obj[next._id] = true && item.push(next);
            return item;
          }, []);

          console.log(data[i].isClick)
        } else {
          data[i].isClick = !data[i].isClick
          for (let i = 0; i < clecte.length; i++) {
            if (clecte[i]._id == data[index]._id) {
              console.log(2)
              clecte.splice(i, 1)
            }
          }
        }
        wx.setStorageSync('clecte', clecte);//设置缓存
        that.setData({
          clecte: clecte
        })
        wx.showToast({
          title: data[i].isClick ? '收藏成功' : '取消收藏'
        })
      }
    }

    that.setData({
      quan_data: data,
      clecte: clecte

    })
    console.log(that.data.quan_data)
  },

  //浏览图片
  previewImage: function (e) {
    var that = this;
    var arry=[];
    var dataid = e.currentTarget.dataset.index;
   var pics = that.data.pics;
    wx.previewImage({
      current: pics[dataid], // 当前显示图片的http链接
      urls: pics // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获得缓存
    let clecte = wx.getStorageSync('clecte')
    let zan = wx.getStorageSync('zan')

    //如果有缓存
    if (!!clecte.length) {
      this.setData({
        clecte: clecte,
      })
    } else {//没有缓存
      wx.setStorageSync('clecte', []);//设置缓存
      console.log("还没有缓存")
    }

  },


  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
      })
    }
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var arry = [];

    const data = quandata.orderBy('time', 'desc').get({
      success: res => {
        let clecte = wx.getStorageSync('clecte')
        let zan = wx.getStorageSync('zan')

        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < clecte.length; j++) {
            if (clecte[j]._id == res.data[i]._id) {
              res.data[i].isClick = true
            }
          }
        }
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < zan.length; j++) {
            if (zan[j]._id == res.data[i]._id) {
              res.data[i].zanst = 1
            }
          }
        }

        that.setData({
          quan_data: res.data,
          pimg_id: res.data.length
        })
        //获得缓存
        let a = wx.getStorageSync('clecte')
        let b = wx.getStorageSync('zan')
        that.setData({
          clecte: a,
        })
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

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              app.globalData.userpic = res.userInfo.avatarUrl,
                app.globalData.username = res.userInfo.nickName,
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo,
                })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
      })
    }

  }
})

