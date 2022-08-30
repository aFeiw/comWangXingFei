# 11. 组件化基础

组件允许我们将 UI 划分为独立的、可重用的部分来思考。组件在应用程序中常常被组织成层层嵌套的树状结构：

![img](../../public/vue/components.7fbb3771.png)

这和我们嵌套 HTML 元素的方式类似，Vue 实现了自己的组件数据模型，使我们可以在每个组件内封装自定义内容与逻辑。

## 11.1 注册组件

注册组件分成两种：

- 全局组件：在任何其他的组件中都可以使用的组件；
- 局部组件：只有在注册的组件中才能使用的组件；

`注册全局组件：`

- 全局组件需要使用我们全局创建的 app 来注册组件； -
- 通过 component 方法传入组件名称、组件对象即可注册一个全局组件了； 之后，我们可以在 App 组件的 template 中直接使用这个全局组件：

```vue
<div id="app"></div>

<template id="my-app">
  <component-a></component-a>
</template>

<template id="component-a">
  <h2>{{ title }}</h2>
  <p>{{ desc }}</p>
  <button @click="btnClick">按钮点击</button>
</template>

<script src="../js/vue.js"></script>
<script>
const App = {
  template: '#my-app',
}

const app = Vue.createApp(App)

// 使用app注册一个全局组件app.component()
// 全局组件: 意味着注册的这个组件可以在任何的组件模板中使用
app.component('component-a', {
  template: '#component-a',
  data() {
    return {
      title: '我是标题',
      desc: '我是内容, 哈哈哈哈哈',
    }
  },
  methods: {
    btnClick() {
      console.log('按钮的点击')
    },
  },
})
app.mount('#app')
</script>
```

`注册局部组件：`

```vue
<div id="app"></div>

<template id="my-app">
  <h2>{{ message }}</h2>
  <component-a></component-a>
</template>

<template id="component-a">
  <h2>我是组件A</h2>
  <p>我是内容, 哈哈哈哈</p>
</template>

<script src="../js/vue.js"></script>
<script>
const ComponentA = {
  template: '#component-a',
}

const App = {
  template: '#my-app',
  components: {
    // key: 组件名称
    // value: 组件对象
    ComponentA: ComponentA,
  },
  data() {
    return {
      message: 'Hello World',
    }
  },
}

const app = Vue.createApp(App)
// app.component("ComponentA", ComponentA);
app.mount('#app')
</script>
```

## 11.2 组件名称

在通过 app.component 注册一个组件的时候，第一个参数是组件的名称，定义组件名的方式有两种：

- 方式一：使用 kebab-case（短横线分割符）
  - 当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case， 例如\<my-component-name> ：
- 方式二：使用 PascalCase（驼峰标识符）
  - 当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也 就是说 \<my-component-name>和\<MyComponentName> 都是可接受的；

## 11.3 组件的使用方法

`App.vue`导入子组件

> 子组件名称为 Header.vue、Main.vue、Footer.vue;

> style 标签 增加 scoped 会导致样式穿透，所以子组件 template 内添加 div 解决。

`示例：`

```vue
<template>
  <div id="app">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

export default {
  components: {
    Header,
    Main,
    Footer,
  },
}
</script>

<style scoped></style>
```

## 11.4 父子组件之间的通信方式

- 父子组件之间如何进行通信呢？

  - 父组件传递给子组件：通过 props 属性；
  - 子组件传递给父组件：通过$emit 触发事件；

  示意图：

  ::: mermaid
  flowchart LR;
  id1["Patent(父组件)"]--Pass props-->id2["child(子组件)"]
  id2--$emit Events-->id1
  :::

- 什么是 Props 呢？

  - Props 是你可以在组件上注册一些自定义的 attribute；
  - 父组件给这些 attribute 赋值，子组件通过 attribute 的名称获取到对应的值；

