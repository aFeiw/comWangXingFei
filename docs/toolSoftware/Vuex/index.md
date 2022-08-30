##  1.1什么是状态管理？

- 在开发中，我们会的应用程序需要处理各种各样的数据，这些 数据需要保存在我们应用程序中的某一个位置，对于这些数据 的管理我们就称之为是 状态管理。 
- 在前面我们是如何管理自己的状态呢？ 
  - 在Vue开发中，我们使用组件化的开发方式； 
  - 而在组件中我们定义`data`或者在`setup`中返回使用的数据， 这些数据我们称之为`state`； 
  - 在模块template中我们可以使用这些数据，模块最终会被 渲染成DOM，我们称之为`View`； 
  - 在模块中我们会产生一些行为事件，处理这些行为事件时， 有可能会`修改state`，这些行为事件我们称之为`actions`；



```js
const Counter = {
  // 状态
  data () {
    return {
      count: 0
    }
  },
  // 视图
  template: `
    <div>{{ count }}</div>
  `,
  // 操作
  methods: {
    increment () {
      this.count++
    }
  }
}

createApp(Counter).mount('#app')
```

这个状态自管理应用包含以下几个部分：

- **状态**，驱动应用的数据源；
- **视图**，以声明方式将**状态**映射到视图；
- **操作**，响应在**视图**上的用户输入导致的状态变化。

以下是一个表示“单向数据流”理念的简单示意：


![flow](images/flow.png)

但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。





##  1.2 Vuex的状态管理



- 管理不断变化的state本身是非常困难的： 

  - 状态之间相互会存在依赖，一个状态的变化会引起另一个状态的变化，View页面也有可能会引起状态的变化

  - 当应用程序复杂时，state在什么时候，因为什么原因而发生了变化，发生了怎么样的变化，会变得非常难以控 制和追踪； 

- 因此，我们是否可以考虑将组件的内部状态抽离出来，以一个全局单例的方式来管理呢？ 

  - 在这种模式下，我们的组件树构成了一个巨大的 “试图View”； 

  - 不管在树的哪个位置，任何组件都能获取状态或者触发行为； 

  - 通过定义和隔离状态管理中的各个概念，并通过强制性的规则来维护视图和状态间的独立性，我们的代码边会 变得更加结构化和易于维护、跟踪； 

- 这就是Vuex背后的基本思想，它借鉴了Flux、Redux、Elm（纯函数语言，redux有借鉴它的思想）：

![vuex](images/vuex.png)



## 1.3 安装

### 下载 / CDN 引用

https://unpkg.com/vuex@4

