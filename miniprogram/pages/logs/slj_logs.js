//logs.js
const app = getApp();
Page({
  data:
    {
      item:'',
      item2: '',
      attentionAnim: '',
      aniStyle: true,
      lastX: 0,
      lastY: 0,
      currentGesture: 0,
      img:'',
      font:'',
      food_infor:''
         
    },
    // 页面数据渲染
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true
    })
    const db = wx.cloud.database({
      env: 'f-1fcd37'
    });
    const slj_food = db.collection('slj-food');
    const slj_food2 = db.collection('slj-food2');
    const slj_nation = db.collection('slj_nation');
    this.setData({
      img: options.img,
      font: options.font
    })
    slj_food.get({
      success:res=>{
       this.setData({
         item:res.data,
       })
      }
    }),
      slj_food2.get({
        success: res => {
          this.setData({
            item2: res.data,
          })
        }
      }),
      slj_nation.get({
        success: res => {
          this.setData({
            food_infor: res.data,
          })
        }
      })
  },
  // 箭头动画效果
    onReady: function () {
    var attentionAnim = wx.createAnimation({ 
      duration: 200, 
      timingFunction: 'ease', 
      delay: 0 
    }) 
    this.attentionAnim = attentionAnim 
    var next = true; setInterval(function() {
      if (next) { 
        this.attentionAnim.rotate(3).step() 
        next = !next; 
      } 
      else { 
        this.attentionAnim.rotate(-3).step() 
        next = !next; 
      } 
      this.setData({
        attentionAnim: attentionAnim.export() 
      })
    }.bind(this), 200) 
  },
  // 上滑判断
  handletouchmove: function (event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY

    if (Math.abs(tx) < Math.abs(ty) && ty > 0) {
      this.setData({
        aniStyle: false
      })
    }
  },
  //上滑跳转
  handletouchmove2: function (event) {
    var currentX2 = event.touches[0].pageX
    var currentY2 = event.touches[0].pageY
    var tx2 = currentX2 - this.data.lastX
    var ty2 = currentY2 - this.data.lastY

    if (Math.abs(tx2) < Math.abs(ty2) && ty2 > 0) {
      const font = this.data.font
      wx.navigateTo({
        url: '../nation/nationvideo?name=' + font,
      })
    }
  },
  // 页面跳转
  click: function(event){
    const name = event.currentTarget.dataset.index;
    const img = event.currentTarget.dataset.img;
    wx.navigateTo({
      url: '../slj_food/paiban/paiban?name=' + name + '&img=' + img,
    })
  }
})
