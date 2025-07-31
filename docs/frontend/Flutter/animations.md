# 动画系统

Flutter 提供了强大的动画系统，可以创建流畅的用户界面动画效果。

## 动画基础

### 1. AnimationController

```dart
class AnimationExample extends StatefulWidget {
  @override
  _AnimationExampleState createState() => _AnimationExampleState();
}

class _AnimationExampleState extends State<AnimationExample>
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
    return Column(
      children: [
        AnimatedBuilder(
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
        ),
        ElevatedButton(
          onPressed: () {
            if (_controller.status == AnimationStatus.completed) {
              _controller.reverse();
            } else {
              _controller.forward();
            }
          },
          child: Text('Animate'),
        ),
      ],
    );
  }
}
```

### 2. 多个动画控制器

```dart
class MultipleAnimationsExample extends StatefulWidget {
  @override
  _MultipleAnimationsExampleState createState() => _MultipleAnimationsExampleState();
}

class _MultipleAnimationsExampleState extends State<MultipleAnimationsExample>
    with TickerProviderStateMixin {
  late AnimationController _scaleController;
  late AnimationController _rotationController;
  late AnimationController _fadeController;

  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    
    _scaleController = AnimationController(
      duration: Duration(milliseconds: 500),
      vsync: this,
    );
    
    _rotationController = AnimationController(
      duration: Duration(seconds: 1),
      vsync: this,
    );
    
    _fadeController = AnimationController(
      duration: Duration(milliseconds: 800),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 2.0,
    ).animate(CurvedAnimation(
      parent: _scaleController,
      curve: Curves.elasticOut,
    ));

    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 2 * 3.14159,
    ).animate(CurvedAnimation(
      parent: _rotationController,
      curve: Curves.easeInOut,
    ));

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeIn,
    ));
  }

  @override
  void dispose() {
    _scaleController.dispose();
    _rotationController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  void _startAnimations() {
    _scaleController.forward();
    _rotationController.forward();
    _fadeController.forward();
  }

  void _resetAnimations() {
    _scaleController.reset();
    _rotationController.reset();
    _fadeController.reset();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedBuilder(
          animation: Listenable.merge([
            _scaleAnimation,
            _rotationAnimation,
            _fadeAnimation,
          ]),
          builder: (context, child) {
            return Transform.scale(
              scale: _scaleAnimation.value,
              child: Transform.rotate(
                angle: _rotationAnimation.value,
                child: Opacity(
                  opacity: _fadeAnimation.value,
                  child: Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      color: Colors.blue,
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ),
                ),
              ),
            );
          },
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: _startAnimations,
          child: Text('Start Animations'),
        ),
        ElevatedButton(
          onPressed: _resetAnimations,
          child: Text('Reset Animations'),
        ),
      ],
    );
  }
}
```

## 内置动画 Widget

### 1. AnimatedContainer

```dart
class AnimatedContainerExample extends StatefulWidget {
  @override
  _AnimatedContainerExampleState createState() => _AnimatedContainerExampleState();
}

class _AnimatedContainerExampleState extends State<AnimatedContainerExample> {
  bool _isExpanded = false;
  Color _color = Colors.blue;
  double _borderRadius = 8.0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedContainer(
          duration: Duration(milliseconds: 500),
          curve: Curves.easeInOut,
          width: _isExpanded ? 300 : 100,
          height: _isExpanded ? 200 : 100,
          decoration: BoxDecoration(
            color: _color,
            borderRadius: BorderRadius.circular(_borderRadius),
          ),
          child: Center(
            child: Text(
              'Animated Container',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _isExpanded = !_isExpanded;
            });
          },
          child: Text('Toggle Size'),
        ),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _color = _color == Colors.blue ? Colors.red : Colors.blue;
            });
          },
          child: Text('Change Color'),
        ),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _borderRadius = _borderRadius == 8.0 ? 50.0 : 8.0;
            });
          },
          child: Text('Change Border Radius'),
        ),
      ],
    );
  }
}
```

