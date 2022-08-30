# 12. 内置组件Transition过渡

`<Transition>` 是一个内置组件，这意味着它在任意别的组件中都可以被使用，无需注册。它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所带来的条件渲染
- 由 `v-show` 所带来的条件显示
- 由特殊元素 `<component>` 切换的动态组件

以下是最基本用法的示例：



```vue
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>

    <transition name="why">
      <h2 v-if="isShow">Hello World</h2>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: true
      }
    }
  }
</script>

<style scoped>
  .why-enter-from,
  .why-leave-to {
    opacity: 0;
  }

  .why-enter-to, 
  .why-leave-from {
    opacity: 1;
  }

  .why-enter-active,
  .why-leave-active {
    transition: opacity 2s ease;
  }
</style>
```



::: tip

`<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。

:::



## 12.1 Transition组件的原理

- 当插入或删除包含在 transition 组件中的元素时，Vue 将会做以下处理： 
  - 1.自动嗅探目标元素是否应用了CSS过渡或者动画，如果有，那么在恰当的时机添加/删除 CSS类名； 
  - 2.如果 transition 组件提供了JavaScript钩子函数，这些钩子函数将在恰当的时机被调用； 
  - 3.如果没有找到JavaScript钩子并且也没有检测到CSS过渡/动画，DOM插入、删除操作将会立即执行；



### 12.1.1 基于 CSS 的过渡

![img](../../images/transition-classes.f0f7b3c9.png)

- 我们会发现上面提到了很多个class，事实上Vue就是帮助我们在这些class之间来回切换完成的动画： 

  - **v-enter-from**：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除
  - **v-enter-active**：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。 

  - **v-enter-to**：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/ 动画完成之后移除。 

  - **v-leave-from**：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。 

  - **v-leave-active**：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在 过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。 

  - **v-leave-to**：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被删除)，在过渡/ 动画完成之后移除

- class的name命名规则如下： 
  - 如果我们使用的是一个没有name的transition，那么所有的class是以 v- 作为默认前缀； 
  - 如果我们添加了一个name属性，比如 ，那么所有的class会以 why- 开头；



### 12.1.2 JavaScript钩子

通过监听 `<Transition>` 组件事件的方式在过渡过程中挂上钩子函数：

```vue
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
export default {
  // ...
  methods: {
    // 在元素被插入到 DOM 之前被调用
    // 用这个来设置元素的 "enter-from" 状态
    onBeforeEnter(el) {},

    // 在元素被插入到 DOM 之后的下一帧被调用
    // 用这个来开始进入动画
    onEnter(el, done) {
      // 调用回调函数 done 表示过渡结束
      // 如果与 CSS 结合使用，则这个回调是可选参数
      done()
    },

    // 当进入过渡完成时调用。
    onAfterEnter(el) {},
    onEnterCancelled(el) {},

    // 在 leave 钩子之前调用
    // 大多数时候，你应该只会用到 leave 钩子
    onBeforeLeave(el) {},

    // 在离开过渡开始时调用
    // 用这个来开始离开动画
    onLeave(el, done) {
      // 调用回调函数 done 表示过渡结束
      // 如果与 CSS 结合使用，则这个回调是可选参数
      done()
    },

    // 在离开过渡完成、
    // 且元素已从 DOM 中移除时调用
    onAfterLeave(el) {},

    // 仅在 v-show 过渡中可用
    onLeaveCancelled(el) {}
  }
}
```

这些钩子可以与 CSS 过渡或动画结合使用，也可以单独使用。

在使用仅由 JavaScript 执行的动画时，最好是添加一个 `:css="false"` prop。这显式地向 Vue 表明跳过对 CSS 过渡的自动探测。除了性能稍好一些之外，还可以防止 CSS 规则意外地干扰过渡。



```vue
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

在有了 `:css="false"` 后，我们就自己全权负责控制什么时候过渡结束了。这种情况下对于 `@enter` 和 `@leave` 钩子来说，回调函数 `done` 就是必须的。否则，钩子将被同步调用，过渡将立即完成。

## 12.2 同时设置过渡和动画

- Vue为了知道过渡的完成，内部是在监听 transitionend 或 animationend，到底使用哪一个取决于元素应用的 CSS规则： 

  - 如果我们只是使用了其中的一个，那么Vue能自动识别类型并设置监听； 

- 但是如果我们同时使用了过渡和动画呢？ 

  - 并且在这个情况下可能某一个动画执行结束时，另外一个动画还没有结束； 

  - 在这种情况下，我们可以设置 type 属性为 animation 或者 transition 来明确的告知Vue监听的类型；

