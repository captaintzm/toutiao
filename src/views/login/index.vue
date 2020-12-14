<!--  -->
<template>
  <div class="login">
    <van-nav-bar class="app-nav-bar" title="注册 / 登录" left-arrow @click-left="$router.back()" />
    <!-- 使用vant的表单验证
 1.使用vant-form 组件包裹所有的表单项 van-field
 2.给vant-form绑定 @submit事件
 -->
    <van-form @submit="onLogin" @failed="onFailed" ref="login-form" :show-error="false" :show-error-message="false" validate-first>
      <van-field v-model="user.mobile" placeholder="请输入手机号" icon-prefix="iconfont wjphone" left-icon="wjphone"
        :rules="formRules.mobile"  name="mobile" center/>

      <van-field v-model="user.code" label="" placeholder="请输入验证码" icon-prefix="iconfont wjyanzhengma"
        left-icon="wjyanzhengma" :rules="formRules.code" name="code" center>
        <template #button>
          <van-count-down :time="1000*60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false"/>
          <van-button v-else size="small" round class="send-btn" :loading="sendLoading"  @click.prevent="onSendms">发送验证码</van-button>
          <!-- 因为此时发送验证码的按钮写在了form表单里，所以点击的时候回触发默认行为，所以才使用修饰符prevent阻止默认行为 -->
        </template>
      </van-field>
      <div class="wrap">
        <van-button class="logi-btn" type="info" block @click="onLogin">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {login} from '@/api/user.js';
  import {Toast} from 'vant'
  export default {
    name: 'Login',
    data() {
      return {
        sendLoading:false, //发送验证码按钮的状态
        user: {
          mobile: '13911111111', //手机号码
          code: '246810' //验证码
        },
        formRules: {
          mobile: [{
              required: true,
              message: '请填写手机号'
            },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '手机号格式错误'
            }
          ],

          code: [{
              required: true,
              message: '请填写验证码'
            },
            {
              pattern: /^\d{6}$/,
              message: '验证码格式错误'
            }
          ]
        },
        isCountDownShow:false
      }
    },
    //方法集合
    methods: {
      async onLogin() {
        this.$toast.loading({
          message: '登录中...', //文字提示 
          forbidClick: true, //禁止背景点击
          duration: 0 //展示时长(ms)，值为 0 时，toast 不会消失
        });

        //1.找到数据接口
        //2.封装请求方法
        //3.请求调用登录
       
        try {
          const {data} = await login(this.user)
          this.$toast.success('登录成功')

          //登录成功之后将后端返回的（token等数据）放在vuex中
            this.$store.commit('setUser', data.data)
            this.$router.push(this.$route.query.redirect || '/')
          //4.处理响应结果    
        } catch (error) {
          console.log('登录失败', error)
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
      },
     async onSendms() {
        //校验手机号
        //如果只验证表单的某一项就使用validate(),由于返回的是promise，所以要使用.then()拿结果,从而我们可以使用async await
        try {
           await this.$refs['login-form'].validate('mobile')
                      //验证通过发送验证码
           this.sendLoading = true //防止网络慢，用户多次发送验证码请求
           //短信发出去了，隐藏发送按钮，显示倒计时
           this.isCountDownShow=true
        }catch (error) {
          this.$toast({
            message:error.message,
            position:'top'
          })
        }
        this.sendLoading = false //无论发送验证码成功还是失败都要关闭
        //验证通过 -> 请求发送验证码 -> 用户接受短信 -> 输入验证码 -> 请求登录
        //请求发送验证码 -> 隐藏发送按钮，显示倒计时
        //倒计时结束 -> 隐藏倒计时，显示发送按钮
      },
      onFailed(error){
        console.log(error)
       if(error.errors[0]){
         this.$toast({
           message:error.errors[0].message,
           position:'top' //防止手机键盘太高，看不见提示
         })
       }
      }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
  }

</script>
<style lang="less" scoped>
  /* @import url(); 引入css类 */
  .login {
    .send-btn {
      width: 80px;
      height: 23px;
      background-color: #ededed;

      // line-height: 23px;
      .van-button__text {
        font-size: 11px;
        color: #666;
      }
    }

    .wrap {
      padding: 26px 16px;

      .logi-btn {
        background-color: #6db4fb;
        border: none;

        .van-button__text {
          font-size: 15px;
        }
      }
    }
  }

</style>
