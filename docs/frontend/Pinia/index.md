## pinia和vuex的对比

### 什么是Pinia

-  Pinia [最初是](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e)一个实验，在 2019 年 11 月左右通过 [Composition API](https://github.com/vuejs/composition-api) 重新设计 Vue 商店的样子。
-  从那时起，最初的原理仍然相同，但Pinia适用于Vue 2和Vue 3**，并且不需要你使用组合API**。
-  Pinia本质上依然是`状态管理的库`,用于`跨组件、页面进行状态共享`(这点和Vuex和Redux一样)



### Pinia和Vuex的区别

- 与Vuex相比，Pinia提供了一个更简单的API，具有更少的仪式，提供了Composition-API风格的API
- 最重要的是，在于TypeScript一起使用时具有可靠的类型判断支持
- **和Vue相比，Pinia有很多的优势**
  - 比如mutaions不再存在
  - 更友好的Typescript支持，Vuex之前对Ts的支持很不友好
  - 不再有modules的嵌套结构：
    - 你可以灵活使用每一个store，它们通过扁平化的方式来相互使用的
  - 也不再有命名空间的概念，不需要记住它们的复杂关系



### Pinia的使用

#### 安装

```sh
yarn add pinia
# or with npm
npm install pinia
```

#### 使用

创建一个 pinia 实例（根存储），并将其作为插件传递给应用程序：

```
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```



## 创建Pinia的Store

###  定义Store

它需要一个**唯**一的名称，作为第一个参数传递：`defineStore()`

```
import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
//您可以将“defineStore（）”的返回值命名为任何您想要的名称，但最好使用存储的名称并用“use”和“store”将其包围（例如，`useUserStore'、`useCartStore'，`useProductStore'）
//第一个参数是应用程序中存储的唯一id
export const useStore = defineStore('main', {
  // other options...
})
```

此*名称*（也称为 *id*）是必需的，Pinia 使用它将Store连接到 devtools。命名返回的函数 *use...* 是跨可组合的约定，以使其用法成为惯用语。

`defineStore()`接受两个不同的值作为其第二个 参数：安装函数或 Options 对象。



### 使用

`计数例子`

```js
import { defineStore } from 'pinia'

export const useCounter = defineStore('main', {
  state:()=>({
      count:90
  })
})
```

`vue页面使用`

```vue
<template>
	<div class="home">
        <h2>Home View</h2>
        <h2>count:{{ counterStore.count}}</h2>
    </div>
</template>

<script setup>
import {} from 'vue'
import useCounter from '@/stores/counter'

const counterStore = useCounter() 
</script>
<style lang="scss" scoped></style>
```



###  认识Store

- 什么是Store？
  - 一个Store是一个**实体**，它会持有为绑定到你**组件树**的**状态**和**业务逻辑**
  - 它有点像始终存在，并且**每个人都可以读取和写入的组件**
  - 你可以在你的应用程序中定义任意数量的Store来管理你的状态 
- Store有三个核心概念：
  - state、getters、actions；
  - 等同于组件的data、computed、methods；
  - 一旦store被实例化，你可以直接在store上访问state、getters和actions中定义的任何属性

### 定义一个Store

- store是使用defineStore()定义

- 并且它需要一个唯一名称，作为第一个参数传递；

- ```js
  export const useCounter = defineStore('main', {
    state:()=>({
        count:90
    })
  })
  ```

- 

- 这个那么，也称为id，是必要的，Pinia使用它来将store连接到devtools

- 返回的函数统一使用useX作为命名方案，这是约定的规范



### store的解构使用

- 注意Store获取到后不能被解构，那么会失去响应式：
  - 为了从Store中提取属性同时保持其响应式，你需要使用storeToRefs()

```vue
<template>
	<div class="home">
        <h2>count:{{ count}}</h2>
        <button @click="incrementCount">count +1</button>
    </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { storeToRefs } form 'pinia'
import useCounter from '@/stores/counter'

const counterStore = useCounter()
// 数据响应式
const { count } = toRefs(counterStore)

//pinia实现响应式
const { count } = storeToRefs(counterStore)

function incrementCount(){
    counterStore.count++
}
</script>
<style lang="scss" scoped></style>
```





## Pinia核心概念State

  ### 认识和定义State

- state是store的核心部分，因为store是用来帮助我们管理状态的。

  - 在Pinia中，状态被定义为初始状态的函数

    ```js
    export const useCounter = defineStore("counter",{
        state:()=>({
            counter:0,
            name:"why",
            age:18
         })
    })
    ```



### 操作state

- 读取和写入 state：

  - 默认情况下，可以通过store实例访问状态来直接读取和写入状态；

    ```js
    const counterStore = useCounter()
    counterStore.counter++
    ```

    

- 重置State：

  - 可以通过调用store上的`$reset()`方法将状态重置到其初始值；

    ```js
    const counterStore = useCounter()
    counterStore.$reset()
    ```

- 一次性修改多个状态

  - 除了直接用store.counter++修改store,可以调用`$patch()`;

  - 它允许使用部分`state`对象同时应用多个更改；

    ```js
    const counterStore = useCounter()
    
    counterStore.$patch({
        counter:100,
        test：“test”
    })
    ```

     

- 替换State：

  - 可以通过将其`$state`属性设置为新对象来替换Store的整个状态

    ```js
    counterStore.$state ={
        counter:100,
        test：“test”
    }
    ```

    

## Pinia核心概念Getters

### 认识和定义Getters

- Getters相当于Store的计算属性
  - 可以用`defineStore()`中的`getters`属性定义
  - getters中可以定义接受一个state作为参数的函数

`定义`

```js
export const useCounter = defineStore("counter",{
    state:()=>({
        counter:0,
        users:[
            {id:111,name:"why",age:18},
            {id:112,name:"why",age:18}
        ]
     }),
    getters:{
        //1.基本使用
        doubleCount(state){
            return state.count*2
        },
        // 2. 一个getter引入另一个getter
        doubleCountAddone(){
            // this是store类型
            return this.doubleCount + 1
        },
        //3.getters也支持返回一个函数
        getUserById(state){
            return function(id){
                return state.users.find()
            }
        },
        showMessage(state){
            // 1.获取user信息
            const userStore = useUser()
            
            return `name:${userStore.name}-count:${state.count}`
        }
    }
})
```



### 访问Getters

- 访问当前store的Getters:

  ```js
  const counterStore = useCounter()
  console.log(counterStore.doubleCount)
  ```

  

- Getters中访问自己的其他Getters:

  - 可以通过this来访问到当前store实例的所有其他属性

    ```js
    getUserById(state){
        return function(id){
            return state.users.find()
        }
    }
    ```

     

- 访问其他store的Getters

  ```js
  message(state){
      const userStore = useUser()
      return this.fullname +":"+ userStore.nickname
  }
  ```

- Getters也可以返回一个函数，这样就可以接受参数

  ```js
  export const useCounter = defineStore("counter",{
      state:()=>({
          users:[
              {id:111,name:"why",age:18},
              {id:112,name:"why",age:18}
          ]
       }),
      getters:{
          getUserById(state){
              return userId =>{
                  return state.users.find(item=>item.id===userId)
              }
          }
      }
  })
  ```

   `使用`

  ```js
  const mainStore = useMain()
  const getUserById = mainStore.getUserById
  ```

  

## Pinia核心概念Actions

### 认识和定义

- Actions相当于组件中的methos。

  - 可以使用defineStore()中的actions属性定义，常用于定义业务逻辑


    ```js
    functon increment(){
    	counterStore.incrment()
    }
    function randomClick(){
    	counterStore.randomCounter
    }
    ```

    ```js
    actions:{
        increment(){
            this.counter++
        },
         randomCounter(){
             this.counter = Math.random()
         }
    }
    ```

- 和getters一样，在action中可以通过this访问整个store实例的所有操作；

  



### actions 执行异步操作

- actions中是支持异步操作的，并且我们可以编写异步函数，在函数中使用await



```js
import { defineStore } from 'pinia'
export const useCounter = defineStore("counter",{
    state:()=>({
        banners:[],
        recommends:[]
     }),
    actions:{
        async fetchHomeMultidata(){
            const res = await fetch("http://123.207.32.32:8000/home/multidata")
            const data = await res.json()
            
            this.bannes = data.data.banner.list
            this.recommend = data.data.recommend.list
        }
    }
})
```



`在vue中使用`

```vue
<template>
	<div class="home">
        <h2>轮播数据</h2>
        <ul>
            <template v-for="item in homeStore.banners"></template>
			<li>{{item.title}}</li>
    	</ul>
    </div>
</template>

<script setup>
import useHome from '@/stores/home'

 const homeStore = useHome()
</script>
```

