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
      { text: '后端', link: '/https://www.jianshu.com/' },
      { text: '数据库', link: '/https://www.jianshu.com/' },
      { text: '简书', link: 'https://www.jianshu.com/' },
    ],
    sidebar: {
      '/frontend/HTML/': [
        {
          text: 'HTML布局及其他',
          items: [
            { text: '基础知识', link: '/frontend/HTML/' },
            { text: '标签', link: '/frontend/HTML/标签' },
            { text: '布局', link: '/frontend/HTML/布局' },
          ],
        },
      ],
    },
  },
}

// function getSidebar() {
//     return [
//         {
//             text:'HTML',
//             items: [
//                 { text: '基础', link: '/HTML/' },
//                 { text: '标签', link: '/HTML/标签' },
//             ],
//             // sidebarDepth:3
//         },
//         {
//             text:'CSS',
//             items:[
//                 { text: '基础', link: '/CSS/' },
//                 { text: '进阶', link: '/CSS/advanced' },
//             ]
//         },
//         {
//           text:'Javascript',
//           items:[
//             { text: '基础', link: '/Javascript/' },
//             { text: '进阶', link: '/Javascript/advanced' },
//             { text: '进阶', link: '/Javascript/nightmare' },
//           ]
//         },
//         {
//           text:'Vue',
//           items:[
//             { text: '基础', link: '/Vue/' },
//             { text: '进阶', link: '/Vue/advanced' },
//           ]
//         },
//         {
//           text:'浏览器',
//           items:[
//             { text: '基础', link: '/Vue/' },
//             { text: '进阶', link: '/Vue/advanced' },
//           ]
//         },
//         {
//           text:'网络',
//           items:[
//             { text: '基础', link: '/Network/' },
//             { text: '进阶', link: '/Network/advanced' },
//           ]
//         },
//         {
//           text:'安全',
//           items:[
//             { text: '基础', link: '/Security/' },
//             { text: '进阶', link: '/Security/advanced' },
//           ]
//         },
//         {
//           text:'面经',
//           items:[
//             { text: '基础', link: '/Experience/' },
//             { text: '进阶', link: '/Experience/advanced' },
//           ]
//         },
//     ]
// }
