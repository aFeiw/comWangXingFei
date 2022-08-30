# 2. @vue/cli 脚手架

## 2.0\_@vue/cli 脚手架介绍

> 目标: webpack 自己配置环境很麻烦, 下载@vue/cli 包,用 vue 命令创建脚手架项目

- @vue/cli 是 Vue 官方提供的一个全局模块包(得到 vue 命令), 此包用于创建脚手架项目

  脚手架是为了保证各施工过程顺利进行而搭设的工作平台

![1586936282638](../../vue/1586936282638.png)

> ## @vue/cli 的好处

- 开箱即用

  0 配置 webpack

  babel 支持

  css, less 支持

  开发服务器支持

## 2.1\_@vue/cli 安装

> 目标: 把@vue/cli 模块包按到全局, 电脑拥有 vue 命令, 才能创建脚手架工程

- 全局安装命令

```bash
yarn global add @vue/cli
# OR
npm install -g @vue/cli
```

- 查看`vue`脚手架版本

```bash
vue -V
```

## 2.2\_@vue/cli 创建项目启动服务

> 目标: 使用 vue 命令, 创建脚手架项目

==注意: 项目名不能带大写字母, 中文和特殊符号==

1. 创建项目

```bash
# vue和create是命令, vuecli-demo是文件夹名
vue create vuecli-demo
```

2. 选择模板

   ==可以上下箭头选择, 弄错了 ctrl+c 重来==

![image-20210116230221236](../../vue/image-20210116230221236.png)

​ 选择用什么方式下载脚手架项目需要的依赖包![Snipaste_2021-03-26_15-24-14](../../vue/Snipaste_2021-03-26_15-24-14.png)

3. 回车等待生成项目文件夹+文件+下载必须的第三方包们

![image-20210212174314768](../../vue/image-20210212174314768.png)

4. 进入脚手架项目下, 启动内置的热更新本地服务器

```bash
cd vuecil-demo
bash
npm run serve
# 或
yarn serve
```

成功创建(底层 node+webpack 热更新服务)

![image-20210116231815543](../../vue/image-20210116231815543.png)

打开浏览器输入上述地址

![image-20210116233035582](../../vue/image-20210116233035582.png)

> 总结: vue 命令创建工程目录, 项目内置 webpack 本地热更新服务器, 帮我们打包项目预览项目

## 2.3 @vue/cli 目录和代码分析

> 目标: 讲解重点文件夹, 文件的作用, 以及文件里代码的意思

```bash
 vuecil-demo        # 项目目录
    ├── node_modules # 项目依赖的第三方包
    ├── public       # 静态文件目录
      ├── favicon.ico# 浏览器小图标
      └── index.html # 单页面的html文件(网页浏览的是它)
    ├── src          # 业务文件夹
      ├── assets     # 静态资源
        └── logo.png # vue的logo图片
      ├── components # 组件目录
        └── HelloWorld.vue # 欢迎页面vue代码文件
      ├── App.vue    # 整个应用的根组件
      └── main.js    # 入口js文件
    ├── .gitignore   # git提交忽略配置
    ├── babel.config.js  # babel配置
    ├── package.json  # 依赖包列表
    ├── README.md    # 项目说明
	└── yarn.lock    # 项目包版本锁定和缓存地址
```

主要文件及含义

```js
node_modules下都是下载的第三方包
public/index.html – 浏览器运行的网页
src/main.js – webpack打包的入口文件
src/App.vue – vue项目入口页面
package.json – 依赖包列表文件
```

## 2.4\_@vue/cli 项目架构了解

> 目标: 知道项目入口, 以及代码执行顺序和引入关系

![image-20210317201811310](../../vue/image-20210317201811310.png)

## 2.5\_@vue/cli 自定义配置

> 目标：项目中没有 webpack.config.js 文件，因为@vue/cli 用的 vue.config.js

src 并列处新建 vue.config.js

```jsx
/* 覆盖webpack的配置 */
module.exports = {
  devServer: {
    // 自定义服务配置
    open: true, // 自动打开浏览器
    port: 3000,
  },
}
```

## 2.6_eslint 了解

> 目标: 知道 eslint 的作用, 和如何暂时关闭, 它是一个==代码检查工具==

例子: 先在 main.js 随便声明个变量, 但是不要使用

![image-20210326165406694](../../vue//image-20210326165406694.png)

发现, 终端和页面都报错了

![image-20210326165544865](../../vue/image-20210326165544865.png)

![image-20210326165606191](../../vue/image-20210326165606191.png)

方式 1: 手动解决掉错误, 以后项目中会讲如何自动解决

方式 2: 暂时关闭 eslint 检查(因为现在主要精力在学习 Vue 语法上), 在 vue.config.js 中配置后重启服务

![image-20210511112152702](../../vue/image-20210511112152702.png)

## 2.7\_@vue/cli 单 vue 文件讲解

> 目标: 单 vue 文件好处, 独立作用域互不影响

Vue 推荐采用.vue 文件来开发项目

template 里只能有一个根标签

vue 文件-独立模块-作用域互不影响

style 配合 scoped 属性, 保证样式只针对当前 template 内标签生效

vue 文件配合 webpack, 把他们打包起来插入到 index.html

```vue
<!-- template必须, 只能有一个根标签, 影响渲染到页面的标签结构 -->
<template>
  <div>欢迎使用vue</div>
</template>

<!-- js相关 -->
<script>
export default {
  name: 'App',
}
</script>

<!-- 当前组件的样式, 设置scoped, 可以保证样式只对当前页面有效 -->
<style scoped></style>
```

最终: Vue 文件配合 webpack, 把他们打包起来插入到 index.html, 然后在浏览器运行