```vue
<template>
  <div class="app">
    <div><button @click="isShow = !isShow">显示/隐藏</button></div>

    <transition name="why" type="transition" :duration="{enter: 800, leave: 1000}">
      <h2 class="title" v-if="isShow">Hello World</h2>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: true
      }
    }
  }
</script>

<style scoped>
  .app {
    width: 200px;
    margin: 0 auto;
  }

  .title {
    display: inline-block;
  }

  .why-enter-from,
  .why-leave-to {
    opacity: 0;
  }

  .why-enter-active,
  .why-leave-active {
    transition: opacity 1s ease;
  }

  .why-enter-active {
    animation: bounce 1s ease;
  }

  .why-leave-active {
    animation: bounce 1s ease reverse;
  }

  @keyframes bounce {
    0% {
      transform: scale(0)
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
```



## 12.3 显示的指定动画时间

- 我们也可以显示的来指定过渡的时间，通过 duration 属性。 

- duration可以设置两种类型的值： 

  - `number`类型：同时设置进入和离开的过渡时间； 

    ```vue
        <transition name="why" type="transition" :duration="100">
          <h2 class="title" v-if="isShow">Hello World</h2>
        </transition>
    ```

    

  - `object`类型：分别设置进入和离开的过渡时间；

    ```vue
        <transition name="why" type="transition" :duration="{enter: 800, leave: 1000}">
          <h2 class="title" v-if="isShow">Hello World</h2>
        </transition>
    ```



## 12.4 元素过度

### 12.4.1 过渡的模式mode

- 如果我们不希望同时执行进入和离开动画，那么我们需要设置transition的过渡模式： 
  - in-out: 新元素先进行过渡，完成之后当前元素过渡离开； 
  - out-in: 当前元素先进行过渡，完成之后新元素过渡进入；

`示例:`

```vue
    <transition name="why" mode="out-in">
      <h2 class="title" v-if="isShow">Hello World</h2>
      <h2 class="title" v-else>你好啊,李银河</h2>
    </transition>
```

### 12.4.2 appear初次渲染

默认情况下，首次渲染的时候是没有动画的，如果我们希望给他添加上去动画，那么就可以增加另外一个属性 `appear`：

```vue
<Transition appear>
  ...
</Transition>
```

### 12.4.3 元素间过渡

除了通过 `v-if` / `v-show` 切换一个元素，我们也可以通过 `v-if` / `v-else` / `v-else-if` 在几个组件间进行切换过：

```vue
<Transition>
  <button v-if="docState === 'saved'">Edit</button>
  <button v-else-if="docState === 'edited'">Save</button>
  <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>
```



## 12.5 自定义过渡class

- 我们可以通过以下 attribute 来自定义过渡类名： 
  - enter-from-class 
  - enter-active-class 
  - enter-to-class 
  - leave-from-class 
  - leave-active-class 
  - leave-to-class 
- 他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css. 结合使用十 分有用。

### 12.5.1 使用animate.css库

- 安装animate.css： 

  ```bash
  npm install animate.css
  ```

  

- 在main.js中导入animate.css： 

  ```js
  import "animate.css";
  ```

  

- 接下来在使用的时候我们有两种用法： 

  - 用法一：直接使用animate库中定义的 keyframes 动画；

    ```css
    .why-enter-active {
        animation: bounceInUp 1s ease-in;
      }
    
      .why-leave-active {
        animation: bounceInUp 1s ease-in reverse;
      }
    ```

     

  - 用法二：直接使用animate库提供给我们的类；

    ```vue
    <transition enter-active-class="animate__animated animate__fadeInDown"
                    leave-active-class="animate__animated animate__flipInY">
        <h2 class="title" v-if="isShow">Hello World</h2>
    </transition>
    ```



### 12.5.2 使用gsap库

- 某些情况下我们希望通过JavaScript来实现一些动画的效果，这个时候我们可以选择使用gsap库来完成。 

- 什么是gsap呢？ 

  - GSAP是The GreenSock Animation Platform（GreenSock动画平台）的缩写； 

  - 它可以通过JavaScript为CSS属性、SVG、Canvas等设置动画，并且是浏览器兼容的； 

- 这个库应该如何使用呢？ 

  - 第一步：需要安装gsap库； 

  - 第二步：导入gsap库； 

  - 第三步：使用对应的api即可； 

- 安装gsap库：

  ```bash
  npm install gsap
  ```



`示例：`

```vue
<template>
  <div class="app">
    <div><button @click="isShow = !isShow">显示/隐藏</button></div>

    <transition @enter="enter"
                @leave="leave"
                :css="false">
      <h2 class="title" v-if="isShow">Hello World</h2>
    </transition>
  </div>
</template>

<script>
  import gsap from 'gsap';

  export default {
    data() {
      return {
        isShow: true,
      }
    },
    methods: {
      enter(el, done) {
        console.log("enter");
        gsap.from(el, {
          scale: 0,
          x: 200,
          onComplete: done
        })
      },
      leave(el, done) {
        console.log("leave");
        gsap.to(el, {
          scale: 0,
          x: 200,
          onComplete: done
        })
      }
    }
  }
</script>

<style scoped>
  .title {
    display: inline-block;
  }
</style>
```



