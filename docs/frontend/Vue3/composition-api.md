# 13. 组合式 api

## 13.1 Mixin

- 目前我们是使用组件化的方式在开发整个 Vue 的应用程序，但是`组件和组件之间有时候会存在相同的代码逻辑`，我 们希望对`相同的代码逻辑进行抽取`。
- 在 Vue2 和 Vue3 中都支持的一种方式就是`使用Mixin`来完成：
  - Mixin 提供了一种非常灵活的方式，来分发`Vue组件中的可复用功能`；
  - 一个 Mixin 对象可以包含`任何组件选项`；
  - 当组件使用 Mixin 对象时，所有`Mixin对象的选项将被混合进入该组件本身的选项`中

### 13.1.1 Mixin 的基本使用

- 使用`mixins:[]`可以将`demoMixin.js`的所有对象选项导入到`Home.vue`

`Home.vue`

```vue
<template>
  <div>
    <h2>{{ message }}</h2>
    <button @click="foo">按钮</button>
  </div>
</template>

<script>
import { demoMixin } from './mixins/demoMixin'

export default {
  mixins: [demoMixin],
  data() {
    return {
      title: 'Hello World',
    }
  },
  methods: {},
}
</script>

<style scoped></style>
```

`demoMixin.js`

```js
export const demoMixin = {
  data() {
    return {
      message: 'Hello DemoMixin',
    }
  },
  methods: {
    foo() {
      console.log('demo mixin foo')
    },
  },
  created() {
    console.log('执行了demo mixin created')
  },
}
```

### 13.1.2Mixin 的合并规则

- 如果 Mixin 对象中的选项和组件对象中的选项发生了冲突，那么 Vue 会如何操作呢？

  - 这里分成不同的情况来进行处理；

- **情况一：如果是 data 函数的返回值对象**

  - 返回值对象默认情况下会进行合并；

  - 如果 data 返回值对象的属性发生了冲突，那么会保留组件自身的数据；

- **情况二：如何生命周期钩子函数**

  - 生命周期的钩子函数会被合并到数组中，都会被调用；

- **情况三：值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。**

  - 比如都有 methods 选项，并且都定义了方法，那么它们都会生效；

  - 但是如果对象的 key 相同，那么会取组件对象的键值对；

### 13.1.3 全局混入 Mixin

- 如果组件中的某些选项，是所有的组件都需要拥有的，那么这个时候我们可以使用全局的 mixin：

  - 全局的 Mixin 可以使用 应用 app 的方法 mixin 来完成注册；

  - 一旦注册，那么全局混入的选项将会影响每一个组件；

    ```js
    const app = createApp(App)
    app.mixin({
      created() {
        console.log('global mixin created')
      },
    })
    app.mount('#app')
    ```

## 13.2 Composition API 基础

- 如果我们能将同一个逻辑关注 点相关的代码收集在一起会更 好。
- 这就是 Composition API 想 要做的事情，以及可以帮助我 们完成的事情。
- `setup()` 这个钩子在以下情况下，作为组件中使用组合式 API 的入口。
  1. 不搭配构建步骤使用组合式 API。
  2. 在选项式 API 组件中集成基于组合式 API 的代码。
  3. 比如替代 methods、computed、watch、data、生命周期等等；

### 13.2.1 setup 函数的参数

- setup 函数的参数，它主要有两个参数：

  - 第一个参数：`props`

  - 第二个参数：`context`

- props 非常好理解，它其实就是父组件传递过来的属性会被放到 props 对象中，我们在 setup 中如果需要使用，那么就可 以直接通过 props 参数获取：

  - 对于`定义props的类型`，我们还是和之前的规则是一样的，在 props 选项中定义；

  - 并且在 template 中依然是可以正常去使用 props 中的属性，比如 message；

  - 如果我们在 setup 函数中想要使用 props，那么不可以通过 this 去获取；

  - 因为 props 有`直接作为参数传递到setup函数`中，所以我们可以直接通过参数来使用即可；

- 另外一个参数是 context，我们也称之为是一个 SetupContext，它里面包含三个属性：

  - attrs：所有的非 prop 的 attribute；

  - slots：父组件传递过来的插槽（这个在以渲染函数返回时会有作用)；

  - emit：当我们组件内部需要发出事件时会用到 emit（因为我们不能访问 this，所以不可以通过 this.$emit 发出事件）；

```js
    /**
     * 参数一: props, 父组件传递过来属性
     */
    // setup(props, context) {
    setup(props, {attrs, slots, emit}) {
      console.log(props.message);
      console.log(attrs.id, attrs.class);
      console.log(slots);
      console.log(emit);

      return {
        title: "Hello Home",
        counter: 100
      }
    }
```

### 13.2.2 setup 的返回值

- setup 的返回值可以在模板 template 中被使用；

- 也就是说我们可以通过 setup 的返回值来替代 data 选项；

- 甚至是我们可以返回一个执行函数来代替在 methods 中定义的方法：

  `示例:`

  ```js
  <template>
    <div>
      Home Page
      <h2>{{message}}</h2>

      <h2>{{title}}</h2>
      <h2>当前计数: {{counter}}</h2>
      <button @click="increment">+1</button>
    </div>
  </template>

  <script>
    export default {
      props: {
        message: {
          type: String,
          required: true
        }
      },
      setup() {
        let counter = 100;

        // 局部函数
        const increment = () => {
          counter++;
          console.log(counter);
        }

        return {
          title: "Hello Home",
          counter,
          increment
        }
      }
    }
  </script>

  <style scoped>

  </style>
  ```

