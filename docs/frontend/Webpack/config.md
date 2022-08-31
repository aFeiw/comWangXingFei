# 3. webpack 的配置

## 3.0_webpack-入口和出口

> 目标: 告诉 webpack 从哪开始打包, 打包后输出到哪里

默认入口: ./src/index.js

默认出口: ./dist/main.js

webpack 配置 - webpack.config.js(默认)

1. 新建 src 并列处, webpack.config.js
2. 填入配置项

```js
const path = require('path')

module.exports = {
  entry: './src/main.js', // 入口
  output: {
    path: path.join(__dirname, 'dist'), // 出口路径
    filename: 'bundle.js', // 出口文件名
  },
}
```

3. 修改 package.json, 自定义打包命令 - 让 webpack 使用配置文件

```json
"scripts": {
    "build": "webpack"
},
```

4. 打包观察效果

## 3.1\_打包流程图

![image-20210421125257233](../images/image-20210421125257233.png)

==重点: 所有要被打包的资源都要跟入口产生直接/间接的引用关系==

## 3.2\_案例-webpack 隔行变色

> 目标: 工程化模块化开发前端项目, webpack 会对 ES6 模块化处理

1. 回顾从 0 准备环境

   - 初始化包环境
   - 下载依赖包
   - 配置自定义打包命令

2. 下载 jquery, 新建 public/index.html

   ```bash
   yarn add jquery
   ```

   ![image-20210208100817930](../images/image-20210208100817930.png)

3. index.html 准备一些 li

   - ==因为 import 语法浏览器支持性不好, 需要被 webpack 转换后, 再使用 JS 代码==

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta http-equiv="X-UA-Compatible" content="ie=edge" />
       <title>Document</title>
     </head>
     <body>
       <div id="app">
         <!-- ul>li{我是第$个li}*10 -->
         <ul>
           <li>我是第1个li</li>
           <li>我是第2个li</li>
           <li>我是第3个li</li>
           <li>我是第4个li</li>
           <li>我是第5个li</li>
           <li>我是第6个li</li>
           <li>我是第7个li</li>
           <li>我是第8个li</li>
           <li>我是第9个li</li>
         </ul>
       </div>
     </body>
   </html>
   ```

4. 在 src/main.js 引入 jquery

   ```bash
   yarn add jquery
   ```

5. src/main.js 中编写隔行变色代码

   ```js
   // 引入jquery
   import $ from 'jquery'
   $(function () {
     $('#app li:nth-child(odd)').css('color', 'red')
     $('#app li:nth-child(even)').css('color', 'green')
   })
   ```

6. 执行打包命令观察效果

7. 可以在 dist 下把 public/index.html 引入过来

   ![image-20210421125602484](../images/image-20210421125602484.png)

   在 index.html 中==手动==引入 js

   ```vue
   <script src="../dist/bundle.js"></script>
   ```

> 总结: 前端工程化模块化, 需要的包 yarn 下, 被 webpack 打包后引入到 html 中使用

## 3.3\_插件-自动生成 html 文件

> 目标: html-webpack-plugin 插件, 让 webpack 打包后生成 html 文件并自动引入打包后的 js

[html-webpack-plugin 插件地址](https://www.webpackjs.com/plugins/html-webpack-plugin/)

1. 下载插件

   ```
   yarn add html-webpack-plugin  -D
   ```

2. webpack.config.js 配置

   ```js
   // 引入自动生成 html 的插件
   const HtmlWebpackPlugin = require('html-webpack-plugin')

   module.exports = {
     // ...省略其他代码
     plugins: [
       new HtmlWebpackPlugin({
         template: './public/index.html', // 以此为基准生成打包后html文件
       }),
     ],
   }
   ```

3. 重新打包后观察 dist 下是否多出 html 并运行看效果

   ==打包后的 index.html 自动引入打包后的 js 文件==

> 总结: webpack 就像一个人, webpack.config.js 是人物属性, 给它穿什么装备它就干什么活

## 3.4\_加载器 - 处理 css 文件问题

> 目标: 自己准备 css 文件, 引入到 webpack 入口, 测试 webpack 是否能打包 css 文件

1.新建 - src/css/index.css

2.编写去除 li 圆点样式代码

3.(重要) 一定要引入到入口才会被 webpack 打包

4.执行打包命令观察效果

> 总结: 保存原因, 因为 webpack 默认只能处理 js 类型文件

## 3.5\_加载器 - 处理 css 文件

> 目标: loaders 加载器, 可让 webpack 处理其他类型的文件, 打包到 js 中

原因: webpack 默认只认识 js 文件和 json 文件

[style-loader 文档](https://webpack.docschina.org/loaders/style-loader/)

[css-loader 文档](https://webpack.docschina.org/loaders/css-loader/)

1. 安装依赖

   ```
   yarn add style-loader css-loader -D
   ```

2. webpack.config.js 配置

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin')

   module.exports = {
     // ...其他代码
     module: {
       rules: [
         // loader的规则
         {
           test: /\.css$/, // 匹配所有的css文件
           // use数组里从右向左运行
           // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
           // 再用 style-loader 将样式, 把css插入到dom中
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
   }
   ```

