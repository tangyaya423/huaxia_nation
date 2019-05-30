const app = getApp();
wx.cloud.init({
  traceUser: true
})
const db2 = wx.cloud.database({
  env: 'f-1fcd37'
});
const slj_nation = db2.collection('slj_nation');
const slj_nation_img = db2.collection('slj-nation-img');
const slj_nation_img2 = db2.collection('slj-nation-img2');
Page({
  data: {
		shrink:"unfold",
		display:"收起",
    animationBack: {},
		animationMore:{},
    nation:[],
    nation_img:[],
    nation_img2:[],
    nation_img3: [],
    font:''
  },
  onLoad: function (options) {
    slj_nation.get({
      success: res => {
        this.setData({
          nation: res.data,
          font:options.q
        })
      }
    }),
    slj_nation_img.get({
      success: res => {
        this.setData({
          nation_img: res.data,
        })
      }
    }),
    slj_nation_img2.get({
      success: res => {
        this.setData({
          nation_img2: res.data,
        })
      }
    })
  },
  onShow() {
    
	},
	more:function(event){
    const font = this.data.font
		wx.navigateTo({
			url: '/pages/nation/abstrict?name=' + font,
		})
	} ,
	picUp(){
		let shrink = this.data.shrink
		if (shrink=="unfold"){
			this.setData({
				shrink: "picUp",
				display: "展开"
			})
		} else if (shrink=="picUp"){
			this.setData({
				shrink: "unfold",
				display: "收起"
			})
		}
	},
  sonclick:function(event){
    const img = event.currentTarget.dataset.img
    const font = this.data.font
    wx.navigateTo({
      url: '../logs/slj_logs?font=' + font + "&img=" + img,
    })  
  }
})