::: tip

`setup()` 自身并不含对组件实例的访问权，即在 `setup()` 中访问 `this` 会是 `undefined`。你可以在选项式 API 中访问组合式 API 暴露的值，但反过来则不行。

:::

`顶层setup的使用`

```vue
<template>
  <div>
    <h2>Hello World</h2>
    <h2>{{ message }}</h2>
    <button @click="emitEvent">发射事件</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmit } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: '哈哈哈',
  },
})

const emit = defineEmit(['increment', 'decrement'])

const emitEvent = () => {
  emit('increment', '100000')
}
</script>
```

### 13.2.3 Reactive API 的使用

- 如果想为在 setup 中定义的数据提供响应式的特性，我们可以使用 reactive 的函数：

  `例:`

  ```js
      setup() {
        const state = reactive({
          counter: 100
        })

        // 局部函数
        const increment = () => {
          state.counter++;
          console.log(state.counter);
        }

        return {
          state,
          increment
        }
      }
  ```

- 原因：

  - 这是因为当我们使用 reactive 函数处理我们的数据之后，数据再次被使用时就会进行依赖收集；

  - 当数据发生改变时，所有收集到的依赖都是进行对应的响应式操作（比如更新界面）；

  - 事实上，我们编写的 data 选项，也是在内部交给了 reactive 函数将其编程响应式对象的；

### 13.2.4 Ref API 的使用

- reactive API 对传入的类型是有限制的，它要求我们必须传入的是一个对象或者数组类型：

  - 如果我们传入一个基本数据类型（String、Number、Boolean）会报一个警告；

- Vue3 给我们提供了另外一个 API：`ref API`

  - `ref `会返回一个可变的`响应式对象`，该对象作为一个 响应式的引用 维护着它内部的值，这就是 ref 名称的来源； 它内部的值是在 ref 的 value 属性中被维护的；

    ```js
    const message = ref('Hello World!')
    ```

- 这里有两个注意事项：

  - 在模板中引入 ref 的值时，Vue 会自动帮助我们进行解包操作，所以我们并不需要在模板中通过 ref.value 的方式 来使用；

  - 但是在 setup 函数内部，它依然是一个 ref 引用， 所以对其进行操作时，我们依然需要使用 ref.value 的方式；

### 13.2.5 ref 浅层的解包

- 模板中的解包是浅层的解包，如果我们的代码是下面的方式：

  ```vue
  <template>
    <div>
      Home Page
      <h2>{{ message }}</h2>
      <!-- 当我们在template模板中使用ref对象, 它会自动进行解包 -->
      <h2>当前计数: {{ counter }}</h2>
      <!-- ref的解包只能是一个浅层解包(info是一个普通的JavaScript对象) -->
      <h2>当前计数: {{ info.counter.value }}</h2>
      <button @click="increment">+1</button>
    </div>
  </template>

  <script>
  import { ref, reactive } from 'vue'

  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
    },
    setup() {
      let counter = ref(100)

      const info = {
        counter,
      }
      // 局部函数
      const increment = () => {
        counter.value++
        console.log(counter.value)
      }

      return {
        counter,
        info,
        reactiveInfo,
        increment,
      }
    },
  }
  </script>
  ```

- 如果我们将 ref 放到一个 reactive 的属性当中，那么在模板中使用时，它会自动解包：

  ```vue
  <template>
    <div>
      Home Page
      <h2>{{ message }}</h2>
      <!-- 当如果最外层包裹的是一个reactive可响应式对象, 那么内容的ref可以解包 -->
      <h2>当前计数: {{ reactiveInfo.counter }}</h2>
      <button @click="increment">+1</button>
    </div>
  </template>

  <script>
  import { ref, reactive } from 'vue'

  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
    },
    setup() {
      let counter = ref(100)

      const reactiveInfo = reactive({
        counter,
      })

      // 局部函数
      const increment = () => {
        counter.value++
        console.log(counter.value)
      }

      return {
        counter,
        info,
        reactiveInfo,
        increment,
      }
    },
  }
  </script>
  ```

### 13.2.6 readonly 的使用

- 我们通过 reactive 或者 ref 可以获取到一个响应式的对象，但是某些情况下，我们传入给其他地方（组件）的这个 响应式对象希望在另外一个地方（组件）被使用，但是不能被修改，这个时候如何防止这种情况的出现呢？
- Vue3 为我们提供了 readonly 的方法；
- readonly 会返回原生对象的只读代理（也就是它依然是一个 Proxy，这是一个 proxy 的 set 方法被劫持，并且不 能对其进行修改）；
- 在开发中常见的 readonly 方法会传入三个类型的参数：
  - 类型一：普通对象；
  - 类型二：reactive 返回的对象；
  - 类型三：ref 的对象；

`规则：`

- readonly 返回的对象都是不允许修改的；

- 但是经过 readonly 处理的原来的对象是允许被修改的；

  - 比如 `const info = readonly(obj)`，info 对象是不允许被修改的；

  - 当 obj 被修改时，readonly 返回的 info 对象也会被修改；

  - 但是我们`不能去修改readonly返回的对象info`；

- 其实本质上就是`readonly返回的对象的setter方法`被劫持了而已；

`示例：`