`gsap实现数字变化`

```vue
<template>
  <div class="app">
    <input type="number" step="100" v-model="counter">
    <!-- <h2>当前计数: {{showCounter}}</h2> -->
    <h2>当前计数: {{showNumber.toFixed(0)}}</h2>
  </div>
</template>

<script>
  import gsap from 'gsap';

  export default {
    data() {
      return {
        counter: 0,
        showNumber: 0
      }
    },
    // computed: {
    //   showCounter() {
    //     return this.showNumber.toFixed(0);
    //   }
    // },
    watch: {
      counter(newValue) {
        gsap.to(this, {duration: 1, showNumber: newValue})
      }
    }
  }
</script>

<style scoped>
</style>
```



## 12.6 列表的过渡

- 如果希望渲染的是一个列表，我们可以使用`<transition-group>`

- `<transition-group>` 有以下的特点： 

  - 默认情况下，它`不会渲染一个元素的包裹器`，但是你可以指定一个元素并以 tag attribute 进行渲染； 

  - `过渡模式不可用`，因为我们不再相互切换特有的元素； 

  - 内部元素总是需要提供唯一的 key attribute 值； 

  - `CSS 过渡的类将会应用在内部的元素`中，而`不是这个组/容器本身`

 和 `<Transition>` 的区别

`<TransitionGroup>` 支持和 `<Transition>` 基本相同的 prop、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：

- 默认情况下，它不会渲染一个包装器元素。但你可以通过传入 `tag` prop 来指定一个元素作为包装器元素来渲染。
- [过渡模式](https://staging-cn.vuejs.org/guide/built-ins/transition.html#transition-modes)在这里不可用，因为我们不再是在互斥的元素之间进行切换。
- 其中的元素**总是必须**有一个独一无二的 `key` attribute。
- CSS 过渡 class 会被应用在其中的每一个元素上，**而不是**这个组的容器上。

### 12.6.1 列表过渡的基本使用

- 我们可以通过使用一个新增的 v-move 的class来完成动画； 
- 它会在元素改变位置的过程中应用； 
- 像之前的名字一样，我们可以通过name来自定义前缀；

`示例：`

```vue
<template>
  <div>
    <button @click="addNum">添加数字</button>
    <button @click="removeNum">删除数字</button>
    <button @click="shuffleNum">数字洗牌</button>

    <transition-group tag="p" name="why">
      <span v-for="item in numbers" :key="item" class="item">
        {{item}}
      </span>
    </transition-group>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    data() {
      return {
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        numCounter: 10
      }
    },
    methods: {
      addNum() {
        // this.numbers.push(this.numCounter++)
        this.numbers.splice(this.randomIndex(), 0, this.numCounter++)
      },
      removeNum() {
        this.numbers.splice(this.randomIndex(), 1)
      },
      shuffleNum() {
        this.numbers = _.shuffle(this.numbers);
      },
      randomIndex() {
        return Math.floor(Math.random() * this.numbers.length)
      }
    },
  }
</script>

<style scoped>
  .item {
    margin-right: 10px;
    display: inline-block;
  }

  .why-enter-from,
  .why-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .why-enter-active,
  .why-leave-active {
    transition: all 1s ease;
  }

  .why-leave-active {
    position: absolute;
  }

  .why-move {
    transition: transform 1s ease;
  }
</style>
```



### 12.6.2 列表的交错过渡

我们可以通过gsap的延迟delay属性，做一个交替消失的动画



`示例:`

```vue
<template>
  <div>
    <input v-model="keyword">
    <transition-group tag="ul" name="why" :css="false"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave">
      <li v-for="(item, index) in showNames" :key="item" :data-index="index">
        {{item}}
      </li>
    </transition-group>
  </div>
</template>

<script>
  import gsap from 'gsap';

  export default {
    data() {
      return {
        names: ["abc", "cba", "nba", "why", "lilei", "hmm", "kobe", "james"],
        keyword: ""
      }
    },
    computed: {
      showNames() {
        return this.names.filter(item => item.indexOf(this.keyword) !== -1)
      }
    },
    methods: {
      beforeEnter(el) {
        el.style.opacity = 0;
        el.style.height = 0;
      },
      enter(el, done) {
        gsap.to(el, {
          opacity: 1,
          height: "1.5em",
          delay: el.dataset.index * 0.5,
          onComplete: done
        })
      },
      leave(el, done) {
        gsap.to(el, {
          opacity: 0,
          height: 0,
          delay: el.dataset.index * 0.5,
          onComplete: done
        })
      }
    }
  }
</script>
```



