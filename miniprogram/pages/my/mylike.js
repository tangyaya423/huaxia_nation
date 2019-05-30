// import jobStorage from '../../pages/test/test.js'
Page({
  data: {
    clecte: [],
    index:""
  },
  tiaozhuan(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../pages/my/mylikes?index='+index,
    })
  },
  //删除一个收藏
  delect(e){
    let index = e.currentTarget.dataset.index
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    console.log(e)
    fruits.splice(2, 2);
    console.log(fruits)
    console.log(index)
    console.log(this.data.clecte)
    let clecte = this.data.clecte
    clecte.splice(index,1)
    console.log(clecte)
    wx.setStorageSync('clecte', clecte);//设置缓存
    this.setData({
      clecte: clecte
    })
    console.log(this.data.clecte)
  },

  isdelect(e){
  wx.showToast({
    title: '删除成功',
    icon: '',
    image: '',
    duration: 0,
    mask: true,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
  },
  onLoad: function (options) {
    let clecte = wx.getStorageSync('clecte')//获得缓存
    clecte.reverse()
    this.setData({
      clecte: clecte
    })
    console.log(this.data.clecte)
  },
})