```vue
<template>
  <div>
    <button @click="updateState">修改状态</button>
  </div>
</template>

<script>
import { reactive, ref, readonly } from 'vue'

export default {
  setup() {
    // 1.普通对象
    const info1 = { name: 'why' }
    const readonlyInfo1 = readonly(info1)

    // 2.响应式的对象reactive
    const info2 = reactive({
      name: 'why',
    })
    const readonlyInfo2 = readonly(info2)

    // 3.响应式的对象ref
    const info3 = ref('why')
    const readonlyInfo3 = readonly(info3)

    const updateState = () => {
      // readonlyInfo3.value = "coderwhy"
      info3.value = 'coderwhy'
    }

    return {
      updateState,
    }
  },
}
</script>
```

## 13.3 ReactiveAPI 的补充

### 13.3.1 Reactive 判断的 API

- isProxy
  - 检查对象**是否是由 reactive 或 readonly 创建的 proxy**。
- isReactive
  - 检查对象**是否是由 reactive 创建的响应式代理**：
  - 如果**该代理是 readonly 建的**，但**包裹了由 reactive 创建的另一个代理**，它也会返回 true；
- isReadonly
  - 检查对象**是否是由 readonly 创建的只读代理**。
- toRaw
  - 返回 **reactive 或 readonly 代理的原始对象**（不建议保留对原始对象的持久引用。请谨慎使用）。
- shallowReactive
  - 创建一个响应式代理，它跟踪其自身 property 的响应性，但**不执行嵌套对象的深层响应式转换** (深层还是原生对象)。
- shallowReadonly
  - 创建一个 proxy，使其自身的 property 为只读，但**不执行嵌套对象的深度只读转换**（深层还是可读、可写的）。

### 13.3.2 toRefs 和 toRef 的使用

- 如果我们使用 ES6 的解构语法，对 reactive 返回的对象进行解构获取值，那么之后无论是修改结构后的变量，还是修改 reactive 返回的 state 对象，`数据都不再是响应式`的：

  ```js
      setup() {
        const info = reactive({name: "why", age: 18});
        const { name, age } = info;

        return {
          name,
          age
        }
      }
  ```

- 那么有没有办法让我们解构出来的属性是响应式的呢？

- Vue 为我们提供了一个 toRefs 的函数，可以将 reactive 返回的对象中的属性都转成 ref；

- 那么我们再次进行结构出来的 name 和 age 本身都是 ref 的；

  ```js
  // 当我们这样做的时候，会返回两个ref对象,它们是响应式
  let { name, age } = toRefs(state)
  ```

- 这种做法相当于已经在 state.name 和 ref.value 之间建立了 链接，任何一个修改都会引起另外一个变化；

`toRef`

- 如果我们只希望转换一个 reactive 对象中的属性为 ref, 那么可以使用 toRef 的方法：

  ```js
  // 如果我们只希望转换一个reactive对象中的属性为ref,那么可以使用toRef方法
  const name = toRef(state, 'name')
  const { age } = state
  const changeName = () => (state.name = 'why')
  ```

### 13.3.3 ref 其他的 API

- unref

- 如果我们想要获取一个 ref 引用中的 value，那么也可以通过 unref 方法：

  - 如果参数是一个 ref，则返回内部值，否则返回参数本身；

  - 这是 val = isRef(val) ? val.value : val 的语法糖函数；

- isRef

  - 判断值是否是一个 ref 对象。

- shallowRef

  - 创建一个浅层的 ref 对象；

- triggerRef

  - 手动触发和 shallowRef 相关联的副作用：

    ```vue
    <template>
      <div>
        <h2>{{ info }}</h2>
        <button @click="changeInfo">修改Info</button>
      </div>
    </template>

    <script>
    import { ref, shallowRef, triggerRef } from 'vue'

    export default {
      setup() {
        const info = shallowRef({ name: 'why' })

        const changeInfo = () => {
          info.value.name = 'james'
          //手动触发
          triggerRef(info)
        }

        return {
          info,
          changeInfo,
        }
      },
    }
    </script>

    <style scoped></style>
    ```

### 13.3.4 自定义 ref

- 创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

- 详细信息

  `customRef()` 预期接收一个工厂函数作为参数，这个工厂函数接受 `track` 和 `trigger` 两个函数作为参数，并返回一个带有 `get` 和 `set` 方法的对象。

  一般来说，`track()` 应该在 `get()` 方法中调用，而 `trigger()` 应该在 `set()` 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。

`实现：`

```js
import { customRef } from 'vue'

// 自定义ref
export default function (value, delay = 300) {
  let timer = null
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
```

`应用：`

```vue
<template>
  <div>
    <input v-model="message" />
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
import debounceRef from './hook/useDebounceRef'

export default {
  setup() {
    const message = debounceRef('Hello World')

    return {
      message,
    }
  },
}
</script>
```

## 13.4 计算属性 computed 基本使用

- 在 setup 函数中使用 computed ：

  - 方式一：接收一个 getter 函数，并为 getter 函数返回的值，返回一个不变的 ref 对象；

    ```js
    // 1.用法一: 传入一个getter函数
    // computed的返回值是一个ref对象
    const fullName = computed(() => firstName.value + ' ' + lastName.value)
    ```

  - 方式二：接收一个具有 get 和 set 的对象，返回一个可变的（可读写）ref 对象； computed

    ```js
    // 2.用法二: 传入一个对象, 对象包含getter/setter
    const fullName = computed({
      get: () => firstName.value + ' ' + lastName.value,
      set(newValue) {
        const names = newValue.split(' ')
        firstName.value = names[0]
        lastName.value = names[1]
      },
    })
    ```

