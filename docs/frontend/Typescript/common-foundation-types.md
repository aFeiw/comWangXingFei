# 3. TypeScript 常用基础类型

可以将 TS 中的常用基础类型分为两类

1. JavaScript 已有类型

- 原始类型： **`number/string/boolean/null/undefined/symbol`**
- 对象类型：**`object`**(数组、对象、函数等)

1. TypeScript 新增类型

- 联合类型、自定义类型（类型别名）、接口、元祖、字面量类型、枚举、void、any 等

> 注意：原始类型在 TS 和 JS 中写法一致， 对象类型在 TS 中更加细化，每个具体对象都有自己的类型语法

## 3.1 原始类型

**`number/string/boolean/null/undefined/symbol`**

> 特点：可完全按照 JavaScript 中的名称来书写

```ts
let age: number = 18;
let username: string = '张三';
let isMerry: boolean = false;
let unique: Symbol = Symbol('shuiruohanyu');
```

##  3.2 数组类型

数组两种写法

1. `类型[]`写法， 如

```ts
let userList: string[] = ['John', 'Bob', 'Tony'];
let peopleList: object[] = [{ name: '张三', age: 18 }];
```

1. Array<类型>写法， 如

```ts
let user2List: Array<string> = ['John', 'Bob', 'Tony'];
let people2List: Array<object> = [{ name: '张三', age: 18 }];
```

##  3.3 联合类型

> 组中既有 number 类型，又有 string 类型，这个数组的类型应该如何写?

可以用`|`(竖线)分割多个类型， 如

```ts
let str: string | number = 1;
str = '张三';
```

如果数组中可以是字符串或者数字，则可以这么写

```ts
let arr: Array<number | string> = [1, 2, '张三'];
```



## 类型别名

> 当一个复杂类型或者联合类型过多或者被频繁使用时，可以通过类型别名来简化该类型的使用

用法：`type` 名称 = 具体类型

```ts
type CustomArray = Array<number | string>;
let arr1: CustomArray = [1, 2, '张三'];
```

以上代码中，`type`作为创建自定义类型的关键字

- 类型别名可以使任意合法的变量名称
- 推荐大驼峰的命名写法

##  3.4 函数类型

> 除了变量，我们常见的类型指定还有针对函数的类型声明

函数类型需要指的是 `函数参数`和`返回值`的类型，这里分为两种写法

- 第一种： 单独指定参数，返回值类型

```ts
// 单独指定函数返回值和函数参数
function add(num1: number, num2: number): number {
  return num1 + num2;
}
// 指定变量形式的
const add2 = (num1: number, num2: number): number => {
  return num1 + num2;
};
```

- 第二种， 同时指定参数和返回值

```ts
// 同时指定参数和返回值

type CustomFunc = (num1: number, num2: number) => number;

const add3: CustomFunc = (num1, num2) => {
  return num1 + num2;
};
```

注意： 当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型，这种形式`只适用于函数表达式`

### void 类型

当我们的函数定义为没有返回值的类型时，可用关键字`void`表示

```ts
// 没有返回值的函数
type CustomFunc1 = (num1: string, num2: number) => void;
const combinStr: CustomFunc1 = () => {};
```

如果一个函数没有返回值，此时，在 TS 的类型中，应该使用 `void` 类型

```ts
const add4 = () => {};
// 如果什么都不写 表示add4函数的类型为void

const add5 = (): void => {};
// 这种写法明确指定返回值为void与上方的类型相同

const add6 = (): undefined => {
  return undefined;
};
// 如果指定返回值为undefined  return undefined
```

### 函数可选参数

当我们定义函数时，有的参数可传可不传，这种情况下，可以使用 TS 的可选参数来指定类型

比如，在使用数组的`slice`方法时，我们可以直接使用`slice()` 也可以传入参数 `slice(1)` 也可以`slice(1,3)`

```ts
const slice = (start?: number, end?: number): void => {};
```

`?` 表示该参数或者变量可传可不传

注意：**可选参数只能出现在参数列表的最后**， 即必须参数必须在可选参数之前

##  3.5 对象类型

JS 中的对象是由属性和方法组成的，TS 的对象类型是**对象中属性和方法的描述**

写法

```ts
// 如果有多个属性 可以换行 去掉间隔符号

let person3: {
  name: string;
  sayHello: Function;
} = {
  name: '王五',
  sayHello() {},
};
```

总结： 可是使用`{}`来描述对象结构

属性采用`属性名：类型`形式

函数可以采用 `方法名(): 返回值类型` 或者 `函数名: Function`（不指定返回值）的形式

###  使用类型别名