### 2. AnimatedOpacity

```dart
class AnimatedOpacityExample extends StatefulWidget {
  @override
  _AnimatedOpacityExampleState createState() => _AnimatedOpacityExampleState();
}

class _AnimatedOpacityExampleState extends State<AnimatedOpacityExample> {
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedOpacity(
          opacity: _visible ? 1.0 : 0.0,
          duration: Duration(milliseconds: 500),
          child: Container(
            width: 200,
            height: 100,
            color: Colors.green,
            child: Center(
              child: Text(
                'Fade In/Out',
                style: TextStyle(color: Colors.white, fontSize: 18),
              ),
            ),
          ),
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _visible = !_visible;
            });
          },
          child: Text(_visible ? 'Hide' : 'Show'),
        ),
      ],
    );
  }
}
```

### 3. AnimatedPositioned

```dart
class AnimatedPositionedExample extends StatefulWidget {
  @override
  _AnimatedPositionedExampleState createState() => _AnimatedPositionedExampleState();
}

class _AnimatedPositionedExampleState extends State<AnimatedPositionedExample> {
  bool _isTopLeft = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          AnimatedPositioned(
            duration: Duration(milliseconds: 500),
            curve: Curves.easeInOut,
            left: _isTopLeft ? 0 : 200,
            top: _isTopLeft ? 0 : 200,
            child: Container(
              width: 100,
              height: 100,
              color: Colors.orange,
              child: Center(
                child: Text('Move Me'),
              ),
            ),
          ),
          Positioned(
            bottom: 50,
            left: 0,
            right: 0,
            child: Center(
              child: ElevatedButton(
                onPressed: () {
                  setState(() {
                    _isTopLeft = !_isTopLeft;
                  });
                },
                child: Text('Move'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

## 自定义动画

### 1. 自定义动画曲线

```dart
class CustomCurve extends Curve {
  @override
  double transform(double t) {
    // 自定义缓动函数
    return t * t * (3.0 - 2.0 * t);
  }
}

class CustomAnimationExample extends StatefulWidget {
  @override
  _CustomAnimationExampleState createState() => _CustomAnimationExampleState();
}

class _CustomAnimationExampleState extends State<CustomAnimationExample>
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
      curve: CustomCurve(),
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return Transform.translate(
              offset: Offset(0, 100 * (1 - _animation.value)),
              child: Container(
                width: 100,
                height: 100,
                color: Colors.purple,
                child: Center(
                  child: Text('Custom Animation'),
                ),
              ),
            );
          },
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            if (_controller.status == AnimationStatus.completed) {
              _controller.reverse();
            } else {
              _controller.forward();
            }
          },
          child: Text('Animate'),
        ),
      ],
    );
  }
}
```

### 2. 交错动画

```dart
class StaggeredAnimationExample extends StatefulWidget {
  @override
  _StaggeredAnimationExampleState createState() => _StaggeredAnimationExampleState();
}

class _StaggeredAnimationExampleState extends State<StaggeredAnimationExample>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(milliseconds: 1500),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Interval(0.0, 0.5, curve: Curves.easeOut),
    ));

    _slideAnimation = Tween<Offset>(
      begin: Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Interval(0.2, 0.7, curve: Curves.easeOut),
    ));

    _scaleAnimation = Tween<double>(
      begin: 0.5,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Interval(0.4, 1.0, curve: Curves.elasticOut),
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            return SlideTransition(
              position: _slideAnimation,
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: ScaleTransition(
                  scale: _scaleAnimation,
                  child: Container(
                    width: 200,
                    height: 100,
                    decoration: BoxDecoration(
                      color: Colors.blue,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Center(
                      child: Text(
                        'Staggered Animation',
                        style: TextStyle(color: Colors.white, fontSize: 16),
                      ),
                    ),
                  ),
                ),
              ),
            );
          },
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            if (_controller.status == AnimationStatus.completed) {
              _controller.reverse();
            } else {
              _controller.forward();
            }
          },
          child: Text('Start Staggered Animation'),
        ),
      ],
    );
  }
}
```

## 页面转场动画

### 1. 自定义页面路由

```dart
class CustomPageRoute extends PageRouteBuilder {
  final Widget child;
  