## 13.5 侦听数据变化

- 在`Options API`中，我们可以通过`watch`选项来侦听`data`或者`props`的**数据变化**，当数据变化时执行某一些 操作。
- 在`Composition API`中，我们可以使用`watchEffect`和`watch`来完成**响应式数据的侦听**；
  - `watchEffect`用于**自动收集响应式数据的依赖**；
  - `watch`**需要手动指定侦听的数据源**；

### 13.5.1 watchEffect 基本使用

- 当侦听到某些响应式数据变化时，我们希望执行某些操作，这个时候可以使用 `watchEffect`。

- 首先，`watchEffect`传入的函数会被立即执行一次，并且在执行的过程中会收集依赖；

- 其次，只有收集的依赖发生变化时，watchEffect 传入的函数才会再次执行；

`示例:`

```vue
<template>
  <div>
    <h2>{{ name }}</h2>
    <button @click="changeName">修改name</button>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'

export default {
  setup() {
    // watchEffect: 自动收集响应式的依赖
    const name = ref('why')
    const changeName = () => (name.value = 'kobe')
    watchEffect(() => {
      console.log('name:', name.value)
    })

    return {
      name,
      changeName,
    }
  },
}
</script>
```

### 13.5.2 watchEffect 停止侦听

- 如果在发生某些情况下，我们希望停止侦听，这个时候我们可以获取 watchEffect 的返回值函数，调用该函数即可

```js
const stop = watchEffect(() => {
  console.log('name:', name.value, 'age:', age.value)
})
const changeAge = () => {
  age.value++
  if (age.value > 25) {
    stop()
  }
}
```

### 13.5.3 watchEffect 清除副作用

- 什么是清除副作用呢？

  - 比如在开发中我们需要在侦听函数中执行网络请求，但是在网络请求还没有达到的时候，我们停止了侦听器， 或者侦听器侦听函数被再次执行了。

  - 那么上一次的网络请求应该被取消掉，这个时候我们就可以清除上一次的副作用；

- 在我们给 watchEffect 传入的函数被回调时，其实可以获取到一个参数：`onInvalidate `

  - 当**副作用即将重新执行** 或者 **侦听器被停止** 时会执行该函数传入的回调函数；

  - 我们可以在传入的回调函数中，执行一些清楚工作；

```js
const stop = watchEffect((onInvalidate) => {
  const timer = setTimeout(() => {
    console.log('网络请求成功~')
  }, 2000)
  onInvalidate(() => {
    // 在这个函数中清除额外的副作用
    // request.cancel()
    clearTimeout(timer)
    console.log('onInvalidate')
  })
})
```

### 13.5.4 watchEffect 的执行时机

- 如果我们希望在第一次的时候就打印出来对应的元素呢？

  - 这个时候我们需要改变副作用函数的执行时机；
  - 它的默认值是 pre，它会在元素 挂载 或者 更新 之前执行；
  - 所以我们会先打印出来一个空的，当依赖的 title 发生改变时，就会再次执行一次，打印出元素；

- 我们可以设置副作用函数的执行时机：

- 如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项：

  ```vue
  <template>
    <div>
      <h2 ref="title">哈哈哈</h2>
    </div>
  </template>

  <script>
  import { ref, watchEffect } from 'vue'

  export default {
    setup() {
      const title = ref(null)

      watchEffect(
        () => {
          console.log(title.value)
        },
        {
          flush: 'post',
        }
      )

      return {
        title,
      }
    },
  }
  </script>
  ```

### 13.5.5 Watch 的使用

- watch 的 API 完全等同于组件 watch 选项的 Property：
- watch 需要侦听特定的数据源，并在回调函数中执行副作用；
- 默认情况下它是惰性的，只有当被侦听的源发生变化时才会执行回调；
- 与 watchEffect 的比较，watch 允许我们：
  - 懒执行副作用（第一次不会直接执行）；
  - 更具体的说明当哪些状态发生变化时，触发侦听器的执行；
  - 访问侦听状态变化前后的值；

`侦听的数据源类型`

- `watch` 的第一个参数可以是不同形式的“来源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个来源组成的数组：

  ```js
  const x = ref(0)
  const y = ref(0)

  // 单个 ref
  watch(x, (newX) => {
    console.log(`x is ${newX}`)
  })

  // getter 函数
  watch(
    () => x.value + y.value,
    (sum) => {
      console.log(`sum of x + y is: ${sum}`)
    }
  )

  // 多个来源组成的数组
  watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`)
  })
  //侦听多个数据源
  watch(
    [() => ({ ...info }), name],
    ([newInfo, newName], [oldInfo, oldName]) => {
      console.log(newInfo, newName, oldInfo, oldName)
    }
  )
  ```

- 注意，不能侦听响应式对象的 property，例如:

  ```js
  const obj = reactive({ count: 0 })

  // 这不起作用，因为你向 watch() 传入了一个 number
  watch(obj.count, (count) => {
    console.log(`count is: ${count}`)
  })
  ```

  而是用 getter 函数：

  ```js
  // 提供一个 getter 函数
  watch(
    () => obj.count,
    (count) => {
      console.log(`count is: ${count}`)
    }
  )
  ```

### 13.5.6 Watch 深层侦听器

直接给 `watch()` 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的 property 变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```

