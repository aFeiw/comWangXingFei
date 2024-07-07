//引入html侧边栏导航配置
import { frontendHTML } from '../../router/frontend/html'
//引入css侧边栏导航配置
import { frontendCSS } from '../../router/frontend/css'
//引入js侧边栏导航配置
import { frontendJavascript } from '../../router/frontend/jsvaScript'
//引入ts侧边栏导航配置
import { frontendTypescript } from '../../router/frontend/typescript'
//引入vue侧边栏导航配置
import { frontendVue } from '../../router/frontend/vue'
//引入React侧边栏导航配置
import { frontendReact } from '../../router/frontend/react'
//引入Webpack侧边栏导航配置
import { frontendWebpack } from '../../router/frontend/Webpack'
//引入vue其他栏目侧边栏导航配置
import { vueRouter } from '../../router/frontend/vueRouter'
import { vueX } from '../../router/frontend/vueX'
import { pinia } from '../../router/frontend/pinia'
//引入javaSE栏目侧边栏导航配置
import { backendJavaSE } from "../../router/backend/javaSE"
//引入Linux栏目侧边栏导航配置
import { toolSoftwareLinux } from "../../router/toolSoftware/linux"
//引入git栏目侧边栏导航配置
import { toolSoftwareGit } from "../../router/toolSoftware/git"
//引入maven栏目侧边栏导航配置
import { backendMaven} from "../../router/backend/maven"
//引入tui.editor插件侧边栏
import {plugInExtensionTuiEditor}from "../../router/PlugInExtension/tuiEditor"
import { defineConfig } from 'vitepress'
export default defineConfig({
  //配置
  base: '/comWangXingFei.github.io/',
  title: '王兴飞文档',
  titleTemplate: '王兴飞文档',
  description: 'Vite & Vue powered static site generator.',
  appearance: true,
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    theme: 'github-dark',
    lineNumbers: true,
  },
  head: [
    // 添加图标
    ["meta", { name: "keywords", content: "个人博客" }],
    ["link", { rel: "icon", href: "./favicon.ico" }],
  ],
  // 主题配置
  themeConfig: {
    siteTitle: '王兴飞',
    logo: '/logo.svg',
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdatedText: '最近更新时间',
    outlineTitle: '在本页面',
    // 启动页面丝滑滚动
    smoothScroll: true,
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>',
      // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
      appId: '<BH4D9OD16A>',
    },
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
                link: '/frontend/JavaScript/',
              },
              {
                text: 'TypeScript',
                link: '/frontend/Typescript/',
              },
            ],
          },
          {
            items: [
              {
                text: 'Vue',
                link: '/frontend/Vue/',
              },
              {
                text: 'React',
                link: '/frontend/React/',
              },
            ],
          },
          {
            text: 'Webpack',
            link: '/frontend/Webpack/basic',
          },
          {
            items: [
              {
                text: 'Vue-Router',
                link: '/frontend/VueRouter/',
              },
              {
                text: 'Vuex',
                link: '/frontend/Vuex/',
              },
              {
                text: 'Pinia',
                link: '/frontend/Pinia/',
              },
            ],
          },
        ],
      },
      {
        text: '后端',
        activeMatch: '/backend/',
        items: [
          {
            items: [
              {
                text: 'JavaSE',
                link: '/backend/JavaSE/',
              },
              {
                text: 'Maven',
                link: '/backend/Maven/',
              },
            ],
          },
        ],
      },
      {
        text: '工具软件',
        activeMatch: '/toolSoftware/',
        items: [
          {
            items: [
              {
                text: 'linux',
                link: '/toolSoftware/Linux/',
              },
              {
                text: 'Git',
                link: '/toolSoftware/Git/',
              },
            ],
          },
        ],
      },
      {
        text: '开发问题随记',
        activeMatch: '/PlugInExtension/',
        items: [
          {
            items: [
              {
                text: 'tui.editor',
                link: '/PlugInExtension/tuiEditor/',
              },
              {
                text: '前端实现分页及模糊匹配',
                link: '/PlugInExtension/problemRecord/qus/',
              },
              {
                text: 'vue3-函数式组件开发与注册',
                link: '/PlugInExtension/problemRecord/qus2/',
              },
              {
                text: 'vue2-视频播放组件',
                link: '/PlugInExtension/problemRecord/qus3/',
              },
            ],
          },
        ],
      },
      { text: '简书', link: 'https://www.jianshu.com/u/94f29127275f' },
    ],
    sidebar: {
      '/frontend/HTML/': frontendHTML(),
      '/frontend/CSS/': frontendCSS(),
      '/frontend/JavaScript/': frontendJavascript(),
      '/frontend/Vue/': frontendVue(),
      '/frontend/React/': frontendReact(),
      '/frontend/Typescript/': frontendTypescript(),
      '/frontend/Webpack/': frontendWebpack(),
      '/frontend/VueRouter/': vueRouter(),
      '/frontend/Vuex/': vueX(),
      '/frontend/Pinia/': pinia(),
      '/backend/JavaSE/': backendJavaSE(),
      '/toolSoftware/Linux/': toolSoftwareLinux(),
      '/toolSoftware/Git/': toolSoftwareGit(),
      '/backend/Maven/':backendMaven(),
      '/PlugInExtension/tuiEditor/':plugInExtensionTuiEditor(),
      '/PlugInExtension/problemRecord/qus':plugInExtensionTuiEditor(),
      '/PlugInExtension/problemRecord/qus2':plugInExtensionTuiEditor(),
      '/PlugInExtension/problemRecord/qus3':plugInExtensionTuiEditor()
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present wxf'
    },
    docFooter: {
      prev: ' 上一页 ',
      next: ' 下一页 '
    }
  },
})
