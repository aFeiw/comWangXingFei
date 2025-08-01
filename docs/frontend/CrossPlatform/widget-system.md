# Flutter Widget 系统详解

Widget 是 Flutter 应用的基础构建块，每个 UI 元素都是一个 Widget。理解 Widget 系统是掌握 Flutter 开发的关键。

## Widget 基础概念

### Widget 类型

```dart
// StatelessWidget - 无状态组件
class MyWidget extends StatelessWidget {
  final String title;
  
  const MyWidget({Key? key, required this.title}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text(title);
  }
}

// StatefulWidget - 有状态组件
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _count = 0;
  
  void _increment() {
    setState(() {
      _count++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count'),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

## 布局 Widget

### 单子 Widget

```dart
// Container - 容器组件
Container(
  width: 200,
  height: 100,
  margin: EdgeInsets.all(16),
  padding: EdgeInsets.all(8),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8),
  ),
  child: Text('Hello World'),
)

// Center - 居中组件
Center(
  child: Text('Centered Text'),
)

// Padding - 内边距组件
Padding(
  padding: EdgeInsets.all(16),
  child: Text('Padded Text'),
)

// SizedBox - 固定尺寸组件
SizedBox(
  width: 100,
  height: 50,
  child: Text('Fixed Size'),
)
```

### 多子 Widget

```dart
// Column - 垂直排列
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('First Item'),
    Text('Second Item'),
    Text('Third Item'),
  ],
)

// Row - 水平排列
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Icon(Icons.star),
    Text('Rating'),
    Text('4.5'),
  ],
)

// Stack - 层叠排列
Stack(
  children: [
    Container(
      width: 200,
      height: 200,
      color: Colors.blue,
    ),
    Positioned(
      top: 50,
      left: 50,
      child: Text('Overlay Text'),
    ),
  ],
)

// Wrap - 自动换行
Wrap(
  spacing: 8,
  runSpacing: 4,
  children: [
    Chip(label: Text('Flutter')),
    Chip(label: Text('Dart')),
    Chip(label: Text('Widget')),
    Chip(label: Text('UI')),
  ],
)
```

## 显示 Widget

### 文本 Widget

```dart
// Text - 基础文本
Text(
  'Hello World',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
)

// RichText - 富文本
RichText(
  text: TextSpan(
    style: TextStyle(color: Colors.black),
    children: [
      TextSpan(text: 'Hello '),
      TextSpan(
        text: 'World',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.blue,
        ),
      ),
    ],
  ),
)

// Text.rich - 简化富文本
Text.rich(
  TextSpan(
    children: [
      TextSpan(text: 'Hello '),
      TextSpan(
        text: 'World',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    ],
  ),
)
```

### 图片 Widget

```dart
// Image.network - 网络图片
Image.network(
  'https://example.com/image.jpg',
  width: 200,
  height: 200,
  fit: BoxFit.cover,
)

// Image.asset - 本地图片
Image.asset(
  'assets/images/logo.png',
  width: 100,
  height: 100,
)

// CircleAvatar - 圆形头像
CircleAvatar(
  radius: 50,
  backgroundImage: NetworkImage('https://example.com/avatar.jpg'),
)
```

### 图标 Widget

```dart
// Icon - 图标
Icon(
  Icons.star,
  size: 24,
  color: Colors.amber,
)

// IconButton - 可点击图标
IconButton(
  icon: Icon(Icons.favorite),
  onPressed: () {
    print('Icon pressed');
  },
)
```

## 输入 Widget

### 按钮 Widget

```dart
// ElevatedButton - 凸起按钮
ElevatedButton(
  onPressed: () {
    print('Button pressed');
  },
  child: Text('Click Me'),
)

// TextButton - 文本按钮
TextButton(
  onPressed: () {
    print('Text button pressed');
  },
  child: Text('Text Button'),
)

// OutlinedButton - 轮廓按钮
OutlinedButton(
  onPressed: () {
    print('Outlined button pressed');
  },
  child: Text('Outlined Button'),
)
```

### 输入框 Widget

```dart
// TextField - 文本输入框
TextField(
  decoration: InputDecoration(
    labelText: 'Enter your name',
    border: OutlineInputBorder(),
    prefixIcon: Icon(Icons.person),
  ),
  onChanged: (value) {
    print('Text changed: $value');
  },
)

// TextFormField - 表单输入框
TextFormField(
  decoration: InputDecoration(
    labelText: 'Email',
    border: OutlineInputBorder(),
  ),
  validator: (value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your email';
    }
    return null;
  },
)
```

## 列表 Widget

### ListView

```dart
// ListView.builder - 构建器列表
ListView.builder(
  itemCount: 100,
  itemBuilder: (context, index) {
    return ListTile(
      leading: Icon(Icons.star),
      title: Text('Item $index'),
      subtitle: Text('Subtitle for item $index'),
      onTap: () {
        print('Tapped item $index');
      },
    );
  },
)

