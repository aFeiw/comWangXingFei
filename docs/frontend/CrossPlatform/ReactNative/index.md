# React Native 学习笔记

React Native 是 Facebook 开发的开源跨平台移动应用开发框架，使用 JavaScript 和 React 来构建原生移动应用。

## 目录

### 基础概念
- React Native 架构理解
- JavaScript 基础
- 组件系统详解
- 状态管理

### 核心组件
- 基础组件
- 导航组件
- 列表组件

### 高级特性
- 动画系统
- 手势处理
- 网络请求
- 原生模块集成

### 性能优化
- 性能优化技巧
- 内存管理

### 开发工具
- 开发环境搭建
- 调试技巧
- 打包发布

## 快速开始

### 环境搭建

1. **安装 Node.js 和 npm**
   ```bash
   # 检查版本
   node --version
   npm --version
   ```

2. **安装 React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

3. **创建新项目**
   ```bash
   npx react-native init MyApp
   cd MyApp
   ```

4. **运行项目**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

### 基础示例

```javascript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
```

## 核心特性

### 跨平台开发
- 一套代码，多平台运行
- 原生性能
- 热重载开发体验

### 组件化开发
- 基于 React 的组件系统
- 可复用的 UI 组件
- 声明式编程

### 原生集成
- 原生模块调用
- 平台特定代码
- 第三方库集成

## 学习路径

1. **基础阶段**
   - JavaScript ES6+ 语法
   - React 基础概念
   - React Native 组件

2. **进阶阶段**
   - 状态管理 (Redux, MobX)
   - 导航系统
   - 网络请求

3. **高级阶段**
   - 性能优化
   - 原生模块开发
   - 应用架构设计

## 常用工具

- **Metro**: React Native 打包工具
- **Flipper**: 调试工具
- **React Native Debugger**: 调试器
- **Fastlane**: 自动化部署 