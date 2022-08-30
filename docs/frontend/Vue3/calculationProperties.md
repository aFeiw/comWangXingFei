# 8. 计算属性

对于任何包含响应式数据的复杂逻辑，都应该使用计算属性； 

计算属性将被混入到组件实例中。所有 getter 和 setter 的 this 上下文自动地绑定为组件实例；



计算属性的用法： 

- 选项：computed p类型：{ [key: string]: Function | { get: Function, set: Function } }

## 8.1 使用模板语法实现

`缺点`：

一、模板中存在大量的复杂逻辑，不便于维护（模板中表达式的初衷是用于简单的计算）； 

二、当有多次一样的逻辑时，存在重复的代码； 

三、多次使用的时候，很多运算也需要多次执行，没有缓存



`实现思路`：

<img src="../../images/image-20220705212114128.png" alt="image-20220705212114128" style="zoom:50%;" />

```vue
  <div id="app"></div>

  <template id="my-app">
 <h2>{{firstName + " " + lastName}}</h2>
 <h2>{{score >= 60 ? '及格': '不及格'}}</h2>
 <h2>{{message.split(" ").reverse().join(" ")}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
 const App = {
   template: '#my-app',
   data() {
     return {
       firstName: "Kobe",
       lastName: "Bryant",
       score: 80,
       message: "Hello World"
     }
   }
 }

 Vue.createApp(App).mount('#app');
  </script>
```



## 8.2 使用method方法实现

`缺点`:

一、我们事实上先显示的是一个结果，但是都变成了一种方法的调用； 

二、多次使用方法的时候，没有缓存，也需要多次计算



`实现思路`：

```vue
  
  <div id="app"></div>

  <template id="my-app">
 <h2>{{getFullName()}}</h2>
 <h2>{{getResult()}}</h2>
 <h2>{{getReverseMessage()}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
 const App = {
   template: '#my-app',
   data() {
     return {
       firstName: "Kobe",
       lastName: "Bryant",
       score: 80,
       message: "Hello World"
     }
   },
   methods: {
     getFullName() {
       return this.firstName + " " + this.lastName;
     },
     getResult() {
       return this.score >= 60 ? "及格": "不及格";
     },
     getReverseMessage() {
       return this.message.split(" ").reverse().join(" ");
     }
   }
 }

 Vue.createApp(App).mount('#app');
  </script>
```



## 8.3 使用computed实现

计算属性是有缓存的；

`实现思路`：

```vue
 <div id="app"></div>

  <template id="my-app">
 <h2>{{fullName}}</h2>
 <h2>{{result}}</h2>
 <h2>{{reverseMessage}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
 const App = {
   template: '#my-app',
   data() {
     return {
       firstName: "Kobe",
       lastName: "Bryant",
       score: 80,
       message: "Hello World"
     }
   },
   computed: {
     // 定义了一个计算属性叫fullname
     fullName() {
       return this.firstName + " " + this.lastName;
     },
     result() {
       return this.score >= 60 ? "及格": "不及格";
     },
     reverseMessage() {
       return this.message.split(" ").reverse().join(" ");
     }
   }
 }

 Vue.createApp(App).mount('#app');
  </script>
```



##  8.4 methods和computed的区别

`computed:`

- 计算属性是有缓存的, 当我们多次使用计算属性时, 计算属性中的运算只会执行一次.

- 计算属性会随着依赖的数据的改变, 而进行重新计算.

`methods:`

由于methods没有缓存，在调用同一变量时会重复调用.

`例：`

<img src="../../images/image-20220705214057909.png" alt="image-20220705214057909" style="zoom:80%;" />



```vue
  <div id="app"></div>

  <template id="my-app">
 <button @click="changeFirstName">修改firstName</button>

 <h2>{{fullName}}</h2>
 <h2>{{fullName}}</h2>
 <h2>{{fullName}}</h2>
 <h2>{{fullName}}</h2>
 <h2>{{fullName}}</h2>
 <h2>{{fullName}}</h2>
 <h2>{{fullName}}</h2>
 <h2>{{fullName}}</h2>

 <h2>{{getFullName()}}</h2>
 <h2>{{getFullName()}}</h2>
 <h2>{{getFullName()}}</h2>
 <h2>{{getFullName()}}</h2>
 <h2>{{getFullName()}}</h2>
 <h2>{{getFullName()}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
 const App = {
   template: '#my-app',
   data() {
     return {
       firstName: "Kobe",
       lastName: "Bryant"
     }
   },
   computed: {
     fullName() {
       console.log("computed的fullName中的计算");
       return this.firstName + " " + this.lastName;
     }
   },
   methods: {
     getFullName() {
       console.log("methods的getFullName中的计算");
       return this.firstName + " " + this.lastName;
     },
     changeFirstName() {
       this.firstName = "Coder"
     }
   }
 }

 Vue.createApp(App).mount('#app');
  </script>
```



## 8.5 computed的setter和getter

- 当在computed函数中只定义一个函数时，可当作`getter`。

- 当需要setter定义computed的值时，可以这样定义：

  ```vue
      computed: {
        // fullName的getter和setter方法
        fullName: {
          get: function() {
            return this.firstName + " " + this.lastName;
          },
          set: function(newValue) {
            console.log(newValue);
            const names = newValue.split(" ");
            this.firstName = names[0];
            this.lastName = names[1];
          }
        }
      },
  ```

