Page({
    data : {
        zmrq : '账目日期',
        textareaWidth : 0,
        szlx : '收支类型',
        szlxValues : ['入账', '支出'],
        zmlx : '账目类型',
        zmlxValues : ['消费','其他'],
        currentDate : '1970-01-01'//当前日期，格式yyyy-MM-dd
    },
    onLoad : function(){
        const that = this;
        wx.getSystemInfo({
          success: function(res) {
            var _width_ = res.windowWidth - 24;
            var now = new Date();
            var month = now.getMonth() + 1;
            month = month < 10 ? ("0"+month) : month;
            var day = now.getDate();
            day = day < 10 ? ("0" + day) : day;
            that.setData({
                textareaWidth : _width_,
                currentDate : now.getFullYear() + "-" + month + "-" + day
            });
          }
        })
    },
    zmrqChange : function (e) {
        this.setData({
            zmrq : e.detail.value
        });
    },
    /////收支类型change事件
    szlxChange : function (e) {
      const that = this;
      this.setData({
          szlx : that.data.szlxValues[e.detail.value]
      });
    },
    ///////账目类型change事件
    zmlxChange : function (e) {
        const that = this
        this.setData({
          zmlx : that.data.zmlxValues[e.detail.value]
        });
    },
    saveSubmit : function(e){
      const that = this
      var data = e.detail.value
      var szlxValues = this.data.szlxValues;
      szlxValues.forEach(function(obj, index, arr){
        if(obj == data.payType){
          data.payType = index+1;
        }
      })
      var zmlxValues = this.data.zmlxValues;
      zmlxValues.forEach(function(obj, index, arr){
        if(obj == data.type){
          data.type = index + 1;
        }
      })
      
      wx.getStorage({
        key: 'USER_LOGIN_KEY',
        success: function (res) {
          data.userId = 1
        },
        fail: function () {
          wx.redirectTo({
            url: '../../login/login'
          })
        }
      })

      wx.request({
        url: 'http://192.168.74.55:8083/jtest/testController.do?method=doTally',
        data : data,
        method : 'get',
        header: {'content-type':'application/x-www-form-urlencoded;charset=utf-8'},
        success : function(res){
          if(res.data.flag){
            /*wx.showToast({
              title: res.data.msg,
              icon : 'success',
              duration: 2000
            })*/
            wx.redirectTo({
              url: '../../tally/tally'
            })
          }
        },
        fail : function(){
          
        }
      })
    }
});