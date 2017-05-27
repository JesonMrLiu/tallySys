//获取应用实例
var app = getApp()

var common = require("../../utils/common.js");

Page({
  data: {
    currentDate : "2017-01-13",
    yearArray : ['2009','2010','2011','2012','2013','2014','2015','2016','2017'],
    searchYear : '请选择年份',
    monthArray: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    searchMonth : '请选择月份',
    monthOfYear : ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
    monthItemSrc : "../../images/icons/months",
    offset : 0,
    limit : 10,
    scrollHeight : 0,
    loading : true,
    detailShow : true,////是否是显示账单详细
    tallys : [],
    modalHidden : true,
    leftSearchShow : false,//侧边刷选条件栏是否显示
    searchImage: '/images/icons/right-arrow.png'
  },
  
  onLoad : function(){
    //查询缓存中是否有用户登录信息，如果没有就跳转到登录
    wx.getStorage({
      key: 'USER_LOGIN_KEY',
      success: function(res){
        console.log(res.data);
      },
      fail: function() {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    })

    const that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
    this.loadTallys(10)
  },

  loadTallys : function (count) {
    const that = this
    var tally = {}
    tally.amount = 3562.5
    tally.date = "2017-01-16"
    tally.remark = "早、中、晚餐：5 + 12 + 35 = 5"
    var temp = that.data.tallys;
    for(var i = 0; i < 10; i++){
      temp = temp.concat(tally);
    }
    this.setData({
      tallys : temp,
      offset : that.data.offset + 10,
      loading : false
    });
  },

  lower : function() {
    if(this.data.offset > 20){
      return;
    }
    this.loadTallys(8);
  },

  searchDate : function(e) {
    this.setData({
      currentDate : e.detail.value
    })
  },
  //查看单月的账单记录
  monthDetailTally : function(){
    if(this.data.detailShow){
      wx.navigateTo({
        url: '../detail/detail?id='
      })
    }
  },
  touchStartTally : function(e){
    this.setData({
      detailShow : true
    })
  },
  //长时间按住，弹出框，提示是否要删除
  removeTally : function(){
    console.log("show long...")
    const that = this
    this.setData({
      modalHidden : false,
      detailShow : false
    });
  },
  removeConfirm : function(){
    this.setData({
      modalHidden : true
      
    })
  },
  removeCancel : function(){
    this.setData({
      modalHidden : true
    })
  },
  ////显示或关闭侧边栏
  searchModal : function(){
    const that = this
    this.setData({
      searchImage: that.data.leftSearchShow ? '/images/icons/right-arrow.png' :'/images/icons/bottom-arrow.png',
      leftSearchShow: !that.data.leftSearchShow
    })
  },
  /////搜索年份
  yearChange : function(e){
    const that = this
    this.setData({
      searchYear : that.data.yearArray[e.detail.value]
    });
  },
  //////搜索月份
  monthChange : function(e) {
    const that = this
    this.setData({
      searchMonth: that.data.monthArray[e.detail.value]
    });
  },
  ///////搜索事件
  searchSubmit : function(e){
    console.log(e.detail.value)
    var data = e.detail.value
    data.userId = 1
    console.log(data)
    wx.request({
      url: 'http://192.168.74.55:8083/jtest/testController.do?method=getTallyList',
      data: data,
      method: 'get',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success : function(res){
          console.log(res)
          console.log(res.data.msg)
      },
      fail : function(res){

      }
    })
  }

})