[Unpkg.com](https://unpkg.com/) 提供了基于 npm 的 CDN 链接。以上的链接会一直指向 npm 上发布的最新版本。您也可以通过 `https://unpkg.com/vuex@4.0.0/dist/vuex.global.js` 这样的方式指定特定的版本。

在 Vue 之后引入 `vuex` 会进行自动安装：

```
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

### npm

```
npm install vuex@next --save
```

### Yarn

```
yarn add vuex@next --save
```

###  自己构建

如果需要使用 dev 分支下的最新版本，您可以直接从 GitHub 上克隆代码并自己构建。

```
git clone https://github.com/vuejs/vuex.git node_modules/vuex
cd node_modules/vuex
yarn
yarn build
```

 

## 1.4 创建Store

- 每一个Vuex应用的核心就是store（仓库）： 
  - store本质上是一个容器，它包含着你的应用中大部分的状态（state）； 
- Vuex和单纯的全局对象有什么区别呢？ 
- 第一：Vuex的状态存储是响应式的 
  - 当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会被更新； 
- 第二：你不能直接改变store中的状态 
  - 改变store中的状态的唯一途径就显示提交 (commit) mutation； 
  - 这样使得我们可以方便的跟踪每一个状态的变化，从而让我们能够通过一些工具帮助我们更好的管理应用的状态； 
- 使用步骤： p 创建Store对象； p 在app中通过插件安装；

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)
```

通过 `store.state` 来获取状态对象，并通过 `store.commit` 方法触发状态变更：

```js
store.commit('increment')

console.log(store.state.count) // -> 1
```

在 Vue 组件中， 可以通过 `this.$store` 访问store实例。现在我们可以从组件的方法提交一个变更：

```js
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```





## 2.0 State



##  2.1单一状态树

- Vuex 使用单一状态树： 
  - 用一个对象就包含了全部的应用层级的状态； 
  - 采用的是SSOT，Single Source of Truth，也可以翻译成单一数据源； 
  - 这也意味着，每个应用将仅仅包含一个 store 实例； 
  - 单状态树和模块化并不冲突； 
- 单一状态树的优势： 
  - 如果你的状态信息是保存到多个Store对象中的，那么之后的管理和维护等等都会变得特别困难； 
  - 所以Vuex也使用了单一状态树来管理应用层级的全部状态； 
  - 单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便 的管理和维护；





## 2.2 在 Vue 组件中获得 Vuex 状态

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态：

```js
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

每当 `store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

Vuex 通过 Vue 的插件系统将 store 实例从根组件中“注入”到所有的子组件里。且子组件能通过 `this.$store` 访问到。让我们更新下 `Counter` 的实现：

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

## 2.3 `mapState` 辅助函数

- 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState`

- `mapState`的方式一：对象类型； 

  ```js
  // 在单独构建的版本中辅助函数为 Vuex.mapState
  import { mapState } from 'vuex'
  
  export default {
    // ...
    computed: mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,
  
      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',
  
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })
  }
  ```

  

- `mapState`的方式二：数组类型； 

  ```js
    import { mapState } from 'vuex'
  
    export default {
      computed: {
        fullName() {
          return "Kobe Bryant"
        },
        // 其他的计算属性, 从state获取
        ...mapState(["counter", "name", "age", "height"])
      }
    }
  ```

  

- 也可以使用展开运算符和来原有的computed混合在一起；

  ```js
    import { mapState } from 'vuex'
  
    export default {
      computed: {
        fullName() {
          return "Kobe Bryant"
        },
        // 其他的计算属性, 从state获取
        ...mapState({
          sCounter: state => state.counter,
          sName: state => state.name
        })
      }
    }
  ```



## 2.4 setup中使用mapState函数

```js
    setup() {
      const store = useStore()
      const sCounter = computed(() => store.state.counter)
      // const sName = computed(() => store.state.name)
      // const sAge = computed(() => store.state.age)

      const storeStateFns = mapState(["counter", "name", "age", "height"])

      // {name: function, age: function, height: function}
      // {name: ref, age: ref, height: ref}
      const storeState = {}
      Object.keys(storeStateFns).forEach(fnKey => {
        const fn = storeStateFns[fnKey].bind({$store: store})
        storeState[fnKey] = computed(fn)
      })

      return {
        sCounter,
        ...storeState
      }
    }
```



`封装useState函数`

```js
import { computed } from 'vue'
import { mapState, useStore } from 'vuex'

export function useState(mapper) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapState(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })

  return storeState
}
```

`使用`

```vue
<template>
  <div>
    <h2>Home:{{ $store.state.counter }}</h2>
    <hr>
    <h2>{{counter}}</h2>
    <h2>{{name}}</h2>
    <h2>{{age}}</h2>
    <h2>{{height}}</h2>
    <h2>{{sCounter}}</h2>
    <h2>{{sName}}</h2>
    <hr>
  </div>
</template>

<script>
  import { useState } from '../hooks/useState'

  export default {
    setup() {
      const storeState = useState(["counter", "name", "age", "height"])
      const storeState2 = useState({
        sCounter: state => state.counter,
        sName: state => state.name
      })

      return {
        ...storeState,
        ...storeState2
      }
    }
  }
</script>
```



##  3.Getter

##  3.1 getters的基本使用

某些属性我们可能需要经过变化后来使用，这个时候可以使用getters：

```js
const store = createStore({
  state() {
    return {
      counter: 100,
      name: "why",
      age: 18,
      height: 1.88,
      books: [
        { name: "深入Vuejs", price: 200, count: 3 },
        { name: "深入Webpack", price: 240, count: 5 },
        { name: "深入React", price: 130, count: 1 },
        { name: "深入Node", price: 220, count: 2 },
      ]
    };
  },
  getters: {
    totalPrice(state, getters) {
      let totalPrice = 0
      for (const book of state.books) {
        totalPrice += book.count * book.price
      }
      return totalPrice
    }
  }
 
});

