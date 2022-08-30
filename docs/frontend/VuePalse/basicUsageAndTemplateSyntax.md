# 3. vue基础用法与模板语法



##  3.1 vue3的引入

> 1.CDN引入

 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="https://unpkg.com/vue@3"></script>

    <div id="app"></div>

    <script>
      const why ={
        tempalte: '<h1>hello world!</h1>',
      }
      const app = Vue.createApp(why)
      app.mount('#app')
    </script>
  </body>
</html>
```



> 2.本地引入



创建js文件夹，存放vue.js；

下载地址：https://unpkg.com/vue@3.2.37/dist/vue.global.js

复制网页文件，保存在vue.js文件中。



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="../js/vue.js"></script>

    <script>
      Vue.createApp({
        template: '<h1>hello world!</h1>',
      }).mount('#app')
    </script>
  </body>
</html>

```



##  3.2 计数器案例

==原生==

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
  <h2 class="counter">100</h2>
  <button class="increment">+1</button>
  <button class="decrement">-1</button>
  <script>
    //1.获取所有元素
    const counterEl = document.querySelector('.counter')
    const incrementEl = document.querySelector('.increment')
    const decrementEl = document.querySelector('.decrement')

    //2.定义变量
    let counter = 100

    //3.监听按钮绑定
    incrementEl.addEventListener('click', () => {
      counter++
      counterEl.innerHTML = counter
    })
    decrementEl.addEventListener('click', () => {
      counter--
      counterEl.innerHTML = counter
    })
  </script>  
</body>
</html>
```

 

==vue写法==

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
  <div id="app"></div>

  <script src="../js/vue.js"></script>
  <script>
    Vue.createApp({
      template:`
        <div>
          <h1>{{title}}</h1>
          <h2>{{counter}}</h2>
          <button @click="increment">+1</button>
          <button @click="decrement">-1</button>
        </div>
      `,
      data(){
        return {
          title:"计数器",
          counter:100
        }
      },
      methods:{
        increment(){
          this.counter++
        },
        decrement(){
          this.counter--
        }
      }

    }).mount('#app');
  </script>  
</body>
</html>
```



==template模板写法一==

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <script src="../js/vue.js"></script>
    <script type="v-template" id="vt">
      <div>
         <h1>{{title}}</h1>
         <h2>{{counter}}</h2>
         <button @click="increment">+1</button>
         <button @click="decrement">-1</button>
       </div>
    </script>
    <script>
      Vue.createApp({
        template: '#vt',
        data() {
          return {
            title: '计数器',
            counter: 100,
          }
        },
        methods: {
          increment() {
            this.counter++
          },
          decrement() {
            this.counter--
          },
        },
      }).mount('#app')
    </script>
  </body>
</html>
```



==template模板二==

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <template id="vt">
      <div>
        <h1>{{title}}</h1>
        <h2>{{counter}}</h2>
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
      </div>
    </template>
    <script src="../js/vue.js"></script>

    <script>
      Vue.createApp({
        template: '#vt',
        data() {
          return {
            title: '计数器',
            counter: 100,
          }
        },
        methods: {
          increment() {
            console.log('点击了+1')
            this.counter++
          },
          decrement() {
            console.log('点击了-1')
            this.counter--
          },
          btnClick: () => {
            // this === window? 不可以
            // 写成一个箭头函数时, 这个this就是window
            // 在箭头函数中是不绑定this, 但是函数中如果使用了this
            console.log(this)
          },
          btn2Click: function () {
            // this === window? 不可以
            // 写成一个箭头函数时, 这个this就是window
            // 在箭头函数中是不绑定this, 但是函数中如果使用了this
            console.log(this)
          },
        },
      }).mount('#app')
    </script>
  </body>
</html>

```
