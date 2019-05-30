/********************* 数据库操作*****************/
    const db = wx.cloud.database({//获取数据库的引用
    env: 'nation-7f5157'
})
db.collection('Homedata').get({//得到环境Homedata
    success(res) {
        console.log(res.data)
    }
})
module.exports = {
    data: this.res
}