- Props 有两种常见用法：

  - 方式一：**字符串数组**，数组中的字符串就是 attribute 的名称；
  - 方式二：**对象类型**，对象类型我们可以在指定 attribute 名称的同时，指定它需要传递的类型、是否是必须的、 默认值等等；

- Props 数组的用法

- 使用示例：props: ['title', 'content']

  `父组件App.vue:`

  ```vue
  <template>
    <div>
      <show-message title="呵呵呵" content="我是呵呵呵呵"></show-message>
    </div>
  </template>

  <script>
  import ShowMessage from './ShowMessage.vue';

  export default {
    components: {
      ShowMessage,
    }
  </script>

  <style scoped></style>
  ```

  `子组件ShowMessage.vue:`

  ```vue
  <template>
    <div>
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </div>
  </template>

  <script>
  export default {
    props: ['title', 'content']
  </script>

  <style scoped></style>
  ```

- Props 的对象用法

  - 数组用法中我们只能说明传入的 attribute 的名称，并不能对其进行任何形式的限制，接下来我们来看一下对象的 写法是如何让我们的 props 变得更加完善的。
  - 当使用对象语法的时候，我们可以对传入的内容限制更多：
    - 比如指定传入的 attribute 的类型；
    - 比如指定传入的 attribute 是否是必传的；
    - 比如指定没有传入时，attribute 的默认值；
  - type 支持的类型？
    - String
    - Number
    - Boolean
    - Array pObject
    - Date
    - Function
    - Symb

  `示例：`

  ```vue
  <script>
  export default {
    props: {
      // 指定类型
      title: String,
      // 指定类型,同时指定是否必选、默认值
      content: {
        type: String,
        required: true,
        default: '123',
      },
      counter: {
        type: Number,
      },
      info: {
        type: Object,
        // 对象或数组默认值必须从工厂函数获取
        default() {
          return { name: 'why' }
        },
      },
      messageInfo: {
        type: String,
      },
      //自定义验证函数
      validator(value) {
        //这个值必须匹配下列字符串中的一个
        return ['suceess', 'warning', 'danger'].includes(value)
      },
    },
  }
  </script>
  ```

- Prop 的大小写命名(camelCase vs kebab-case)

  - HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符；
  - 这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短 横线分隔命名) 命名；

- 什么是非 Prop 的 Attribute 呢？

  - 当我们传递给一个组件某个属性，但是该属性并没有定义对应的 props 或者 emits 时，就称之为 非 Prop 的 Attribute；
  - 常见的包括 class、style、id 属性等；
  - Attribute 继承 p 当组件有单个根节点时，非 Prop 的 Attribute 将自动添加到根节点的 Attribute 中：

- 如果我们不希望组件的根元素继承 attribute，可以在组件中设置 **inheritAttrs: false：**

  - 禁用 attribute 继承的常见情况是需要将 attribute 应用于根元素之外的其他元素；

  - 我们可以通过 $attrs 来访问所有的 非 props 的 attribute；

    ```vue
    <template>
      <div>
        <h2 :class="$attrs.class"></h2>
      </div>
    </template>

    <script>
    export default {
      inheritAttrs: false,
    }
    </script>

    <style scoped></style>
    ```

- 多个根节点的 attribute

  - 多个根节点的 attribute 如果没有显示的绑定，那么会报警告，我们必须手动的指定要绑定到哪一个属性上：

## 11.5 子组件传递给父组件

- 什么情况下子组件需要传递内容到父组件呢？

  - 当子组件有一些事件发生的时候，比如在组件中发生了点击，父组件需要切换内容；

  - 子组件有一些内容想要传递给父组件的时候；

