const app = getApp();
wx.cloud.init({
  traceUser: true
})
const db = wx.cloud.database({
  env: 'f-1fcd37'
});
const information_food = db.collection('information_food');
const information_food2 = db.collection('information_food2');
Page({
  data: {
    img: '',
    font:'',
    inform:[],
    inform2: [],
  },
  onLoad: function (options) {
    this.setData({
      img:options.img,
      font:options.name
    })
    information_food.get({
      success: res => {
        this.setData({
          inform: res.data,
        })
        
      }
    }),
      information_food2.get({
        success: res => {
          console.log(res)
          this.setData({
            inform2: res.data,
          })
        }
      })
  }
})