这不同于返回响应式对象的 getter 函数：只有在 getter 函数返回不同的对象时，才会触发回调：

```js
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)
```

然而，在上面的例子里，你可以显式地加上 `deep` 选项，强制转成深层侦听器：

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```

:::warning 谨慎使用

深度侦听需要遍历被侦听对象中的所有嵌套的 property，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。

:::

## 13.6 setup 的生命周期

setup 可以用来替代 data 、 methods 、 computed 、watch 等等这些选项，也可以替代 生命周 期钩子

![image-20220726173351155](../../vue//image-20220726173351155.png)

`示例`

```vue
<template>
  <div>
    <button @click="increment">{{ counter }}</button>
  </div>
</template>

<script>
import { onMounted, onUpdated, onUnmounted, ref } from 'vue'

export default {
  setup() {
    const counter = ref(0)
    const increment = () => counter.value++

    onMounted(() => {
      console.log('App Mounted1')
    })
    onMounted(() => {
      console.log('App Mounted2')
    })
    onUpdated(() => {
      console.log('App onUpdated')
    })
    onUnmounted(() => {
      console.log('App onUnmounted')
    })

    return {
      counter,
      increment,
    }
  },
}
</script>
```

更详细的解释，请看 vue3 文档组合式 API：生命周期钩子[链接](https://staging-cn.vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks)

## 13.7 Provide 和 Inject

### 13.7.1 provide 函数

要给子组件提供数据，需要使用到 [`provide()`](https://staging-cn.vuejs.org/api/composition-api-dependency-injection.html#provide) 函数：

```vue
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

如果不使用 `<script setup>`，请确保 `provide()` 是在 `setup()` 同步调用的：

```js
import { provide } from 'vue'
export default {
  setup() {
    const name = ref('code')
    provide('name')
    return {
      increment,
      counter,
    }
  },
}
```

`provide()` 函数接收两个参数。第一个参数被称为**注入名**，可以是一个字符串或是一个 `Symbol`。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。

第二个参数是供给的值，值可以是任意类型，包括响应式的状态，比如一个 ref：

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

### 13.7.2 inject 函数

要注入父组件提供的数据，需要使用 [`inject()`](https://staging-cn.vuejs.org/api/composition-api-dependency-injection.html#inject) 函数：

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

没有使用 `<script setup>`，`inject()` 需要在 `setup()` 同步调用：

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  },
}
```

inject 可以传入两个参数：

- 要 inject 的 property 的 name；
- 默认值；

### 13.7.3 数据的响应式

为了增加 provide 值和 inject 值之间的响应性，在使用 provide 值时，可以使用 ref 和 reactive

如果提供的值是一个 ref，注入进来的就是它本身，而**不会**自动解包。这使得被注入的组件保持了和供给者的响应性链接。

如果想保证从 `provide` 传过来的数据不会被 `injector` 的组件更改，你可以使用[`readonly()`](https://staging-cn.vuejs.org/api/reactivity-core.html#readonly) 来包装提供的值。

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

没有使用 `<script setup>`， 需要在 `setup()` 同步调用：

```js
import { provide, ref, readonly } from 'vue'

import Home from './Home.vue'

export default {
  components: {
    Home,
  },
  setup() {
    const name = ref('coderwhy')
    let counter = ref(100)

    provide('name', readonly(name))
    provide('counter', readonly(counter))

    const increment = () => counter.value++

    return {
      increment,
      counter,
    }
  },
}
```

如果我们需要修改可响应的数据，那么最好是在数据提供的位置来修改：

- 我们可以将修改方法进行共享，在后代组件中进行调用；

> 保证在组件间的单向数据流

## 13.8 渲染函数 & JSX

在绝大多数情况下，Vue 推荐使用模板语法来搭建 HTML。然而在某些使用场景下，我们真的需要用到 JavaScript 完全的编程能力。可以使用**渲染函数**。

- Vue 在生成真实的 DOM 之前，会将我们的节点转换成 VNode，而 VNode 组合在一起形成一颗树结构，就是虚 拟 DOM（VDOM）；
- 事实上，我们之前编写的 template 中的 HTML 最终也是使用渲染函数生成对应的 VNode；
- 那么，如果你充分的利用 JavaScript 的编程能力，我们可以自己来编写 createVNode 函数，生成对应的 VNode；
- 使用 h()函数：
  - h() 函数是一个用于创建 vnode 的一个函数；
  - 其实更准备的命名是 createVNode() 函数，但是为了简便在 Vue 将之简化为 h() 函数；

### 13.8.1 基本用法

Vue 提供了一个 `h()` 函数用于创建 vnodes：

```js
import { h } from 'vue'

const vnode = h(
  'div', // type
  { id: 'foo', class: 'bar' }, // props
  [
    /* children */
  ]
)
```

`h()` 是 **hyperscript** 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”。这个名字来源于许多虚拟 DOM 实现时共享的约定。一个更准确的名称应该是 `createVnode()`，但当你需要多次使用渲染函数时，一个简短的名字能更好地帮到你。

注意事项：

- 如果没有 props，那么通常可以将 children 作为第二个参数传入；
- 如果会产生歧义，可以将 null 作为第二个参数传入，将 children 作为第三个参数传入；

`h()` 函数的使用方式非常的灵活：

```js
// 除了类型必填以外，其他的参数都是可选的
h('div')
h('div', { id: 'foo' })

