//引入html侧边栏导航配置
import { frontendHTML } from '../../router/frontend/html'
//引入css侧边栏导航配置
import { frontendCSS } from '../../router/frontend/css'
//引入vue3侧边栏导航配置
import { frontendVue2 } from '../../router/frontend/vue2'
module.exports = {
  title: 'WangXingFei',
  titleTemplate: 'wangxingfei Private web site',
  description: 'Vite & Vue powered static site generator.',
  appearance: true,
  //配置
  base: '/docs/',
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    theme: 'github-dark',
    lineNumbers: true,
  },
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  // 使用插件
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    '@vuepress/nprogress',
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    siteTitle: '王兴飞',
    logo: '/my-logo.png/',
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    // lastUpdated: 'Last Updated', // string | boolean
    // 启动页面丝滑滚动
    smoothScroll: true,
    // 导航栏配置
    socialLinks: [{ icon: 'github', link: 'https://github.com/pokerboy123' }],
    nav: [
      { text: '首页', link: '/' },
      {
        text: '大前端',
        activeMatch: '/frontend/',
        items: [
          {
            items: [
              {
                text: 'HTML',
                link: '/frontend/HTML/',
              },
              {
                text: 'CSS',
                link: '/frontend/CSS/',
              },
              {
                text: 'JavaScript',
                link: '/frontend/Javascript/',
              },
            ],
          },
          {
            items: [
              {
                text: 'Vue2',
                link: '/frontend/Vue2/basicConcepts.md',
              },
              {
                text: 'Vue3',
                link: '/frontend/Vue3/basicConcepts.md',
              },
              {
                text: 'React',
                link: '/frontend/React/',
              },
            ],
          },
          {
            text: 'Webpack',
            link: '/frontend/Webpack/',
          },
        ],
      },
      { text: '后端', link: '/https://www.jianshu.com/' },
      {
        text: '工具软件',
        activeMatch: '/toolSoftware/',
        items: [
          {
            items: [
              {
                text: 'Vue-Router',
                link: '/toolSoftware/VueRouter/',
              },
              {
                text: 'Vuex',
                link: '/toolSoftware/Vuex/',
              },
              {
                text: 'Pinia',
                link: '/frontend/Pinia/',
              },
            ],
          },
        ],
      },
      { text: '插件扩展', link: '/https://www.jianshu.com/' },
      { text: '简书', link: 'https://www.jianshu.com/' },
    ],
    sidebar: {
      '/frontend/HTML/': frontendHTML(),
      '/frontend/CSS/': frontendCSS(),
      '/frontend/Vue2/': frontendVue2(),
      '/frontend/Vue3/': frontendVue2(),
    },
  },
}
