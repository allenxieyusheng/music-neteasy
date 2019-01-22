var app=getApp();
var bsurl = require('../../utils/bsurl.js');
Page({
    data: {
        list:[],
        subcount:{},
        loading:true
    },
    onLoad: function () {
      //我的界面判断是否有用户信息--？
        var that=this;
        var id= wx.getStorageSync('user');
        console.log(id)
        // 闭当前页面，跳转到应用内的某个页面。
        // 需要跳转的应用内非 tabBar 的页面的路径
        // if(!id.account){
        //     wx.redirectTo({
        //       url: '../login/index'
        //     });
        //     return;
        // }
        id=id.account.id;
        this.setData({uid:id})
        wx.request({
            url: bsurl + 'user/subcount?id=' + id,
            success: function (res) {
                that.setData({
                    subcount: res.data
                });
            }
        });
      //登陆用户的播放列表
        // wx.request({
        //     url: bsurl + 'user/playlist',
        //     data: {
        //         uid: id,
        //         offset: 0,
        //         limit: 1000
        //     },
        //     success: function (res) {
        //         that.setData({
        //             loading:false,
        //             list1: res.data.playlist.filter(function(item){return item.userId==id}),
        //             list2: res.data.playlist.filter(function(item){return item.userId!=id}),
        //         });
        //     }
        // });
    },
    onShow: function () {
        console.log("me show----------")
     }
})