// attribute 和 property 都能在 prop 中书写
// Vue 会自动将它们分配到正确的位置
h('div', { class: 'bar', innerHTML: 'hello' })

// props modifiers such as .prop and .attr can be added
// with '.' and `^' prefixes respectively
h('div', { '.name': 'some-name', '^width': '100' })

// 类与样式可以像在模板中一样
// 用数组或对象的形式书写
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// 事件监听器应以 onXxx 的形式书写
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 props 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 vnodes 与字符串
h('div', ['hello', h('span', 'hello')])
```

得到的 vnode 为如下形式：

```js
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```

- h 函数可以在两个地方使用：

  - render 函数选项中；

    ```js
    import { h } from 'vue'

    export default {
      render() {
        return h('h2', { class: 'title' }, 'Hello Render')
      },
    }
    ```

  - setup 函数选项中（setup 本身需要是一个函数类型，函数再返回 h 函数创建的 VNode）

    ```js
    import { h } from 'vue'

    export default {
      setup() {
        return () => h('h2', { class: 'title' }, 'Hello Render')
      },
    }
    ```

::: tip

组件树中的 vnodes 必须是唯一的

:::

### 13.8.2 渲染插槽[#](https://staging-cn.vuejs.org/guide/extras/render-function.html#rendering-slots)

在渲染函数中，插槽可以通过 `setup()` 的上下文来访问。每个 `slots` 对象中的插槽都是一个**返回 vnodes 数组的函数**：

```js
export default {
  props: ['message'],
  setup(props, { slots }) {
    return () => [
      // 默认插槽：
      // <div><slot /></div>
      h('div', slots.default()),

      // 具名插槽：
      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        slots.footer({
          text: props.message,
        })
      ),
    ]
  },
}
```

等价 JSX 语法：

```jsx
// 默认插槽
<div>{slots.default()}</div>

// 具名插槽
<div>{slots.footer({ text: props.message })}</div>
```

### 13.8.3 jsx 的使用

- 如果我们希望在项目中使用 jsx，那么我们需要添加对 jsx 的支持：

  - jsx 我们通常会通过 Babel 来进行转换（React 编写的 jsx 就是通过 babel 转换的）；

  - 对于 Vue 来说，我们只需要在 Babel 中配置对应的插件即可；

- 安装 Babel 支持 Vue 的 jsx 插件：

  ```bash
  npm install @vue/babel-plugin-jsx -D
  ```

- 在 babel.config.js 配置文件中配置插件：

  ```js
  module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: ['@vue/babel-plugin-jsx'],
  }
  ```

  `计数器示例：`

  ```jsx
  <script>
    export default {
      data() {
        return {
          counter: 0
        }
      },

      render() {
        const increment = () => this.counter++;
        const decrement = () => this.counter--;

        return (
          <div>
            <h2>当前计数: {this.counter}</h2>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
          </div>
        )
      }
    }
  </script>
  ```

### 13.8.4 jsx 组件的使用

`App.vue`

```jsx
<script>
  import HelloWorld from './HelloWorld.vue';

  export default {
    render() {
      return (
        <div>
          <HelloWorld>
              {{default:props => <button>{props.name}</button>}}
          </HelloWorld>
        </div>
      )
    }
  }
</script>
```

`HelloWorld.vue`

```jsx
<script>
  export default {
    setup(){

    },
    render() {
      return (
        <div>
          <h2>HelloWorld</h2>
          {this.$slots.default ? this.$slots.default(): <span>哈哈哈</span>}
        </div>
      )
    }
  }
</script>
```

## 13.9 组合式函数(类似 react hook)

在 Vue 应用的概念中，“组合式函数”是一个利用 Vue 组合式 API 来封装和复用**有状态逻辑**的函数。

当构建前端应用时，我们常常需要复用公共任务的逻辑。例如为了在不同地方格式化时间而抽取一个可复用的函数。这个格式化函数封装了**无状态的逻辑**：它在接收一些输入后立刻返回所期望的输出。复用无状态逻辑的库有很多，诸如你可能听到过的 [lodash](https://lodash.com/) 和 [date-fns](https://date-fns.org/)。

相比之下，有状态逻辑负责管理会随时间而变化的状态。一个简单的例子是跟踪当前鼠标在页面中的位置。在真实应用中，它也可以是像触摸手势或与数据库的连接状态这样的更复杂的逻辑。

`应用：`

来完成一个监听界面滚动位置的 Hook：

```js
import { ref } from 'vue'

export default function () {
  const scrollX = ref(0)
  const scrollY = ref(0)

  document.addEventListener('scroll', () => {
    scrollX.value = window.scrollX
    scrollY.value = window.scrollY
  })

  return {
    scrollX,
    scrollY,
  }
}
```

`完成一个监听鼠标位置的Hook:`

```js
import { ref } from 'vue'

export default function () {
  const mouseX = ref(0)
  const mouseY = ref(0)

  window.addEventListener('mousemove', (event) => {
    mouseX.value = event.pageX
    mouseY.value = event.pageY
  })

  return {
    mouseX,
    mouseY,
  }
}
```

`完成一个使用 localStorage 存储和获取数据的Hook：:`

```js
import { ref, watch } from 'vue'