// ListView.separated - 带分隔符的列表
ListView.separated(
  itemCount: 10,
  separatorBuilder: (context, index) => Divider(),
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('Item $index'),
    );
  },
)
```

### GridView

```dart
// GridView.builder - 网格视图
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
  ),
  itemCount: 20,
  itemBuilder: (context, index) {
    return Card(
      child: Center(
        child: Text('Grid Item $index'),
      ),
    );
  },
)
```

## 导航 Widget

### AppBar

```dart
AppBar(
  title: Text('My App'),
  backgroundColor: Colors.blue,
  actions: [
    IconButton(
      icon: Icon(Icons.search),
      onPressed: () {
        print('Search pressed');
      },
    ),
    IconButton(
      icon: Icon(Icons.more_vert),
      onPressed: () {
        print('More pressed');
      },
    ),
  ],
)
```

### BottomNavigationBar

```dart
BottomNavigationBar(
  currentIndex: 0,
  onTap: (index) {
    print('Selected index: $index');
  },
  items: [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.business),
      label: 'Business',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.school),
      label: 'School',
    ),
  ],
)
```

## 自定义 Widget

### 组合 Widget

```dart
class CustomCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final VoidCallback? onTap;
  
  const CustomCard({
    Key? key,
    required this.title,
    required this.subtitle,
    this.onTap,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(8),
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8),
              Text(
                subtitle,
                style: TextStyle(
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 动画 Widget

```dart
class AnimatedCounter extends StatefulWidget {
  @override
  _AnimatedCounterState createState() => _AnimatedCounterState();
}

class _AnimatedCounterState extends State<AnimatedCounter>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  int _count = 0;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0, end: 1).animate(_controller);
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  void _increment() {
    setState(() {
      _count++;
    });
    _controller.forward().then((_) {
      _controller.reverse();
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ScaleTransition(
          scale: _animation,
          child: Text(
            '$_count',
            style: TextStyle(fontSize: 48),
          ),
        ),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

## Widget 生命周期

### StatelessWidget 生命周期

```dart
class MyStatelessWidget extends StatelessWidget {
  // 构造函数
  MyStatelessWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    // build 方法在每次重建时调用
    return Container();
  }
}
```

### StatefulWidget 生命周期

```dart
class MyStatefulWidget extends StatefulWidget {
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  @override
  void initState() {
    super.initState();
    // 初始化状态
  }
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // 依赖项发生变化时调用
  }
  
  @override
  Widget build(BuildContext context) {
    // 构建 Widget
    return Container();
  }
  
  @override
  void didUpdateWidget(MyStatefulWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Widget 配置更新时调用
  }
  
  @override
  void dispose() {
    // 清理资源
    super.dispose();
  }
}
```

## 性能优化

### const 构造函数

```dart
// 使用 const 构造函数提高性能
const Text('Hello World')
const Icon(Icons.star)
const SizedBox(width: 100, height: 100)
```

### 避免不必要的重建

```dart
class OptimizedWidget extends StatelessWidget {
  // 使用 const 构造函数
  const OptimizedWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        Text('Static text'),
        Icon(Icons.star),
      ],
    );
  }
}
```

---

*Widget 系统是 Flutter 的核心，掌握好这些基础组件和概念，就能构建出功能丰富的应用界面。* 