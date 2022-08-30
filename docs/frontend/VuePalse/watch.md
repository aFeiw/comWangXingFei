# 9.侦听器 watch

开发中我们在 data 返回的对象中定义了数据，这个数据通过插值语法等方式绑定到 template 中；

当数据变化时，template 会自动进行更新来显示最新的数据；

但是在某些情况下，我们希望在代码逻辑中监听某个数据的变化，这个时候就需要用侦听器 watch 来完成了

## 9.1 侦听器的基本使用

比如现在我们希望用户在 input 中输入一个问题；

每当用户输入了最新的内容，我们就获取到最新的内容，并且使用该问题去服务器查询答案；

那么，我们就需要实时的去获取最新的数据变化；

`示例:`

<img src="../../public/vue/image-20220706145633145.png" alt="image-20220706145633145" style="zoom: 80%;" />

```vue
<div id="app"></div>

<template id="my-app">
  您的问题: <input type="text" v-model="question" />
</template>

<script src="../js/vue.js"></script>
<script>
const App = {
  template: '#my-app',
  data() {
    return {
      // 侦听question的变化时, 去进行一些逻辑的处理(JavaScript, 网络请求)
      question: 'Hello World',
      anwser: '',
    }
  },
  watch: {
    // question侦听的data中的属性的名称
    // newValue变化后的新值
    // oldValue变化前的旧值
    question: function (newValue, oldValue) {
      console.log('新值: ', newValue, '旧值', oldValue)
    },
  },
}

Vue.createApp(App).mount('#app')
</script>
```

## 9.2 侦听器的配置选项

**深层监听器**

`watch` 默认是浅层的：被侦听的 property，仅在被赋新值时，才会触发回调函数——而嵌套 property 的变化不会触发。如果想要侦听所有嵌套的变更，则需要深层侦听器：

```js
    info: {
      handler: function(newInfo, oldInfo) {
        console.log("newValue:", newInfo.nba.name, "oldValue:", oldInfo.nba.name);
      },
      deep: true, // 深度侦听
      // immediate: true // 立即执行
    }
```

::: 谨慎使用

深度侦听需要遍历被侦听对象中的所有嵌套的 property，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。

:::

**回调的刷新时机**

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，需要指明 `flush: 'post'` 选项：

`示例：`

```vue
<div id="app"></div>

<template id="my-app">
  <h2>{{ info.name }}</h2>
  <button @click="changeInfo">改变info</button>
  <button @click="changeInfoName">改变info.name</button>
  <button @click="changeInfoNbaName">改变info.nba.name</button>
</template>

<script src="../js/vue.js"></script>
<script>
const App = {
  template: '#my-app',
  data() {
    return {
      info: { name: 'why', age: 18, nba: { name: 'kobe' } },
    }
  },
  watch: {
    // 默认情况下我们的侦听器只会针对监听的数据本身的改变(内部发生的改变是不能侦听)
    // 深度侦听/立即执行(一定会执行一次)
    info: {
      handler: function (newInfo, oldInfo) {
        console.log(
          'newValue:',
          newInfo.nba.name,
          'oldValue:',
          oldInfo.nba.name
        )
      },
      deep: true, // 深度侦听
      // immediate: true // 立即执行
    },
  },
  methods: {
    changeInfo() {
      this.info = { name: 'kobe' }
    },
    changeInfoName() {
      this.info.name = 'kobe'
    },
    changeInfoNbaName() {
      this.info.nba.name = 'james'
    },
  },
}

Vue.createApp(App).mount('#app')
</script>
```

## 9.3 侦听器的其他方式

**this.$watch()**

在特定条件下设置一个侦听器，或者只侦听响应用户交互的内容。

它还允许使用 unwatch()提前停止该侦听器。

`示例:`

```vue
<div id="app"></div>

<template id="my-app">
  <h2>{{ info.name }}</h2>
  <button @click="changeInfo">改变info</button>
  <button @click="changeInfoName">改变info.name</button>
  <button @click="changeInfoNbaName">改变info.nba.name</button>
  <button @click="changeFriendName">改变friends[0].name</button>
</template>

<script src="../js/vue.js"></script>
<script>
const App = {
  template: '#my-app',
  data() {
    return {
      info: { name: 'why', age: 18, nba: { name: 'kobe' } },
      friends: [{ name: 'why' }, { name: 'kobe' }],
    }
  },
  watch: {
    info(newValue, oldValue) {
      console.log(newValue, oldValue)
    },
    'info.name': function (newName, oldName) {
      console.log(newName, oldName)
    },
    'friends[0].name': function (newName, oldName) {
      console.log(newName, oldName)
    },
  },
  methods: {
    changeInfo() {
      this.info = { name: 'kobe' }
    },
    changeInfoName() {
      this.info.name = 'kobe'
    },
    changeInfoNbaName() {
      this.info.nba.name = 'james'
    },
    changeFriendName() {
      this.friends[0].name = 'curry'
    },
  },
  created() {
    const unwatch = this.$watch(
      'info',
      function (newInfo, oldInfo) {
        console.log(newInfo, oldInfo)
      },
      {
        deep: true,
        immediate: true,
      }
    )
    // unwatch()
  },
}

Vue.createApp(App).mount('#app')
</script>
```