export default function (key, value) {
  const data = ref(value)

  if (value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    data.value = JSON.parse(window.localStorage.getItem(key))
  }

  watch(data, (newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue))
  })

  return data
}
```

`App.vue中使用`

```js
<template>
  <div>

    <h2>{{data}}</h2>
    <button @click="changeData">修改data</button>

    <p class="content"></p>

    <div class="scroll">
      <div class="scroll-x">scrollX: {{scrollX}}</div>
      <div class="scroll-y">scrollY: {{scrollY}}</div>
    </div>
    <div class="mouse">
      <div class="mouse-x">mouseX: {{mouseX}}</div>
      <div class="mouse-y">mouseY: {{mouseY}}</div>
    </div>
  </div>
</template>

<script>
  import { ref, computed } from 'vue';

  import {
    useLocalStorage,
    useMousePosition,
    useScrollPosition,
  } from './hooks';

  export default {
    setup() {

      // 滚动位置
      const { scrollX, scrollY } = useScrollPosition();

      // 鼠标位置
      const { mouseX, mouseY } = useMousePosition();

      // localStorage
      const data = useLocalStorage("info");
      const changeData = () => data.value = "哈哈哈哈"

      return {
        scrollX,
        scrollY,

        mouseX,
        mouseY,

        data,
        changeData
      }
    }
  }
</script>
```

## 13.10 自定义指令

- Vue 允许我们来自定义自己的指令。
- 注意：在 Vue 中，代码的复用和抽象主要还是通过组件；
- 通常在某些情况下，你需要对 DOM 元素进行底层操作，这个时候就会用到`自定义指令`；
- 自定义指令分为两种：

  - 自定义局部指令：组件中通过 `directives` 选项，只能在当前组件中使用；
  - 自定义全局指令：app 的 `directive` 方法，可以在任意组件中被使用；

- 比如我们来做一个非常简单的案例：当某个元素挂载完成后可以自定获取焦点

  - 实现方式一：如果我们使用默认的实现方式；

    ```vue
    <template>
      <div>
        <input type="text" ref="input" />
      </div>
    </template>

    <script>
    import { ref, onMounted } from 'vue'

    export default {
      setup() {
        const input = ref(null)

        onMounted(() => {
          input.value.focus()
        })

        return {
          input,
        }
      },
    }
    </script>
    ```

  - 实现方式二：自定义一个 v-focus 的局部指令；

  - 它是一个对象，在对象中编写我们自定义指令的名称（注意：这里不需要加 v-）；

  - 自定义指令有一个生命周期，是在组件挂载后调用的 mounted，我们可以在其中完成操作；

    ```vue
    <template>
      <div>
        <input type="text" v-focus />
      </div>
    </template>

    <script>
    export default {
      // 局部指令
      directives: {
        focus: {
          mounted(el, bindings, vnode, preVnode) {
            console.log('focus mounted')
            el.focus()
          },
        },
      },
    }
    </script>
    ```

    `setup顶层写法`

    ```vue
    <script setup>
    // 在模板中启用 v-focus
    const vFocus = {
      mounted: (el) => el.focus(),
    }
    </script>

    <template>
      <input v-focus />
    </template>
    ```

  - 实现方式三：自定义一个 v-focus 的全局指令；

  - 自定义一个全局的 v-focus 指令可以让我们在任何地方直接使用

    ```js
    app.directive('focus', {
      mounted(el) {
        el.focus()
      },
    })
    ```

### 13.10.1 指令的生命周期

- 一个指令定义的对象，Vue 提供了如下的几个钩子函数：
- `created`：在绑定元素的 attribute 或事件监听器被应用之前调用；
- `beforeMount`：当指令第一次绑定到元素并且在挂载父组件之前调用；
- `mounted`：在绑定元素的父组件被挂载后调用；
- `beforeUpdate`：在更新包含组件的 VNode 之前调用；
- `updated`：在包含组件的 VNode 及其子组件的 VNode 更新后调用；
- `beforeUnmount`：在卸载绑定元素的父组件之前调用；
- `unmounted`：当指令与元素解除绑定且父组件已卸载时，只调用一次；

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted() {},
  // 绑定元素的父组件更新前调用
  beforeUpdate() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated() {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount() {},
  // 绑定元素的父组件卸载后调用
  unmounted() {},
}
```

### 13.10.2 指令的参数和修饰符

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下 property。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevNode`：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

- 在生命周期中，我们可以通过 bindings 获取到对应的内容：

  ```vue
  <button v-f:info.aaa.bbb="{ name: text }">{{counter}}</button>
  ```

::: tip

详细自定义指令，请参考 vue 官方文档 [链接](https://staging-cn.vuejs.org/guide/reusability/custom-directives.html)

:::

`示例-实现时间格式化指令`

```js
import dayjs from 'dayjs'

export default function (app) {
  app.directive('format-time', {
    created(el, bindings) {
      bindings.formatString = 'YYYY-MM-DD HH:mm:ss'
      if (bindings.value) {
        bindings.formatString = bindings.value
      }
    },
    mounted(el, bindings) {
      const textContent = el.textContent
      let timestamp = parseInt(textContent)
      if (textContent.length === 10) {
        timestamp = timestamp * 1000
      }
      el.textContent = dayjs(timestamp).format(bindings.formatString)
    },
  })
}
```

## 13.11 内置组件 Teleport

### 13.11.1 什么是 Teleport？

- 在组件化开发中，我们封装一个组件 A，在另外一个组件 B 中使用：

  - 那么组件 A 中 template 的元素，会被挂载到组件 B 中 template 的某个位置；

  - 最终我们的应用程序会形成一颗 DOM 树结构；

- 但是某些情况下，我们希望组件不是挂载在这个组件树上的，可能是移动到 Vue app 之外的其他位置：

  - 比如移动到 body 元素上，或者我们有其他的 div#app 之外的元素上；

  - 这个时候我们就可以通过 teleport 来完成；

- Teleport 是什么呢？

  - 它是一个 Vue 提供的内置组件，类似于 react 的 Portals；

  - teleport 翻译过来是心灵传输、远距离运输的意思；

- 它有两个属性：

  - to：指定将其中的内容移动到的目标元素，可以使用选择器；

  - disabled：是否禁用 teleport 的功能；

`modal-button` 的实现

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

`Teleport`减少代码

```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

