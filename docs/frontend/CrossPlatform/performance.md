# 性能优化技巧

Flutter 应用性能优化是开发高质量应用的关键，以下是一些重要的优化技巧。

## 渲染性能优化

### 1. 避免不必要的重建

```dart
// 使用 const 构造函数
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
        // 使用 const 避免重建
        const Text('Static Text'),
        const SizedBox(height: 16.0),
        Text(title), // 只有 title 变化时重建
        Text('Count: $count'), // 只有 count 变化时重建
      ],
    );
  }
}
```

### 2. 使用 RepaintBoundary

```dart
class ExpensiveWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: 200,
        height: 200,
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Center(
          child: Text(
            'Expensive Widget',
            style: TextStyle(color: Colors.white, fontSize: 18),
          ),
        ),
      ),
    );
  }
}
```

### 3. 合理使用 ListView

```dart
class OptimizedListView extends StatelessWidget {
  final List<String> items;
  
  const OptimizedListView({Key? key, required this.items}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      // 使用 itemExtent 提高性能
      itemExtent: 60.0,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(items[index]),
          // 使用 key 优化重建
          key: ValueKey(items[index]),
        );
      },
    );
  }
}
```

## 内存管理优化

### 1. 及时释放资源

```dart
class ResourceManagementWidget extends StatefulWidget {
  @override
  _ResourceManagementWidgetState createState() => _ResourceManagementWidgetState();
}

class _ResourceManagementWidgetState extends State<ResourceManagementWidget> {
  late AnimationController _controller;
  late TextEditingController _textController;
  StreamSubscription? _subscription;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 1),
      vsync: this,
    );
    _textController = TextEditingController();
  }
  
  @override
  void dispose() {
    // 及时释放资源
    _controller.dispose();
    _textController.dispose();
    _subscription?.cancel();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(controller: _textController),
        ElevatedButton(
          onPressed: () => _controller.forward(),
          child: Text('Animate'),
        ),
      ],
    );
  }
}
```

### 2. 图片优化

```dart
class OptimizedImageWidget extends StatelessWidget {
  final String imageUrl;
  
  const OptimizedImageWidget({Key? key, required this.imageUrl}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Image.network(
      imageUrl,
      // 指定缓存尺寸
      cacheWidth: 300,
      cacheHeight: 200,
      // 使用占位符
      placeholder: (context, url) => Container(
        width: 300,
        height: 200,
        color: Colors.grey[300],
        child: Center(child: CircularProgressIndicator()),
      ),
      // 错误处理
      errorWidget: (context, url, error) => Container(
        width: 300,
        height: 200,
        color: Colors.grey[300],
        child: Center(child: Icon(Icons.error)),
      ),
      // 使用 fit 优化显示
      fit: BoxFit.cover,
    );
  }
}
```

## 网络性能优化

### 1. 请求缓存

```dart
class CachedNetworkService {
  static final Map<String, dynamic> _cache = {};
  static const Duration _cacheExpiry = Duration(minutes: 5);
  
  static Future<T> getWithCache<T>(
    String url,
    T Function(Map<String, dynamic>) fromJson,
  ) async {
    // 检查缓存
    if (_cache.containsKey(url)) {
      final cachedData = _cache[url];
      if (DateTime.now().difference(cachedData['timestamp']) < _cacheExpiry) {
        return fromJson(cachedData['data']);
      }
    }
    
    // 发起网络请求
    final response = await http.get(Uri.parse(url));
    final data = json.decode(response.body);
    
    // 缓存结果
    _cache[url] = {
      'data': data,
      'timestamp': DateTime.now(),
    };
    
    return fromJson(data);
  }
}
```

### 2. 分页加载

```dart
class PaginatedListView extends StatefulWidget {
  @override
  _PaginatedListViewState createState() => _PaginatedListViewState();
}

class _PaginatedListViewState extends State<PaginatedListView> {
  final List<String> _items = [];
  bool _isLoading = false;
  bool _hasMore = true;
  int _page = 1;
  
  @override
  void initState() {
    super.initState();
    _loadMore();
  }
  
  Future<void> _loadMore() async {
    if (_isLoading || !_hasMore) return;
    
    setState(() {
      _isLoading = true;
    });
    
    try {
      // 模拟网络请求
      await Future.delayed(Duration(seconds: 1));
      final newItems = List.generate(20, (index) => 'Item ${_items.length + index}');
      
      setState(() {
        _items.addAll(newItems);
        _page++;
        _isLoading = false;
        _hasMore = newItems.length == 20; // 假设每页20条
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return NotificationListener<ScrollNotification>(
      onNotification: (ScrollNotification scrollInfo) {
        if (scrollInfo.metrics.pixels == scrollInfo.metrics.maxScrollExtent) {
          _loadMore();
        }
        return true;
      },
      child: ListView.builder(
        itemCount: _items.length + (_hasMore ? 1 : 0),
        itemBuilder: (context, index) {
          if (index == _items.length) {
            return Center(
              child: Padding(
                padding: EdgeInsets.all(16.0),
                child: CircularProgressIndicator(),
              ),
            );
          }
          return ListTile(title: Text(_items[index]));
        },
      ),
    );
  }
}
```

## 状态管理优化

### 1. 使用 Selector 优化 Provider

