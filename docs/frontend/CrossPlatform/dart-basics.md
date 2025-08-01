# Dart 语言基础

Dart 是 Google 开发的面向对象编程语言，专为构建高性能、跨平台应用程序而设计。

## 变量与数据类型

```dart
// 变量声明
var name = 'Dart';
String language = 'Dart';
int version = 2.19;
double pi = 3.14159;
bool isFlutter = true;

// 常量
final String framework = 'Flutter';
const double gravity = 9.8;

// 集合类型
List<String> fruits = ['apple', 'banana'];
Map<String, dynamic> person = {'name': 'John', 'age': 30};
Set<String> colors = {'red', 'green', 'blue'};
```

## 函数

```dart
// 基本函数
void sayHello() {
  print('Hello, World!');
}

// 带参数和返回值
int add(int a, int b) => a + b;

// 可选参数
void printInfo(String name, [int? age]) {
  print('Name: $name');
  if (age != null) print('Age: $age');
}

// 命名参数
void createUser({required String name, int? age}) {
  print('Creating user: $name');
  if (age != null) print('Age: $age');
}
```

## 类与对象

```dart
class Person {
  String name;
  int age;
  
  Person(this.name, this.age);
  
  void introduce() {
    print('Hi, I\'m $name and I\'m $age years old.');
  }
  
  String get description => '$name ($age years old)';
}

// 继承
class Student extends Person {
  String major;
  
  Student(String name, int age, this.major) : super(name, age);
  
  @override
  void introduce() {
    print('Hi, I\'m $name, a $major student.');
  }
}
```

## 异步编程

```dart
// Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Data loaded';
}

// Stream
Stream<int> countStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}
```

## 错误处理

```dart
void divideNumbers(int a, int b) {
  try {
    double result = a / b;
    print('Result: $result');
  } catch (e) {
    print('Error: $e');
  }
}
``` 