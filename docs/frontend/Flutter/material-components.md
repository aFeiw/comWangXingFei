# Material Design 组件

Material Design 是 Google 设计语言，Flutter 提供了丰富的 Material Design 组件。

## 基础组件

### 1. AppBar

```dart
AppBar(
  title: Text('My App'),
  backgroundColor: Colors.blue,
  elevation: 4.0,
  leading: IconButton(
    icon: Icon(Icons.menu),
    onPressed: () {},
  ),
  actions: [
    IconButton(
      icon: Icon(Icons.search),
      onPressed: () {},
    ),
    IconButton(
      icon: Icon(Icons.more_vert),
      onPressed: () {},
    ),
  ],
)
```

#### 自定义 AppBar
```dart
class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text('Custom AppBar'),
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

### 2. Scaffold

```dart
Scaffold(
  appBar: AppBar(title: Text('My App')),
  body: Center(child: Text('Body Content')),
  drawer: Drawer(
    child: ListView(
      children: [
        DrawerHeader(
          decoration: BoxDecoration(color: Colors.blue),
          child: Text('Drawer Header'),
        ),
        ListTile(
          leading: Icon(Icons.home),
          title: Text('Home'),
          onTap: () {},
        ),
        ListTile(
          leading: Icon(Icons.settings),
          title: Text('Settings'),
          onTap: () {},
        ),
      ],
    ),
  ),
  bottomNavigationBar: BottomNavigationBar(
    items: [
      BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
      BottomNavigationBarItem(icon: Icon(Icons.business), label: 'Business'),
      BottomNavigationBarItem(icon: Icon(Icons.school), label: 'School'),
    ],
  ),
  floatingActionButton: FloatingActionButton(
    onPressed: () {},
    child: Icon(Icons.add),
  ),
)
```

### 3. Card

```dart
Card(
  elevation: 4.0,
  margin: EdgeInsets.all(8.0),
  child: Padding(
    padding: EdgeInsets.all(16.0),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Card Title',
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8.0),
        Text('Card content goes here...'),
        SizedBox(height: 16.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            TextButton(
              onPressed: () {},
              child: Text('CANCEL'),
            ),
            SizedBox(width: 8.0),
            ElevatedButton(
              onPressed: () {},
              child: Text('OK'),
            ),
          ],
        ),
      ],
    ),
  ),
)
```

## 按钮组件

### 1. ElevatedButton

```dart
ElevatedButton(
  onPressed: () {
    // 按钮点击事件
  },
  style: ElevatedButton.styleFrom(
    primary: Colors.blue,
    onPrimary: Colors.white,
    padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8.0),
    ),
  ),
  child: Text('Elevated Button'),
)
```

### 2. TextButton

```dart
TextButton(
  onPressed: () {},
  style: TextButton.styleFrom(
    primary: Colors.blue,
    padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
  ),
  child: Text('Text Button'),
)
```

### 3. OutlinedButton

```dart
OutlinedButton(
  onPressed: () {},
  style: OutlinedButton.styleFrom(
    primary: Colors.blue,
    side: BorderSide(color: Colors.blue),
    padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
  ),
  child: Text('Outlined Button'),
)
```

### 4. IconButton

```dart
IconButton(
  icon: Icon(Icons.favorite),
  onPressed: () {},
  tooltip: 'Add to favorites',
  iconSize: 24.0,
  color: Colors.red,
)
```

## 输入组件

### 1. TextField

```dart
TextField(
  decoration: InputDecoration(
    labelText: 'Email',
    hintText: 'Enter your email',
    prefixIcon: Icon(Icons.email),
    suffixIcon: Icon(Icons.clear),
    border: OutlineInputBorder(),
    focusedBorder: OutlineInputBorder(
      borderSide: BorderSide(color: Colors.blue, width: 2.0),
    ),
  ),
  keyboardType: TextInputType.emailAddress,
  onChanged: (value) {
    print('Email: $value');
  },
)
```

### 2. TextFormField

```dart
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: InputDecoration(
          labelText: 'Password',
          prefixIcon: Icon(Icons.lock),
          border: OutlineInputBorder(),
        ),
        obscureText: true,
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter a password';
          }
          if (value.length < 6) {
            return 'Password must be at least 6 characters';
          }
          return null;
        },
      ),
      SizedBox(height: 16.0),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            print('Form is valid');
          }
        },
        child: Text('Submit'),
      ),
    ],
  ),
)
```

### 3. Checkbox

```dart
bool _isChecked = false;

Checkbox(
  value: _isChecked,
  onChanged: (bool? value) {
    setState(() {
      _isChecked = value ?? false;
    });
  },
  activeColor: Colors.blue,
  checkColor: Colors.white,
)
```

### 4. Switch

```dart
bool _isEnabled = false;

