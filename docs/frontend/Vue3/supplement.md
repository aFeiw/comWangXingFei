# 补充
## defineExpose

详细请见[vue3文档](https://staging-cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)<br>
使用 `<script setup>` 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。

可以通过 defineExpose 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性：

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```
当父组件通过模板引用的方式获取到当前组件的实例，获取到的实例会像这样 `{ a: number, b: number }` (ref 会和在普通实例中一样被自动解包)