export default store;
```

```html
<h2>总价值: {{ $store.getters.totalPrice }}</h2>
```



## 3.2 getters第二个参数

- getters可以接收第二个参数：

  ```js
  getters: {
    totalPrice(state, getters) {
      let totalPrice = 0
      for (const book of state.books) {
        totalPrice += book.count * book.price
      }
      return totalPrice * getters.currentDiscount
    },
    currentDiscount(state) {
        return state.discount * 0.9
      },
  }
  ```

  

## 3.3 getters的返回函数

- getters中的函数本身，可以返回一个函数，那么在使用的地方相当于可以调用这个函数：

  ```js
  getters: {
    totalPrice(state, getters) {
        let totalPrice = 0
        for (const book of state.books) {
          totalPrice += book.count * book.price
        }
        return totalPrice * getters.currentDiscount
      },
      currentDiscount(state) {
        return state.discount * 0.9
      },
      totalPriceCountGreaterN(state, getters) {
        return function(n) {
          let totalPrice = 0
          for (const book of state.books) {
            if (book.count > n) {
              totalPrice += book.count * book.price
            }
          }
          return totalPrice * getters.currentDiscount
        }
      } 
  }
  ```



##  3.3 mapGetters的辅助函数

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(["nameInfo", "ageInfo", "heightInfo"]),
    }
  }
```

`如果你想将一个 getter 属性另取一个名字，使用对象形式：`

```js
...mapGetters({
  sNameInfo: "nameInfo",
  sAgeInfo: "ageInfo"
})
```

` useGetters.js`

```js
import { computed } from 'vue'
import { mapGetters, useStore } from 'vuex'

export function useGetters(mapper) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapGetters(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })

  return storeState
}

```



`在setup中使用封装hook函数`

```vue
<template>
  <div>
    <h2>{{ nameInfo }}</h2>
    <h2>{{ ageInfo }}</h2>
    <h2>{{ heightInfo }}</h2>
    <hr>
  </div>
</template>

<script>
  import { useGetters } from '../hooks/useGetters'

  export default {
    setup() {
      const storeGetters = useGetters(["nameInfo", "ageInfo", "heightInfo"])
      return {
        ...storeGetters
      }
    }
  }
</script>
```







## 4.Mutation

## 4.1 Mutation基本使用

- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation：

```js
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  }
```

## 4.2 Mutation携带数据

- 很多时候我们在提交mutation的时候，会携带一些数据，这个时候我们可以使用参数： 

  ```js
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    incrementN(state, payload) {
      state.counter += payload.n
    }
  }
  ```

  

- payload为对象类型 

- 对象风格的提交方式

  ```js
  export default {
    methods: {
      addTen() {
        // this.$store.commit('incrementN', 10)
        // this.$store.commit('incrementN', {n: 10, name: "why", age: 18})
        this.$store.commit({
          type: incrementN,
          n: 10, 
          name: "why", 
          age: 18
        })
      }
    }
  }
  ```



## 4.3 Mutation常量类型

- 定义常量：mutation-type.js 

  ```js
  export const INCREMENT_N = "increment_n"
  ```

  

- 定义mutation 

  ```js
  [INCREMENT_N](state, payload) {
    console.log(payload);
    state.counter += payload.n
  },
  ```

  

- 提交mutation

  ```js
    import { INCREMENT_N } from '../store/mutation-types'
  
    export default {
      methods: {
        addTen() {
          // this.$store.commit('incrementN', 10)
          // this.$store.commit('incrementN', {n: 10, name: "why", age: 18})
          // 另外一种提交风格
          this.$store.commit({
            type: INCREMENT_N,
            n: 10, 
            name: "why", 
            age: 18
          })
        }
      }
    }
  ```



## 4.4 mapMutations辅助函数

- 我们也可以借助于辅助函数，帮助我们快速映射到对应的方法中： 

  ```js
    methods: {
      ...mapMutations(["increment", "decrement", INCREMENT_N]),
      ...mapMutations({
        add: "increment"
      })
    }
  }
  ```

  

- 在setup中使用也是一样的：

  ```js
  setup() {
    const storeMutations = mapMutations(["increment", "decrement", INCREMENT_N])
  
    return {
      ...storeMutations
    }
  }
  ```