Switch(
  value: _isEnabled,
  onChanged: (bool value) {
    setState(() {
      _isEnabled = value;
    });
  },
  activeColor: Colors.blue,
  activeTrackColor: Colors.blue.withOpacity(0.3),
  inactiveThumbColor: Colors.grey,
  inactiveTrackColor: Colors.grey.withOpacity(0.3),
)
```

### 5. Slider

```dart
double _value = 0.0;

Slider(
  value: _value,
  min: 0.0,
  max: 100.0,
  divisions: 10,
  label: '${_value.round()}',
  onChanged: (double value) {
    setState(() {
      _value = value;
    });
  },
)
```

## 列表组件

### 1. ListTile

```dart
ListTile(
  leading: CircleAvatar(
    backgroundImage: NetworkImage('https://example.com/avatar.jpg'),
  ),
  title: Text('John Doe'),
  subtitle: Text('Software Developer'),
  trailing: Icon(Icons.arrow_forward_ios),
  onTap: () {
    // 点击事件
  },
)
```

### 2. ExpansionTile

```dart
ExpansionTile(
  title: Text('Expandable List Item'),
  subtitle: Text('Tap to expand'),
  leading: Icon(Icons.folder),
  children: [
    ListTile(
      title: Text('Child Item 1'),
      onTap: () {},
    ),
    ListTile(
      title: Text('Child Item 2'),
      onTap: () {},
    ),
  ],
)
```

### 3. CheckboxListTile

```dart
bool _isChecked = false;

CheckboxListTile(
  title: Text('Accept terms and conditions'),
  subtitle: Text('Please read carefully'),
  value: _isChecked,
  onChanged: (bool? value) {
    setState(() {
      _isChecked = value ?? false;
    });
  },
  controlAffinity: ListTileControlAffinity.leading,
)
```

## 对话框组件

### 1. AlertDialog

```dart
showDialog(
  context: context,
  builder: (BuildContext context) {
    return AlertDialog(
      title: Text('Confirm Action'),
      content: Text('Are you sure you want to delete this item?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text('CANCEL'),
        ),
        ElevatedButton(
          onPressed: () {
            // 执行删除操作
            Navigator.of(context).pop();
          },
          child: Text('DELETE'),
        ),
      ],
    );
  },
);
```

### 2. SimpleDialog

```dart
showDialog(
  context: context,
  builder: (BuildContext context) {
    return SimpleDialog(
      title: Text('Choose an option'),
      children: [
        SimpleDialogOption(
          onPressed: () {
            Navigator.of(context).pop('Option 1');
          },
          child: Text('Option 1'),
        ),
        SimpleDialogOption(
          onPressed: () {
            Navigator.of(context).pop('Option 2');
          },
          child: Text('Option 2'),
        ),
        SimpleDialogOption(
          onPressed: () {
            Navigator.of(context).pop('Option 3');
          },
          child: Text('Option 3'),
        ),
      ],
    );
  },
);
```

### 3. BottomSheet

```dart
showModalBottomSheet(
  context: context,
  builder: (BuildContext context) {
    return Container(
      height: 200,
      child: Column(
        children: [
          ListTile(
            leading: Icon(Icons.share),
            title: Text('Share'),
            onTap: () {
              Navigator.of(context).pop();
            },
          ),
          ListTile(
            leading: Icon(Icons.download),
            title: Text('Download'),
            onTap: () {
              Navigator.of(context).pop();
            },
          ),
          ListTile(
            leading: Icon(Icons.delete),
            title: Text('Delete'),
            onTap: () {
              Navigator.of(context).pop();
            },
          ),
        ],
      ),
    );
  },
);
```

## 导航组件

### 1. BottomNavigationBar

```dart
int _currentIndex = 0;