```dart
class OptimizedProviderWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Selector<UserProvider, String>(
      selector: (context, provider) => provider.userName,
      builder: (context, userName, child) {
        return Text('User: $userName');
      },
    );
  }
}
```

### 2. 使用 Consumer 优化重建

```dart
class OptimizedConsumerWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, appState, child) {
        return Column(
          children: [
            // 使用 child 避免重建
            child!,
            Text('Count: ${appState.count}'),
            ElevatedButton(
              onPressed: () => appState.increment(),
              child: Text('Increment'),
            ),
          ],
        );
      },
      child: const Text('Static Widget'), // 这个不会重建
    );
  }
}
```

## 动画性能优化

### 1. 使用 AnimatedBuilder

```dart
class OptimizedAnimationWidget extends StatefulWidget {
  @override
  _OptimizedAnimationWidgetState createState() => _OptimizedAnimationWidgetState();
}

class _OptimizedAnimationWidgetState extends State<OptimizedAnimationWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    _animation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.scale(
          scale: _animation.value,
          child: Container(
            width: 100,
            height: 100,
            color: Colors.blue,
          ),
        );
      },
    );
  }
}
```

### 2. 使用 CustomPainter 优化绘制

```dart
class OptimizedCustomPainter extends CustomPainter {
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

class CustomPaintWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: OptimizedCustomPainter(),
      child: Container(
        width: 200,
        height: 200,
      ),
    );
  }
}
```

## 启动性能优化

### 1. 延迟加载

```dart
class LazyLoadingWidget extends StatefulWidget {
  @override
  _LazyLoadingWidgetState createState() => _LazyLoadingWidgetState();
}

class _LazyLoadingWidgetState extends State<LazyLoadingWidget> {
  Widget? _expensiveWidget;
  
  @override
  void initState() {
    super.initState();
    // 延迟加载昂贵组件
    Future.delayed(Duration(milliseconds: 100), () {
      if (mounted) {
        setState(() {
          _expensiveWidget = ExpensiveWidget();
        });
      }
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Immediate Content'),
        if (_expensiveWidget != null) _expensiveWidget!,
      ],
    );
  }
}
```

### 2. 预加载数据

```dart
class PreloadDataWidget extends StatefulWidget {
  @override
  _PreloadDataWidgetState createState() => _PreloadDataWidgetState();
}

class _PreloadDataWidgetState extends State<PreloadDataWidget> {
  Future<List<String>>? _dataFuture;
  
  @override
  void initState() {
    super.initState();
    // 预加载数据
    _dataFuture = _loadData();
  }
  
  Future<List<String>> _loadData() async {
    // 模拟网络请求
    await Future.delayed(Duration(seconds: 2));
    return List.generate(100, (index) => 'Item $index');
  }
  
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<String>>(
      future: _dataFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        }
        
        if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        }
        
        final data = snapshot.data!;
        return ListView.builder(
          itemCount: data.length,
          itemBuilder: (context, index) {
            return ListTile(title: Text(data[index]));
          },
        );
      },
    );
  }
}
```

## 调试和监控

### 1. 性能监控

```dart
class PerformanceMonitor {
  static void measureWidgetBuild(String widgetName, VoidCallback buildCallback) {
    final stopwatch = Stopwatch()..start();
    buildCallback();
    stopwatch.stop();
    
    if (stopwatch.elapsedMilliseconds > 16) { // 60fps = 16ms per frame
      print('Performance warning: $widgetName took ${stopwatch.elapsedMilliseconds}ms');
    }
  }
}

// 使用示例
class MonitoredWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return PerformanceMonitor.measureWidgetBuild('MonitoredWidget', () {
      return Container(
        width: 100,
        height: 100,
        color: Colors.blue,
        child: Text('Monitored'),
      );
    });
  }
}
```

### 2. 内存泄漏检测

```dart
class MemoryLeakDetector {
  static final Set<Object> _trackedObjects = {};
  
  static void track(Object object, String name) {
    _trackedObjects.add(object);
    print('Tracking: $name (${_trackedObjects.length} objects)');
  }
  
  static void untrack(Object object, String name) {
    _trackedObjects.remove(object);
    print('Untracking: $name (${_trackedObjects.length} objects)');
  }
  
  static void report() {
    print('Memory leak report: ${_trackedObjects.length} tracked objects');
  }
}

// 使用示例
class TrackedWidget extends StatefulWidget {
  @override
  _TrackedWidgetState createState() => _TrackedWidgetState();
}

class _TrackedWidgetState extends State<TrackedWidget> {
  @override
  void initState() {
    super.initState();
    MemoryLeakDetector.track(this, 'TrackedWidget');
  }
  
  @override
  void dispose() {
    MemoryLeakDetector.untrack(this, 'TrackedWidget');
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

## 总结

Flutter 性能优化的关键点：
- **避免不必要的重建**: 使用 const、RepaintBoundary
- **合理使用 ListView**: itemExtent、key 优化
- **及时释放资源**: dispose 方法清理
- **图片优化**: 缓存尺寸、占位符
- **网络优化**: 缓存、分页加载
- **状态管理优化**: Selector、Consumer
- **动画优化**: AnimatedBuilder、CustomPainter
- **启动优化**: 延迟加载、预加载
- **监控调试**: 性能监控、内存检测 