- 我们如何完成上面的操作呢？

  - 首先，我们需要在子组件中定义好在某些情况下触发的事件名称,使用**emits 定义**；

  - 其次，在父组件中以 v-on 的方式传入要监听的事件名称，并且绑定到对应的方法中；

  - 最后，在子组件中发生某个事件的时候，根据事件名称触发对应的事件

  `父组件：`

  ```vue
  <template>
    <div>
      <h2>当前计数: {{ counter }}</h2>
      <counter-operation @add="addOne" @sub="subOne" @addN="addNNum">
      </counter-operation>
    </div>
  </template>

  <script>
  import CounterOperation from './CounterOperation.vue'

  export default {
    components: {
      CounterOperation,
    },
    data() {
      return {
        counter: 0,
      }
    },
    methods: {
      addOne() {
        this.counter++
      },
      subOne() {
        this.counter--
      },
      addNNum(num, name, age) {
        console.log(name, age)
        this.counter += num
      },
    },
  }
  </script>

  <style scoped></style>
  ```

  `子组件：`

  ```vue
  <template>
    <div>
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>

      <input type="text" v-model.number="num" />
      <button @click="incrementN">+n</button>
    </div>
  </template>

  <script>
  export default {
    // emits: ["add", "sub", "addN"],
    // 对象写法的目的是为了进行参数的验证
    emits: {
      add: null,
      sub: null,
      addN: (num, name, age) => {
        console.log(num, name, age)
        if (num > 10) {
          return true
        }
        return false
      },
    },
    data() {
      return {
        num: 0,
      }
    },
    methods: {
      increment() {
        console.log('+1')
        this.$emit('add')
      },
      decrement() {
        console.log('-1')
        this.$emit('sub')
      },
      incrementN() {
        this.$emit('addN', this.num, 'why', 18)
      },
    },
  }
  </script>

  <style scoped></style>
  ```

- 自定义事件的参数和验证

  - 自定义事件的时候，我们也可以传递一些参数给父组件：
  - 在 vue3 当中，我们可以对传递的参数进行验证

## 11.6 非父子组件的通信

- 在开发中，我们构建了组件树之后，除了父子组件之间的通信之外，还会有非父子组件之间的通信。
- 这里我们主要有两种方式：
  - Provide/Inject；
  - Mitt 全局事件总线

### 11.6.1 Provide(提供)和 Inject(注入)

- Provide/Inject 用于非父子组件之间共享数据：

  - 比如有一些深度嵌套的组件，子组件想要获取父组件的部分内 容；
  - 在这种情况下，如果我们仍然将 props 沿着组件链逐级传递下 去，就会非常的麻烦；

- 对于这种情况下，我们可以使用 Provide 和 Inject ：

  - 无论层级结构有多深，父组件都可以作为其所有子组件的依赖 提供者；
  - 父组件有一个 provide 选项来提供数据；
  - 子组件有一个 inject 选项来开始使用这些数据；

- 实际上，你可以将依赖注入看作是“long range props”，除了：

  - 父组件不需要知道哪些子组件使用它 provide 的 property

  - 子组件不需要知道 inject 的 property 来自哪里

![img](../../public/vue/provide-inject.3e0505e4.png)

### 11.6.2 Provide(提供)和 Inject(注入)基本使用

`结构如下:`

::: mermaid
flowchart LR;
id1["App.vue"]-->id2["Home.vue"]
id2-->id3["HomeContent.vue"]
:::

`示例：`

`App.vue:`

```vue
<template>
  <div>
    <home></home>
    <button @click="addName">+name</button>
  </div>
</template>

<script>
import Home from './Home.vue';
import { computed } from 'vue';

export default {
  components: {
    Home
  },
  provide() {
    return {
      name: "why",
      age: 18,
    }
  }
  }
}
</script>
```

`HomeContent.vue:`

```vue
<template>
  <div>HomeContent: {{ name }} - {{ age }} - {{ length.value }}</div>
</template>

<script>
export default {
  inject: ['name', 'age', 'length'],
}
</script>

<style scoped></style>
```

- 如果 Provide 中提供的一些数据是来自 data，那么要使用 provide()函数对象，否者会报错。

  `例:`

  ```vue
  <script>
  provide() {
        return {
          name: "why",
          age: 18,
          length: computed(() => this.names.length) // ref对象 .value
        }
      },
      data() {
        return {
          names: ["abc", "cba", "nba"]
        }
      }
  </script>
  ```

