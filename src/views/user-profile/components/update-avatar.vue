<template>
<div class="update-avatar">
    <img :src="image"  ref="image" class="image">
    <van-nav-bar 
     left-text="取消"
     right-text="确认"
     class="lowbar"
     @click-left="$emit('close')"
     @click-right="onConfirm"/>
</div>
</template>

<script>
import {updateUserPhoto} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
    name:'updateAvatar',
data() {
return {
   image:window.URL.createObjectURL(this.file),
   cropper: null // 裁切器实例
}
},
props:{
    file:{
        // type:String,
        required:true
    }
},
//方法集合
methods: {
    // cropper的这个方法不支持promise,所以我们将它包装成promise
   getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
  async onConfirm(){
       this.$toast({
       message:'保存中...',
       forbidClick:true //禁止背景点击
   })
      // 如果要求 Content-Type 是 multipart/form-data，则一定要提交 FormData 数据对象，专门用于文件上传的，不能提交 {}，没用
    const file = await this.getCroppedCanvas()
    const fd = new FormData()
    fd.append('photo',file)
    await updateUserPhoto(fd)
    // 关闭弹出层
      this.$emit('close')
    this.$toast.success('保存成功')
    this.$emit('update-avatar',window.URL.createObjectURL(file))
   }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {
   // 获取需要裁切的图片 DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */
.update-avatar{
  .lowbar{
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0;
   background: #000;
   .image{
    //    display: block;
       max-width: 100%;
   }
}
}
</style>