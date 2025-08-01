export function frontendVue() {
  return [
    {
      collapsible: true,
      text: 'Vue 基础',
      items: [
        { text: 'Router 初体验', link: '/frontend/Vue/' },
        { text: 'MVVM 模式的理解', link: '/frontend/Vue/MVVM模式的理解' },
        { text: 'SPA 单页应用的优缺点', link: '/frontend/Vue/SPA单页应用的优缺点' },
        { text: 'Vue 生命周期', link: '/frontend/Vue/Vue生命周期' },
        { text: 'Vue 父子组件生命周期', link: '/frontend/Vue/Vue父子组件生命周期' },
        { text: 'data 为何以函数形式返回', link: '/frontend/Vue/data为何以函数形式返回' },
      ],
    },
    {
      collapsible: true,
      text: '指令与绑定',
      items: [
        { text: 'v-if 与 v-show 的区别', link: '/frontend/Vue/v-if与v-show的区别' },
        { text: 'v-model 数据绑定分析', link: '/frontend/Vue/v-model数据绑定分析' },
        { text: 'v-html 可能导致的问题', link: '/frontend/Vue/v-html可能导致的问题' },
        { text: 'Vue 事件绑定原理', link: '/frontend/Vue/Vue事件绑定原理' },
        { text: 'Vue 数据双向绑定', link: '/frontend/Vue/Vue数据双向绑定' },
      ],
    },
    {
      collapsible: true,
      text: '组件系统',
      items: [
        { text: 'Vue 中组件间通信的方式', link: '/frontend/Vue/Vue中组件间通信的方式' },
        { text: 'Vue 中 $refs 的理解', link: '/frontend/Vue/Vue中refs的理解' },
        { text: '对 keep-alive 组件的理解', link: '/frontend/Vue/对keep-alive组件的理解' },
        { text: 'Vue 中 computed 分析', link: '/frontend/Vue/Vue中computed分析' },
      ],
    },
    {
      collapsible: true,
      text: '虚拟 DOM 与渲染',
      items: [
        { text: 'Vue 中虚拟 DOM 的理解', link: '/frontend/Vue/Vue中虚拟DOM的理解' },
        { text: 'Vue 中 diff 算法的理解', link: '/frontend/Vue/Vue中diff算法的理解' },
        { text: 'Vue 中 key 的作用', link: '/frontend/Vue/Vue中key的作用' },
        { text: 'Vue 为何采用异步渲染', link: '/frontend/Vue/Vue为何采用异步渲染' },
        { text: 'Vue 中 $nextTick 的理解', link: '/frontend/Vue/Vue中nextTick的理解' },
      ],
    },
    {
      collapsible: true,
      text: '响应式系统',
      items: [
        { text: 'Vue 中的三种 Watcher', link: '/frontend/Vue/Vue中的三种Watcher' },
        { text: 'Vue 中数组变动监听', link: '/frontend/Vue/Vue中数组变动监听' },
      ],
    },
    {
      collapsible: true,
      text: '路由管理',
      items: [
        { text: 'VueRouter 导航守卫', link: '/frontend/Vue/VueRouter导航守卫' },
        { text: 'Vue 路由懒加载', link: '/frontend/Vue/Vue路由懒加载' },
        { text: 'Vue 路由 Hash 模式分析', link: '/frontend/Vue/Vue路由Hash模式分析' },
        { text: 'Vue 路由 History 模式分析', link: '/frontend/Vue/Vue路由History模式分析' },
      ],
    },
    {
      collapsible: true,
      text: '状态管理',
      items: [
        { text: 'Vuex 和普通全局对象', link: '/frontend/Vue/Vuex和普通全局对象' },
        { text: 'Vuex 中的核心方法', link: '/frontend/Vue/Vuex中的核心方法' },
      ],
    },
    {
      collapsible: true,
      text: 'Vue 3.0 新特性',
      items: [
        { text: 'Vue3.0 新特性', link: '/frontend/Vue/Vue3.0新特性' },
      ],
    },
    {
      collapsible: true,
      text: '性能优化',
      items: [
        { text: 'Vue 常用性能优化', link: '/frontend/Vue/Vue常用性能优化' },
        { text: 'Vue 首屏性能优化组件', link: '/frontend/Vue/Vue首屏性能优化组件' },
      ],
    },
    {
      collapsible: true,
      text: '服务端渲染',
      items: [
        { text: '服务端渲染 SSR 的理解', link: '/frontend/Vue/服务端渲染SSR的理解' },
      ],
    },
  ]
}
