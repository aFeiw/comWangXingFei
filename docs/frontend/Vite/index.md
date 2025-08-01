# Vite 学习笔记

Vite 是一个现代化的前端构建工具，提供极快的开发服务器启动和热模块替换 (HMR)。

## 目录

### 基础概念
- [Vite 架构理解](./architecture.md)
- [插件系统详解](./plugins.md)
- [构建配置](./build-config.md)
- [开发服务器](./dev-server.md)

### 框架集成
- [Vue 集成](./vue-integration.md)
- [React 集成](./react-integration.md)
- [TypeScript 支持](./typescript-support.md)
- [CSS 预处理](./css-preprocessors.md)

### 高级特性
- [环境变量](./environment-variables.md)
- [静态资源处理](./static-assets.md)
- [依赖预构建](./dependency-pre-bundling.md)
- [性能优化](./performance.md)

## 快速开始

### 创建项目

```bash
# 使用 create-vite
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 基础配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

### 多页面应用

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
      },
    },
  },
})
```

## 核心特性

### 开发服务器

```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

### 热模块替换 (HMR)

```javascript
// 在组件中使用 HMR
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // 处理模块更新
    console.log('模块已更新:', newModule)
  })
}
```

### 环境变量

```javascript
// .env
VITE_APP_TITLE=我的应用
VITE_API_URL=https://api.example.com

// 在代码中使用
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_API_URL)
```

## 插件系统

### 官方插件

```bash
# Vue 插件
npm install @vitejs/plugin-vue

# React 插件
npm install @vitejs/plugin-react

# TypeScript 插件
npm install @vitejs/plugin-vue-jsx
```

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    vue(),
    react(),
  ],
})
```

### 自定义插件

```javascript
// my-plugin.js
export default function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (id.endsWith('.vue')) {
        // 处理 Vue 文件
        return {
          code: code.replace(/console\.log/g, 'console.warn'),
          map: null,
        }
      }
    },
  }
}
```

## 构建优化

### 代码分割

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['lodash', 'axios'],
        },
      },
    },
  },
})
```

### 依赖预构建

```javascript
// vite.config.js
export default defineConfig({
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@vueuse/core'],
  },
})
```

### 静态资源处理

```javascript
// vite.config.js
export default defineConfig({
  assetsInclude: ['**/*.gltf'],
  build: {
    assetsInlineLimit: 4096, // 4kb
  },
})
```

## 框架集成

### Vue 集成

```bash
# 创建 Vue 项目
npm create vite@latest my-vue-app -- --template vue

# 安装额外依赖
npm install vue-router@4 pinia @vueuse/core
```

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
```

### React 集成

```bash
# 创建 React 项目
npm create vite@latest my-react-app -- --template react

# 安装额外依赖
npm install react-router-dom @reduxjs/toolkit react-redux
```

```javascript
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 开发工具

### 调试配置

```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000,
  },
  define: {
    __DEV__: true,
  },
})
```

### 代理配置

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/socket.io': {
        target: 'ws://localhost:3001',
        ws: true,
      },
    },
  },
})
```

## 部署

### 静态部署

```bash
# 构建项目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

```javascript
// vite.config.js
export default defineConfig({
  base: '/my-app/', // 部署到子路径
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## 最佳实践

### 项目结构

```
my-vite-app/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── styles/
│   ├── utils/
│   ├── main.js
│   └── App.vue
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### 环境配置

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      port: env.VITE_PORT || 3000,
    },
  }
})
```

### 性能优化

```javascript
// vite.config.js
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
})
```

## 常见问题

### 路径别名

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
})
```

### CSS 预处理器

```bash
# 安装 Sass
npm install -D sass

# 安装 Less
npm install -D less
```

```javascript
// vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
``` 