直接使用`{}`会降低代码可读性，不具有辨识度，更推荐使用类型别名添加对象类型

```ts
type PersonObj = {
  name: string;
  sayHello(): string;
};

const p1: PersonObj = {
  name: '高大大',
  sayHello() {
    return this.name;
  },
};
```

### 带有参数的方法的类型

如果对象中的函数带有参数，可以在函数中指定参数类型

```ts
// 带参数的函数方法

type PersonObj2 = {
  name: string;
  sayHello(start: number): string;
};

const p2: PersonObj2 = {
  name: '高大大',
  sayHello(start) {
    return this.name;
  },
};
```

### 箭头函数形式的方法类型

```ts
// 箭头函数形式定义类型
type People = {
  sayHello: (start: number) => string;
};
const p3: People = {
  sayHello() {
    return '';
  },
};
```

### 对象可选属性

对象中的若干属性，有时也是可选的，此时我们依然可以使用`?`来表示

```ts
type Config = {
  method?: string;
  url: string;
};

const func = (config: Config) => {};
func({ url: '/a' });
```

##  3.7 接口 interface

当一个对象类型被多次使用时，一般使用接口（interface）描述对象的类型，达到复用的目的

- 我们使用`interface`关键字来声明接口
- 接口名称推荐以`I`为开头
- 声明接口之后，直接使用接口名称作为变量的类型

> 接口后不需要分号

```ts
// 接口

interface IPeople {
  name: string;
  age: number;
  sayHello(): void;
}

let p: IPeople = {
  name: '老高',
  age: 18,
  sayHello() {},
};
```

### 接口和自定义类型的区别

相同点：都可以给对象指定类型

不同点： 接口只能为对象指定类型， 类型别名可以为任意类型指定别名

- 推荐用 type 来定义

### 接口继承

- 如果两个接口之间有相同的属性和方法，可以讲**公共的属性和方法抽离出来，通过继承来实现复用**

比如，这两个接口都有 x、y 两个属性，重复写两次，可以，但很繁琐

```ts
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}
```

- 更好的方式

```ts
interface Point2D { x: number; y: number }
interface Point3D extends Point2D{
    z: number
}
```

我们使用`extends`关键字实现了 Point3D 继承了 Point2D 的所有属性的定义， 同时拥有继承的属性和自身自定义的属性

### 交叉类型

交叉类型（Intersection Types）： 

- 交叉类似表示需要满足多个类型的条件； 
- 交叉类型使用 & 符号

```typescript
type MyType = nnumber & string 
```

**表示同时满足**

`应用：`

```typescript
interface ISwim {
  swimming: () => void
}

interface IFly {
  flying: () => void
}

type MyType = ISwim & IFly

const obj: MyType = {
  swimming() {

  },
  flying() {
    
  }
}

export {}
```



##  3.8 类的使用

### 类的定义

- 我们来定义一个Person类： 

- 使用class关键字来定义一个类； 

- 我们可以声明一些类的属性：在类的内部声明类的属性以及对应的类型 

  - 如果类型没有声明，那么它们默认是any的； 我们也可以给属性设置初始化值； 

  - 在默认的strictPropertyInitialization模式下面我们的属性是必须初始化的，如果没有初始化，那么编译时就会报错； 
    - 如果我们在strictPropertyInitialization模式下确实不希望给属性初始化，可以使用 name!: string语法； 

- 类可以有自己的构造函数constructor，当我们通过new关键字创建一个 实例时，构造函数会被调用； 

  - 构造函数不需要返回任何值，默认返回当前创建出来的实例； 

- 类中可以有自己的函数，定义的函数称之为方法



```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + " eating")
  }
}

const p = new Person("why", 18)
console.log(p.name)
console.log(p.age)
p.eating()

export {}

```



### 类的继承

- 面向对象的其中一大特性就是继承，继承不仅仅可以减少我们的代码量，也是多态的使用前提。 
- 我们使用extends关键字来实现继承，子类中使用super来访问父类。 
- 我们来看一下Student类继承自Person： 
  - Student类可以有自己的属性和方法，并且会继承Person的属性和方法； 
  - 在构造函数中，我们可以通过super来调用父类的构造方法，对父类中的属性进行初始化类的多态



```ts
class Person {
  name: string = ""
  age: number = 0

  eating() {
    console.log("eating")
  }
}

class Student extends Person {
  sno: number = 0

  studying() {
    console.log("studying")
  }
}

const stu = new Student()
stu.name = "code"
stu.age = 10
console.log(stu.name)
console.log(stu.age)
stu.eating()
//输出
//coder
//10
//eating
```