- 在**provide**中引入的 **this.names.length** 本身并不是响应式的；

- 如果我们需要数据变成响应式的， 需要使用响应式的一些 API 来完成这些功能，比如说 computed 函数；

  > 注意：我们在使用 length 的时候需要获取其中的 value ,这是因为 computed 返回的是一个 ref 对象，需要取出其中的 value 来使用；

### 11.6.3 全局事件总线 mitt 库

- Vue3 从实例中移除了 \$on、\$off 和 $once 方法，所以我们如果希望继续使用全局事件总线，要通过第三方的库

  - Vue3 官方有推荐一些库，例如 **mitt** 或 **tiny-emitte**r；

- 首先，我们需要先安装这个库：

  ```bash
  npm install mitt
  ```

- 其次，我们可以封装一个工具 eventbus.js：

  ```js
  import mitt from 'mitt'

  const emitter = mitt()
  export default emitter
  ```

- 使用事件总线工具

  - 在项目中可以使用它们：

    - 我们在 Home.vue 中监听事件；

      ```vue
      <script>
      import emitter from './utils/eventbus'

      export default {
        created() {
          emitter.on('why', (info) => {
            console.log('why:', info)
          })
        },
      }
      </script>
      ```

    - 我们在 App.vue 中触发事件；

      ```vue
      <script>
      import emitter from './utils/eventbus'

      export default {
        methods: {
          btnClick() {
            console.log('about按钮的点击')
            emitter.emit('why', { name: 'why', age: 18 })
          },
        },
      }
      </script>
      ```

- Mitt 的事件取消

  ```js
  //取消emitter中所有的监听
  emitter.all.clear()

  //定义一个函数
  function onFoo() {}
  emitter.on('foo', onFoo) //监听
  emitter.off('foo', onFoo) //取消
  ```

  ## 11.7 vue 的插槽

`<slot>` 元素是一个**插槽的插口**，标示了父元素提供的**插槽内容**将在哪里被渲染。

- 插槽的使用过程其实是抽取共性、预留不同；
- 我们会将共同的元素、内容依然在组件内进行封装；
- 如何使用 slot 呢？
  - Vue 中将 元素作为承载分发内容的出口；
  - 在封装组件中，使用特殊的元素就可以为封装组件开启一个插槽；
  - 该插槽插入什么内容取决于父组件如何使用

### 11.7.1 插槽的基本使用

![img](../../public/vue/slots.dbdaf1e8.png)

`示例：`

`App.vue`

```vue
<template>
  <div>
    <my-slot-cpn>
      <button>我是按钮</button>
    </my-slot-cpn>
  </div>
</template>

<script>
import MySlotCpn from './MySlotCpn.vue'

export default {
  components: {
    MySlotCpn,
  },
}
</script>
```

按钮在`MySlotCpn.vue`的`<slot>`标签内展示，相当于 slot=`<button>我是按钮</button>`

```vue
<template>
  <div>
    <slot> </slot>
  </div>
</template>

<script>
export default {}
</script>
```

### 11.7.2 具名插槽的使用

- 事实上，我们希望达到的效果是插槽对应的显示，这个时候我们就可以使用 具名插槽：

  - 具名插槽顾名思义就是给插槽起一个名字， 元素有一个特殊的 attribute：name；

  - 一个不带 name 的 slot，会带有隐含的名字 default；

  - 跟 v-on 和 v-bind 一样，v-slot 也有缩写；

  - 即把参数之前的所有内容 (v-slot:) 替换为字符 `#`；

    > 注意: 如果还有其他的具名插槽, 那么默认插槽也必须使用 template 来编写

`示例:`

`App.vue`

