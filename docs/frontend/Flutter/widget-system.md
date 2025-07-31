# Widget 系统详解

Flutter 中的一切都是 Widget，Widget 是 Flutter 应用的基础构建块。

## Widget 基础概念

### 1. Widget 类型

#### StatelessWidget (无状态组件)
```dart
class MyStatelessWidget extends StatelessWidget {
  final String title;
  
  const MyStatelessWidget({Key? key, required this.title}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16.0),
      child: Text(
        title,
        style: TextStyle(fontSize: 18.0),
      ),
    );
  }
}
```

#### StatefulWidget (有状态组件)
```dart
class MyStatefulWidget extends StatefulWidget {
  final String initialText;
  
  const MyStatefulWidget({Key? key, required this.initialText}) : super(key: key);
  
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  late String _text;
  int _counter = 0;
  
  @override
  void initState() {
    super.initState();
    _text = widget.initialText;
  }
  
  void _updateText() {
    setState(() {
      _counter++;
      _text = 'Updated: $_counter';
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(_text),
        ElevatedButton(
          onPressed: _updateText,
          child: Text('Update'),
        ),
      ],
    );
  }
}
```

### 2. Widget 生命周期

```dart
class LifecycleWidget extends StatefulWidget {
  @override
  _LifecycleWidgetState createState() => _LifecycleWidgetState();
}

class _LifecycleWidgetState extends State<LifecycleWidget> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    print('initState: Widget 被创建');
  }
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('didChangeDependencies: 依赖发生变化');
  }
  
  @override
  void didUpdateWidget(LifecycleWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('didUpdateWidget: Widget 配置更新');
  }
  
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);
    print('App 生命周期变化: $state');
  }
  
  @override
  void deactivate() {
    super.deactivate();
    print('deactivate: Widget 从树中移除');
  }
  
  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
    print('dispose: Widget 被销毁');
  }
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

## 布局 Widget

### 1. 单子组件

#### Container
```dart
Container(
  width: 200,
  height: 100,
  margin: EdgeInsets.all(16.0),
  padding: EdgeInsets.all(8.0),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8.0),
    boxShadow: [
      BoxShadow(
        color: Colors.black26,
        blurRadius: 4.0,
        offset: Offset(0, 2),
      ),
    ],
  ),
  child: Text(
    'Container Widget',
    style: TextStyle(color: Colors.white),
  ),
)
```

#### Padding
```dart
Padding(
  padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
  child: Text('Padded Text'),
)
```

#### Center
```dart
Center(
  child: Text('Centered Text'),
)
```

#### Align
```dart
Align(
  alignment: Alignment.centerRight,
  child: Text('Right Aligned'),
)
```

### 2. 多子组件

#### Column
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: [
    Text('First Item'),
    SizedBox(height: 16.0),
    Text('Second Item'),
    SizedBox(height: 16.0),
    ElevatedButton(
      onPressed: () {},
      child: Text('Button'),
    ),
  ],
)
```

#### Row
```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [
    Icon(Icons.star),
    Text('Rating: 4.5'),
    ElevatedButton(
      onPressed: () {},
      child: Text('Rate'),
    ),
  ],
)
```

#### Stack
```dart
Stack(
  alignment: Alignment.center,
  children: [
    Container(
      width: 200,
      height: 200,
      color: Colors.blue,
    ),
    Positioned(
      top: 20,
      left: 20,
      child: Icon(Icons.favorite, color: Colors.red),
    ),
    Positioned(
      bottom: 20,
      right: 20,
      child: Text(
        'Overlay Text',
        style: TextStyle(color: Colors.white),
      ),
    ),
  ],
)
```

#### Wrap
```dart
Wrap(
  spacing: 8.0,
  runSpacing: 8.0,
  children: [
    Chip(label: Text('Flutter')),
    Chip(label: Text('Dart')),
    Chip(label: Text('Widget')),
    Chip(label: Text('Material Design')),
    Chip(label: Text('Cross Platform')),
  ],
)
```

### 3. 列表组件

#### ListView
```dart
// 基本 ListView
ListView(
  children: [
    ListTile(title: Text('Item 1')),
    ListTile(title: Text('Item 2')),
    ListTile(title: Text('Item 3')),
  ],
)

// ListView.builder (性能优化)
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      leading: Icon(Icons.star),
      title: Text(items[index].title),
      subtitle: Text(items[index].subtitle),
      trailing: Icon(Icons.arrow_forward_ios),
      onTap: () => handleTap(index),
    );
  },
)

// ListView.separated
ListView.separated(
  itemCount: items.length,
  separatorBuilder: (context, index) => Divider(),
  itemBuilder: (context, index) {
    return ListTile(title: Text(items[index]));
  },
)
```