```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log("eating 100行")
  }
}

class Student extends Person {
  sno: number

  constructor(name: string, age: number, sno: number) {
    // super调用父类的构造器
    super(name, age)
    this.sno = sno
  }

  eating() {
    console.log("student eating")
    super.eating()
  }

  studying() {
    console.log("studying")
  }
}

const stu = new Student("why", 18, 111)
console.log(stu.name)
console.log(stu.age)
console.log(stu.sno)

stu.eating()

//输出
//why
//18
//111
//student eating
//eating 100行

```

### 类的多态

```ts
class Animal {
  action() {
    console.log("animal action")
  }
}

class Dog extends Animal {
  action() {
    console.log("dog running!!!")
  }
}

class Fish extends Animal {
  action() {
    console.log("fish swimming")
  }
}

class Person extends Animal {

}

// animal: dog/fish
// 多态的目的是为了写出更加具备通用性的代码
function makeActions(animals: Animal[]) {
  animals.forEach(animal => {
    animal.action()
  })
}

makeActions([new Dog(), new Fish(), new Person()])

export {}
//输出
//dog running!!!
//fish swimming
//animal action
```

### 类的修饰符

- 在TypeScript中，类的属性和方法支持三种修饰符： public、private、protected 

  - public 修饰的是在任何地方可见、公有的属性或方法，默认编写的属性就是public的； 

  - private 修饰的是仅在同一类中可见、私有的属性或方法； 

  - protected 修饰的是仅在类自身及子类中可见、受保护的属性或方法； 

- public是默认的修饰符，也是可以直接访问的

`private`

```ts
class Person {
  private name: string = ""

  // 封装了两个方法, 通过方法来访问name
  getName() {
    return this.name
  }

  setName(newName) {
    this.name = newName
  }
}

const p = new Person()
console.log(p.getName())
p.setName("why")

export {}
```

`protected`

```ts
// protected: 在类内部和子类中可以访问

class Person {
  protected name: string = "123"
}

class Student extends Person {
  getName() {
    return this.name
  }
}

const stu = new Student()
console.log(stu.getName())

export {}
```

`只读属性readonly`

- 如果有一个属性我们不希望外界可以任意的修改，只希望确定值后直接使用，那么可以使用readonly：

  ```ts
  class Person {
    // 1.只读属性是可以在构造器中赋值, 赋值之后就不可以修改
    // 2.属性本身不能进行修改, 但是如果它是对象类型, 对象中的属性是可以修改
    readonly name: string
    constructor(name: string, friend?: Person) {
      this.name = name
      this.friend = friend
    }
  }
  
  const p = new Person("why", new Person("kobe"))
  console.log(p.name)
  
  export {}
  
  ```



`getters/setter`

- 在前面一些私有属性我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程， 这个时候我们可以使用存取器.

  ```typescript
  class Person {
    private _name: string
    constructor(name: string) {
      this._name = name
    }
  
    // 访问器setter/getter
    // setter
    set name(newName) {
      this._name = newName
    }
    // getter
    get name() {
      return this._name
    }
  }
  
  const p = new Person("why")
  p.name = "why"
  console.log(p.name)
  
  export {}
  ```

### 类的静态成员

- 在TypeScript中通过关键字static来定义：

  ```typescript
  class Student {
    static time: string = "20:00"
  
    static attendClass() {
      console.log("去学习~")
    }
  }
  
  console.log(Student.time)
  Student.attendClass()
  ```



### 类的抽象类

- 我们知道，继承是多态使用的前提。 

  - 所以在定义很多通用的调用接口时, 我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式。

  - 但是，父类本身可能并不需要对某些方法进行具体的实现，所以父类中定义的方法,，我们可以定义为抽象方法。 

- 什么是 抽象方法? 在TypeScript中没有具体实现的方法(没有方法体)，就是抽象方法。 

  - 抽象方法，必须存在于抽象类中； 

  - 抽象类是使用abstract声明的类； 

- 抽象类有如下的特点： 

  - 抽象类是不能被实例的话（也就是不能通过new创建） 

  - 抽象方法必须被子类实现，否则该类必须是一个抽象类；

```typescript
function makeArea(shape: Shape) {
  return shape.getArea()
}


abstract class Shape {
  abstract getArea(): number
}


class Rectangle extends Shape {
  private width: number
  private height: number

  constructor(width: number, height: number) {
    super()
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }
}

class Circle extends Shape {
  private r: number

  constructor(r: number) {
    super()
    this.r = r
  }

  getArea() {
    return this.r * this.r * 3.14
  }
}

const rectangle = new Rectangle(20, 30)
const circle = new Circle(10)

console.log(makeArea(rectangle))
console.log(makeArea(circle))
```



