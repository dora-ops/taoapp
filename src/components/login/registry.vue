<template>
	 <div class="login">
	 	<headers title='注册' isActive='true' close='loginShow'></headers>
	 	<div @click='routerDirect()' class="close-btn"></div>
        <div class='tao-icon'></div>
        <div class="login-box">
        	<input v-model='userName' class='login-txt' placeholder="手机号/邮箱/会员名" type="text">
        	<input v-model='userPwd' class="login-pwd" placeholder="请输入密码" type="text">
        	
        	<button @click='loginBtn' class="login-btn">注册</button>
        	
        </div>
        <alerts ref='alerts'></alerts>
     </div>
</template>
<script>
import headers from "@/components/header/header";
import alerts from "@/components/alert/alert";
export default {
  data() {
    return {
      userName: "",
      userPwd: ""
      // loginName : '111111',
      // loginPwd : '111111'
    };
  },
  components: { headers, alerts },
  methods: {
    loginBtn() {
      //登录按钮操作
      var _self = this;
      if (this.userName != undefined && this.userPwd != undefined) {
        var url = "/api/user/addUser";
        this.$http
          .post(url, { username: this.userName, password: this.userPwd })
          .then(res => {
            var data = res.body;
            this.$router.push({name:'login'})
          });
      } else {
        this.$refs.alerts.opts = {
          content: "请正确输入用户名及密码；用户名与密码都为111111",
          width: "220px",
          buttons: {
            知道了: function() {
              _self.$refs.alerts.alertShow = false;
            }
          }
        };
        this.$refs.alerts.alertShow = true;
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition';

.close-btn {
    position: fixed;
    left: 10px;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    z-index: 17;
}

.login {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 15;

    .tao-icon {
        height: 4.2rem;
        width: 4.2rem;
        background: url('../../common/img/tao-icon.png') no-repeat;
        background-size: contain;
        margin: 4.5rem auto 0 auto;
    }

    .login-box {
        width: 90%;
        margin: 0 auto;

        .login-txt, .login-pwd {
            margin-top: 2rem;
            display: block;
            width: 100%;
            box-sizing: border-box;
            border: 0;
            border-bottom: 1px solid $red;
            padding: 0.7rem 0;
            margin-top: 1.5rem;
            padding-left: 5px;
            outline: none;
        }

        .checkcode-wrap {
            display: flex;
            margin-top: 1rem;
            font-size: 0.7rem;
            justify-content: space-between;
        }

        .login-btn, .login-btn-sm {
            width: 100%;
            border: 0;
            background: #fff;
            padding: 0.7rem 0;
            text-align: center;
            border-radius: 2rem;
            font-size: 1.1rem;
            color: #fff;
            outline: none;
            margin-top: 1.8rem;
        }

        .login-btn {
            background: -webkit-linear-gradient(left, #ff9000, #ff5000) no-repeat;
            box-shadow: 0 0.08rem 0.16rem #f7c7b1;
        }

        .login-btn-sm {
            border: 1px solid $red;
            color: $red;
        }

        .login-info {
            margin-top: 1.8rem;
            font-size: 0.8rem;
            color: $red;
        }
    }
}
</style>		