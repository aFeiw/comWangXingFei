# Dart 语言基础

Dart 是 Flutter 开发的核心语言，由 Google 开发，具有强类型、面向对象的特性。

## 基础语法

### 1. 变量声明

```dart
// 变量声明
var name = 'Flutter'; // 类型推断
String title = 'Dart Basics'; // 显式类型声明
final String constant = 'Immutable'; // 常量
const double pi = 3.14159; // 编译时常量

// 空安全
String? nullableString; // 可空类型
String nonNullableString = 'Hello'; // 非空类型
```

### 2. 数据类型

#### 基本类型
```dart
// 数字类型
int integer = 42;
double decimal = 3.14;
num number = 10; // int 或 double

// 字符串
String text = 'Hello Dart';
String multiLine = '''
  多行
  字符串
''';

// 布尔值
bool isTrue = true;
bool isFalse = false;

// 列表
List<String> fruits = ['apple', 'banana', 'orange'];
List<int> numbers = [1, 2, 3, 4, 5];

// 集合
Set<String> uniqueFruits = {'apple', 'banana', 'apple'}; // 重复元素会被忽略

// 映射
Map<String, dynamic> person = {
  'name': 'John',
  'age': 30,
  'city': 'New York',
};
```

#### 集合操作
```dart
// 列表操作
List<int> numbers = [1, 2, 3];
numbers.add(4);
numbers.remove(1);
numbers.insert(0, 0);

// 集合操作
Set<int> set1 = {1, 2, 3};
Set<int> set2 = {3, 4, 5};
Set<int> union = set1.union(set2);
Set<int> intersection = set1.intersection(set2);

// 映射操作
Map<String, int> scores = {'Alice': 100, 'Bob': 85};
scores['Charlie'] = 90;
scores.remove('Bob');
```

### 3. 函数

#### 基本函数
```dart
// 基本函数定义
void sayHello() {
  print('Hello Dart!');
}

// 带参数的函数
void greet(String name) {
  print('Hello, $name!');
}

// 带返回值的函数
int add(int a, int b) {
  return a + b;
}

// 箭头函数
int multiply(int a, int b) => a * b;

// 可选参数
void printInfo(String name, [int? age, String? city]) {
  print('Name: $name');
  if (age != null) print('Age: $age');
  if (city != null) print('City: $city');
}

// 命名参数
void createPerson({required String name, int? age, String? city}) {
  print('Name: $name');
  if (age != null) print('Age: $age');
  if (city != null) print('City: $city');
}

// 默认参数
void greetWithDefault(String name, {String greeting = 'Hello'}) {
  print('$greeting, $name!');
}
```

#### 高阶函数
```dart
// 函数作为参数
void executeFunction(Function callback) {
  callback();
}

// 函数作为返回值
Function createMultiplier(int factor) {
  return (int value) => value * factor;
}

// 使用示例
void main() {
  executeFunction(() => print('Callback executed'));
  
  var multiplyByTwo = createMultiplier(2);
  print(multiplyByTwo(5)); // 输出: 10
}
```

### 4. 类与对象

#### 基本类定义
```dart
class Person {
  // 实例变量
  String name;
  int age;
  
  // 构造函数
  Person(this.name, this.age);
  
  // 命名构造函数
  Person.guest() : name = 'Guest', age = 18;
  
  // 工厂构造函数
  factory Person.fromJson(Map<String, dynamic> json) {
    return Person(json['name'], json['age']);
  }
  
  // 方法
  void introduce() {
    print('Hi, I\'m $name and I\'m $age years old.');
  }
  
  // Getter
  String get description => '$name ($age years old)';
  
  // Setter
  set updateAge(int newAge) {
    if (newAge >= 0) {
      age = newAge;
    }
  }
}
```

#### 继承
```dart
class Animal {
  String name;
  
  Animal(this.name);
  
  void makeSound() {
    print('Some sound');
  }
}

class Dog extends Animal {
  String breed;
  
  Dog(String name, this.breed) : super(name);
  
  @override
  void makeSound() {
    print('Woof!');
  }
  
  void fetch() {
    print('$name is fetching the ball');
  }
}
```

#### 抽象类
```dart
abstract class Shape {
  double get area;
  double get perimeter;
  
  void draw();
}

class Circle extends Shape {
  double radius;
  
  Circle(this.radius);
  
  @override
  double get area => 3.14159 * radius * radius;
  
  @override
  double get perimeter => 2 * 3.14159 * radius;
  
  @override
  void draw() {
    print('Drawing a circle with radius $radius');
  }
}
```

#### 接口
```dart
abstract class Flyable {
  void fly();
}

abstract class Swimmable {
  void swim();
}

class Duck implements Flyable, Swimmable {
  @override
  void fly() {
    print('Duck is flying');
  }
  
  @override
  void swim() {
    print('Duck is swimming');
  }
}
```