##  3.9 元组

当我们想定义一个数组中具体索引位置的类型时，可以使用元祖。

> 原有的数组模式只能宽泛的定义数组中的普遍类型，无法精确到位置

元组是另一种类型的数组，它确切知道包含多少个元素，以及特定索引对应的类型

```ts
let position: [number, number] = [39.5427, 116.2317];
```

##  3.10 类型推论

在 TS 中，某些没有明确指出类型的地方，**TS 的类型推论机制会帮助提供类型**

也就是说，由于类型推论的存在，在某些地址类型注解可以省略不写。

- 发生类型推论的常见场景

1. 声明变量并初始化时
2. 决定函数返回值时

```ts
// 变量creater_name自动被推断为 string
let creater_name = 'gaoly';

// 函数返回值的类型被自动推断为 number
function addCount(num1: number, num2: number) {
  return num1 + num2;
}
```

推荐：**能省略类型注解的地方就省略**（~~偷懒~~，充分利用 TS 类型推论的能力，提升开发效率）

技巧：如果不知道类型，可以通过鼠标放在变量名称上，利用 VSCode 的提示来查看类型

##  3.11 字面量类型

> 下面的代码类型分别是什么？

```ts
// 字面量类型
let str1 = '张三';
const str2 = '张三';
```

通过 TS 的类型推导可以得到答案

1.变量 str1 的变量类型为： string

2.变量 str2 的变量类型为 '张三'

解释：str1 是一个变量(let)，它的值可以是任意字符串，所以类型为:string

str2 是一个常量(const)，它的值不能变化只能是 '张三'，所以，它的类型为:'张三'

此时，‘张三’就是一个**字面量类型**，即某个特殊的字符串也可以作为 TS 中的类型

任意的 JS 字面量（对象，数组，数字）都可以作为类型使用

### 使用场景和模式

- 使用模式：**字面量类型配合联合类型一起使用**
- 使用场景：用来表示一组明确的可选值列表
- 比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个

```ts
type Direction = 'left' | 'right' | 'up' | 'down';

// 使用自定义类型:

function changeDirection(direction: Direction) {
  console.log(direction);
}

// 调用函数时，会有类型提示：
changeDirection('up');
```

- 解释：参数 direction 的值只能是 up/down/left/right 中的任意一个
- 优势：相比于 string 类型，使用字面量类型更加精确、严谨

##  3.12枚举

- 枚举的功能类似于**字面量类型+联合类型组合**的功能，也可以表示一组明确的可选值
- 枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个

```ts
// 枚举

// 创建枚举
enum Direction2 {
  Up,
  Down,
  Left,
  Right,
}

// 使用枚举类型
function changeDirection2(direction: Direction2) {
  console.log(direction);
}

// 调用函数时，需要应该传入：枚举 Direction 成员的任意一个
// 类似于 JS 中的对象，直接通过 点（.）语法 访问枚举的成员
changeDirection2(Direction2.Up);
```

### 数字枚举

- 问题：我们把枚举成员作为了函数的实参，它的值是什么呢?
- 解释：通过将鼠标移入 Direction.Up，可以看到枚举成员 Up 的值为 0
- 注意：枚举成员是有值的，默认为：从 0 开始自增的数值
- 我们把，枚举成员的值为数字的枚举，称为：`数字枚举`
- 当然，也可以给枚举中的成员初始化值

```ts
// Down -> 11、Left -> 12、Right -> 13
enum Direction {
  Up = 10,
  Down,
  Left,
  Right,
}

enum Direction {
  Up = 2,
  Down = 4,
  Left = 8,
  Right = 16,
}
```

### 字符串枚举

- 字符串枚举：枚举成员的值是字符串
- 注意：字符串枚举没有自增长行为，因此，**字符串枚举的每个成员必须有初始值**

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

### 枚举实现原理

- 枚举是 TS 为数不多的非 JavaScript 类型级扩展(不仅仅是类型)的特性之一
- 因为：其他类型仅仅被当做类型，而枚举不仅用作类型，还提供值(枚举成员都是有值的)
- 也就是说，其他的类型会在编译为 JS 代码时自动移除。但是，**枚举类型会被编译为 JS 代码**

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// 会被编译为以下 JS 代码：
var Direction;