## 4.5 mutation重要原则

- 一条重要的原则就是要记住 mutation 必须是同步函数 
- 这是因为devtool工具会记录mutation的日记； 
- 每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照； 
- 但是在mutation中执行异步操作，就无法追踪到数据的变化； 
- 所以Vuex的重要原则中要求 mutation必须是同步函数

## 5.Action

## 5.1 actions的基本使用

- **Action类似于mutation，不同在于**： 
  - Action提交的是mutation，而不是直接变更状态； 
  - Action可以包含任意异步操作； 

```js
  actions: {
    incrementAction(context) {
      setTimeout(() => {
        context.commit('increment')
      }, 1000);
    }
  }
```

-  这里有一个非常重要的参数context： 
   - context是一个和store实例均有相同方法和属性的context对象； 
   - 所以我们可以从其中获取到commit方法来提交一个mutation，或者通过 `context.state` 和 `context.getters` 来 获取 state 和 getters； 

```js
// 2.context的其他属性
decrementAction({ commit, dispatch, state, rootState, getters, rootGetters }) {
  commit("decrement")
}
```



## 5.2 actions的分发操作



- action的分发：

  - 分发使用的是 store 上的dispatch函数；

    ```js
    increment() {
      this.$store.dispatch("incrementAction")
    }
    ```

     

- 同样的，它也可以携带我们的参数： 

  ```js
  increment() {
    this.$store.dispatch("incrementAction", {count: 100})
  }
  ```

  

- 也可以以对象的形式进行分发：

  ```js
  decrement() {
    // 3.派发风格(对象类型)
    this.$store.dispatch({
      type: "decrementAction"
    })
  }
  ```



## 5.3 actions的辅助函数

- action也有对应的辅助函数： 

  - 对象类型的写法； 

    ```js
    methods: {
       ...mapActions({
         add: "incrementAction",
         sub: "decrementAction"
       })
    }
    ```

    

  - 数组类型的写法；

    ```js
    methods: {
       ...mapActions(["incrementAction", "decrementAction"]),
    }
    ```

- setup写法

  - 对象类型写法：

    ```js
    setup() {
      const actions2 = mapActions({
        add: "incrementAction",
        sub: "decrementAction"
      })
    
      return {
        ...actions2
      }
    }
    ```

    

  - 数组类型写法:

    ```js
    setup() {
      const actions = mapActions(["incrementAction", "decrementAction"])
    
      return {
        ...actions,
      }
    }
    ```



## 5.4 actions的异步操作

- Action 通常是异步的，那么如何知道 action 什么时候结束呢？ 

  ```js
    actions: {
      getHomeMultidata(context) {
        return new Promise((resolve, reject) => {
          axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
            context.commit("addBannerData", res.data.data.banner.list)
            resolve({name: "coderwhy", age: 18})
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  ```

  

- 我们可以通过让action返回Promise，在Promise的then中来处理完成后的操作；

```js
 setup() {
   const store = useStore()

   onMounted(() => {
     const promise = store.dispatch("getHomeMultidata")
     promise.then(res => {
       console.log(res)
     }).catch(err => {
       console.log(err)
     })
   })
 }
```



## 6. Module

## 6.1 module的基本使用

- 什么是Module？ 
  - 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，当应用变得非常复杂时，store 对象就有可 能变得相当臃肿； 
  - 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）； 
  - 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块；



## 6.2 module的局部状态

- 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象：

  ```js
  const moduleA = {
    state: () => ({
      count: 0
    }),
    mutations: {
      increment (state) {
        // 这里的 `state` 对象是模块的局部状态
        state.count++
      }
    },
    getters: {
      doubleCount (state) {
        return state.count * 2
      }
    }
  }
  ```



## 6.3 module的命名空间

- 默认情况下，模块内部的action和mutation仍然是注册在全局的命名空间中的： 
  - 这样使得多个模块能够对同一个 action 或 mutation 作出响应； 
  - Getter 同样也默认注册在全局命名空间； 
- 如果我们希望模块具有更高的封装度和复用性，可以添加 namespaced: true 的方式使其成为带命名空间的模块： 
  - 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名；

