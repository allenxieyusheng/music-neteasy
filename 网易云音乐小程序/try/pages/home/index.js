// pages/home/index.js
var bsurl = require('../../utils/bsurl.js');
var async = require("../../utils/async.js");
var app = getApp();
Page({
  data: {
    rec: {
    idx: 0, loading: true,
    },
    playlist: {
    idx: 1, loading: false,
    list: {},
    offset: 0,
    limit: 20
    },
    djlist: {
    idx: 2, loading: false,
    list: [],
    offset: 0,
    limit: 20
    },
    sort: {
    idx: 3, loading: false
    },
    tabidx: 0,
    djcate: { loading: false },
    djrecs: {},
    banner: [{
      targetId:0,
      pic:"/image/nb1.jpeg"
    },{
      targetId:1,
      pic:"/image/nb2.jpeg"
    }],
    thisday: (new Date()).getDate(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  switchtab:function (e) {
      var currentTarget = e.currentTarget;
      var dataType = currentTarget.dataset.t;
      if(this.data.tabidx==dataType){
        return;
      }
      this.setData({
        tabidx:dataType
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

 init: function () {
       console.log("hello");
       console.log(async);
        var that = this
        var rec = this.data.rec
        //banner，
        // wx.request({
        //     url: bsurl + 'banner',
        //     data: { cookie: app.globalData.cookie },
        //     success: function (res) {
        //         that.setData({
        //             banner: res.data.banners
        //         })
        //     }
        // });
        // wx.request({
        //     url: bsurl + 'playlist/catlist',
        //     complete: function (res) {
        //       console.log("的吗西亚");
        //       console.log(res);
        //         that.setData({
        //             catelist: {
        //                 isShow: false,
        //                 res: res.data,
        //                 checked: res.data.all
        //             }
        //         })
        //     }
        // })
        //个性推荐内容,歌单，新歌，mv，电台,
        //将map异步话 async封装n个函数
        async.map(['personalized', 'personalized/newsong', 'personalized/mv', 'personalized/djprogram'], function (item, callback) {
            //循环请求参数类似的数据
            wx.request({
                url: bsurl + item,
                data: { cookie: app.globalData.cookie },
                success: function (res) {
                    console.log("BOOK");
                    console.log(res);
                    // console.log(app.globalData.cookie);
                    callback(null, res.data.result)
                }
            })
        }, function (err, results) {
            console.log(err)
            rec.loading = true;
            rec.re = results
            that.setData({
                rec: rec
            })
        });
    }
})
