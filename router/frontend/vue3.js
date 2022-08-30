export function frontendVue3() {
  return [
    {
      //开启折叠
      collapsible: true,
      text: 'Vue3基础',
      items: [
        { text: 'Vue3的基础概念', link: '/frontend/VuePalse/basicConcepts' },
        { text: '@vue/cli脚手架', link: '/frontend/VuePalse/vue-cli' },
        {
          text: 'vue基础用法与模板语法',
          link: '/frontend/VuePalse/basicUsageAndTemplateSyntax',
        },
      ],
    },
    {
      //开启折叠
      collapsible: true,
      text: 'Vue3进阶',
      items: [
        { text: 'vue基本指令', link: '/frontend/VuePalse/basicinStruction' },
        { text: 'v-bind和v-on', link: '/frontend/VuePalse/v-bindAndv-on' },
        { text: '表单输入绑定', link: '/frontend/VuePalse/v-model' },
      ],
    },
    {
      //开启折叠
      collapsible: true,
      text: 'Vue3组件',
      items: [
        { text: '组件基础', link: '/frontend/VuePalse/componentFoundationt' },
        {
          text: '内置组件Transition过渡',
          link: '/frontend/VuePalse/Transition',
        },
        {
          text: '内置组件Transition过渡',
          link: '/frontend/VuePalse/Transition',
        },
      ],
    },
    {
      //开启折叠
      collapsible: true,
      items: [
        { text: '组合式api', link: '/frontend/VuePalse/composition-api' },
        { text: '补充', link: '/frontend/VuePalse/supplement' },
      ],
    },
  ]
}
