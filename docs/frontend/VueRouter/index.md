

# 路由介绍

## 1.1  什么是前端路由

- 路由其实是网络工程中的一个术语： 
  - 在架构一个网络时，非常重要的两个设备就是路由器和交换机。 
  - 当然，目前在我们生活中路由器也是越来越被大家所熟知，因为我们生活中都会用到路由器： 
  - 事实上，路由器主要维护的是一个映射表； 
  - 映射表会决定数据的流向； 
- 路由的概念在软件工程中出现，最早是在后端路由中实现的，原因是web的发展主要经历了这样一些阶段： 
  - 后端路由阶段； 
  - 前后端分离阶段； 
  - 单页面富应用（SPA）；



## 1.2 URL的hash

- URL的hash 

  - URL的hash也就是锚点(#), 本质上是改变`window.location`的`href`属性； 

  - 我们可以通过直接赋值`location.hash`来改变`href`, 但是页面不发生刷新；

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <div id="app">
    <a href="#/home">home</a>
    <a href="#/about">about</a>

    <div class="content">Default</div>
  </div>

  <script>
    const contentEl = document.querySelector('.content');
    window.addEventListener("hashchange", () => {
      switch(location.hash) {
        case "#/home":
          contentEl.innerHTML = "Home";
          break;
        case "#/about":
          contentEl.innerHTML = "About";
          break;
        default:
          contentEl.innerHTML = "Default";
      }
    })
  </script>

</body>
</html>
```



## 1.3 HTML5的History

- history接口是HTML5新增的, 它有六种模式改变URL而不刷新页面： 
  - `replaceState`：替换原来的路径； 
  - `pushState`：使用新的路径； 
  - `popState`：路径的回退； 
  - `go`：向前或向后改变路径； 
  - `forward`：向前改变路径； 
  - `back`：向后改变路径；

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <a href="/home">home</a>
    <a href="/about">about</a>

    <div class="content">Default</div>
  </div>

  <script>
    const contentEl = document.querySelector('.content');

    const changeContent = () => {
      console.log("-----");
      switch(location.pathname) {
        case "/home":
          contentEl.innerHTML = "Home";
          break;
        case "/about":
          contentEl.innerHTML = "About";
          break;
        default: 
          contentEl.innerHTML = "Default";
      }
    }

    const aEls = document.getElementsByTagName("a");
    for (let aEl of aEls) {
      aEl.addEventListener("click", e => {
        e.preventDefault();
        
        const href = aEl.getAttribute("href");
        // history.pushState({}, "", href);
        history.replaceState({}, "", href);

        changeContent();
      })
    }

    window.addEventListener("popstate", changeContent)

    

  </script>
</body>
</html>
```



# 基础

## 2.1  [Vue Router](https://router.vuejs.org/zh/) 是什么？

`Vue Router` 是 [Vue.js](http://v3.vuejs.org/) 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：

- 嵌套路由映射
- 动态路由选择
- 模块化、基于组件的路由配置
- 路由参数、查询、通配符
- 展示由 Vue.js 的过渡系统提供的过渡效果
- 细致的导航控制
- 自动激活 CSS 类的链接
- HTML5 history 模式或 hash 模式
- 可定制的滚动行为
- URL 的正确编码



## 2.2 安装

###  2.2.1 直接下载 / CDN

https://unpkg.com/vue-router@4

[Unpkg.com](https://unpkg.com/) 提供了基于 npm 的 CDN 链接。上述链接将始终指向 npm 上的最新版本。 你也可以通过像 `https://unpkg.com/vue-router@4.0.15/dist/vue-router.global.js` 这样的 URL 来使用特定的版本或 Tag。

### 2.2.2 npm

```bash
npm install vue-router@4
```

### 2.2.3 yarn

```bash
yarn add vue-router@4
```



## 2.3 路由的使用步骤

- 使用`vue-router`的步骤: 
  - 第一步：创建路由组件的组件； 
  - 第二步：配置路由映射: 组件和路径映射关系的routes数组； 
  - 第三步：通过`createRouter`创建路由对象，并且传入routes和history模式； 
  - 第四步：使用路由: 通过`router-link`和`router-view`



## 2.4 路由的基本使用流程



1. 首先在`main.js`导入router
2. 在router文件夹创建`index.js`定义路由
3. `App.vue`使用router



`main.js`

```js
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
// 链式写法
// createApp(App).use(router).mount("#app")
```



`index.js`

```js
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from "../pages/Home.vue";
import About from "../pages/About.vue";

// 配置映射关系
const routes = [
  { path: "/home", component:Home),},
  { path: "/about",component: About) },
];

// 创建一个路由对象router
const router = createRouter({
  routes,
  history: createWebHistory()
})



export default router
```



`App.vue`

```vue
<template>
  <div id="app">
    <p>
        <router-link to='/home'>首页</router-link>
        <router-link to='/about'>关于</router-link>
    </p>
    <router-view ></router-view>
  </div>
</template>
```



## 2.5 路由配置默认路径

- 我们在routes中又配置了一个映射： 

  - `path`配置的是根路径: / 
  - `redirect`是重定向, 也就是我们将根路径重定向到/home的路径下

  ```js
  const routes = [
    { path: "/", redirect: "/home" },
  ]
  ```



## 2.6 history模式

`history模式`

```js
import { createRouter, createWebHistory }

const router = createRouter({
    routers,
    history: createWebHistory()
})
```



`示例：`  `http://localhost:3000/home`



## 2.7 router-link的属性

- `to`属性： 

  - 表示目标路由的链接。当被点击后，内部会立刻把 `to` 的值传到 `router.push()`，所以这个值可以是一个 `string` 或者是[描述目标位置的对象](https://router.vuejs.org/zh/api/#routelocationraw)

  - 是一个字符串，或者是一个对象 

- `replace`属性： 

  - 设置 `replace` 属性的话，当点击时，会调用 `router.replace()`，而不是 `router.push()`，所以导航后不会留下历史记录。

- `active-class`属性： 

  - 设置激活a元素后应用的class，默认是`router-link-active`

- `exact-active-class`属性： 

  - 链接精准激活时，应用于渲染的`<a>`  的 `class`，默认是`router-link-exact-active`；





## 2.8 路由懒加载

- 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载： 

  - 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会 更加高效； 
  - 也可以提高首屏的渲染效率； 

- `Vue Router`默认就支持动态来导入组件： 

  - 这是因为component可以传入一个组件，也可以接收一个函数，该函数 需要放回一个Promise； 
  - 而import函数就是返回一个Promise

  ```js
  const routes = [
    { 
      path: "/", 
      redirect: "/home" 
    },
    { 
      path: "/home", 
      name: "home",
      component: () => import(/* webpackChunkName: "home-chunk" */"../pages/Home.vue"),
     }
  ]
  ```

  



## 2.9 路由的其他属性

- name属性：路由记录独一无二的名称； 

- meta属性：自定义的数据

  ```js
  { 
      path: "/home", 
      name: "home",
      component: () => import(/* webpackChunkName: "home-chunk" */"../pages/Home.vue"),
      meta: {
        name: "why",
        age: 18,
        height: 1.88
      }  
  }
  ```



## 2.10 动态路由基本匹配

- 很多时候我们需要将给定匹配模式的路由映射到同一个组件：

  - 例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但是用户的ID是不同的； 
  - 在`Vue Router`中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数；

  ```js
    { 
      path: "/user/:id",
      component: () => import("../pages/User.vue") 
    }
  ```

   

- 在router-link中进行如下跳转：

  ```html
  <router-link to="/user/test/id/21"></router-link>
  ```



`匹配多个参数:`

```js
  { 
    path: "/user/:id/info/:name",
    component: () => import("../pages/User.vue") 
  }
```



| 匹配                  | 匹配路径            | $route.params             |
| :-------------------- | ------------------- | ------------------------- |
| `/users/:id`            | `/users/123`          | `{ id:  ‘123’ }`            |
| `/users/:id/info/:name` | `/users/123/info/why` | `{ id: ‘123’, name: ‘why’}` |



## 2.11 获取动态路由的值

- 在template中，直接通过 `route.params`获取值； 

  ```html
  <template>
    <div>
      <h2>User: {{$route.params.username}}-{{$route.params.id}}</h2>
    </div>
  </template>
  ```

  

- 在created中，通过 `this.$route.params`获取值； 

  ```js
  <script>
     export default {
      created() {
        console.log(this.$route.params.username);
      }
   }
  </script>
  ```

  

- 在setup中，我们要使用 `vue-router`库给我们提供的一个hook `useRoute`；

  - 该Hook会返回一个Route对象，对象中保存着当前路由相关的值；

    ```js
    <script>
      import { useRoute } from "vue-router";
    
      export default {
        setup() {
          const route = useRoute();
          console.log(route.params.username);
        }
      }
    </script>
    ```

    

## 2.12 自定义NotFound页面

- 对于哪些没有匹配到的路由，我们通常会匹配到固定的某个页面 

  - 比如NotFound的错误页面中，这个时候我们可编写一个动态路由用于匹配所有的页面； 

    ```js
    {
      path: "/:pathMatch(.*)",
      component: () => import("../pages/NotFound.vue")
    }
    ```

    

- 我们可以通过 `$route.params.pathMatch`获取到传入的参数：

  ```html
  <template>
    <div>
      <h2>Page Not Found</h2>
      <p>您打开的路径页面不存在, 请不要使用我们家的应用程序了~</p>
      <h1>{{$route.params.pathMatch}}</h1>
    </div>
  </template>
  
  <script>
    export default {
      
    }
  </script>
  ```

- `匹配规则加*`

  ```js
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../pages/NotFound.vue")
  }
  ```

  

- 与不加`*`的区别在于解析的时候，是否解析 /：

  - `path: "/:pathMatch(.*)":`   Not Found:`[ “user”, “hello”, “123” ]`
  - `path: "/:pathMatch(.*)*":`   Not Found:`  user/hello/123” ]`



## 2.13 路由的嵌套

- 什么是路由的嵌套呢？ 
  - 目前我们匹配的Home、About、User等都属于底层路由，我们在它们之间可以来回进行切换； 
  - 但是呢，我们Home页面本身，也可能会在多个组件之间来回切换： 
    - 比如Home中包括Product、Message，它们可以在Home内部来回切换； 
  - 这个时候我们就需要使用嵌套路由，在Home中也使用 router-view 来占位之后需要渲染的组件；



## 2.14 路由的嵌套配置

```js
// 配置映射关系
const routes = [
  { 
    path: "/", 
    redirect: "/home" 
  },
  { 
    path: "/home", 
    name: "home",
    component: () => import(/* webpackChunkName: "home-chunk" */"../pages/Home.vue"),
    meta: {
      name: "why",
      age: 18,
      height: 1.88
    },
    children: [
      {
        path: "",
        redirect: "/home/message"
      },
      {
        path: "message",
        component: () => import("../pages/HomeMessage.vue")
      },
      {
        path: "shops",
        component: () => import("../pages/HomeShops.vue")
      }
    ]
  },
];
```



## 2.15 代码的页面跳转

- 有时候我们希望通过代码来完成页面的跳转，比如点击的是一个按钮：

  ```js
  jumpToProfile() {
      this.$router.push('/profile')
  }
  ```

   

- 当然，我们也可以传入一个对象： 

  ```js
  jumpToProfile() {
      this.$router.push({
          path: '/profile'
      })
  }
  ```

  

- 如果是在setup中编写的代码，那么我们可以通过 `useRouter` 来获取：

  ```js
    import { useRouter } from 'vue-router';
  
    export default {
      setup() {
        const router = useRouter();
  
        const loginClick = () => {
  
          window.localStorage.setItem("token", "why")
  
          router.push({
            path: "/home"
          })
        }
  
        return {
          loginClick
        }
      }
    }
  ```



## 2.16 query方式的参数

- 我们也可以通过`query`的方式来传递参数：

  ```js
  jumpToProfile() {
      this.$router.push({
          path: '/profile',
          query: { name: 'wjy', age:18 }
      })
  }
  ```

   

- 在界面中通过 `$route.query` 来获取参数：

  ```html
  <h2>About: {{$route.query.name}}-{{$route.query.age}}</h2>
  ```



## 2.17 替换当前的位置

- 使用push的特点是压入一个新的页面，那么在用户点击返回时，上一个页面还可以回退，但是如果我们希望当前 页面是一个替换操作，那么可以使用replace：

  | 声明式                          | 编程式              |
  | ------------------------------- | ------------------- |
  | `<router-link :to="..." replace>` | router.replace(...) |



## 2.18 页面的前进后退

- router的go方法： 

  ```js
  //  向前移动一条记录，与router。forward()相同
  router.go(1)
  
  // 返回一条记录，与router.back() 相同
  ```

  

- router也有back： 

  -  通过调用 `history.back()` 回溯历史。相当于 `router.go(-1)`； 

- router也有forward： 

  - 通过调用 `history.forward()` 在历史中前进。相当于 `router.go(1)`；



## 2.19 router-link的v-slot

- v-slot的使用:
- 首先，我们需要使用custom表示我们整个元素要自定义 
  - 如果不写，那么自定义的内容会被包裹在一个 a 元素中； 
- 其次，我们使用v-slot来作用域插槽来获取内部传给我们的值： 
  - href：解析后的 URL； 
  - route：解析后的规范化的route对象； 
  - navigate：触发导航的函数； 
  - isActive：是否匹配的状态； 
  - isExactActive：是否是精准匹配的状态；

:::tip

注意

记得把 `custom` 配置传递给 `<router-link>`，以防止它将内容包裹在 `<a>` 元素内。

::: 



```html
    <!-- props: href 跳转的链接 -->
    <!-- props: route对象 -->
    <!-- props: navigate导航函数 -->
    <!-- props: isActive 是否当前处于活跃的状态 -->
    <!-- props: isExactActive 是否当前处于精确的活跃状态 -->
    <router-link to="/home" v-slot="props" custom>
      <button @click="props.navigate">{{props.href}}</button>
      <button @click="props.navigate">哈哈哈</button>
      <span :class="{'active': props.isActive}">{{props.isActive}}</span>
      <span :class="{'active': props.isActive}">{{props.isExactActive}}</span>
      <!-- <p>{{props.route}}</p> -->
    </router-link>
```



## 2.20 router-view的v-slot

- 提供给我们一个插槽，可以用于`<transition>`  和`<keep-alive>`  组件来包裹你的路由组件： 

  - Component：要渲染的组件； 

  - route：解析出的标准化路由对象

```html
<router-view v-slot="props">
  <transition name="why">
    <keep-alive>
      <component :is="props.Component"></component>
    </keep-alive>
  </transition>
</router-view>
```



```css
<style>
  .why-active {
    color: red;
  }

  .why-enter-from,
  .why-leave-to {
    opacity: 0;
  }

  .why-enter-active,
  .why-leave-active {
    transition: opacity 1s ease;
  }
</style>

```



## 2.21 动态添加路由

- 某些情况下我们可能需要动态的来添加路由： 

  - 比如根据用户不同的权限，注册不同的路由； 

  - 这个时候我们可以使用一个方法` addRoute`； 

    ```js
    // 动态添加路由
    const categoryRoute = {
      path: "/category",
      component: () => import("../pages/Category.vue")
    }
    
    // 添加顶级路由对象
    router.addRoute(categoryRoute);
    ```

    

- 如果我们是为route添加一个children路由，那么可以传入对应的name：

  ```js
  // 添加二级路由对象
  router.addRoute("home", {
    path: "moment",
    component: () => import("../pages/HomeMoment.vue")
  })
  ```



##  2.22 动态删除路由

- 删除路由有以下三种方式： 

  - 方式一：添加一个name相同的路由； 

    ```js
    router.addRoute({ path: '/about', name: 'about', component: About })
    // 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
    router.addRoute({ path: '/other', name: 'about', component: Other })
    ```

    

  - 方式二：通过`removeRoute`方法，传入路由的名称； 

    ```js
    router.addRoute({ path: '/about', name: 'about', component: About })
    // 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
    router.addRoute({ path: '/other', name: 'about', component: Other })
    ```

    

  - 方式三：通过`addRoute`方法的返回值回调； 

    ```js
    router.addRoute({ path: '/about', name: 'about', component: About })
    // 删除路由
    router.removeRoute('about')
    ```

    

- 路由的其他方法补充： 

  - `router.hasRoute()`：检查路由是否存在。 
  - `router.getRoutes()`：获取一个包含所有路由记录的数组。





## 2.23 路由导航守卫

- vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。 
- 全局的前置守卫`beforeEach`是在导航触发时会被回调的： 
- 它有两个参数： 
  - to：即将进入的路由Route对象； 
  - from：即将离开的路由Route对象； 
- 它有返回值： 
  - false：取消当前导航； 
  - 不返回或者undefined：进行默认导航； 
  - 返回一个路由地址： 
    - 可以是一个string类型的路径； 
    - 可以是一个对象，对象中包含path、query、params等信息； 
- 可选的第三个参数：next 
  - 在Vue2中我们是通过next函数来决定如何进行跳转的； 
  - 但是在Vue3中我们是通过返回值来控制的，不再推荐使用next函数，这是因为开发中很容易调用多次next；

```js
// 导航守卫beforeEach
let counter = 0;
// to: Route对象, 即将跳转到的Route对象
// from: Route对象, 
/**
 * 返回值问题:
 *    1.false: 不进行导航
 *    2.undefined或者不写返回值: 进行默认导航
 *    3.字符串: 路径, 跳转到对应的路径中
 *    4.对象: 类似于 router.push({path: "/login", query: ....})
 */
router.beforeEach((to, from) => {
  console.log(`进行了${++counter}路由跳转`)
  // if (to.path.indexOf("/home") !== -1) {
  //   return "/login"
  // }
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return "/login"
    }
  }
})
```



##  2.24 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。



### 2.25 historyApiFallback

- historyApiFallback是开发中一个非常常见的属性，它主要的作用是解决SPA页面在路由跳转之后，进行页面刷新 时，返回404的错误。 
- boolean值：默认是false 
  - 如果设置为true，那么在刷新时，返回404错误时，会自动返回 index.html 的内容； 
- object类型的值，可以配置rewrites属性： 
  - 可以配置from来匹配路径，决定要跳转到哪一个页面； 
- 事实上devServer中实现historyApiFallback功能是通过connect-history-api-fallback库的：
  - 可以查看[connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) 文档



