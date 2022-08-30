#  10. 表单输入绑定（v-model）

## 10.1 v-mdoel的基本使用

- 表单提交是开发中非常常见的功能，也是和用户交互的重要手段： 

- 比如用户在登录、注册时需要提交账号密码； 
- 比如用户在检索、创建、更新信息时，需要提交一些数据； 
- 这些都要求我们可以在代码逻辑中获取到用户提交的数据，我们通常会使用v-model指令来完成： 
- v-model指令可以在表单 input、textarea以及select元素上创建双向数据绑定； 
- 它会根据控件类型自动选取正确的方法来更新元素； 
- v-model 本质上是语法糖，它负责监听用户的输入事件来更新数据，并在某种极端场景 下进行一些特殊处理



`示例:`

```vue
<template id="my-app">
  <input type="text" v-model="message">
  <h2>{{message}}</h2>
</template>
```



## 10.2 v-model实现原理

1. v-bind value属性的值绑定 
2. v-on监听input事件, 更新message的值



`实现代码：`

```vue
  <div id="app"></div>

  <template id="my-app">
    <input type="text" :value="message" @input="inputChange">
    <h2>{{message}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World"
        }
      },
      methods: {
        inputChange(event) {
          this.message = event.target.value;
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```



## 10.3 v-model绑定多行文本



`示例:`

```vue
  
  <div id="app"></div>

  <template id="my-app">
    <!-- 1.绑定textarea -->
    <label for="intro">
      自我介绍
      <textarea name="intro" id="intro" cols="30" rows="10" v-model="intro"></textarea>
    </label>
    <h2>intro: {{intro}}</h2> 
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          intro: "Hello World",
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```



注意插值表达式在 `<textarea>` 中将不会工作。请使用 `v-model` 来替代。



##  10.4 v-model绑定复选框

单一的复选框，绑定的是布尔类型值：

```vue
  
  <div id="app"></div>

  <template id="my-app">
    <!-- 2.checkbox -->
    <!-- 2.1.单选框 -->
    <label for="agree">
      <input id="agree" type="checkbox" v-model="isAgree"> 同意协议
    </label>
    <h2>isAgree: {{isAgree}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          isAgree: false,
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

我们还可以将多个复选框绑定到同一个数组或集合)的值：

```vue
 <div id="app"></div>

  <template id="my-app">

    <!-- 2.2.多选框 -->
    <span>你的爱好: </span>
    <label for="basketball">
      <input id="basketball" type="checkbox" v-model="hobbies" value="basketball"> 篮球
    </label>
    <label for="football">
      <input id="football" type="checkbox" v-model="hobbies" value="football"> 足球
    </label>
    <label for="tennis">
      <input id="tennis" type="checkbox" v-model="hobbies" value="tennis"> 网球
    </label>
    <h2>hobbies: {{hobbies}}</h2>

  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          hobbies: ["basketball"],
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

在这个例子中，`hobbies` 数组将始终包含来自当前选中框的值。

## 10.5 v-model绑定单选按钮

```vue
  
  <div id="app"></div>

  <template id="my-app">
    <!-- 3.radio -->
    <span>你的爱好: </span>
    <label for="male">
      <input id="male" type="radio" v-model="gender" value="male">男
    </label>
    <label for="female">
      <input id="female" type="radio" v-model="gender" value="female">女
    </label>
    <h2>gender: {{gender}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          gender: "",
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```



## 10.6 v-model绑定选择器

`单个选择器的示例如下：`

```vue
  
  <div id="app"></div>

  <template id="my-app">
    <!-- 4.select -->
    <span>喜欢的水果: </span>
    <select v-model="fruit"size="2">
      <option value="apple">苹果</option>
      <option value="orange">橘子</option>
      <option value="banana">香蕉</option>
    </select>
    <h2>fruit: {{fruit}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          fruit: "orange"
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

`多选 (值绑定到一个数组)：`

```vue
  <div id="app"></div>

  <template id="my-app">
    <!-- 4.select -->
    <span>喜欢的水果: </span>
    <select v-model="fruit" multiple size="2">
      <option value="apple">苹果</option>
      <option value="orange">橘子</option>
      <option value="banana">香蕉</option>
    </select>
    <h2>fruit: {{fruit}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          fruit: "orange"
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

## 10.7 v-model的修饰符的使用

`lazy修饰符：`

- 默认情况下，v-model在进行双向绑定时，绑定的是input事件，那么会在每次内容输入后就将最新的值和绑定 的属性进行同步； 
- 如果我们在v-model后跟上`lazy`修饰符，那么会将绑定的事件切换为 change 事件，只有在提交时（比如回车） 才会触发



```vue
<div id="app"></div>

  <template id="my-app">
    <!-- 1.lazy修饰符 -->
    <input type="text" v-model.lazy="message">
</template>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World"
        }
      },
      methods: {
        showType() {
          console.log(this.message, typeof this.message);
        },
        showResult() {
          console.log(this.message);
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```



`number修饰符:`

- message总是string类型，即使在我们设置type为number也是string类型； 
- 如果我们希望转换为数字类型，那么可以使用 `.number` 修饰符： 
-  另外，在我们进行逻辑判断时，如果是一个string类型，在可以转化的情况下会进行隐式转换的

```vue
    <!-- 2.number修饰符 -->
<template id="my-app">
    <input type="text" v-model.number="message">
    <h2>{{message}}</h2>
    <button @click="showType">查看类型</button> -->
</template>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World"
        }
      },
      methods: {
        showType() {
          console.log(this.message, typeof this.message);
        },
        showResult() {
          console.log(this.message);
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```



`trim修饰符:`

如果要自动过滤用户输入的首尾空白字符，可以给v-model添加 `trim `修饰符：

```vue
    <!-- 3.trim修饰符 -->
<template id="my-app">
    <input type="text" v-model.trim="message">
    <button @click="showResult">查看结果</button>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World"
        }
      },
      methods: {
        showType() {
          console.log(this.message, typeof this.message);
        },
        showResult() {
          console.log(this.message);
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