```js
const homeModule = {
  namespaced: true,
  state() {
    return {
      homeCounter: 100
    }
  },
  getters: {
    doubleHomeCounter(state, getters, rootState, rootGetters) {
      return state.homeCounter * 2
    },
    otherGetter(state) {
      return 100
    }
  },
  mutations: {
    increment(state) {
      state.homeCounter++
    }
  },
  actions: {
    incrementAction({commit, dispatch, state, rootState, getters, rootGetters}) {
      commit("increment")
      commit("increment", null, {root: true})

      // dispatch
      // dispatch("incrementAction", null, {root: true})
    }
  }
}

export default homeModule

```



## 6.4 module修改或派发根组件

- 如果我们希望在action中修改root中的state，那么有如下的方式：

  ```js
    actions: {
      incrementAction({commit, dispatch, state, rootState, getters, rootGetters}) {
        commit("increment")
        commit("increment", null, {root: true})
  
        // dispatch
        dispatch("incrementAction", null, {root: true})
      }
    }
  ```



## 6.5 module的辅助函数

- 辅助函数有三种使用方法： 

  - 方式一：通过完整的模块空间名称来查找； 

    ```js
    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";   
    
    export default {
        computed: {
          // 1.写法一:
           ...mapState({
             homeCounter: state => state.home.homeCounter
           }),
           ...mapGetters({
             doubleHomeCounter: "home/doubleHomeCounter"
           })
        },
        methods: {
           //1.写法一:
           ...mapMutations({
             increment: "home/increment"
           }),
           ...mapActions({
             incrementAction: "home/incrementAction"
           }),
        }
    }
    ```

    

  - 方式二：第一个参数传入模块空间名称，后面写上要使用的属性； 

    ```js
    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";   
    
    export default {
        computed: {
              // 2.写法二:
           ...mapState("home", ["homeCounter"]),
           ...mapGetters("home", ["doubleHomeCounter"])
        },
        methods: {
          // 2.写法二
           ...mapMutations("home", ["increment"]),
           ...mapActions("home", ["incrementAction"]),
        }
    }
    ```

    

  - 方式三：通过 `createNamespacedHelpers` 生成一个模块的辅助函数；

    ```js
    import { createNamespacedHelpers } from "vuex"; 
    const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers("home")
    
    export default {
        computed: {
          // 3.写法三:
           ...mapState(["homeCounter"]),
           ...mapGetters(["doubleHomeCounter"])
        },
        methods: {
          // 3.写法三:
           ...mapMutations(["increment"]),
           ...mapActions(["incrementAction"]),
        }
    }
    ```

  - setup写法

    ```js
        setup() {
           // {homeCounter: function}
           const state = mapState(["rootCounter"])
           const getters = mapGetters(["doubleHomeCounter"])
    
           const mutations = mapMutations(["increment"])
           const actions = mapActions(["incrementAction"])
    
          return {
             ...state,
             ...getters,
             ...mutations,
             ...actions
          }
        }
    ```

  - 使用hook函数useState,useGetters

    `useState`

    ```js
    import { mapState, createNamespacedHelpers } from 'vuex'
    import { useMapper } from './useMapper'
    
    export function useState(moduleName, mapper) {
      let mapperFn = mapState
      if (typeof moduleName === 'string' && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapState
      } else {
        mapper = moduleName
      }
    
      return useMapper(mapper, mapperFn)
    }
    
    ```

    `useGetters`

    ```js
    import { mapGetters, createNamespacedHelpers } from 'vuex'
    import { useMapper } from './useMapper'
    
    export function useGetters(moduleName, mapper) {
      let mapperFn = mapGetters
      if (typeof moduleName === 'string' && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapGetters
      } else {
        mapper = moduleName
      }
    
      return useMapper(mapper, mapperFn)
    }
    
    ```

    

    

    ```js
    import { useState, useGetters } from '../hooks/index'    
    ...
    ...
    	setup() {
           // {homeCounter: function}
           const state = useState(["rootCounter"])
           const rootGetters = useGetters(["doubleRootCounter"])
           const getters = useGetters("home", ["doubleHomeCounter"])
    
           const mutations = mapMutations(["increment"])
           const actions = mapActions(["incrementAction"])
    
          return {
             ...state,
             ...getters,
             ...rootGetters
             ...mutations,
             ...actions
          }
        }
    ```

    