BottomNavigationBar(
  currentIndex: _currentIndex,
  onTap: (int index) {
    setState(() {
      _currentIndex = index;
    });
  },
  type: BottomNavigationBarType.fixed,
  items: [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.business),
      label: 'Business',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.school),
      label: 'School',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.settings),
      label: 'Settings',
    ),
  ],
)
```

### 2. TabBar

```dart
DefaultTabController(
  length: 3,
  child: Scaffold(
    appBar: AppBar(
      title: Text('Tab Bar Example'),
      bottom: TabBar(
        tabs: [
          Tab(icon: Icon(Icons.home), text: 'Home'),
          Tab(icon: Icon(Icons.business), text: 'Business'),
          Tab(icon: Icon(Icons.school), text: 'School'),
        ],
      ),
    ),
    body: TabBarView(
      children: [
        Center(child: Text('Home Tab')),
        Center(child: Text('Business Tab')),
        Center(child: Text('School Tab')),
      ],
    ),
  ),
)
```

## 进度指示器

### 1. CircularProgressIndicator

```dart
CircularProgressIndicator(
  value: 0.7, // 0.0 到 1.0 之间的值
  backgroundColor: Colors.grey[300],
  valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
  strokeWidth: 4.0,
)
```

### 2. LinearProgressIndicator

```dart
LinearProgressIndicator(
  value: 0.5,
  backgroundColor: Colors.grey[300],
  valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
  minHeight: 8.0,
)
```

### 3. RefreshIndicator

```dart
RefreshIndicator(
  onRefresh: () async {
    // 模拟刷新操作
    await Future.delayed(Duration(seconds: 2));
  },
  child: ListView.builder(
    itemCount: 20,
    itemBuilder: (context, index) {
      return ListTile(
        title: Text('Item $index'),
      );
    },
  ),
)
```

## 数据展示组件

### 1. DataTable

```dart
DataTable(
  columns: [
    DataColumn(label: Text('Name')),
    DataColumn(label: Text('Age')),
    DataColumn(label: Text('City')),
  ],
  rows: [
    DataRow(cells: [
      DataCell(Text('John Doe')),
      DataCell(Text('30')),
      DataCell(Text('New York')),
    ]),
    DataRow(cells: [
      DataCell(Text('Jane Smith')),
      DataCell(Text('25')),
      DataCell(Text('Los Angeles')),
    ]),
  ],
)
```

### 2. PaginatedDataTable

```dart
class MyDataTableSource extends DataTableSource {
  final List<Map<String, dynamic>> _data = [
    {'name': 'John Doe', 'age': 30, 'city': 'New York'},
    {'name': 'Jane Smith', 'age': 25, 'city': 'Los Angeles'},
    {'name': 'Bob Johnson', 'age': 35, 'city': 'Chicago'},
  ];

  @override
  DataRow? getRow(int index) {
    if (index >= _data.length) return null;
    final item = _data[index];
    return DataRow(cells: [
      DataCell(Text(item['name'])),
      DataCell(Text(item['age'].toString())),
      DataCell(Text(item['city'])),
    ]);
  }

  @override
  bool get isRowCountApproximate => false;

  @override
  int get rowCount => _data.length;

  @override
  int get selectedRowCount => 0;
}

PaginatedDataTable(
  header: Text('User Data'),
  source: MyDataTableSource(),
  columns: [
    DataColumn(label: Text('Name')),
    DataColumn(label: Text('Age')),
    DataColumn(label: Text('City')),
  ],
  rowsPerPage: 10,
)
```

## 自定义 Material 组件

### 1. 自定义按钮

```dart
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color? color;
  
  const CustomButton({
    Key? key,
    required this.text,
    this.onPressed,
    this.color,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 48.0,
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          primary: color ?? Theme.of(context).primaryColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
          ),
        ),
        child: Text(
          text,
          style: TextStyle(
            fontSize: 16.0,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
```

### 2. 自定义卡片

```dart
class CustomCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final Widget? leading;
  final List<Widget>? actions;
  final VoidCallback? onTap;
  
  const CustomCard({
    Key? key,
    required this.title,
    required this.subtitle,
    this.leading,
    this.actions,
    this.onTap,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4.0,
      margin: EdgeInsets.all(8.0),
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Row(
            children: [
              if (leading != null) ...[
                leading!,
                SizedBox(width: 16.0),
              ],
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: Theme.of(context).textTheme.headline6,
                    ),
                    SizedBox(height: 4.0),
                    Text(
                      subtitle,
                      style: Theme.of(context).textTheme.bodyText2,
                    ),
                  ],
                ),
              ),
              if (actions != null) ...[
                SizedBox(width: 16.0),
                ...actions!,
              ],
            ],
          ),
        ),
      ),
    );
  }
}
```

## 主题定制

### 1. 自定义主题

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material Design App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        primaryColor: Colors.blue,
        accentColor: Colors.orange,
        brightness: Brightness.light,
        fontFamily: 'Roboto',
        appBarTheme: AppBarTheme(
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
          elevation: 4.0,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            primary: Colors.blue,
            onPrimary: Colors.white,
            padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0),
            ),
          ),
        ),
        cardTheme: CardTheme(
          elevation: 4.0,
          margin: EdgeInsets.all(8.0),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
          ),
        ),
      ),
      home: MyHomePage(),
    );
  }
}
```

## 总结

Material Design 组件的特点：
- **一致性**: 遵循 Material Design 设计规范
- **可访问性**: 支持屏幕阅读器和键盘导航
- **响应式**: 适配不同屏幕尺寸
- **主题化**: 支持主题定制和暗色模式
- **国际化**: 支持多语言和 RTL 布局 