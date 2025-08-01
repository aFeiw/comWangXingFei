# 混合开发解决方案

混合开发结合了 Web 技术和原生开发的优势，提供灵活且高效的跨平台开发方案。

## 目录

### 基础概念
- [混合开发架构](./architecture.md)
- [WebView 技术详解](./webview-technology.md)
- [原生与 Web 通信](./native-web-communication.md)
- [性能优化策略](./performance-optimization.md)

### 主流框架
- [Cordova/PhoneGap](./cordova-phonegap.md)
- [Ionic Framework](./ionic-framework.md)
- [Capacitor](./capacitor.md)
- [Tauri](./tauri.md)

### 开发工具
- [开发环境搭建](./development-setup.md)
- [调试技巧](./debugging.md)
- [打包发布](./deployment.md)
- [性能监控](./performance-monitoring.md)

### 最佳实践
- [项目结构设计](./project-structure.md)
- [代码分割策略](./code-splitting.md)
- [缓存策略](./caching-strategy.md)
- [安全考虑](./security-considerations.md)

## 技术栈对比

| 技术 | 优势 | 劣势 | 适用场景 |
|------|------|------|----------|
| **Cordova** | 成熟稳定，生态丰富 | 性能一般，WebView 限制 | 企业应用，原型开发 |
| **Ionic** | UI 组件丰富，开发效率高 | 包体积较大，性能一般 | 快速开发，UI 要求高 |
| **Capacitor** | 现代化，原生 API 丰富 | 生态相对较小 | 新项目，需要原生功能 |
| **Tauri** | 性能优秀，包体积小 | 生态较新，学习成本高 | 桌面应用，性能要求高 |

## 快速开始

### Cordova 项目

```bash
# 安装 Cordova CLI
npm install -g cordova

# 创建项目
cordova create MyApp com.example.myapp MyApp
cd MyApp

# 添加平台
cordova platform add ios
cordova platform add android

# 运行项目
cordova run ios
cordova run android
```

### Ionic 项目

```bash
# 安装 Ionic CLI
npm install -g @ionic/cli

# 创建项目
ionic start myApp tabs --type=angular

# 运行项目
ionic serve
ionic capacitor run ios
ionic capacitor run android
```

### Capacitor 项目

```bash
# 创建 Vue 项目
npm init vue@latest my-app
cd my-app

# 添加 Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init

# 添加平台
npx cap add ios
npx cap add android

# 同步代码
npx cap sync
```

## 核心概念

### WebView 技术

```javascript
// Cordova 插件调用
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // 设备准备就绪
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI
  });
}
```

### 原生通信

```javascript
// Ionic Native 调用
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
};

this.camera.getPicture(options).then((imageData) => {
  // 处理图片
}, (err) => {
  // 处理错误
});
```

### 性能优化

```javascript
// 使用 Web Workers
const worker = new Worker('worker.js');

worker.postMessage({
  type: 'process-data',
  data: largeDataset
});

worker.onmessage = function(e) {
  console.log('处理完成:', e.data);
};
```

## 开发工具

### 调试工具

```javascript
// 启用远程调试
if (window.cordova) {
  // Cordova 环境
  window.cordova.exec(null, null, 'Debug', 'enableRemoteDebugging', []);
}

// 性能监控
import { Performance } from '@ionic-native/performance/ngx';

this.performance.startTrace('app-start');
// 应用逻辑
this.performance.stopTrace('app-start');
```

### 热重载

```javascript
// 开发模式下的热重载
if (process.env.NODE_ENV === 'development') {
  const script = document.createElement('script');
  script.src = 'http://localhost:8080/webpack-dev-server.js';
  document.head.appendChild(script);
}
```

## 最佳实践

### 项目结构

```
my-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── assets/
│   └── theme/
├── www/
├── platforms/
│   ├── ios/
│   └── android/
└── plugins/
```

### 代码分割

```javascript
// 动态导入组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 缓存策略

```javascript
// Service Worker 缓存
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('SW registered');
    })
    .catch((error) => {
      console.log('SW registration failed');
    });
}
```

## 安全考虑

### 数据安全

```javascript
// 敏感数据加密
import CryptoJS from 'crypto-js';

const encryptData = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

const decryptData = (encryptedData, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
```

### 网络安全

```javascript
// HTTPS 强制
if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
  window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
```

## 部署策略

### 自动化部署

```yaml
# GitHub Actions 配置
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - run: npx cap sync
```

### 应用商店发布

```bash
# iOS 发布
ionic capacitor build ios --prod
# 使用 Xcode 打开项目并发布

# Android 发布
ionic capacitor build android --prod
# 使用 Android Studio 生成 APK
``` 