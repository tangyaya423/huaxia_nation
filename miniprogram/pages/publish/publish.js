const app = getApp()
var util = require('../../utils/util.js');
//云数据库初始化
const db = wx.cloud.database({
  env: 'f-1fcd37'
});
const quandata = db.collection('quan_data')
Page({
  /** * 页面的初始数据*****/
  data: {
    getpic: [],
    string: '',
    fildid:[],
    bigImg:''
  },

  // 选择图片
  chooseImage: function(event) {
    var that = this;
    var plen = that.data.getpic.length;
    wx.chooseImage({
      count: 9,
      sizeType: [ 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          getpic:res.tempFilePaths
        })
        
      }
    })
  },

  //浏览图片
  previewImage: function(e) {
    var that = this;
    var dataid = e.currentTarget.dataset.id;
    var getpic = that.data.getpic;
    wx.previewImage({
      current: getpic[dataid], // 当前显示图片的http链接
      urls: this.data.getpic // 需要预览的图片http链接列表
      
    })
  },

  // 删除图片
  deleteImg: function(event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    var ngetpic = that.data.getpic;
    ngetpic.splice(id, 1);
    that.setData({
      getpic: ngetpic
    })
  },

  // 获取textarea内容
  getString: function (event) {
    var that = this;
    var string = that.data.string;
    var content = event.detail.value;
    that.setData({
      string: event.detail.value
    })
  },
 
  // 发表
  publish: function (e) {
    var that = this;
    var user_id = wx.getStorageSync('userid');
    let pic = that.data.getpic;
    var plen = that.data.getpic.length;
    var string = that.data.string;
    var time = util.formatTime(new Date());
    if (string == '' && plen == 0) {
      wx.showToast({
        title: '有内容才能发表哟~',
        icon: 'none'
      })
    }else {
      wx.showLoading({
        title: '发表中',

      })

    // 上传图片
    if(plen==0){
      const cloudPath= ''
      const fildid= ''
      db.collection('quan_data').add({
        data: {
          name: app.globalData.username,
          pic: app.globalData.userpic,
          mpic: fildid,
          content: string,
          zanst: 0,
          like: 0,
          time: time,
          len: plen
        },

        success(res) {
          wx.showToast({
            title: '发表成功',
          })
          wx.switchTab({
            url: '../quan/quan'
          })
        }
      })
    }else{
      var filePath = pic[0]
      const name = Math.random() * 1000000;
      const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
             that.setData({
               bigImg:res.fileID
             })
    
    let  fildid = res.fileID;
      db.collection('quan_data').add({
        data: {
          name: app.globalData.username,
          pic: app.globalData.userpic,
          mpic: fildid,
          content: string,
          zanst: 0,
          like: 0,
          time: time,
          len:plen
        },
        
        success(res) {
          wx.showToast({
                    title: '发表成功',
                  })
          wx.switchTab({
            url: '../quan/quan'
          })
        }
      })
        }
      })
    }
    }
    },
    
    // 回到上一级页面
    back:function(e){
      wx.navigateBack({
        url: '../quan/quan'
      })
    }
})