```vue
<template>
  <div>
    <nav-bar :name="name">
      <template #left>
        <button>左边的按钮</button>
      </template>
      <template #center>
        <h2>我是标题</h2>
      </template>
      <template #right>
        <i>右边的i元素</i>
      </template>
      <template #[name]>
        <i>why内容</i>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  components: {
    NavBar,
  },
}
</script>
```

`NavBar.vue`

```vue
<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
    <div class="addition">
      <slot :name="name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
}
</script>
```

### 11.7.3 动态插槽名

- 什么是动态插槽名呢？
  - 目前我们使用的插槽名称都是固定的；
  - 比如 `v-slot:left`、`v-slot:center`等等；
  - 我们可以通过 v-slot:[dynamicSlotName]方式动态绑定一个名称；

`示例：`

```vue
<template>
  <div>
    <nav-bar :name="name">
      <template #[name]>
        <i>why内容</i>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      name: 'why',
    }
  },
}
</script>
```

### 11.7.4 插槽的渲染作用域

- 在 Vue 中有渲染作用域的概念：

  - 父级模板里的所有内容都是在父级作用域中编译的；

  - 子模板里的所有内容都是在子作用域中编译的；

- ![image-20220724145056053](../../public/vue/image-20220724145056053.png)

**如果我们希望插槽可以访问到子组件中的内容：**

- 当一个组件被用来渲染一个数组元素时，我们使用插槽，并且希望插槽中没有显示每项的内容；
- 我们可以使用作用域插槽

`示例：`

`App.vue`

```vue
<template>
  <div>
    <show-names :names="names">
      <template v-slot="slotProps">
        <strong>{{ slotProps.item }}-{{ slotProps.index }}</strong>
      </template>
    </show-names>
  </div>
</template>

<script>
import ShowNames from './ShowNames.vue'

export default {
  components: {
    ShowNames,
  },
  data() {
    return {
      names: ['why', 'kobe', 'james', 'curry'],
    }
  },
}
</script>
```

`ShowNames.vue:`

```vue
<template>
  <div>
    <template v-for="(item, index) in names" :key="item">
      <slot :item="item" :index="index"></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    names: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
```

- 如果我们的插槽是默认插槽 default，那么在使用的时候 v-slot:default="slotProps"可以简写为 v-slot="slotProps"：
- 并且如果我们的插槽只有默认插槽时，组件的标签可以被当做插槽的模板来使用，这样，我们就可以将 v-slot 直 接用在组件上

`v-slot="slotProps"` 可以类比这里的函数签名，和函数的参数类似，我们也可以在 `v-slot` 中使用解构：

```vue
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

具名作用域插槽的工作方式也是类似的，插槽 props 可以作为 v-slot 指令的值被访问到：v-slot:name="slotProps"。当使用缩写时是这样：

```vue
<MyComponent>

  <template #header="headerProps">
    {{ headerProps }}
  </template>


  <template #default="defaultProps">
    {{ defaultProps }}
  </template>


  <template #footer="footerProps">
    {{ footerProps }}
  </template>

</MyComponent>
```

## 11.8 动态组件的使用

- 比如我们现在想要实现了一个功能：
- 点击一个 tab-bar，切换不同的组件显示；
- 我们可以通过两种不同的实现思路来实现：
  - 方式一：通过 v-if 来判断，显示不同的组件；
  - 方式二：动态组件的方式

`v-if实现`

```vue
<template>
  <div>
    <button
      v-for="item in tabs"
      :key="item"
      @click="itemClick(item)"
      :class="{ active: currentTab === item }"
    >
      {{ item }}
    </button>
    <!-- 1.v-if的判断实现 -->
    <template v-if="currentTab === 'home'">
      <home></home>
    </template>
    <template v-else-if="currentTab === 'about'">
      <about></about>
    </template>
    <template v-else>
      <category></category>
    </template>
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Category from './pages/Category.vue'

