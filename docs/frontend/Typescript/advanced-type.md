# 4. TypeScript 高级类型

##  4.1 TS 中的类型兼容性

[TS 类型兼容性参考文档](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)

两种类型系统：1 **Structural Type System(结构化类型系统)** 2 Nominal Type System(标明类型系统)

**TS 采用的是结构化类型系统，也叫做 duck typing(鸭子类型)，类型检查关注的是值所具有的形状**

也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。比如：

```ts
interface Point {
  x: number;
  y: number;
}
interface Point2D {
  x: number;
  y: number;
}

let p2: Point2D = {
  x: 1,
  y: 2,
};
// 不会报错
let p: Point = p2;
```

对于对象类型来说，y 的成员至少与 x 相同，则 x 兼容 y（**成员多的可以赋值给少的**，或者说：只要满足必须的类型就行，多了也没事）

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

let p3: Point3D = {
  x: 1,
  y: 2,
  z: 3,
};
// 不会报错
let p2: Point2D = p3;
```

函数类型的类型兼容性比较复杂，需要考虑：1 参数个数 2 返回值类型 等等

1. 参数个数：参数多的兼容参数少的(或者说，

   参数少的可以赋值给多的

   )

   - **在 JS 中省略用不到的函数参数实际上是很常见的，这样的使用方式，促成了 TS 中函数类型之间的兼容性**

```ts
const arr = ['a', 'b', 'c'];
// arr.forEach 第一个参数的类型为： (value: string, index: number, array: string[]) => void
arr.forEach(() => {});
arr.forEach((item) => {});
arr.forEach((item, index) => {});

// ---

type F1 = (a: number) => void;
type F2 = (a: number, b: number) => void;

// 正确：参数少的可以赋值给参数多的
let f1: F1 = (a) => {};
let f2: F2 = f1;
```

1. 返回值类型：只要满足必须的类型要求就行，多了也没事

```ts
type F1 = () => void;
const f1: F1 = () => {
  return 123;
};
```

##  4.2 泛型概述



- **泛型（Generics）可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用**，常用于：函数、接口、class 中
- 需求：创建一个 id 函数，传入什么数据就返回该数据本身（也就是说，参数和返回值类型相同）

```ts
// 比如，该函数传入什么数值，就返回什么数值
function id(value: number): number {
  return value;
}

// res => 10
const res = id(10);
```

- 比如，id(10) 调用以上函数就会直接返回 10 本身。但是，该函数只接收数值类型，无法用于其他类型
- 为了能让函数能够接受任意类型的参数，可以将参数类型修改为 any。但是，这样就失去了 TS 的类型保护，类型不安全

```ts
function id(value: any): any {
  return value;
}
```

- 这时候，就可以使用**泛型**来实现了
- **泛型在保证类型安全(不丢失类型信息)的同时，可以让函数等与多种不同的类型一起工作，灵活可复用**
- 实际上，在 C# 和 Java 等编程语言中，泛型都是用来实现可复用组件功能的主要工具之一

##  4.3 泛型函数



创建泛型函数：

```ts
function id<Type>(value: Type): Type {
  return value;
}

// 也可以仅使用一个字母来作为类型变量的名称
function id<T>(value: T): T {
  return value;
}
```

解释：

- 语法：在函数名称的后面添加 `<>`（尖括号），**尖括号中添加类型变量**，比如此处的 Type
- **类型变量 Type，是一种特殊类型的变量，它处理类型而不是值**
- **类型变量相当于一个类型容器**，能够捕获用户提供的类型（具体是什么类型由用户调用该函数时指定）
- 因为 Type 是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型
- 类型变量 Type，可以是任意合法的变量名称

调用泛型函数：

```ts
// 函数参数和返回值类型都为：number
const num = id<number>(10);

// 函数参数和返回值类型都为：string
const str = id<string>('a');
```

解释：

- 语法：在函数名称的后面添加 `<>`（尖括号），**尖括号中指定具体的类型**，比如，此处的 number
- 当传入类型 number 后，这个类型就会被函数声明时指定的类型变量 Type 捕获到
- 此时，Type 的类型就是 number，所以，函数 id 参数和返回值的类型也都是 number
- 这样，通过泛型就做到了让 id 函数与多种不同的类型一起工作，**实现了复用的同时保证了类型安全**

##  4.4 简化泛型函数调用

在调用泛型函数时，**可以省略 `<类型>` 来简化泛型函数的调用**

```ts
// 省略 <number> 调用函数
let num = id(10);
let str = id('a');
```

解释:

- 此时，TS 内部会采用一种叫做**类型参数推断**的机制，来根据传入的实参自动推断出类型变量 Type 的类型
- 比如，传入实参 10，TS 会自动推断出变量 num 的类型 number，并作为 Type 的类型
- 推荐：使用这种简化的方式调用泛型函数，使代码更短，更易于阅读
- 说明：**当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数**

##  4.5 泛型约束



默认情况下，泛型函数的类型变量 Type 可以代表任意类型，这导致无法访问任何属性

比如，以下示例代码中想要获取参数的长度：

- 因为 Type 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length。因此，无法访问 length 属性

```ts
function id<Type>(value: Type): Type {
  // 注意：此处会报错
  console.log(value.length);
  return value;
}

