
Page({
    data:{
        winHeight : 0,
        loginError : "",
        errorShow : "none"
    },
    onLoad : function() {
        const that = this
        wx.getSystemInfo({
        success: function(res) {
            that.setData({
                winHeight: res.windowHeight
            });
        }
        })
    },
    getFocus :function(){
        this.setData({
            loginError : "",
            errorShow : "none"
        });
    },
    doSubmit : function (e) {
        const that = this;
        //验证用户名不为空
        var _username_ = e.detail.value.username;
        if(_username_ == ""){
            that.setData({
                loginError : "抱歉，用户名不能为空！",
                errorShow : "block"
            });
            return;
        }
        var  _pwd_ = e.detail.value.pwd;
        if(_pwd_ == ""){
            that.setData({
                loginError : "抱歉，密码不能为空！",
                errorShow : "block"
            });
            return;
        }
        var _data_ = {"username":_username_,"pwd":_pwd_};
        wx.request({
          url: 'http://192.168.74.55:8083/jtest/testController.do?method=login',
          data: _data_,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {'content-type': 'application/json'},
          success: function(res){
            if(res.data.flag){
                wx.setStorage({
                  key: 'USER_LOGIN_KEY',
                  data: _data_
                })
                
                wx.redirectTo({
                  url: '../tally/tally',
                  success: function(res){
                    console.log("success")
                  },
                  fail: function() {
                    console.log("fail")
                  },
                  complete: function() {
                    // complete
                  }
                })
            } else {
                that.setData({
                    loginError : res.data.msg,
                    errorShow : "block"
                });
            }
          },
          fail: function() {
            console.log("fail");
          }
        })
    }
});