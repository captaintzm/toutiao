<!--  -->
<template>
  <div class="my-container">
      <van-cell-group class="my-info" v-if="user">
        <van-cell title="单元格" value="内容" center class="base-info" :border="false">
          <van-image slot="icon" round fit="cover" class="avatar"
            :src="currentUser.photo" />
          <div slot="title" class="name">{{ currentUser.name }}</div>
          <van-button size="small" round class="update-btn" to="/user/profile">编辑资料</van-button>
        </van-cell>
        <van-grid class="data-info" :border="false">
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">{{currentUser.art_count }}</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">{{ currentUser.follow_count }}</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div slot="text"  class="text-wrap">
              <div class="count">{{ currentUser.fans_count }}</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div slot="text"  class="text-wrap">
              <div class="count">{{ currentUser.like_count }}</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <div v-else class="no-login">
         <div @click="$router.push({
           name: 'login',
           query: {
          redirect: '/own'
          }
         })">
             <img src="./手机.png" alt="" class="moblie">
         </div>
         <div class="text">登录 / 注册</div>
      </div>
      <van-grid :column-num="2" class="nav mb4">
        <van-grid-item class="nav-item" icon-prefix="iconfont wjshoucang_huaban" icon="wjshoucang_huaban" text="收藏" />
        <van-grid-item class="nav-item" icon-prefix="iconfont wjlishi" icon="photo-o" text="历史" />
      </van-grid>
      <van-cell value="消息通知" is-link to="" />
      <van-cell value="小智同学" is-link to="/user/chat" class="mb4"/>
      <van-cell v-if="user" title="退出登录" class="logout" @click="onLogout"/>
  </div>
</template>

<script>
import {getCurrentUser} from '@/api/user'
import {mapState} from 'vuex'
  export default {
      name:'myIndex',
    data() {
      return {
         currentUser:{} //当前登录用户信息
      }
    },
    //方法集合
    methods: {
      async loadCurrentUser(){
           //es6中的结构赋值 const {a} = b 等价于 const a = b.a
           const {data} = await getCurrentUser()

           this.currentUser = data.data
       },
       onLogout(){
           //提示用户确认退出
           //确认 =>确认退出 
           0
           this.$dialog.confirm({
            title: '退出提示',
            message: '确认退出吗？'
            })
            .then(() => {
                // 确认退出，清空用户信息
                this.$store.commit('setUser',null)
            })
            .catch(() => {
                // on cancel
            });
     }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
       this.loadCurrentUser()
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    },
    activated(){
      if(this.user){
          this.loadCurrentUser()
      }
    },
    computed:{
        ...mapState(['user'])
    }
  }

</script>
<style lang="less" scoped>
  /* @import url(); 引入css类 */
.my-container{
    .my-info{
      background: url("./banner.png") no-repeat;
      background-size: cover;
     .base-info{
         height: 115px;
         padding-top:38px;
         padding-bottom: 11px;
         box-sizing: border-box;
         background: unset; //取消背景
         .avatar{
             box-sizing: border-box;
             width: 66px;
             height: 66px;
             border: 1px solid #fff;
             margin-right: 11px;
         }
         .name{
             font-size: 15px;
             color: #fff;
         }
         .update-btn{
             height: 16px;
             font-size: 10px;
             color: #666;
         } 
         
     }
      .data-info{

        .data-info-item{
          height: 65px;
          color: #666;
          .text-wrap{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count{
              font-size: 18px;
            }
            .text{
              font-size: 11px;
            }
          }
        }
      }
  }
  
  .no-login{
      height: 180px;
      background: url('./banner.png');
      background-size: cover;
      display: flex;
      flex-direction: column; //文字垂直排列
      justify-content: center;
      align-items: center;
      .moblie{
          width: 66px;
          height: 66px;
      }
      .text{
          font-size: 14px;
          color: #fff;
      }
  }
 /deep/ .nav{
         .nav-item{
             height: 70px;
             .van-grid-item__text{
                 font-size: 14px;
                 color: #333;
             }
         }
     }
     .logout{
         color: #d86262;
     }
    .mb4{
        margin-bottom: 4px;
    }
}
</style>
