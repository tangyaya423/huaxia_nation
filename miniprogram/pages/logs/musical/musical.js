// pages/Word/Word.js
var Newsdata = require("../../Homedata/data.js");
Page({

    data: {

    },

    onLoad: function (options) {
        const db = wx.cloud.database({//获取数据库的引用
          env: 'f-1fcd37'
        })
        var data = db.collection('Homedata').get({//得到环境Homedata
            success: (res) => {
                this.setData({
                     image1: res.data[3].musicimage1,
                    image2: res.data[3].musicimage2,
                    image3: res.data[3].musicimage3,
                    image4: res.data[3].musicimage4,
                    text_title1: res.data[3].musictext[0],
                    text_title2: res.data[3].musictext[1],
                    text_title3: res.data[3].musictext[2],
                    text_title4: res.data[3].musictext[3],
                    text1: res.data[3].musictext[4],
                    text2: res.data[3].musictext[5],
                    text3: res.data[3].musictext[6],
                    text4: res.data[3].musictext[7],
                })
            }
        })
    },

})