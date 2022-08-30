export function frontendVue2() {
  return [
    {
      //开启折叠
      collapsible: true,
      text: 'Vue基础',
      items: [
        { text: 'Vue3的基础概念', link: '/frontend/Vue2/basicConcepts' },
        { text: '@vue/cli脚手架', link: '/frontend/Vue2/vue-cli' },
        {
          text: 'vue基础用法与模板语法',
          link: '/frontend/Vue2/basicUsageAndTemplateSyntax',
        },
      ],
    },
    {
      //开启折叠
      collapsible: true,
      text: 'Vue进阶',
      items: [
        { text: 'vue基本指令', link: '/frontend/Vue2/basicinStruction' },
        { text: 'v-bind和v-on', link: '/frontend/Vue2/v-bindAndv-on' },
        { text: '表单输入绑定', link: '/frontend/Vue2/v-model' },
      ],
    },
    {
      //开启折叠
      collapsible: true,
      text: 'Vue组件',
      items: [
        { text: '组件基础', link: '/frontend/Vue2/componentFoundationt' },
        {
          text: '内置组件Transition过渡',
          link: '/frontend/Vue2/Transition',
        },
      ],
    },
    {
      //开启折叠
      collapsible: true,
      items: [
        { text: '组合式api', link: '/frontend/Vue2/composition-api' },
        { text: '补充', link: '/frontend/Vue2/supplement' },
      ],
    },
  ]
}
