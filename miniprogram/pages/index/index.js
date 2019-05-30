//index.js
//获取应用实例
const app = getApp()
var Newsdata = require("../Homedata/data.js");
var newsData = require("../nationdata/nationdata.js");
var newsData2 = require("../nationdata2/nationdata2.js");


Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        circular: true,
        display: "none",
        display1: "block",
        display2: "none",
        inputValue: '',
        size: '',
        color: '',
        data1:[]
    },
    onLoad: function(options) {
        const db = wx.cloud.database({//获取数据库的引用
          env: 'f-1fcd37'
        })
        // const lb = db.collection('Homedata')
        var data = db.collection('Homedata').get({//得到环境Homedata
            success:(res)=> {
               this.setData({
                    image1: res.data[4].image1,
                    image2: res.data[4].image2,
                    image3: res.data[4].image3,
                    image4: res.data[5].image1,
                    image5: res.data[5].image2,
                    image6: res.data[5].image3,
                    image7: res.data[5].image4,
               })
            }
        })
        //页面初始化 options为页面跳转所带来的参数
        //this.setData可以让view重绘
            this.setData({
                useData: newsData.nationdata,
                useData2: newsData2.nationdata2
            })
    },
    //跳转详情页
    goNewsDetail: function (event) {
        var nation = event.currentTarget.dataset['index'];//点击事件传参
        wx.navigateTo({
            url: '../nation/nation?q=' + nation
        })
    },
    goNewsTap: function(event) {
        wx.navigateTo({ //navigateTo进入到url相应页面，navigateBack返回到原页面。
            url: '../logs/musical/musical' //点击推送，进入民族乐器页面
        })
    },
    goNewsTap1: function(event) {
        wx.navigateTo({ //navigateTo进入到url相应页面，navigateBack返回到原页面。
            url: '../logs/Dance/Dance' //点击推送，进入民族舞蹈页面
        })
    },
    goNewsTap2: function(event) {
        wx.navigateTo({ //navigateTo进入到url相应页面，navigateBack返回到原页面。
            url: '../logs/Word/Word' //点击推送，进入民族文字页面
        })
    },
    goNewsTap3: function(event) {
        wx.navigateTo({ //navigateTo进入到url相应页面，navigateBack返回到原页面。
            url: '../logs/Build/Build' //点击推送，进入民族建筑页面
        })
    },
    test: function(event) { //实现查看更多
        if (this.display1 = "block") {
            this.setData({
                display: "block",
                display1: "none",
                display2: "block",
                size: '88%',
                color: 'black',
            })
        }
    },
    test2: function(event) { //实现收起
        if (this.display2 = "block") {
            this.setData({
                display: "none",
                display1: "black",
                display2: "none",
            })
        }
    },
    bindInput: function(e) { //获取input输入内容
        this.setData({
            inputValue: e.detail.value,
        })
    },
    setSearchStorage: function() {
        let data;
        if (this.data.inputValue != '') { //实现搜索跳转页面
            var q = this.data.inputValue;
            wx.navigateTo({
                url: '../nation/nation?q=' + q
            })
        }
    }

})