### 5. 异步编程

#### Future
```dart
// 基本 Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Data fetched successfully';
}

// 使用 Future
void main() async {
  print('Starting...');
  String result = await fetchData();
  print(result);
}

// Future 链式调用
Future<int> processData() async {
  return await fetchData()
      .then((data) => data.length)
      .catchError((error) {
        print('Error: $error');
        return 0;
      });
}
```

#### Stream
```dart
import 'dart:async';

// 创建 Stream
Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(milliseconds: 500));
    yield i;
  }
}

// 使用 Stream
void main() async {
  await for (int count in countStream(5)) {
    print('Count: $count');
  }
}

// Stream 转换
void transformStream() async {
  countStream(5)
      .map((count) => count * 2)
      .where((count) => count > 5)
      .listen((count) => print('Transformed: $count'));
}
```

### 6. 泛型

```dart
// 泛型类
class Box<T> {
  T value;
  
  Box(this.value);
  
  T getValue() => value;
  void setValue(T newValue) => value = newValue;
}

// 泛型方法
T findMax<T extends Comparable>(List<T> list) {
  if (list.isEmpty) throw ArgumentError('List is empty');
  
  T max = list[0];
  for (T item in list) {
    if (item.compareTo(max) > 0) {
      max = item;
    }
  }
  return max;
}

// 使用示例
void main() {
  var stringBox = Box<String>('Hello');
  var intBox = Box<int>(42);
  
  List<int> numbers = [1, 5, 3, 9, 2];
  int maxNumber = findMax(numbers);
  print('Max number: $maxNumber');
}
```

### 7. 异常处理

```dart
// 基本异常处理
void divideNumbers(int a, int b) {
  try {
    double result = a / b;
    print('Result: $result');
  } on IntegerDivisionByZeroException {
    print('Error: Division by zero');
  } catch (e) {
    print('Error: $e');
  } finally {
    print('Operation completed');
  }
}

// 自定义异常
class CustomException implements Exception {
  final String message;
  
  CustomException(this.message);
  
  @override
  String toString() => 'CustomException: $message';
}

// 抛出异常
void validateAge(int age) {
  if (age < 0) {
    throw CustomException('Age cannot be negative');
  }
  if (age > 150) {
    throw CustomException('Age seems unrealistic');
  }
}
```

### 8. 扩展方法

```dart
// 为 String 添加扩展方法
extension StringExtension on String {
  bool get isPalindrome {
    String cleaned = this.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '');
    return cleaned == cleaned.split('').reversed.join('');
  }
  
  String get reversed => split('').reversed.join('');
  
  int get wordCount => split(' ').length;
}

// 为 List 添加扩展方法
extension ListExtension<T> on List<T> {
  List<T> get reversed => toList().reversed.toList();
  
  T? get firstOrNull => isEmpty ? null : first;
  
  List<T> takeFirst(int count) {
    return take(count).toList();
  }
}

// 使用扩展方法
void main() {
  String text = 'A man a plan a canal Panama';
  print(text.isPalindrome); // true
  
  List<int> numbers = [1, 2, 3, 4, 5];
  print(numbers.takeFirst(3)); // [1, 2, 3]
}
```

### 9. 空安全最佳实践

```dart
// 空安全示例
class User {
  final String name;
  final String? email; // 可空
  final int age;
  
  User({
    required this.name,
    this.email, // 可选参数
    required this.age,
  });
  
  // 安全访问
  String get displayName => email ?? 'No email provided';
  
  // 条件访问
  void sendEmail() {
    if (email != null) {
      print('Sending email to $email');
    } else {
      print('No email available');
    }
  }
}

// 使用 late 关键字
class Database {
  late final String connectionString;
  
  void initialize(String connection) {
    connectionString = connection;
  }
}
```

### 10. 集合操作

```dart
void collectionOperations() {
  List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // 过滤
  List<int> evenNumbers = numbers.where((n) => n.isEven).toList();
  
  // 映射
  List<String> numberStrings = numbers.map((n) => 'Number $n').toList();
  
  // 归约
  int sum = numbers.reduce((a, b) => a + b);
  
  // 折叠
  String concatenated = numbers.fold('', (str, n) => '$str$n');
  
  // 排序
  List<int> sorted = numbers.toList()..sort();
  
  // 去重
  List<int> unique = numbers.toSet().toList();
}
```

## 总结

Dart 语言的特点：
- **强类型**: 编译时类型检查，提高代码质量
- **面向对象**: 支持类、继承、多态等特性
- **空安全**: 编译时防止空指针异常
- **异步支持**: 内置 Future 和 Stream 支持
- **泛型**: 提供类型安全的通用代码
- **扩展方法**: 为现有类型添加新功能
- **函数式编程**: 支持高阶函数和函数式编程范式 