export default {
  components: {
    Home,
    About,
    Category,
  },
  data() {
    return {
      tabs: ['home', 'about', 'category'],
      currentTab: 'home',
    }
  },
  methods: {
    itemClick(item) {
      this.currentTab = item
    },
    pageClick() {
      console.log('page内部发生了点击')
    },
  },
}
</script>

<style scoped>
.active {
  color: red;
}
</style>
```

`动态组件的实现：`

- 动态组件是使用 component 组件，通过一个特殊的 attribute is 来实现：

- 这个 currentTab 的值需要是什么？

  - 可以是通过 component 函数注册的组件；

  - 在一个组件对象的 components 对象中注册的组件；

- 动态组件我们可以给它们传值和监听事件

  - 我们只需要将**属性和监听事件**放到 component 上来使用；

```vue
<template>
  <div>
    <button
      v-for="item in tabs"
      :key="item"
      @click="itemClick(item)"
      :class="{ active: currentTab === item }"
    >
      {{ item }}
    </button>

    <!-- 2.动态组件 -->
    <component
      :is="currentTab"
      name="coderwhy"
      :age="18"
      @pageClick="pageClick"
    >
    </component>
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Category from './pages/Category.vue'

export default {
  components: {
    Home,
    About,
    Category,
  },
  data() {
    return {
      tabs: ['home', 'about', 'category'],
      currentTab: 'home',
    }
  },
  methods: {
    itemClick(item) {
      this.currentTab = item
    },
    pageClick() {
      console.log('page内部发生了点击')
    },
  },
}
</script>

<style scoped>
.active {
  color: red;
}
</style>
```

## 11.9 keep-alive 的使用

在开发中某些情况我们希望继续保持组件的状态，而不是销毁掉，这个时候我们就可以使用一个内置组件： **keep-alive**。

```vue
<keep-alive include="home,about">
      <component :is="currentTab"
                 name="coderwhy"
                 :age="18"
                 @pageClick="pageClick">
      </component>
    </keep-alive>
```

- keep-alive 有一些属性：

  - include - string | RegExp | Array。只有名称匹配的组件会被缓 存；

  - exclude - string | RegExp | Array。任何名称匹配的组件都不 会被缓存；

  - max - number | string。最多可以缓存多少组件实例，一旦达 到这个数字，那么缓存组件中最近没有被访问的实例会被销毁；

`示例:`

```vue
<!-- 逗号分割字符串 -->
<keep-alive include="home,about">
    <component :is="currentTab"</component>
</keep-alive>

<!-- regx(使用`v-bind`) -->
<keep-alive :include="/a|b/">
    <component :is="currentTab"</component>
</keep-alive>
<!-- Array(使用`v-bind`) -->
<keep-alive :include="['a', 'b']">
    <component :is="currentTab"</component>
</keep-alive>
```

- include 和 exclude prop 允许组件有条件地缓存：
  - 二者都可以用逗号分隔字符串、正则表达式或一个数组来表示；
  - 匹配首先检查组件自身的 name 选项；

## 11.10 异步组件的使用

- 如果我们的项目过大了，对于某些组件我们希望通过异步的方式来进行加载（目的是可以对其进行分包处理），那 么 Vue 中给我们提供了一个函数：defineAsyncComponent。
- defineAsyncComponent 接受两种类型的参数：
  - 类型一：工厂函数，该工厂函数需要返回一个 Promise 对象；
  - 类型二：接受一个对象类型，对异步函数进行配置；

`类型一:`

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
```

```js
import { defineAsyncComponent } from 'vue'

export default {
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    ),
  },
}

//  const AsyncCategory = defineAsyncComponent(() => import("./AsyncCategory.vue"))
//  export default {
//  components: {
//      Home,
//      AsyncCategory,
//      Loading
//    }
//  }
```

