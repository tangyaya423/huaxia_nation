// pages/Dance/Dance.js
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
                    image1: res.data[2].danceimage1,
                    image2: res.data[2].danceimage2,
                    image3: res.data[2].danceimage3,
                    text_title1: res.data[2].dancetext[0],
                    text_title2: res.data[2].dancetext[1],
                    text_title3: res.data[2].dancetext[2],
                    text1: res.data[2].dancetext[3],
                    text2: res.data[2].dancetext[4],
                    text3: res.data[2].dancetext[5]
                })
            }
        })
    },

})