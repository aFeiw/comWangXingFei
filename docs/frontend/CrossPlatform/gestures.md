# 手势处理

Flutter 提供了丰富的手势识别和处理功能，可以响应用户的各种触摸操作。

## 基础手势

### 1. GestureDetector

```dart
class GestureExample extends StatefulWidget {
  @override
  _GestureExampleState createState() => _GestureExampleState();
}

class _GestureExampleState extends State<GestureExample> {
  String _gestureInfo = 'No gesture detected';
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _gestureInfo = 'Tap detected';
        });
      },
      onDoubleTap: () {
        setState(() {
          _gestureInfo = 'Double tap detected';
        });
      },
      onLongPress: () {
        setState(() {
          _gestureInfo = 'Long press detected';
        });
      },
      onPanStart: (DragStartDetails details) {
        setState(() {
          _gestureInfo = 'Pan start at ${details.localPosition}';
        });
      },
      onPanUpdate: (DragUpdateDetails details) {
        setState(() {
          _gestureInfo = 'Pan update: ${details.delta}';
        });
      },
      onPanEnd: (DragEndDetails details) {
        setState(() {
          _gestureInfo = 'Pan end with velocity: ${details.velocity}';
        });
      },
      child: Container(
        width: 200,
        height: 200,
        color: Colors.blue,
        child: Center(
          child: Text(
            _gestureInfo,
            style: TextStyle(color: Colors.white),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
```

### 2. InkWell

```dart
class InkWellExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Tapped!')),
        );
      },
      onLongPress: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Long pressed!')),
        );
      },
      child: Container(
        width: 200,
        height: 100,
        decoration: BoxDecoration(
          color: Colors.green,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Center(
          child: Text(
            'Tap or Long Press',
            style: TextStyle(color: Colors.white, fontSize: 16),
          ),
        ),
      ),
    );
  }
}
```

## 拖拽手势

### 1. Draggable

```dart
class DraggableExample extends StatefulWidget {
  @override
  _DraggableExampleState createState() => _DraggableExampleState();
}

class _DraggableExampleState extends State<DraggableExample> {
  Color _draggedColor = Colors.red;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Draggable<Color>(
          data: _draggedColor,
          feedback: Container(
            width: 100,
            height: 100,
            color: _draggedColor.withOpacity(0.8),
            child: Center(child: Text('Dragging')),
          ),
          childWhenDragging: Container(
            width: 100,
            height: 100,
            color: Colors.grey,
            child: Center(child: Text('Dragged')),
          ),
          child: Container(
            width: 100,
            height: 100,
            color: _draggedColor,
            child: Center(child: Text('Drag Me')),
          ),
        ),
        SizedBox(height: 50),
        DragTarget<Color>(
          onWillAccept: (data) => data != null,
          onAccept: (Color color) {
            setState(() {
              _draggedColor = color;
            });
          },
          builder: (context, candidateData, rejectedData) {
            return Container(
              width: 150,
              height: 150,
              color: candidateData.isNotEmpty 
                  ? Colors.green.withOpacity(0.3)
                  : Colors.blue,
              child: Center(
                child: Text(
                  'Drop Here',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}
```

### 2. 自定义拖拽

```dart
class CustomDraggableWidget extends StatefulWidget {
  @override
  _CustomDraggableWidgetState createState() => _CustomDraggableWidgetState();
}

class _CustomDraggableWidgetState extends State<CustomDraggableWidget> {
  Offset _position = Offset.zero;
  
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          left: _position.dx,
          top: _position.dy,
          child: GestureDetector(
            onPanUpdate: (details) {
              setState(() {
                _position += details.delta;
              });
            },
            child: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.orange,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 8,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Center(
                child: Text(
                  'Drag Me',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
```

## 缩放手势

### 1. InteractiveViewer

```dart
class ZoomExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return InteractiveViewer(
      boundaryMargin: EdgeInsets.all(20.0),
      minScale: 0.5,
      maxScale: 4.0,
      child: Container(
        width: 300,
        height: 300,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.blue, Colors.purple],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Text(
            'Pinch to Zoom',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
```

### 2. 自定义缩放

```dart
class CustomScaleWidget extends StatefulWidget {
  @override
  _CustomScaleWidgetState createState() => _CustomScaleWidgetState();
}

class _CustomScaleWidgetState extends State<CustomScaleWidget> {
  double _scale = 1.0;
  double _baseScale = 1.0;
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onScaleStart: (ScaleStartDetails details) {
        _baseScale = _scale;
      },
      onScaleUpdate: (ScaleUpdateDetails details) {
        setState(() {
          _scale = (_baseScale * details.scale).clamp(0.5, 3.0);
        });
      },
      child: Transform.scale(
        scale: _scale,
        child: Container(
          width: 200,
          height: 200,
          decoration: BoxDecoration(
            color: Colors.green,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Center(
            child: Text(
              'Scale: ${_scale.toStringAsFixed(2)}x',
              style: TextStyle(color: Colors.white, fontSize: 16),
            ),
          ),
        ),
      ),
    );
  }
}
```

## 滑动删除

