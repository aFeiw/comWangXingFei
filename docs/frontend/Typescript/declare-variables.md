# 2.TypeScript声明变量

- TypeScript声明变量需要指定`标识符`的类型
- 声明了类型后TypeScript就会进行类型检测，声明的类型可以称之为类型注解；
  - 完整格式为：`let\const 标识符: 数据类型 = 赋值`;不建议使用var

`示例：`

```typescript
var myname:string = "why";
let myage:number = 20;
const myheight:number = 1.88;
```



## 2.1 变量的类型推导（推断）

在开发中，有时候为了方便起见我们并不会在声明每一个变量时都写上对应的数据类型，我们更希望可以通过TypeScript本身的 特性帮助我们推断出对应的变量类型：



```typescript
let message = "Hello World"
```



如果我们给message赋值123： 

```typescript
message = 123 //报错
```



这是因为在一个变量第一次赋值时，会根据后面的赋值内容的类型，来推断出变量的类型： 

 上面的message就是因为后面赋值的是一个string类型，所以message虽然没有明确的说明，但是依然是一个string类型；

## 2.2 命名空间

命名空间在TypeScript早期时，称之为内部模块，主要目的是将一个模块内部再进行作用域的划分，防止一些命名 冲突的问题



```typescript
export namespace Time{
    export function format(time:string){
        return "2022-02-22"
    }
}
```

## 2.3 类型

`类型的查找`

- 我们这里先给大家介绍另外的一种typescript文件：.d.ts文件 
  -  我们之前编写的typescript文件都是 .ts 文件，这些文件最终会输出 .js 文件，也是我们通常编写代码的地方； 
  -  还有另外一种文件 .d.ts 文件，它是用来做类型的声明(declare)。 它仅仅用来做类型检测，告知typescript我们有哪 些类型； 
- 那么typescript会在哪里查找我们的类型声明呢？ 
  -  内置类型声明； 
  -  外部定义类型声明； 
  -  自己定义类型声明；

`内置类型声明:`

- 内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件； 
  - 包括比如Math、Date等内置类型，也包括DOM API，比如Window、Document等； 

- 内置类型声明通常在我们安装typescript的环境中会带有的； 
  - https://github.com/microsoft/TypeScript/tree/main/lib

`外部定义类型声明与自定义类型声明:`

- 外部类型声明通常是我们使用一些库（比如第三方库）时，需要的一些类型声明。 

- 这些库通常有两种类型声明方式： 

- 方式一：在自己库中进行类型声明（编写.d.ts文件），比如axios 

- 方式二：通过社区的一个公有库DefinitelyTyped存放类型声明文件 

  - 该库的GitHub地址：https://github.com/DefinitelyTyped/DefinitelyTyped/ 

  - 该库查找声明安装方式的地址：https://www.typescriptlang.org/dt/search?search= 

  - 比如我们安装react的类型声明： npm i @types/react --save-dev 

- 什么情况下需要自己来定义声明文件呢？ 

  - 情况一：我们使用的第三方库是一个纯的JavaScript库，没有对应的声明文件；比如lodash 

  - 情况二：我们给自己的代码中声明一些类型，方便在其他地方直接进行使用；

## 2.4 声明

`声明变量-函数-类`

```typescript
// 声明变量/函数/类
declare let whyName: string
declare let whyAge: number
declare let whyHeight: number

declare function whyFoo(): void

declare class Person {
  name: string
  age: number
  constructor(name: string, age: number)
}
```

`声明模块`

- 我们也可以声明模块，比如lodash模块默认不能使用的情况，可以自己来声明这个模块： 

  ```typescript
  // 声明模块
  declare module 'lodash' {
    export function join(arr: any[]): void
  }
  
  ```

  

- 声明模块的语法: declare module '模块名' {}。 

  - 在声明模块的内部，我们可以通过 export 导出对应库的类、函数等

`声明文件:`

- 在某些情况下，我们也可以声明文件： 

  - 比如在开发vue的过程中，默认是不识别我们的.vue文件的，那么我们就需要对其进行文件的声明； 

  - 比如在开发中我们使用了 jpg 这类图片文件，默认typescript也是不支持的，也需要对其进行声明；

    ```typescript
    // 声明文件
    declare module '*.jpg'
    declare module '*.jpeg'
    declare module '*.png'
    declare module '*.svg'
    declare module '*.gif'
    ```



`declare命名空间:`

```typescript
// 声明命名空间
declare namespace $ {
  export function ajax(settings: any): any
}
```

