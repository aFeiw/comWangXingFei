# State 管理

Flutter 中的状态管理是应用开发的核心概念，合理的状态管理方案能够提高应用的可维护性和性能。

## 状态管理基础

### 1. 状态类型

#### Ephemeral State (临时状态)
```dart
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0; // 临时状态
  
  void _increment() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_counter'),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

#### App State (应用状态)
```dart
// 全局状态，需要在多个 Widget 间共享
class User {
  final String name;
  final String email;
  
  User({required this.name, required this.email});
}

class AppState extends ChangeNotifier {
  User? _currentUser;
  bool _isLoading = false;
  
  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  
  void setUser(User user) {
    _currentUser = user;
    notifyListeners();
  }
  
  void setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void logout() {
    _currentUser = null;
    notifyListeners();
  }
}
```

## Provider 状态管理

### 1. 基本使用

```dart
import 'package:provider/provider.dart';

// 创建 Provider
class CounterProvider extends ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
  
  void decrement() {
    _count--;
    notifyListeners();
  }
}

// 在 MaterialApp 中提供 Provider
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterProvider(),
      child: MyApp(),
    ),
  );
}

// 在 Widget 中使用
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<CounterProvider>(
      builder: (context, counter, child) {
        return Column(
          children: [
            Text('Count: ${counter.count}'),
            ElevatedButton(
              onPressed: () => counter.increment(),
              child: Text('Increment'),
            ),
            ElevatedButton(
              onPressed: () => counter.decrement(),
              child: Text('Decrement'),
            ),
          ],
        );
      },
    );
  }
}
```

### 2. 多 Provider

```dart
// 用户状态
class UserProvider extends ChangeNotifier {
  User? _user;
  
  User? get user => _user;
  
  void login(String email, String password) async {
    // 模拟登录
    await Future.delayed(Duration(seconds: 1));
    _user = User(name: 'John Doe', email: email);
    notifyListeners();
  }
  
  void logout() {
    _user = null;
    notifyListeners();
  }
}

// 主题状态
class ThemeProvider extends ChangeNotifier {
  bool _isDarkMode = false;
  
  bool get isDarkMode => _isDarkMode;
  ThemeData get theme => _isDarkMode ? ThemeData.dark() : ThemeData.light();
  
  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    notifyListeners();
  }
}

// 多 Provider 设置
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider()),
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => CounterProvider()),
      ],
      child: MyApp(),
    ),
  );
}
```

### 3. Selector 优化

```dart
// 使用 Selector 只监听特定状态变化
class OptimizedWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Selector<CounterProvider, int>(
      selector: (context, provider) => provider.count,
      builder: (context, count, child) {
        return Text('Count: $count');
      },
    );
  }
}

// 监听多个状态
class UserProfileWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Selector2<UserProvider, ThemeProvider, User?>(
      selector: (context, userProvider, themeProvider) => userProvider.user,
      builder: (context, user, child) {
        if (user == null) {
          return Text('Please login');
        }
        return Column(
          children: [
            Text('Welcome, ${user.name}'),
            Text('Email: ${user.email}'),
          ],
        );
      },
    );
  }
}
```

## Riverpod 状态管理

### 1. 基本使用

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// 创建 Provider
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state++;
  void decrement() => state--;
}

// 在 Widget 中使用
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => ref.read(counterProvider.notifier).increment(),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

### 2. Future Provider

```dart
// 异步数据 Provider
final userProvider = FutureProvider<User>((ref) async {
  // 模拟网络请求
  await Future.delayed(Duration(seconds: 2));
  return User(name: 'John Doe', email: 'john@example.com');
});

// 在 Widget 中使用
class UserWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userProvider);
    
    return userAsync.when(
      data: (user) => Text('Welcome, ${user.name}'),
      loading: () => CircularProgressIndicator(),
      error: (error, stack) => Text('Error: $error'),
    );
  }
}
```

### 3. State Provider

```dart
// 简单状态
final themeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.light);

// 在 Widget 中使用
class ThemeToggleWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);
    
    return Switch(
      value: themeMode == ThemeMode.dark,
      onChanged: (isDark) {
        ref.read(themeProvider.notifier).state = 
          isDark ? ThemeMode.dark : ThemeMode.light;
      },
    );
  }
}
```

## Bloc 状态管理

### 1. 基本 Bloc

```dart
import 'package:flutter_bloc/flutter_bloc.dart';

// 事件
abstract class CounterEvent {}

class IncrementEvent extends CounterEvent {}
class DecrementEvent extends CounterEvent {}

// 状态
abstract class CounterState {
  final int count;
  CounterState(this.count);
}

class CounterInitial extends CounterState {
  CounterInitial() : super(0);
}

class CounterUpdated extends CounterState {
  CounterUpdated(int count) : super(count);
}

// Bloc
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterInitial()) {
    on<IncrementEvent>((event, emit) {
      emit(CounterUpdated(state.count + 1));
    });
    
    on<DecrementEvent>((event, emit) {
      emit(CounterUpdated(state.count - 1));
    });
  }
}

// 在 Widget 中使用
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => CounterBloc(),
      child: BlocBuilder<CounterBloc, CounterState>(
        builder: (context, state) {
          return Column(
            children: [
              Text('Count: ${state.count}'),
              ElevatedButton(
                onPressed: () => context.read<CounterBloc>().add(IncrementEvent()),
                child: Text('Increment'),
              ),
              ElevatedButton(
                onPressed: () => context.read<CounterBloc>().add(DecrementEvent()),
                child: Text('Decrement'),
              ),
            ],
          );
        },
      ),
    );
  }
}
```

### 2. 异步 Bloc

```dart
// 用户事件
abstract class UserEvent {}