```dart
class SwipeToDeleteWidget extends StatefulWidget {
  @override
  _SwipeToDeleteWidgetState createState() => _SwipeToDeleteWidgetState();
}

class _SwipeToDeleteWidgetState extends State<SwipeToDeleteWidget> {
  final List<String> _items = List.generate(20, (index) => 'Item $index');
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _items.length,
      itemBuilder: (context, index) {
        return Dismissible(
          key: Key(_items[index]),
          background: Container(
            color: Colors.red,
            alignment: Alignment.centerRight,
            padding: EdgeInsets.only(right: 20.0),
            child: Icon(
              Icons.delete,
              color: Colors.white,
            ),
          ),
          direction: DismissDirection.endToStart,
          onDismissed: (direction) {
            setState(() {
              _items.removeAt(index);
            });
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('${_items[index]} deleted'),
                action: SnackBarAction(
                  label: 'Undo',
                  onPressed: () {
                    setState(() {
                      _items.insert(index, _items[index]);
                    });
                  },
                ),
              ),
            );
          },
          child: ListTile(
            title: Text(_items[index]),
            leading: Icon(Icons.list),
          ),
        );
      },
    );
  }
}
```

## 手势冲突处理

### 1. 手势识别器

```dart
class GestureConflictWidget extends StatefulWidget {
  @override
  _GestureConflictWidgetState createState() => _GestureConflictWidgetState();
}

class _GestureConflictWidgetState extends State<GestureConflictWidget> {
  String _gestureInfo = 'No gesture';
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _gestureInfo = 'Tap';
        });
      },
      child: RawGestureDetector(
        gestures: {
          TapGestureRecognizer: GestureRecognizerFactoryWithHandlers<TapGestureRecognizer>(
            () => TapGestureRecognizer(),
            (TapGestureRecognizer instance) {
              instance.onTap = () {
                setState(() {
                  _gestureInfo = 'Raw tap';
                });
              };
            },
          ),
          LongPressGestureRecognizer: GestureRecognizerFactoryWithHandlers<LongPressGestureRecognizer>(
            () => LongPressGestureRecognizer(),
            (LongPressGestureRecognizer instance) {
              instance.onLongPress = () {
                setState(() {
                  _gestureInfo = 'Long press';
                });
              };
            },
          ),
        },
        child: Container(
          width: 200,
          height: 200,
          color: Colors.blue,
          child: Center(
            child: Text(
              _gestureInfo,
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
          ),
        ),
      ),
    );
  }
}
```

### 2. 手势优先级

```dart
class GesturePriorityWidget extends StatefulWidget {
  @override
  _GesturePriorityWidgetState createState() => _GesturePriorityWidgetState();
}

class _GesturePriorityWidgetState extends State<GesturePriorityWidget> {
  String _gestureInfo = 'No gesture';
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _gestureInfo = 'Outer tap';
        });
      },
      child: GestureDetector(
        onTap: () {
          setState(() {
            _gestureInfo = 'Inner tap';
          });
        },
        child: Container(
          width: 200,
          height: 200,
          color: Colors.green,
          child: Center(
            child: Text(
              _gestureInfo,
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
          ),
        ),
      ),
    );
  }
}
```

## 自定义手势识别器

```dart
class CustomGestureRecognizer extends GestureRecognizer {
  CustomGestureRecognizer({Object? debugOwner}) : super(debugOwner: debugOwner);
  
  VoidCallback? onCustomGesture;
  
  @override
  void addPointer(PointerDownEvent event) {
    startTrackingPointer(event.pointer);
  }
  
  @override
  void handleEvent(PointerEvent event) {
    if (event is PointerUpEvent) {
      onCustomGesture?.call();
      stopTrackingPointer(event.pointer);
    }
  }
  
  @override
  void didStopTrackingLastPointer(int pointer) {
    dispose();
  }
  
  @override
  String get debugDescription => 'custom_gesture';
}

class CustomGestureWidget extends StatefulWidget {
  @override
  _CustomGestureWidgetState createState() => _CustomGestureWidgetState();
}

class _CustomGestureWidgetState extends State<CustomGestureWidget> {
  String _gestureInfo = 'No custom gesture';
  
  @override
  Widget build(BuildContext context) {
    return RawGestureDetector(
      gestures: {
        CustomGestureRecognizer: GestureRecognizerFactoryWithHandlers<CustomGestureRecognizer>(
          () => CustomGestureRecognizer(),
          (CustomGestureRecognizer instance) {
            instance.onCustomGesture = () {
              setState(() {
                _gestureInfo = 'Custom gesture detected!';
              });
            };
          },
        ),
      },
      child: Container(
        width: 200,
        height: 200,
        color: Colors.purple,
        child: Center(
          child: Text(
            _gestureInfo,
            style: TextStyle(color: Colors.white, fontSize: 16),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
```

## 手势动画

```dart
class GestureAnimationWidget extends StatefulWidget {
  @override
  _GestureAnimationWidgetState createState() => _GestureAnimationWidgetState();
}

class _GestureAnimationWidgetState extends State<GestureAnimationWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<Color?> _colorAnimation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(milliseconds: 150),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
    _colorAnimation = ColorTween(
      begin: Colors.blue,
      end: Colors.red,
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
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: Container(
              width: 150,
              height: 150,
              decoration: BoxDecoration(
                color: _colorAnimation.value,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 8,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Center(
                child: Text(
                  'Tap Me',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
```

## 总结

Flutter 手势处理的特点：
- **丰富的手势支持**: 点击、拖拽、缩放、滑动等
- **手势冲突处理**: 通过 RawGestureDetector 解决
- **自定义手势**: 可以创建自定义手势识别器
- **手势动画**: 结合动画创建流畅的交互效果
- **性能优化**: 合理使用手势避免性能问题 