id('a');
```

此时，就需要**为泛型添加约束来`收缩类型`（缩窄类型取值范围）**

添加泛型约束收缩类型，主要有以下两种方式：1 指定更加具体的类型 2 添加约束

首先，我们先来看第一种情况，如何指定更加具体的类型：

比如，将类型修改为 `Type[]`(Type 类型的数组)，因为只要是数组就一定存在 length 属性，因此就可以访问了

```ts
function id<Type>(value: Type[]): Type[] {
  // 可以正确访问
  console.log(value.length);
  return value;
}
```

##  4.6 添加泛型约束



```ts
// 创建一个自定义类型
interface ILength {
  length: number;
}

// Type extends ILength 添加泛型约束
// 解释：表示传入的类型必须满足 ILength 接口的要求才行，也就是得有一个 number 类型的 length 属性
function id<Type extends ILength>(value: Type): Type {
  console.log(value.length);
  return value;
}
```

解释:

- 创建描述约束的接口 ILength，该接口要求提供 length 属性
- 通过 `extends` 关键字来为泛型（类型变量）添加约束
- 该约束表示：**传入的类型必须具有 length 属性**
- 注意：传入的实参（比如，数组）只要有 length 属性即可（类型兼容性)

##  4.7 多个类型变量的泛型



泛型的类型变量可以有多个，并且**类型变量之间还可以约束**(比如，第二个类型变量受第一个类型变量约束) 比如，创建一个函数来获取对象中属性的值：

```ts
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let person = { name: 'jack', age: 18 };
getProp(person, 'name');
```

解释:

1. 添加了第二个类型变量 Key，两个类型变量之间使用 `,` 逗号分隔。
2. **keyof 关键字接收一个对象类型，生成其键名称(可能是字符串或数字)的联合类型**。
3. 本示例中 `keyof Type` 实际上获取的是 person 对象所有键的联合类型，也就是：`'name' | 'age'`
4. 类型变量 Key 受 Type 约束，可以理解为：Key 只能是 Type 所有键中的任意一个，或者说只能访问对象中存在的属性

```ts
// Type extends object 表示： Type 应该是一个对象类型，如果不是 对象 类型，就会报错
// 如果要用到 对象 类型，应该用 object ，而不是 Object
function getProperty<Type extends object, Key extends keyof Type>(
  obj: Type,
  key: Key,
) {
  return obj[key];
}
```

------

##  4.8 泛型接口

泛型接口：接口也可以配合泛型来使用，以增加其灵活性，增强其复用性

```ts
interface IdFunc<Type> {
  id: (value: Type) => Type;
  ids: () => Type[];
}

let obj: IdFunc<number> = {
  id(value) {
    return value;
  },
  ids() {
    return [1, 3, 5];
  },
};
```

解释：

1. 在接口名称的后面添加 `<类型变量>`，那么，这个接口就变成了泛型接口。
2. 接口的类型变量，对接口中所有其他成员可见，也就是**接口中所有成员都可以使用类型变量**。
3. 使用泛型接口时，**需要显式指定具体的类型**(比如，此处的 IdFunc)。
4. 此时，id 方法的参数和返回值类型都是 number;ids 方法的返回值类型是 number[]。

实际上，JS 中的数组在 TS 中就是一个泛型接口

```ts
const strs = ['a', 'b', 'c'];
// 鼠标放在 forEach 上查看类型
strs.forEach;

const nums = [1, 3, 5];
// 鼠标放在 forEach 上查看类型
nums.forEach;
```

- 解释:当我们在使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型
- 技巧:可以通过 Ctrl + 鼠标左键(Mac：Command + 鼠标左键)来查看具体的类型信息

##  4.9 泛型工具类型

泛型工具类型：TS 内置了一些常用的工具类型，来简化 TS 中的一些常见操作

说明：它们都是基于泛型实现的(泛型适用于多种类型，更加通用)，并且是内置的，可以直接在代码中使用。 这些工具类型有很多，主要学习以下几个:

1. `Partial<Type>`
2. `Readonly<Type>`
3. `Pick<Type, Keys>`

- [TS 所有内置的泛型工具类型文档](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Partial

- Partial 用来构造(创建)一个类型，将 Type 的所有属性设置为可选。

```ts
type Props = {
  id: string;
  children: number[];
};

type PartialProps = Partial<Props>;
```

- 解释:构造出来的新类型 PartialProps 结构和 Props 相同，但所有属性都变为可选的。

### Readonly

- Readonly 用来构造一个类型，将 Type 的所有属性都设置为 readonly(只读)。

```ts
type Props = {
  id: string;
  children: number[];
};

type ReadonlyProps = Readonly<Props>;
```

- 解释:构造出来的新类型 ReadonlyProps 结构和 Props 相同，但所有属性都变为只读的。

```ts
let props: ReadonlyProps = { id: '1', children: [] };
// 错误演示
props.id = '2';
```

- 当我们想重新给 id 属性赋值时，就会报错:无法分配到 "id" ，因为它是只读属性。

### Pick

- Pick<Type, Keys> 从 Type 中选择一组属性来构造新类型。

```ts
interface Props {
  id: string;
  title: string;
  children: number[];
}
type PickProps = Pick<Props, 'id' | 'title'>;
```

- 解释:
  1. Pick 工具类型有两个类型变量:1 表示选择谁的属性 2 表示选择哪几个属性。
  2. 其中第二个类型变量，如果只选择一个则只传入该属性名即可，如果有多个使用联合类型即可。
  3. 第二个类型变量传入的属性只能是第一个类型变量中存在的属性。
  4. 构造出来的新类型 PickProps，只有 id 和 title 两个属性类型。