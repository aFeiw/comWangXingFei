# Flutter 学习笔记

Flutter 是 Google 开发的开源 UI 框架，用于构建跨平台应用程序。

## 目录

### 基础概念
- [Flutter 架构理解](./architecture.md)
- [Dart 语言基础](./dart-basics.md)
- [Widget 系统详解](./widget-system.md)
- [State 管理](./state-management.md)

### 核心组件
- [Material Design 组件](./material-components.md)
- [导航组件](./navigation.md)

### 高级特性
- [动画系统](./animations.md)
- [手势处理](./gestures.md)
- [网络请求](./http-requests.md)

### 性能优化
- [性能优化技巧](./performance.md)

## 快速开始

### 环境搭建

1. **安装 Flutter SDK**
   ```bash
   # 下载 Flutter SDK
   git clone https://github.com/flutter/flutter.git
   
   # 添加到环境变量
   export PATH="$PATH:`pwd`/flutter/bin"
   ```

2. **安装开发工具**
   - Android Studio / VS Code
   - Flutter 和 Dart 插件

3. **验证安装**
   ```bash
   flutter doctor
   ```

### 创建项目

```bash
# 创建新项目
flutter create my_app

# 进入项目目录
cd my_app

# 运行项目
flutter run
```

### 基础示例

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

## 学习路径

### 初学者路径
1. 了解 Flutter 架构和 Dart 语言基础
2. 学习 Widget 系统和基本组件
3. 掌握状态管理
4. 学习导航和路由
5. 实践动画和手势处理

### 进阶路径
1. 深入学习性能优化
2. 掌握网络请求和数据管理
3. 学习自定义组件开发
4. 了解平台集成和原生功能
5. 掌握测试和调试技巧

## 常用资源

- [Flutter 官方文档](https://flutter.dev/docs)
- [Dart 语言文档](https://dart.dev/guides)
- [Flutter 包管理](https://pub.dev/)
- [Flutter 社区](https://flutter.dev/community) 