(function (Direction) {
  Direction['Up'] = 'UP'
  Direction['Down'] = 'DOWN'
  Direction['Left'] = 'LEFT'
  Direction['Right'] = 'RIGHT'
})(Direction || Direction = {})
```

- 说明：枚举与前面讲到的字面量类型+联合类型组合的功能类似，都用来表示一组明确的可选值列表
- 一般情况下，**推荐使用字面量类型+联合类型组合的方式**，因为相比枚举，这种方式更加直观、简洁、高效

##  3.13 any 类型

- **原则:不推荐使用 any**!这会让 TypeScript 变为 “AnyScript”(失去 TS 类型保护的优势)
- 因为当值的类型为 any 时，可以对该值进行任意操作，并且不会有代码提示

```ts
let obj: any = { x: 0 };

obj.bar = 100;
obj();
const n: number = obj;
```

- 解释:以上操作都不会有任何类型错误提示，即使可能存在错误
- 尽可能的避免使用 any 类型，除非临时使用 any 来“避免”书写很长、很复杂的类型
- 其他隐式具有 any 类型的情况
  1. 声明变量不提供类型也不提供默认值
  2. 函数参数不加类型
- 注意：因为不推荐使用 any，所以，这两种情况下都应该提供类型

在项目开发中，尽量少用 any 类型

------

##  3.14 类型断言

有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型。 比如，

```ts
const aLink = document.getElementById('link');
```

- 注意：该方法返回值的类型是 HTMLElement，该类型只包含所有标签公共的属性或方法，不包含 a 标签特有的 href 等属性
- 因此，这个**类型太宽泛(不具体)**，无法操作 href 等 a 标签特有的属性或方法
- 解决方式：这种情况下就需要**使用类型断言指定更加具体的类型**
- 使用类型断言：

```ts
const aLink = document.getElementById('link') as HTMLAnchorElement;
```

- 解释:
  1. 使用 `as` 关键字实现类型断言
  2. 关键字 as 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）
  3. 通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了
- 另一种语法，使用 `<>` 语法，这种语法形式不常用知道即可:

```ts
// 该语法，知道即可：在react的jsx中使用会报错
const aLink = <HTMLAnchorElement>document.getElementById('link');
```

*技巧：在浏览器控制台，通过 `__proto__` 获取 DOM 元素的类型*



##  3.15 非空类型断言

- 当我们编写下面的代码时，在执行ts的编译阶段会报错： 

  - 这是因为传入的message有可能是为undefined的，这个时候是不能执行方法的；

    ```ts
    function printMessage(message?: string) {
      //error TS2532:Object is possibly 'undefined'  
      console.log(message.toUpperCase())
    }
    
    printMessageLength("hello world")
    ```

     

- 但是，我们确定传入的参数是有值的，这个时候我们可以使用非空类型断言： 

  - 非空断言使用的是 ! ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测；

    ```ts
    function printMessage(message?: string) {
      console.log(message!.toUpperCase())
    }
    ```

##  3.16 可选链的使用

- 可选链事实上并不是TypeScript独有的特性，它是ES11（ES2020）中增加的特性： 

  - 可选链使用可选链操作符 ?.； 

  - 它的作用是当对象的属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行； 

  ```ts
  type Person = {
    name: string
    friend?: {
      name: string
      age?: number,
      girlFriend?: {
        name: string
      }
    }
  }
  
  const info: Person = {
    name: "why",
    friend: {
      name: "kobe",
      girlFriend: {
        name: "lily"
      }
    }
  }
  
  
  // 另外一个文件中
  console.log(info.name)
  // console.log(info.friend!.name)
  console.log(info.friend?.name)
  console.log(info.friend?.age)
  console.log(info.friend?.girlFriend?.name)
  ```



##  3.17运算符



- !!操作符： 

  - 将一个其他类型转换成boolean类型； 

  - 类似于Boolean(变量)的方式； 

- ??操作符： 

  - 它是ES11增加的新特性； 

  - 空值合并操作符（??）是一个逻辑操作符，当操作符的左侧是 null 或者 undefined 时，返回其右侧操作数， 否则返回左侧操作数

##  3.18 typeof

- 众所周知，JS 中提供了 typeof 操作符，用来在 JS 中获取数据的类型

```js
console.log(typeof 'Hello world'); // ?
```

- 实际上，TS 也提供了 typeof 操作符：可以在*类型上下文*中引用变量或属性的类型（类型查询）
- 使用场景:根据已有变量的值，获取该值的类型，来简化类型书写

```ts
let p = { x: 1, y: 2 };
function formatPoint(point: { x: number; y: number }) {}
formatPoint(p);

function formatPoint(point: typeof p) {}
```

- 解释:
  1. 使用 `typeof` 操作符来获取变量 p 的类型，结果与第一种（对象字面量形式的类型）相同
  2. typeof 出现在**类型注解的位置（参数名称的冒号后面）所处的环境就在类型上下文**(区别于 JS 代码)
  3. 注意：typeof 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数调用的类型）

