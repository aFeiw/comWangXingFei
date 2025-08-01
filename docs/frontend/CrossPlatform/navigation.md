# 导航组件

Flutter 提供了多种导航组件和方式，用于实现页面间的跳转和导航。

## 基础导航

### 1. Navigator

```dart
// 基础页面跳转
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondPage()),
);

// 带参数的页面跳转
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailPage(id: 123),
  ),
);

// 返回上一页
Navigator.pop(context);

// 返回上一页并传递数据
Navigator.pop(context, '返回的数据');
```

### 2. 命名路由

```dart
// 在 MaterialApp 中定义路由
MaterialApp(
  title: 'Navigation Demo',
  initialRoute: '/',
  routes: {
    '/': (context) => HomePage(),
    '/detail': (context) => DetailPage(),
    '/profile': (context) => ProfilePage(),
  },
);

// 使用命名路由跳转
Navigator.pushNamed(context, '/detail');

// 带参数的命名路由
Navigator.pushNamed(context, '/detail', arguments: {'id': 123});
```

### 3. 路由参数传递

```dart
// 传递参数
Navigator.pushNamed(
  context,
  '/detail',
  arguments: {'id': 123, 'title': '详情页'},
);

// 接收参数
class DetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final id = args['id'];
    final title = args['title'];
    
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(child: Text('ID: $id')),
    );
  }
}
```

## 底部导航

### 1. BottomNavigationBar

```dart
class BottomNavExample extends StatefulWidget {
  @override
  _BottomNavExampleState createState() => _BottomNavExampleState();
}

class _BottomNavExampleState extends State<BottomNavExample> {
  int _currentIndex = 0;
  
  final List<Widget> _pages = [
    HomePage(),
    SearchPage(),
    ProfilePage(),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: '首页',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: '搜索',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: '我的',
          ),
        ],
      ),
    );
  }
}
```

### 2. CupertinoTabBar

```dart
class CupertinoTabExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CupertinoTabScaffold(
      tabBar: CupertinoTabBar(
        items: [
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.home),
            label: '首页',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.search),
            label: '搜索',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.person),
            label: '我的',
          ),
        ],
      ),
      tabBuilder: (context, index) {
        return CupertinoTabView(
          builder: (context) {
            return CupertinoPageScaffold(
              navigationBar: CupertinoNavigationBar(
                middle: Text('Tab ${index + 1}'),
              ),
              child: Center(
                child: Text('Tab ${index + 1} Content'),
              ),
            );
          },
        );
      },
    );
  }
}
```

## 标签页导航

### 1. TabBar

```dart
class TabBarExample extends StatefulWidget {
  @override
  _TabBarExampleState createState() => _TabBarExampleState();
}

class _TabBarExampleState extends State<TabBarExample> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }
  
  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Tab Bar Example'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(icon: Icon(Icons.home), text: '首页'),
            Tab(icon: Icon(Icons.search), text: '搜索'),
            Tab(icon: Icon(Icons.person), text: '我的'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          Center(child: Text('首页内容')),
          Center(child: Text('搜索内容')),
          Center(child: Text('我的内容')),
        ],
      ),
    );
  }
}
```

### 2. TabBarView

```dart
TabBarView(
  controller: _tabController,
  children: [
    ListView.builder(
      itemCount: 20,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text('Item $index'),
        );
      },
    ),
    GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      itemCount: 20,
      itemBuilder: (context, index) {
        return Card(
          child: Center(child: Text('Grid $index')),
        );
      },
    ),
    Center(child: Text('个人中心')),
  ],
)
```

## 抽屉导航

### 1. Drawer

```dart
Scaffold(
  appBar: AppBar(title: Text('Drawer Example')),
  drawer: Drawer(
    child: ListView(
      padding: EdgeInsets.zero,
      children: [
        DrawerHeader(
          decoration: BoxDecoration(
            color: Colors.blue,
          ),
          child: Text(
            'Drawer Header',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
            ),
          ),
        ),
        ListTile(
          leading: Icon(Icons.home),
          title: Text('首页'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushNamed(context, '/');
          },
        ),
        ListTile(
          leading: Icon(Icons.settings),
          title: Text('设置'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushNamed(context, '/settings');
          },
        ),
        ListTile(
          leading: Icon(Icons.help),
          title: Text('帮助'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushNamed(context, '/help');
          },
        ),
      ],
    ),
  ),
  body: Center(child: Text('主页面内容')),
)
```

### 2. EndDrawer

```dart
Scaffold(
  appBar: AppBar(
    title: Text('End Drawer Example'),
    actions: [
      IconButton(
        icon: Icon(Icons.menu),
        onPressed: () {
          Scaffold.of(context).openEndDrawer();
        },
      ),
    ],
  ),
  endDrawer: Drawer(
    child: ListView(
      children: [
        ListTile(
          title: Text('选项 1'),
          onTap: () {
            Navigator.pop(context);
          },
        ),
        ListTile(
          title: Text('选项 2'),
          onTap: () {
            Navigator.pop(context);
          },
        ),
      ],
    ),
  ),
  body: Center(child: Text('主页面内容')),
)
```

## 面包屑导航

### 1. BreadcrumbNavigation

```dart
class BreadcrumbExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('面包屑导航'),
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(40),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                TextButton(
                  onPressed: () {},
                  child: Text('首页'),
                ),
                Icon(Icons.chevron_right),
                TextButton(
                  onPressed: () {},
                  child: Text('分类'),
                ),
                Icon(Icons.chevron_right),
                Text('详情'),
              ],
            ),
          ),
        ),
      ),
      body: Center(child: Text('页面内容')),
    );
  }
}
```

## 自定义导航

### 1. 自定义 PageRoute

```dart
class CustomPageRoute extends PageRouteBuilder {
  final Widget page;
  
  CustomPageRoute({required this.page})
      : super(
          pageBuilder: (context, animation, secondaryAnimation) => page,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            const begin = Offset(1.0, 0.0);
            const end = Offset.zero;
            const curve = Curves.ease;
            
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
  CustomPageRoute(page: SecondPage()),
);
```

### 2. 自定义导航栏

```dart
class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final List<Widget>? actions;
  
  CustomAppBar({required this.title, this.actions});
  
  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(title),
      actions: actions,
      backgroundColor: Colors.transparent,
      elevation: 0,
      flexibleSpace: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.blue, Colors.purple],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
      ),
    );
  }
  
  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
```

## 导航状态管理

### 1. 使用 Provider 管理导航状态

```dart
class NavigationProvider extends ChangeNotifier {
  int _currentIndex = 0;
  
  int get currentIndex => _currentIndex;
  
  void setIndex(int index) {
    _currentIndex = index;
    notifyListeners();
  }
}

// 在 Widget 中使用
class NavigationExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => NavigationProvider(),
      child: Consumer<NavigationProvider>(
        builder: (context, navigationProvider, child) {
          return Scaffold(
            body: _pages[navigationProvider.currentIndex],
            bottomNavigationBar: BottomNavigationBar(
              currentIndex: navigationProvider.currentIndex,
              onTap: (index) => navigationProvider.setIndex(index),
              items: [
                BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
                BottomNavigationBarItem(icon: Icon(Icons.search), label: '搜索'),
                BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
              ],
            ),
          );
        },
      ),
    );
  }
}
```

## 总结

Flutter 导航组件的特点：
- **多样化**: 支持多种导航方式
- **灵活**: 可以自定义导航行为
- **易用**: 提供简洁的 API
- **性能**: 高效的页面切换
- **可扩展**: 支持自定义路由和转场动画 