#### GridView
```dart
GridView.count(
  crossAxisCount: 2,
  crossAxisSpacing: 16.0,
  mainAxisSpacing: 16.0,
  children: [
    Card(child: Text('Grid Item 1')),
    Card(child: Text('Grid Item 2')),
    Card(child: Text('Grid Item 3')),
    Card(child: Text('Grid Item 4')),
  ],
)

// GridView.builder
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,
    childAspectRatio: 1.0,
  ),
  itemCount: items.length,
  itemBuilder: (context, index) {
    return Card(
      child: Center(child: Text('Item $index')),
    );
  },
)
```

## 表单 Widget

### 1. 输入组件

#### TextField
```dart
class MyForm extends StatefulWidget {
  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final TextEditingController _controller = TextEditingController();
  String _inputValue = '';
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: _controller,
          decoration: InputDecoration(
            labelText: 'Enter your name',
            hintText: 'John Doe',
            prefixIcon: Icon(Icons.person),
            border: OutlineInputBorder(),
          ),
          onChanged: (value) {
            setState(() {
              _inputValue = value;
            });
          },
        ),
        SizedBox(height: 16.0),
        Text('You entered: $_inputValue'),
      ],
    );
  }
}
```

#### TextFormField
```dart
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: InputDecoration(
          labelText: 'Email',
          border: OutlineInputBorder(),
        ),
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter your email';
          }
          if (!value.contains('@')) {
            return 'Please enter a valid email';
          }
          return null;
        },
      ),
      SizedBox(height: 16.0),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            // 表单验证通过
            print('Form is valid');
          }
        },
        child: Text('Submit'),
      ),
    ],
  ),
)
```

### 2. 选择组件

#### Checkbox
```dart
bool _isChecked = false;

Checkbox(
  value: _isChecked,
  onChanged: (bool? value) {
    setState(() {
      _isChecked = value ?? false;
    });
  },
)
```

#### Radio
```dart
String _selectedValue = 'option1';

Column(
  children: [
    Radio<String>(
      value: 'option1',
      groupValue: _selectedValue,
      onChanged: (String? value) {
        setState(() {
          _selectedValue = value!;
        });
      },
    ),
    Radio<String>(
      value: 'option2',
      groupValue: _selectedValue,
      onChanged: (String? value) {
        setState(() {
          _selectedValue = value!;
        });
      },
    ),
  ],
)
```

#### Switch
```dart
bool _isEnabled = false;

Switch(
  value: _isEnabled,
  onChanged: (bool value) {
    setState(() {
      _isEnabled = value;
    });
  },
)
```

## 导航 Widget

### 1. 基本导航

```dart
// 导航到新页面
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => SecondPage(),
  ),
);

// 带参数导航
Navigator.pushNamed(
  context,
  '/second',
  arguments: {'id': 123, 'title': 'Detail Page'},
);

// 返回上一页
Navigator.pop(context);

// 返回并传递数据
Navigator.pop(context, 'Returned Data');
```

### 2. 命名路由

```dart
// 在 MaterialApp 中定义路由
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => HomePage(),
    '/second': (context) => SecondPage(),
    '/detail': (context) => DetailPage(),
  },
);

// 使用命名路由导航
Navigator.pushNamed(context, '/second');
```

## 自定义 Widget

### 1. 组合 Widget

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
      margin: EdgeInsets.all(8.0),
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: Theme.of(context).textTheme.headline6,
              ),
              SizedBox(height: 8.0),
              Text(
                subtitle,
                style: Theme.of(context).textTheme.bodyText2,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 2. 自定义绘制 Widget

```dart
class CustomPaintWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: MyCustomPainter(),
      child: Container(
        width: 200,
        height: 200,
      ),
    );
  }
}

class MyCustomPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.fill;
    
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      size.width / 4,
      paint,
    );
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
```

## 性能优化

### 1. const 构造函数

```dart
// 使用 const 构造函数
const MyWidget({Key? key}) : super(key: key);

// 在 build 方法中使用 const
@override
Widget build(BuildContext context) {
  return Column(
    children: [
      const Text('Static Text'),
      const SizedBox(height: 16.0),
      const Icon(Icons.star),
    ],
  );
}
```

### 2. RepaintBoundary

```dart
RepaintBoundary(
  child: MyExpensiveWidget(),
)
```

### 3. 避免不必要的重建

```dart
class OptimizedWidget extends StatelessWidget {
  final String title;
  final int count;
  
  const OptimizedWidget({
    Key? key,
    required this.title,
    required this.count,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(title), // 只有 title 变化时重建
        Text('Count: $count'), // 只有 count 变化时重建
      ],
    );
  }
}
```

## 总结

Flutter Widget 系统的特点：
- **一切都是 Widget**: 从文本到布局，从按钮到页面
- **组合优于继承**: 通过组合简单 Widget 创建复杂界面
- **声明式编程**: 描述 UI 应该是什么样子，而不是如何构建
- **不可变性**: Widget 是不可变的，状态变化通过重建实现
- **性能优化**: 通过 const 构造函数、RepaintBoundary 等机制优化性能 