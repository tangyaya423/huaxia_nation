// pages/nation/nation.js
Page({
  data: {
    font: '',
    nationCu: [],
    nation: '',

  },


  onLoad: function (options) {
    const db = wx.cloud.database({//获取数据库的引用
      env: 'f-1fcd37'
    })
    db.collection('nationculture').get({//得到环境Culture

      success: (res) => {
        for (var i = 0; i < 8; i++) {
          if (options.name == res.data[i].nation) {
            this.setData({
              src: res.data[i].vdo,
              title: res.data[i].title,
              text: res.data[i].text,
            })
            break;
          }
        }


      }

    })
  },


})