`类型二:`

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000,
  //   /**
  //    * err: 错误信息,
  //    * retry: 函数, 调用retry尝试重新加载
  //    * attempts: 记录尝试的次数
  //    */
  //   onError: function(err, retry, attempts) {

  //   }
})
```

### 11.10.1 内置组件 Suspense 的使用

> 来自 vue3 官网的解释

`<Suspense>` 组件有两个插槽：`#default` 和 `#fallback`。两个插槽都只允许**一个**直接子节点。在可能的时候都将显示默认槽中的节点。否则将显示后备槽中的节点。

```vue
<template>
  <div>
    App组件
    <home></home>

    <suspense>
      <template #default>
        <async-category></async-category>
      </template>
      <template #fallback>
        <loading></loading>
      </template>
    </suspense>
  </div>
</template>
```

在初始渲染时，`<Suspense>` 将在内存中渲染其默认的插槽内容。如果在这个过程中遇到任何异步依赖，则会进入**挂起**状态。在挂起状态期间，展示的是后备内容。当所有遇到的异步依赖都完成后，`<Suspense>` 会进入**完成**状态，并将展示出默认插槽的内容。

如果在初次渲染时没有遇到异步依赖，`<Suspense>` 会直接进入完成状态。

进入完成状态后，只有当默认插槽的根节点被替换时，`<Suspense>` 才会回到挂起状态。组件树中新的更深层次的异步依赖**不会**造成 `<Suspense>` 回退到挂起状态。

发生回退时，后备内容不会立即展示出来。相反，`<Suspense>` 在等待新内容和异步依赖完成时，会展示之前 `#default` 插槽的内容。这个行为可以通过一个 `timeout` prop 进行配置：在等待渲染新内容耗时超过 `timeout` 之后，`<Suspense>` 将会切换为展示后备内容。若 `timeout` 值为 `0` 将导致在替换默认内容时立即显示后备内容。

## 11.11 引用元素和组件

### 11.11.1 $refs 的使用

- 某些情况下，我们在组件中想要**直接获取到元素对象或者子组件实例**：

  - 在 Vue 开发中我们是不推荐进行 DOM 操作的；

  - 这个时候，我们可以给元素或者组件绑定一个 ref 的 attribute 属性；

    ```vue
    <template>
      <div>
        <!-- 绑定到一个元素上 -->
        <h2 ref="title">哈哈哈</h2>

        <!-- 绑定到一个组件实例上 -->
        <nav-bar ref="navBar"></nav-bar>

        <button @click="btnClick">获取元素</button>
      </div>
    </template>
    ```

- **组件实例有一个$refs 属性**：

  - 它一个对象 Object，持有注册过 ref attribute 的所有 DOM 元素和组件实例

    ```js
    visitElement(){
        //访问元素
        console.log(this.$refs.title)
        //访问组件实例
        console.log(this.$refs.helloCpn.$el)
        //访问组件实例
        this.$refs.helloCpn.showMessage();
    }
    ```

- 我们可以通过\$parent 来访问父元素。

- HelloWorld.vue 的实现：

- 这里我们也可以通过\$root 来实现，因为 App 是我们的根组件；

  ```js
  visitparent(){
      console.log(this.$parent.message)
      console.log(this.$root.message;
  }
  ```

- > 注意：在 Vue3 中已经移除了$children 的属性，所以不可以使用了。

## 11.12 组件的生命周期

- 什么是生命周期呢？

  - 每个组件都可能会经历从创建、挂载、更新、卸载等一系列的过程；
  - 在这个过程中的某一个阶段，用于可能会想要添加一些属于自己的代码逻辑（比如组件创建完后就请求一些服 务器数据）；
  - 但是我们如何可以知道目前组件正在哪一个过程呢？Vue 给我们提供了组件的生命周期函数；

- 生命周期函数：

  - 生命周期函数是一些钩子函数，在某个时间会被 Vue 源码内部进行回调；

  - 通过对生命周期函数的回调，我们可以知道目前组件正在经历什么阶段；
  - 那么我们就可以在该生命周期中编写属于自己的逻辑代码了；

**生命周期的流程**