3. 新建 src/css/li.css - 去掉 li 默认样式

   ```css
   ul,
   li {
     list-style: none;
   }
   ```

4. 引入到 main.js (因为这里是入口需要产生关系, 才会被找到打包起来)

   ```js
   import './css/index.css'
   ```

5. 运行打包后 dist/index.html 观察效果和 css 引入情况

> 总结: 万物皆模块, 引到入口, 才会被 webpack 打包, css 打包进 js 中, 然后被嵌入在 style 标签插入 dom 上

## 3.6\_加载器 - 处理 less 文件

> 目标: less-loader 让 webpack 处理 less 文件, less 模块翻译 less 代码

[less-loader 文档](https://webpack.docschina.org/loaders/less-loader/)

1. 下载依赖包

   ```bash
   yarn add less less-loader -D
   ```

2. webpack.config.js 配置

   ```js
   module: {
     rules: [
       // loader的规则
       // ...省略其他
       {
         test: /\.less$/,
         // 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
         use: ['style-loader', 'css-loader', 'less-loader'],
       },
     ]
   }
   ```

3. src/less/index.less - 设置 li 字体大小 24px

   ```less
   @size: 24px;

   ul,
   li {
     font-size: @size;
   }
   ```

4. 引入到 main.js 中

   ```js
   import './less/index.less'
   ```

5. 打包运行 dist/index.html 观察效果

> 总结: 只要找到对应的 loader 加载器, 就能让 webpack 处理不同类型文件

## 3.7 PostCss 工具

- 什么是 PostCSS 呢？

  - PostCSS 是一个通过 JavaScript 来转换样式的工具；
  - 这个工具可以帮助我们进行一些 CSS 的转换和适配，比如自动添加浏览器前缀、css 样式的重置；
  - 但是实现这些功能，我们需要借助于 PostCSS 对应的插件；

- 如何使用 PostCSS 呢？主要就是两个步骤：

  - 第一步：查找 PostCSS 在构建工具中的扩展，比如 webpack 中的 postcss-loader；

  - 第二步：选择可以添加你需要的 PostCSS 相关的插件；

### 3.7.0 命令行使用 PostCss

- 当然，我们能不能也直接在终端使用 PostCSS 呢？

  - 也是可以的，但是我们需要单独安装一个工具 postcss-cli；

- 我们可以安装一下它们：postcss、postcss-cli

  ```bash
  npm install postcss postcss-cli -D
  ```

- 我们编写一个需要添加前缀的 css：

  - https://autoprefixer.github.io/

  - 我们可以在上面的网站中查询一些添加 css 属性的样式；

    <img src="../images/image-20220710172119810.png" alt="image-20220710172119810" style="zoom: 67%;" />

### 3.7.1 插件 autoprefixer

- 因为我们需要添加前缀，所以要安装 autoprefixer：

  ```bash
  yarn add autoprefixer -D
  ```

- 直接使用使用 postcss 工具，并且制定使用 autoprefixer

  ```bash
   npx postcss --use autoprefixer -o end.css ./src/css/style.css
  ```

- 转化之后的 css 样式如下：

  <img src="../images/image-20220710172419130.png" alt="image-20220710172419130" style="zoom:67%;" />

### 3.7.2 postcss-loader

- 真实开发中我们必然不会直接使用命令行工具来对 css 进行处理，而是可以借助于构建工具：

  - 在 webpack 中使用 postcss 就是使用 postcss-loader 来处理的；

- 我们来安装 postcss-loader：

  - ```bash
    yarn add postcss-loader -D
    ```

- 我们修改加载 css 的 loader：（配置文件已经过多，给出一部分了）

  - 注意：因为 postcss 需要有对应的插件才会起效果，所以我们需要配置它的- plugin；
  - <img src="../images/image-20220710172914764.png" alt="image-20220710172914764" style="zoom:67%;" />

**单独的 PostCss 配置文件**

- 当然，我们也可以将这些配置信息放到一个单独的文件中进行管理：
- 在根目录下创建 postcss.config.js

## 3.8 加载器 - 处理图片文件

> 目标: 用 asset module 方式(webpack5 版本新增)

[asset module 文档](https://webpack.docschina.org/guides/asset-modules/)

**认识 asset module type**

- 我们当前使用的 webpack 版本是 webpack5：

  - 在 webpack5 之前，加载这些资源我们需要使用一些 loader，比如 raw-loader 、url-loader、file-loader；

  - 在 webpack5 开始，我们可以直接使用资源模块类型（asset module type），来替代上面的这些 loader；

- 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

  - asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现；

  - asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现；

  - asset/source 导出资源的源代码。之前通过使用 raw-loader 实现；

  - asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体 积限制实现；

如果使用的是 webpack5 版本的, 直接配置在 webpack.config.js - 的 rules 里即可

```js
{
    test: /\.(png|jpg|gif|jpeg)$/i,
    type: 'asset'
}
```

如果你用的是 webpack4 及以前的, 请使用者里的配置

[url-loader 文档](https://webpack.docschina.org/loaders/url-loader/)

[file-loader 文档](https://webpack.docschina.org/loaders/file-loader/)

1. 下载依赖包

   ```bash
   yarn add url-loader file-loader -D
   ```

2. webpack.config.js 配置

   ```js
   {
     test: /\.(png|jpg|gif|jpeg)$/i,
     use: [
       {
         loader: 'url-loader', // 匹配文件, 尝试转base64字符串打包到js中
         // 配置limit, 超过8k, 不转, file-loader复制, 随机名, 输出文件
         options: {
           limit: 8 * 1024,
         },
       },
     ],
   }
   ```

   图片转成 base64 字符串

   - 好处就是浏览器不用发请求了，直接可以读取
   - 坏处就是如果图片太大，再转`base64`就会让图片的体积增大 30% 左右

3. src/assets/2 个图文件

4. 在 css/less/index.less - 把小图片用做背景图

   ```less
   body {
     background: url(../assets/logo_small.png) no-repeat center;
   }
   ```

5. 在 src/main.js - 把大图插入到创建的 img 标签上, 添加 body 上显示

   ```js
   // 引入图片-使用
   import imgUrl from './assets/1.gif'
   const theImg = document.createElement('img')
   theImg.src = imgUrl
   document.body.appendChild(theImg)
   ```

> 总结: url-loader 把文件转 base64 打包进 js 中, 会有 30%的增大, file-loader 把文件直接复制输出

## 3.9 webpack 加载文件优缺点

图片转成 base64 字符串

- 好处就是浏览器不用发请求了，直接可以读取
- 坏处就是如果图片太大，再转`base64`就会让图片的体积增大 30% 左右

## 3.10 加载器 - 处理字体文件

> 目标: 用 asset module 技术, asset/resource 直接输出到 dist 目录下

webpack5 使用这个配置

```js
{ // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    type: 'asset/resource',
    generator: {
    	filename: 'font/[name].[hash:6][ext]'
    }
}
```

webpack4 及以前使用下面的配置

1. webpack.config.js - 准备配置

   ```js
    { // 处理字体图标的解析
        test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 2 * 1024,
                        // 配置输出的文件名
                        name: '[name].[ext]',
                        // 配置输出的文件目录
                        outputPath: "fonts/"
                    }
                }
            ]
    }
   ```

2. src/assets/ - 放入字体库 fonts 文件夹

3. 在 main.js 引入 iconfont.css

   ```js
   // 引入字体图标文件
   import './assets/fonts/iconfont.css'
   ```

4. 在 public/index.html 使用字体图标样式

   ```html
   <i class="iconfont icon-weixin"></i>
   ```

5. 执行打包命令-观察打包后网页效果

> 总结: url-loader 和 file-loader 可以打包静态资源文件

## 3.11 加载器 - 处理高版本 js 语法

> 目标: 让 webpack 对高版本 的 js 代码, 降级处理后打包

写代码演示: 高版本的 js 代码(箭头函数), 打包后, 直接原封不动打入了 js 文件中, 遇到一些低版本的浏览器就会报错

原因: **webpack 默认仅内置了 模块化的 兼容性处理** `import export`

babel 的介绍 => 用于处理高版本 js 语法 的兼容性 [babel 官网](https://www.babeljs.cn/)

解决: 让 webpack 配合 babel-loader 对 js 语法做处理

[babel-loader 文档](https://webpack.docschina.org/loaders/babel-loader/)

1. 安装包

   ```bash
   yarn add -D babel-loader @babel/core @babel/preset-env
   ```

2. 配置规则

   ```js
   module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: ['@babel/preset-env'], // 预设:转码规则(用bable开发环境本来预设的)
           },
         },
       },
     ]
   }
   ```

3. 在 main.js 中使用箭头函数(高版本 js)

   ```js
   // 高级语法
   const fn = () => {
     console.log('你好babel')
   }
   console.log(fn) // 这里必须打印不能调用/不使用, 不然webpack会精简成一句打印不要函数了/不会编译未使用的代码
   // 没有babel集成时, 原样直接打包进lib/bundle.js
   // 有babel集成时, 会翻译成普通函数打包进lib/bundle.js
   ```

4. 打包后观察 lib/bundle.js - 被转成成普通函数使用了 - 这就是 babel 降级翻译的功能

> 总结: babel-loader 可以让 webpack 对高版本 js 语法做降级处理后打包