  CustomPageRoute({required this.child})
      : super(
          pageBuilder: (context, animation, secondaryAnimation) => child,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            const begin = Offset(1.0, 0.0);
            const end = Offset.zero;
            const curve = Curves.easeInOut;
            
            var tween = Tween(begin: begin, end: end).chain(
              CurveTween(curve: curve),
            );
            
            return SlideTransition(
              position: animation.drive(tween),
              child: child,
            );
          },
        );
}

// 使用自定义路由
Navigator.push(
  context,
  CustomPageRoute(child: SecondPage()),
);
```

### 2. Hero 动画

```dart
// 第一个页面
class FirstPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('First Page')),
      body: Center(
        child: Hero(
          tag: 'hero-tag',
          child: GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => SecondPage()),
              );
            },
            child: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Icon(Icons.flutter_dash, color: Colors.white, size: 50),
            ),
          ),
        ),
      ),
    );
  }
}

// 第二个页面
class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Second Page')),
      body: Center(
        child: Hero(
          tag: 'hero-tag',
          child: Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              color: Colors.blue,
              borderRadius: BorderRadius.circular(40),
            ),
            child: Icon(Icons.flutter_dash, color: Colors.white, size: 100),
          ),
        ),
      ),
    );
  }
}
```

## 性能优化

### 1. 使用 RepaintBoundary

```dart
class OptimizedAnimationExample extends StatefulWidget {
  @override
  _OptimizedAnimationExampleState createState() => _OptimizedAnimationExampleState();
}

class _OptimizedAnimationExampleState extends State<OptimizedAnimationExample>
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
    return Column(
      children: [
        RepaintBoundary(
          child: AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Transform.rotate(
                angle: _animation.value * 2 * 3.14159,
                child: Container(
                  width: 100,
                  height: 100,
                  color: Colors.green,
                  child: Center(
                    child: Text('Optimized'),
                  ),
                ),
              );
            },
          ),
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            if (_controller.status == AnimationStatus.completed) {
              _controller.reverse();
            } else {
              _controller.forward();
            }
          },
          child: Text('Animate'),
        ),
      ],
    );
  }
}
```

### 2. 动画监听

```dart
class AnimationListenerExample extends StatefulWidget {
  @override
  _AnimationListenerExampleState createState() => _AnimationListenerExampleState();
}

class _AnimationListenerExampleState extends State<AnimationListenerExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  String _status = '';

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

    _controller.addListener(() {
      setState(() {
        _status = 'Progress: ${(_animation.value * 100).toStringAsFixed(1)}%';
      });
    });

    _controller.addStatusListener((status) {
      setState(() {
        switch (status) {
          case AnimationStatus.forward:
            _status = 'Animation started';
            break;
          case AnimationStatus.reverse:
            _status = 'Animation reversed';
            break;
          case AnimationStatus.completed:
            _status = 'Animation completed';
            break;
          case AnimationStatus.dismissed:
            _status = 'Animation dismissed';
            break;
        }
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return Transform.scale(
              scale: _animation.value,
              child: Container(
                width: 100,
                height: 100,
                color: Colors.red,
                child: Center(
                  child: Text('Listener'),
                ),
              ),
            );
          },
        ),
        SizedBox(height: 20),
        Text(_status),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            if (_controller.status == AnimationStatus.completed) {
              _controller.reverse();
            } else {
              _controller.forward();
            }
          },
          child: Text('Animate'),
        ),
      ],
    );
  }
}
```

## 总结

Flutter 动画系统的特点：
- **声明式**: 通过 Widget 树描述动画
- **高性能**: 60fps 流畅动画
- **丰富**: 内置多种动画 Widget
- **灵活**: 支持自定义动画曲线和控制器
- **优化**: 提供性能优化工具 