![image-20220724211234915](../../public/vue/image-20220724211234915.png)

```js
    beforeCreate() {
      console.log("home beforeCreate");
    },
    created() {
      console.log("home created");
    },
    beforeMount() {
      console.log("home beforeMount");
    },
    mounted() {
      console.log("home mounted");
    },
    beforeUnmount() {
      console.log("home beforeUnmount");
    },
    unmounted() {
      console.log("home unmounted");
    },
    beforeUpdate() {
      console.log(this.$refs.title.innerHTML);
      console.log("home beforeUpdate");
    },
    updated() {
      console.log(this.$refs.title.innerHTML);
      console.log("home updated");
    }
```

### 11.12.1 缓存组件的生命周期

- 对于缓存的组件来说，再次进入时，我们是不会执行 created 或者 mounted 等生命周期函数的：
- 但是有时候我们确实希望监听到何时重新进入到了组件，何时离开了组件；
- 这个时候我们可以使用 activated 和 deactivated 这两个生命周期钩子函数来监听；

```js
activated(){
    console.log("about activated")
},
 deactivated(){
     console.log("about deactivated")
 }
```

## 11.13 组件的 v-model

- 如果我们现在封装了一个组件，其他地方在使用这个组件时，是否也可以使用 v-model 来同时完成这两个功能呢？

- 也是可以的，vue 也支持在组件上使用 v-model；

- 当我们在组件上使用的时候，等价于如下的操作：

```vue
<!-- 组件上使用v-model -->
<hy-input v-model="message"></hy-input>
<hy-input
  :modelValue="message"
  @update:model-value="message = $event"
></hy-input>
```

- 我们会发现和 input 元素不同的只是属性的名称和事件触发的名称而已

### 11.13.1 组件 v-model 的实现

- 为了我们的 MyInput 组件可以正常的工作，这个组件内的必须：

  - 将其 value attribute 绑定到一个名叫 modelValue 的 prop 上；

  - 在其 input 事件被触发时，将新的值通过自定义的 update:modelValue 事件抛出；

- MyInput.vue 的组件代码如下：

  ```vue
  <template>
    <div>
      <!-- 1.默认绑定和事件处理 -->
      <!-- <button @click="btnClick">hyinput按钮</button>
      <h2>HyInput的message: {{modelValue}}</h2> -->
      <!-- 2.通过input -->
      <!-- <input :value="modelValue" @input="btnClick"> -->
      <!-- 3.绑定到props中是不对的 -->
      <!-- <input v-model="modelValue"> -->
    </div>
  </template>

  <script>
  export default {
    props: {
      modelValue: String,
    },
    emits: ['update:modelValue'],
    methods: {
      btnClick(event) {
        this.$emit('update:modelValue', event.target.value)
      },
    },
  }
  </script>
  ```

::: tip

不建议修改 props 来实现双向绑定

:::

### 11.13.2 computed 实现

```vue
<template>
  <div>
    <input v-model="value" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      set(value) {
        this.$emit('update:modelValue', value)
      },
      get() {
        return this.modelValue
      },
    },
  },
}
</script>
```

### 11.13.3 绑定多个属性

```vue
<!-- 绑定两个v-model -->
<hy-input v-model="message" v-model:title="title"></hy-input>
```

- v-model:title 相当于做了两件事：

  - 绑定了 title 属性；

  - 监听了 @update:title 的事件；

    ```vue
    <template>
      <div>
        <input v-model="value" />
        <input v-model="why" />
      </div>
    </template>

    <script>
    export default {
      props: {
        modelValue: String,
        title: String,
      },
      emits: ['update:modelValue', 'update:title'],
      computed: {
        value: {
          set(value) {
            this.$emit('update:modelValue', value)
          },
          get() {
            return this.modelValue
          },
        },
        why: {
          set(why) {
            this.$emit('update:title', why)
          },
          get() {
            return this.title
          },
        },
      },
    }
    </script>
    ```
