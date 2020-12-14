import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'
Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path:"/",
    component:()=>import('@/views/layout/'),
    children:[
      {
        path:'', //默认子路由
        name:'Home',
        component:()=>import('@/views/home/'),
        meta: { requiresAuth: false }
      },
      {
        path:'/question',
        name:'Question',
        component:()=>import('@/views/question/'),
        meta: { requiresAuth: false }
      },
      {
        path:'/video',
        name:'Video',
        component:()=>import('@/views/video/'),
        meta: { requiresAuth: false }
      },
      {
        path:'/own',
        name:'Own',
        component:()=>import('@/views/own/'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path:"/login",
    name:"Login",
    component:()=>import('@/views/login/'),
    meta: { requiresAuth: false } // 添加额外的自定义数据
  },
  {
    path:"/search",
    name:"Search",
    component:()=>import('@/views/search/'),
    meta: { requiresAuth: false }
  },
  {
    //动态路由
    path:"/article/:articleId",
    name:"article",
    component:()=>import('@/views/article/'),
    meta: { requiresAuth: false },
    //将动态路由参数映射到组件的props中，无论是访问还是维护性都很方便
    props:true
  },
  {
    path:"/user/profile",
    name:"userProfile",
    component:()=>import('@/views/user-profile/'),
    meta: { requiresAuth: false }
  },
  {
    path:"/user/chat",
    name:"userChat",
    component:()=>import('@/views/user-chat/'),
    meta: { requiresAuth: true }
  },

    

    // path: '/about',
    // name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/About.vue')
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// to: 要访问的页面路由信息
// from: 来自哪个页面的路由信息
// next：放行的标记
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登录才能访问
  if (to.meta.requiresAuth) {
    // 如果已登录，则直接通过
    if (store.state.user) {
      return next()
    }

    // 没有登录，提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    }).then(() => { // 确认执行这里
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => { // 取消执行这里
      // 取消了，中断路由导航
      next(false)
    })
  } else {
    // 不需要登录状态的页面，直接过去
    next()
  }
})

export default router