class LoadUserEvent extends UserEvent {}
class LoginEvent extends UserEvent {
  final String email;
  final String password;
  LoginEvent(this.email, this.password);
}

// 用户状态
abstract class UserState {}

class UserInitial extends UserState {}
class UserLoading extends UserState {}
class UserLoaded extends UserState {
  final User user;
  UserLoaded(this.user);
}
class UserError extends UserState {
  final String message;
  UserError(this.message);
}

// 用户 Bloc
class UserBloc extends Bloc<UserEvent, UserState> {
  UserBloc() : super(UserInitial()) {
    on<LoadUserEvent>((event, emit) async {
      emit(UserLoading());
      try {
        // 模拟网络请求
        await Future.delayed(Duration(seconds: 1));
        final user = User(name: 'John Doe', email: 'john@example.com');
        emit(UserLoaded(user));
      } catch (e) {
        emit(UserError(e.toString()));
      }
    });
    
    on<LoginEvent>((event, emit) async {
      emit(UserLoading());
      try {
        // 模拟登录
        await Future.delayed(Duration(seconds: 1));
        final user = User(name: 'Logged User', email: event.email);
        emit(UserLoaded(user));
      } catch (e) {
        emit(UserError(e.toString()));
      }
    });
  }
}
```

## GetX 状态管理

### 1. 基本使用

```dart
import 'package:get/get.dart';

// 控制器
class CounterController extends GetxController {
  var count = 0.obs;
  
  void increment() => count++;
  void decrement() => count--;
}

// 在 Widget 中使用
class CounterWidget extends GetView<CounterController> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Obx(() => Text('Count: ${controller.count}')),
        ElevatedButton(
          onPressed: controller.increment,
          child: Text('Increment'),
        ),
        ElevatedButton(
          onPressed: controller.decrement,
          child: Text('Decrement'),
        ),
      ],
    );
  }
}

// 绑定控制器
void main() {
  Get.put(CounterController());
  runApp(MyApp());
}
```

### 2. 响应式状态

```dart
class UserController extends GetxController {
  var user = Rx<User?>(null);
  var isLoading = false.obs;
  
  void login(String email, String password) async {
    isLoading.value = true;
    try {
      await Future.delayed(Duration(seconds: 1));
      user.value = User(name: 'John Doe', email: email);
    } catch (e) {
      Get.snackbar('Error', e.toString());
    } finally {
      isLoading.value = false;
    }
  }
  
  void logout() {
    user.value = null;
  }
}

// 在 Widget 中使用
class UserWidget extends GetView<UserController> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Obx(() {
          if (controller.isLoading.value) {
            return CircularProgressIndicator();
          }
          return controller.user.value != null
              ? Text('Welcome, ${controller.user.value!.name}')
              : Text('Please login');
        }),
        ElevatedButton(
          onPressed: () => controller.login('john@example.com', 'password'),
          child: Text('Login'),
        ),
      ],
    );
  }
}
```

## 状态管理最佳实践

### 1. 状态分离

```dart
// 将状态按功能分离
class AuthState extends ChangeNotifier {
  User? _user;
  bool _isLoading = false;
  
  User? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _user != null;
  
  Future<void> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();
    
    try {
      // 登录逻辑
      _user = await authService.login(email, password);
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}

class ThemeState extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.light;
  
  ThemeMode get themeMode => _themeMode;
  
  void toggleTheme() {
    _themeMode = _themeMode == ThemeMode.light 
        ? ThemeMode.dark 
        : ThemeMode.light;
    notifyListeners();
  }
}
```

### 2. 状态持久化

```dart
import 'package:shared_preferences/shared_preferences.dart';

class PersistentState extends ChangeNotifier {
  static const String _themeKey = 'theme_mode';
  static const String _userKey = 'user_data';
  
  ThemeMode _themeMode = ThemeMode.light;
  User? _user;
  
  ThemeMode get themeMode => _themeMode;
  User? get user => _user;
  
  // 加载持久化数据
  Future<void> loadPersistedData() async {
    final prefs = await SharedPreferences.getInstance();
    
    // 加载主题设置
    final themeIndex = prefs.getInt(_themeKey) ?? 0;
    _themeMode = ThemeMode.values[themeIndex];
    
    // 加载用户数据
    final userData = prefs.getString(_userKey);
    if (userData != null) {
      _user = User.fromJson(jsonDecode(userData));
    }
    
    notifyListeners();
  }
  
  // 保存主题设置
  Future<void> setThemeMode(ThemeMode mode) async {
    _themeMode = mode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_themeKey, mode.index);
    notifyListeners();
  }
  
  // 保存用户数据
  Future<void> setUser(User user) async {
    _user = user;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userKey, jsonEncode(user.toJson()));
    notifyListeners();
  }
}
```

### 3. 状态测试

```dart
// 测试 Provider
void main() {
  group('CounterProvider Tests', () {
    late CounterProvider provider;
    
    setUp(() {
      provider = CounterProvider();
    });
    
    test('initial count should be 0', () {
      expect(provider.count, 0);
    });
    
    test('increment should increase count by 1', () {
      provider.increment();
      expect(provider.count, 1);
    });
    
    test('decrement should decrease count by 1', () {
      provider.increment();
      provider.decrement();
      expect(provider.count, 0);
    });
  });
}
```

## 总结

状态管理方案选择：
- **Provider**: 简单应用，学习成本低
- **Riverpod**: 现代化方案，类型安全，测试友好
- **Bloc**: 复杂应用，事件驱动，可预测
- **GetX**: 全功能框架，包含路由、依赖注入等

选择原则：
1. **项目规模**: 小项目用 Provider，大项目用 Bloc
2. **团队经验**: 熟悉度优先考虑
3. **性能要求**: 考虑渲染优化和内存使用
4. **测试需求**: 选择易于测试的方案 