### 13.11.2 搭配组件使用

`<Teleport>` 只改变了渲染的 DOM 结构，它不会影响组件间的逻辑关系。也就是说，如果 `<Teleport>` 包含了一个组件，那么该组件始终和这个使用了 `<teleport>` 的组件保持逻辑上的父子关系。传入的 props 和触发的事件也会照常工作。

这也意味着来自父组件的注入也会按预期工作，子组件将在 Vue Devtools 中嵌套在父级组件下面，而不是放在实际内容移动到的地方。

```vue
<template>
  <div class="app">
    <teleport to="#why">
      <span>呵呵呵呵</span>
    </teleport>
  </div>
</template>
```

`禁用<Teleport>`

```vue
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

### 13.11.3 多个 teleport

- 如果我们将多个 teleport 应用到同一个目标上（to 的值相同），那么这些目标会进行合并：

  ```vue
  <Teleport to="#modals">
    <div>A</div>
  </Teleport>
  <Teleport to="#modals">
    <div>B</div>
  </Teleport>
  ```

- 实现效果如下:

  ```html
  <div id="modals">
    <div>A</div>
    <div>B</div>
  </div>
  ```

## 13.12 插件

### 13. 12.1 什么是插件

- 通常我们向 Vue 全局添加一些功能时，会采用插件的模式，它有两种编写方式：

  - 对象类型：一个对象，但是必须包含一个 install 的函数，该函数会在安装插件时执行；

  - 函数类型：一个 function，这个函数会在安装插件时自动执行；

插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：

1. 通过 [`app.component()`](https://staging-cn.vuejs.org/api/application.html#app-component) 和 [`app.directive()`](https://staging-cn.vuejs.org/api/application.html#app-directive) 注册一到多个全局组件或自定义指令。
2. 通过 [`app.provide()`](https://staging-cn.vuejs.org/api/application.html#app-provide) 使一个资源[可被注入](https://staging-cn.vuejs.org/guide/components/provide-inject.html)进整个应用。
3. 向 [`app.config.globalProperties`](https://staging-cn.vuejs.org/api/application.html#app-config-globalproperties) 中添加一些全局实例属性或方法
4. 添加全局资源：指令/过滤器/过渡等；
5. 通过全局 mixin 来添加一些组件选项；
6. 一个可能上述三种都包含了的功能库 (例如 [vue-router](https://github.com/vuejs/vue-router-next))。

### 13.12.2 插件的编写方式

`对象类型的写法:`

```js
export default {
  install(app) {
    app.config.globalProperties.$name = 'coderwhy'
  },
}
```

`函数类型的写法:`

```js
export default function (app) {
  console.log(app)
}
```

`案例-实现i18n国际化`

让我们从设置插件对象开始。建议在一个单独的文件中创建并导出它，以保证更好地管理逻辑，如下所示：

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 在这里编写插件代码
  },
}
```

我们想让整个应用程序有一个按 key 名翻译文本内容的函数，因此我们将它暴露在 `app.config.globalProperties` 上。这个函数接收一个以 `.` 作为分隔符的 `key` 字符串，用来在用户提供的翻译字典中查找对应语言的文本。

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  },
}
```

该插件希望用户在使用该插件时通过选项传入一个翻译字典对象，所以应该这样使用：

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!',
  },
})
```

我们的 `$translate` 函数会接收一个例如 `greetings.hello` 的字符串，在用户提供的翻译字典中查找，并返回翻译得到的值，在这里就是 `Bonjour!`：

```vue
<h1>{{ $translate('greetings.hello') }}</h1>
```

### 13.12.3 插件中的供给 / 注入

在插件中，我们可以通过 `provide` 来为插件用户供给一些内容。举个例子，我们可以将 `options` 参数提供给整个应用，以便各个组件都能使用这个翻译字典对象。

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }

    app.provide('i18n', options)
  },
}
```

现在，插件用户就可以在他们的组件中以 `i18n` 为 key 注入并访问插件的选项对象了。

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

## 13.3 nextTick

等待下一次 DOM 更新刷新的工具方法。

- 比如我们有下面的需求：

  - 点击一个按钮，我们会修改在 h2 中显示的 message；
  - message 被修改后，获取 h2 的高度；

- 实现上面的案例我们有三种方式：

  - 方式一：在点击按钮后立即获取到 h2 的高度（错误的做法）
  - 方式二：在 updated 生命周期函数中获取 h2 的高度（但是其他数据更新，也会执行该操作） p 方式三：使用 nexttick 函数；

- **类型**

  ```
  function nextTick(callback?: () => void): Promise<void>
  ```

- **详细信息**

  当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存到“next tick”以确保每个组件无论发生多少状态改变，都仅执行一次更新。

  `nextTick()` 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。

- **示例**

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM 还未更新
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // DOM 此时已经更新
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```
