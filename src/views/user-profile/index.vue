<template>
<div class="user-profile">
     <van-nav-bar class="app-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
     <input type="file" hidden ref="file" accept="image/*" @change="onFileChange">
     <van-cell title="头像" class="a" value="" is-link center @click="$refs.file.click()">
         <van-image width="30" height="30" fit="cover" round :src="user.photo" />
     </van-cell>
     <van-cell title="昵称"  :value="user.name" is-link @click="isNameShow=true"></van-cell>
     <van-cell title="性别"  :value="user.gender===1? '女':'男'" is-link @click="isGenderShow = true"></van-cell>
     <van-cell title="生日"  :value="user.birthday" is-link @click="isBirthdayShow=true"></van-cell>
   
   <!-- 这里的v-if表示我们在修改昵称时，没有点击完成的时候，防止再次点开编辑弹出层时上次未保存的昵称再次存在 -->
     <van-popup 
      v-model="isNameShow" 
      position="bottom" 
      :style="{ height: '100%' }"
      v-if="isNameShow">
        <!--
        当你传递给子组件的数据既要使用又要修改，例如这里的 name
        这种情况下我们可以使用 v-model 简写
       -->
       <!--
        v-model="user.name"
          默认传递一个名字叫 value 的数据 :value="user.name"
          默认监听 input 事件 @input="user.name = $event"
        v-model 的本质还是父子组件通信，它仅仅是简化了父组件的使用
       -->
       <!--
        v-model 只能使用一次
       -->
       <!--
        如果有多个数据需要保持同步，使用 .sync 修饰符。
        :gender="user.gender"
        @update-gender="user.gender = $event"

        :gender.sync="user.gender"
          :gender="user.gender"
          @update:gender="user.gender = $event"
          @update:属性名称="user.gender = $event"

        我们一般把最常用的数据设计为 v-model 绑定，把不太常用的数据设计为 .sync

        :abc.sync="user.gender"
        :a.sync="user.xxx"

        参考文档：https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6
       -->
         <updateName
          @close="isNameShow=false" 
          v-model="user.name"/>
     </van-popup>
     
     <!-- 性别 -->
     <van-popup 
      v-model="isGenderShow" 
      position="bottom" 
      :style="{ height: '100%' }">
      <updateGender @close="isGenderShow=false" v-model="user.gender"/>
     </van-popup>

     <!-- 生日 -->
     <van-popup 
      v-model="isBirthdayShow" 
      position="bottom">
      <updateBirthday v-model="user.birthday" @close="isBirthdayShow=false"/>
     </van-popup>

     <!-- 头像 -->
     <van-popup 
      v-model="isAvatarShow" 
      class="update-photo-popup"
      position="top" 
      :style="{ height: '100%' }">
      <updateAvatar :file="previewImage" @close="isAvatarShow=false" @update-avatar="user.photo=$event" v-if="isAvatarShow"/>
     </van-popup>
</div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updateAvatar from './components/update-avatar'
export default {
    name:'UserProfile',
data() {
return {
   user:{}, //用户信息
   isNameShow:false, //控制用户昵称编辑弹出层
   isGenderShow:false, //控制性别编辑弹出层
   isBirthdayShow:false,//控制生日编辑弹出层
   isAvatarShow:false,//控制头像编辑弹出层
   previewImage: null // 上传预览图片
}
},
//方法集合
methods: {
 async getUser(){
    const {data} = await getUserProfile()
    this.user = data.data
    console.log(data)
  },
  onFileChange(){
    // const blob = window.URL.createObjectURL(this.$refs.file.files[0])通过这个得到新选择的图片
      const file = this.$refs.file.files[0]
      this.previewImage = file
      this.isAvatarShow = true
    // 为了解决相同文件不触发 change 事件，所以在这里手动的清空 file 的 value
      this.$refs.file.value = ''
  }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
  this.getUser()
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
components:{
    updateName,
    updateGender,
    updateBirthday,
    updateAvatar
}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */
.user-profile{
  /deep/ .van-cell__title{
      flex: unset;
  }
  .van-popup{
      background: #f5f7f9;
  }
  .update-photo-popup {
  background-color: #000;
}
}
</style>