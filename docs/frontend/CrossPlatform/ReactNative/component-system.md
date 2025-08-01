# React Native 组件系统详解

React Native 的组件系统是构建应用的核心，理解组件系统对于开发高效的应用至关重要。

## 基础组件

### View 组件

```javascript
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Container = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});
```

### Text 组件

```javascript
import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CustomText = () => {
  return (
    <Text style={styles.text}>
      这是自定义文本
      <Text style={styles.bold}>粗体文本</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});
```

### Image 组件

```javascript
import React from 'react';
import {Image, StyleSheet} from 'react-native';

const CustomImage = () => {
  return (
    <Image
      source={{uri: 'https://example.com/image.jpg'}}
      style={styles.image}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
```

## 交互组件

### TouchableOpacity

```javascript
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### ScrollView

```javascript
import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';

const ScrollableContent = () => {
  return (
    <ScrollView style={styles.container}>
      {Array.from({length: 20}, (_, i) => (
        <Text key={i} style={styles.item}>
          项目 {i + 1}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
```

## 自定义组件

### 函数组件

```javascript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomCard = ({title, description, children}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
```

### 类组件

```javascript
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  };

  decrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.count}>{this.state.count}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## 组件生命周期

### 函数组件 (Hooks)

```javascript
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text} from 'react-native';

const LifecycleComponent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // 组件挂载时执行
  useEffect(() => {
    console.log('组件已挂载');
    
    // 清理函数
    return () => {
      console.log('组件即将卸载');
    };
  }, []);

  // 依赖项变化时执行
  useEffect(() => {
    console.log('count 变化:', count);
  }, [count]);

  // 记忆化回调函数
  const handlePress = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  // 记忆化计算结果
  const expensiveValue = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Text>Expensive Value: {expensiveValue}</Text>
    </View>
  );
};
```

### 类组件生命周期

```javascript
import React, {Component} from 'react';
import {View, Text} from 'react-native';

class LifecycleClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    console.log('constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
    // 获取数据
    this.fetchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    // 清理资源
  }

  fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      this.setState({data});
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  };

  render() {
    console.log('render');
    return (
      <View>
        <Text>数据: {this.state.data ? '已加载' : '加载中...'}</Text>
      </View>
    );
  }
}
```

## 性能优化

### React.memo

```javascript
import React from 'react';
import {View, Text} from 'react-native';

const ExpensiveComponent = React.memo(({data}) => {
  console.log('ExpensiveComponent 重新渲染');
  
  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
});

// 自定义比较函数
const CustomComponent = React.memo(
  ({data}) => {
    return <Text>{data}</Text>;
  },
  (prevProps, nextProps) => {
    // 返回 true 表示不需要重新渲染
    return prevProps.data === nextProps.data;
  }
);
```

### useCallback 和 useMemo

```javascript
import React, {useState, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const OptimizedComponent = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // 记忆化回调函数
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  // 记忆化计算结果
  const expensiveCalculation = useMemo(() => {
    console.log('执行昂贵计算');
    return count * 2 + Math.pow(count, 2);
  }, [count]);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Text>计算结果: {expensiveCalculation}</Text>
      <TouchableOpacity onPress={handleIncrement}>
        <Text>增加</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOtherState(prev => prev + 1)}>
        <Text>其他状态: {otherState}</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 组件通信

### Props 传递

```javascript
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const ParentComponent = () => {
  const [parentState, setParentState] = useState(0);

  const handleChildPress = (value) => {
    setParentState(value);
  };

  return (
    <View>
      <Text>父组件状态: {parentState}</Text>
      <ChildComponent 
        data={parentState}
        onPress={handleChildPress}
      />
    </View>
  );
};

const ChildComponent = ({data, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(data + 1)}>
      <Text>子组件数据: {data}</Text>
    </TouchableOpacity>
  );
};
```

### Context API

```javascript
import React, {createContext, useContext, useState} from 'react';
import {View, Text} from 'react-native';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <View style={{backgroundColor: theme === 'light' ? 'white' : 'black'}}>
      <Text style={{color: theme === 'light' ? 'black' : 'white'}}>
        当前主题: {theme}
      </Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>切换主题</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 最佳实践

### 组件设计原则

1. **单一职责**: 每个组件只负责一个功能
2. **可复用性**: 设计通用的组件
3. **可测试性**: 组件应该易于测试
4. **性能考虑**: 合理使用优化技术

### 命名规范

```javascript
// 组件名使用 PascalCase
const UserProfile = () => {};

// 文件名与组件名一致
// UserProfile.js

// 样式名使用 camelCase
const styles = StyleSheet.create({
  container: {},
  userAvatar: {},
  profileInfo: {},
});
```

### 错误边界

```javascript
import React from 'react';
import {View, Text} from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log('错误边界捕获到错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>出现错误，请重试</Text>
        </View>
      );
    }

    return this.props.children;
  }
}
``` 