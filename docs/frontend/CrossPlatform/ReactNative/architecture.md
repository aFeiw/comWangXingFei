# React Native 架构理解

React Native 采用了一种独特的架构，结合了 JavaScript 和原生代码的优势。

## 架构概览

### 三层架构

1. **JavaScript 层**
   - React 组件
   - JavaScript 业务逻辑
   - 状态管理

2. **Bridge 层**
   - 异步通信
   - 序列化/反序列化
   - 消息传递

3. **原生层**
   - iOS/Android 原生代码
   - 原生 UI 组件
   - 平台特定功能

## 核心组件

### JavaScript 引擎

```javascript
// JavaScript 代码在 JS 引擎中运行
const Component = () => {
  const [state, setState] = useState(0);
  
  return (
    <View>
      <Text>{state}</Text>
    </View>
  );
};
```

### Bridge 通信

```javascript
// JavaScript 调用原生方法
import {NativeModules} from 'react-native';

const {CalendarManager} = NativeModules;
CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');
```

### 原生模块

```objective-c
// iOS 原生模块
@implementation CalendarManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  // 原生实现
}

@end
```

## 渲染机制

### 虚拟 DOM

```javascript
// React 创建虚拟 DOM
const element = (
  <View style={styles.container}>
    <Text>Hello World</Text>
  </View>
);
```

### 原生视图映射

```javascript
// React Native 将虚拟 DOM 映射到原生视图
const NativeView = requireNativeComponent('RCTView');
const NativeText = requireNativeComponent('RCTText');
```

## 性能优化

### 异步渲染

```javascript
// 使用 InteractionManager 延迟非关键操作
import {InteractionManager} from 'react-native';

InteractionManager.runAfterInteractions(() => {
  // 在动画完成后执行
});
```

### 内存管理

```javascript
// 正确清理资源
useEffect(() => {
  const subscription = someAPI.subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## 新架构 (Fabric)

### 优势

- **同步渲染**: 减少 Bridge 通信
- **更好的性能**: 直接调用原生方法
- **类型安全**: 使用 TypeScript

### 迁移指南

```javascript
// 启用新架构
// 在 metro.config.js 中
module.exports = {
  resolver: {
    unstable_enableSymlinks: true,
  },
};
```

## 调试工具

### Flipper

```javascript
// 配置 Flipper
import {Flipper} from 'react-native-flipper';

Flipper.addPlugin({
  getId: () => 'react-native',
  onConnect: (connection) => {
    // 连接处理
  },
});
```

### React Native Debugger

```javascript
// 启用远程调试
if (__DEV__) {
  import('react-native-flipper').then(() => {
    // 调试配置
  });
}
```

## 最佳实践

### 组件设计

```javascript
// 使用 PureComponent 优化渲染
class OptimizedComponent extends React.PureComponent {
  render() {
    return <View>{this.props.children}</View>;
  }
}
```

### 状态管理

```javascript
// 使用 Context API
const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};
```

## 常见问题

### Bridge 瓶颈

- 使用批量更新
- 避免频繁的 Bridge 调用
- 考虑使用新架构

### 内存泄漏

- 正确清理事件监听器
- 使用 WeakMap 存储引用
- 定期检查内存使用

### 性能监控

```javascript
// 使用 Performance Monitor
import {PerformanceObserver} from 'react-native';

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry.name, entry.duration);
  });
});

observer.observe({entryTypes: ['measure']});
``` 