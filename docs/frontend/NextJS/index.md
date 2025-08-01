# Next.js 学习笔记

Next.js 是一个基于 React 的全栈开发框架，提供了服务端渲染、静态站点生成、API 路由等功能。

## 目录

### 基础概念
- [Next.js 架构理解](./architecture.md)
- [路由系统详解](./routing.md)
- [数据获取策略](./data-fetching.md)
- [渲染模式对比](./rendering-modes.md)

### 核心功能
- [页面组件](./pages.md)
- [API 路由](./api-routes.md)
- [中间件](./middleware.md)
- [图片优化](./image-optimization.md)

### 高级特性
- [国际化](./internationalization.md)
- [性能优化](./performance.md)
- [部署策略](./deployment.md)
- [测试方案](./testing.md)

## 快速开始

### 创建项目

```bash
# 使用 create-next-app
npx create-next-app@latest my-next-app
cd my-next-app

# 启动开发服务器
npm run dev
```

### 基础页面

```jsx
// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js 应用</title>
        <meta name="description" content="Next.js 学习笔记" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>欢迎使用 Next.js!</h1>
      </main>
    </div>
  )
}
```

### 动态路由

```jsx
// pages/posts/[id].js
import { useRouter } from 'next/router'

export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return <h1>文章 ID: {id}</h1>
}
```

## 核心特性

### 服务端渲染 (SSR)

```jsx
// pages/ssr-page.js
export default function SSRPage({ data }) {
  return (
    <div>
      <h1>服务端渲染页面</h1>
      <p>数据: {data}</p>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data')
  const json = await data.json()

  return {
    props: {
      data: json,
    },
  }
}
```

### 静态站点生成 (SSG)

```jsx
// pages/ssg-page.js
export default function SSGPage({ posts }) {
  return (
    <div>
      <h1>静态生成页面</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await fetch('https://api.example.com/posts')
  const json = await posts.json()

  return {
    props: {
      posts: json,
    },
    revalidate: 60, // ISR: 60秒后重新生成
  }
}
```

### API 路由

```jsx
// pages/api/hello.js
export default function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      res.status(200).json({ message: 'Hello World' })
      break
    case 'POST':
      res.status(200).json({ message: '数据已接收' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
```

## 配置选项

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用实验性功能
  experimental: {
    appDir: true,
  },
  
  // 图片域名配置
  images: {
    domains: ['example.com'],
  },
  
  // 环境变量
  env: {
    customKey: 'my-value',
  },
  
  // 重定向
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
  
  // 重写
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
```

## 样式方案

### CSS Modules

```css
/* styles/Button.module.css */
.button {
  background-color: #0070f3;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0051cc;
}
```

```jsx
// components/Button.js
import styles from '../styles/Button.module.css'

export default function Button({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
```

### Tailwind CSS

```bash
# 安装 Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```jsx
// 使用 Tailwind CSS
export default function TailwindComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tailwind CSS 示例
        </h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          点击按钮
        </button>
      </div>
    </div>
  )
}
```

## 状态管理

### 使用 Context API

```jsx
// contexts/ThemeContext.js
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
```

### 使用 Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

```jsx
// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

## 性能优化

### 图片优化

```jsx
import Image from 'next/image'

export default function OptimizedImage() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={300}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
```

### 代码分割

```jsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>加载中...</p>,
  ssr: false,
})

export default function Page() {
  return (
    <div>
      <h1>页面内容</h1>
      <DynamicComponent />
    </div>
  )
}
```

## 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 自定义服务器

```javascript
// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

## 最佳实践

### 项目结构

```
my-next-app/
├── components/
│   ├── Layout.js
│   └── UI/
├── pages/
│   ├── api/
│   ├── _app.js
│   └── index.js
├── public/
├── styles/
├── lib/
├── hooks/
└── utils/
```

### SEO 优化

```jsx
import Head from 'next/head'

export default function SEOOptimizedPage() {
  return (
    <>
      <Head>
        <title>页面标题</title>
        <meta name="description" content="页面描述" />
        <meta name="keywords" content="关键词1,关键词2" />
        <meta property="og:title" content="Open Graph 标题" />
        <meta property="og:description" content="Open Graph 描述" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://example.com/page" />
      </Head>
      <main>
        {/* 页面内容 */}
      </main>
    </>
  )
}
```

### 错误处理

```jsx
// pages/_error.js
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `服务器错误: ${statusCode}`
        : '客户端错误'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
``` 