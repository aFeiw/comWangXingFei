# Flutter 跨平台开发指南

Flutter 是 Google 开发的开源 UI 框架，使用 Dart 语言构建高性能、高保真的应用程序，支持 iOS、Android、Web、Desktop 等多平台。

## 目录

- [Dart 基础语法](./dart-basics.md)
- [Widget 系统详解](./widget-system.md)
- [Material Design 组件](./material-components.md)
- [状态管理方案](./state-management.md)
- [导航与路由](./navigation.md)
- [手势处理](./gestures.md)
- [动画效果](./animations.md)
- [HTTP 网络请求](./http-requests.md)
- [性能优化](./performance.md)
- [架构模式](./architecture.md)

## Flutter 核心特性

### 1. 跨平台一致性
- **单一代码库**：一套代码运行在多个平台
- **原生性能**：直接编译为原生代码，性能接近原生应用
- **热重载**：开发时快速预览修改效果

### 2. 丰富的组件库
- **Material Design**：遵循 Google Material Design 规范
- **Cupertino**：iOS 风格组件
- **自定义组件**：灵活创建个性化 UI

### 3. 强大的开发工具
- **Flutter Inspector**：可视化调试工具
- **DevTools**：性能分析工具
- **IDE 支持**：VS Code、Android Studio 等

## 快速开始

### 环境搭建

```bash
# 安装 Flutter SDK
git clone https://github.com/flutter/flutter.git
export PATH="$PATH:`pwd`/flutter/bin"

# 验证安装
flutter doctor

# 创建新项目
flutter create my_app
cd my_app
flutter run
```

### 基础项目结构

```
my_app/
├── lib/
│   ├── main.dart          # 应用入口
│   ├── pages/             # 页面组件
│   ├── widgets/           # 可复用组件
│   ├── models/            # 数据模型
│   ├── services/          # 服务层
│   └── utils/             # 工具类
├── assets/                # 静态资源
├── test/                  # 测试文件
└── pubspec.yaml          # 依赖配置
```

### Hello World 示例

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

## 开发最佳实践

### 1. 代码组织
- **分层架构**：UI、业务逻辑、数据层分离
- **组件化**：将复杂 UI 拆分为可复用组件
- **状态管理**：选择合适的状态管理方案

### 2. 性能优化
- **避免重建**：合理使用 `const` 构造函数
- **懒加载**：使用 `ListView.builder` 等懒加载组件
- **图片优化**：合理使用图片格式和缓存

### 3. 测试策略
- **单元测试**：测试业务逻辑
- **Widget 测试**：测试 UI 组件
- **集成测试**：测试完整功能流程

## 常用资源

- [Flutter 官方文档](https://flutter.dev/docs)
- [Dart 语言教程](https://dart.dev/guides)
- [Flutter 社区](https://flutter.dev/community)
- [pub.dev 包仓库](https://pub.dev)

## 学习路径

1. **基础阶段**：Dart 语法 → Flutter 基础 → Widget 系统
2. **进阶阶段**：状态管理 → 导航路由 → 网络请求
3. **高级阶段**：性能优化 → 架构设计 → 原生集成
4. **实战阶段**：项目实践 → 开源贡献 → 技术分享

---

*持续更新中，欢迎贡献和反馈* 
- [Flutter 社区](https://flutter.dev/community) 