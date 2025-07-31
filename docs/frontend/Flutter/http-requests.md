# 网络请求

Flutter 提供了多种方式进行网络请求，包括 HTTP 请求、WebSocket 连接等。

## HTTP 请求

### 1. 使用 http 包

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class HttpService {
  static const String baseUrl = 'https://jsonplaceholder.typicode.com';
  
  // GET 请求
  static Future<List<Post>> getPosts() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/posts'),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => Post.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load posts');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  
  // POST 请求
  static Future<Post> createPost(Post post) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/posts'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode(post.toJson()),
      );
      
      if (response.statusCode == 201) {
        return Post.fromJson(json.decode(response.body));
      } else {
        throw Exception('Failed to create post');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  
  // PUT 请求
  static Future<Post> updatePost(int id, Post post) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/posts/$id'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode(post.toJson()),
      );
      
      if (response.statusCode == 200) {
        return Post.fromJson(json.decode(response.body));
      } else {
        throw Exception('Failed to update post');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
  
  // DELETE 请求
  static Future<void> deletePost(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/posts/$id'),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      
      if (response.statusCode != 204) {
        throw Exception('Failed to delete post');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}

// 数据模型
class Post {
  final int? id;
  final String title;
  final String body;
  final int userId;
  
  Post({
    this.id,
    required this.title,
    required this.body,
    required this.userId,
  });
  
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'],
      title: json['title'],
      body: json['body'],
      userId: json['userId'],
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'body': body,
      'userId': userId,
    };
  }
}
```

### 2. 使用 Dio 包

```dart
import 'package:dio/dio.dart';

class DioService {
  static final Dio _dio = Dio();
  
  static void init() {
    _dio.options.baseUrl = 'https://jsonplaceholder.typicode.com';
    _dio.options.connectTimeout = Duration(seconds: 5);
    _dio.options.receiveTimeout = Duration(seconds: 3);
    
    // 添加拦截器
    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
    ));
    
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        // 添加认证头
        options.headers['Authorization'] = 'Bearer token';
        handler.next(options);
      },
      onResponse: (response, handler) {
        // 处理响应
        handler.next(response);
      },
      onError: (error, handler) {
        // 处理错误
        print('Error: ${error.message}');
        handler.next(error);
      },
    ));
  }
  
  // GET 请求
  static Future<List<Post>> getPosts() async {
    try {
      final response = await _dio.get('/posts');
      final List<dynamic> data = response.data;
      return data.map((json) => Post.fromJson(json)).toList();
    } on DioException catch (e) {
      throw Exception('Network error: ${e.message}');
    }
  }
  
  // POST 请求
  static Future<Post> createPost(Post post) async {
    try {
      final response = await _dio.post(
        '/posts',
        data: post.toJson(),
      );
      return Post.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception('Network error: ${e.message}');
    }
  }
  
  // 文件上传
  static Future<String> uploadFile(String filePath) async {
    try {
      final formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(filePath),
      });
      
      final response = await _dio.post(
        '/upload',
        data: formData,
        onSendProgress: (int sent, int total) {
          print('Upload progress: ${(sent / total * 100).toStringAsFixed(0)}%');
        },
      );
      
      return response.data['url'];
    } on DioException catch (e) {
      throw Exception('Upload error: ${e.message}');
    }
  }
}
```

## 状态管理中的网络请求

### 1. 使用 Provider

```dart
class PostProvider extends ChangeNotifier {
  List<Post> _posts = [];
  bool _isLoading = false;
  String? _error;
  
  List<Post> get posts => _posts;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  Future<void> fetchPosts() async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    
    try {
      _posts = await HttpService.getPosts();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
  
  Future<void> createPost(Post post) async {
    try {
      final newPost = await HttpService.createPost(post);
      _posts.add(newPost);
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
  
  Future<void> deletePost(int id) async {
    try {
      await HttpService.deletePost(id);
      _posts.removeWhere((post) => post.id == id);
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
}

// 在 Widget 中使用
class PostsWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<PostProvider>(
      builder: (context, provider, child) {
        if (provider.isLoading) {
          return Center(child: CircularProgressIndicator());
        }
        
        if (provider.error != null) {
          return Center(
            child: Column(
              children: [
                Text('Error: ${provider.error}'),
                ElevatedButton(
                  onPressed: () => provider.fetchPosts(),
                  child: Text('Retry'),
                ),
              ],
            ),
          );
        }
        
        return ListView.builder(
          itemCount: provider.posts.length,
          itemBuilder: (context, index) {
            final post = provider.posts[index];
            return ListTile(
              title: Text(post.title),
              subtitle: Text(post.body),
              trailing: IconButton(
                icon: Icon(Icons.delete),
                onPressed: () => provider.deletePost(post.id!),
              ),
            );
          },
        );
      },
    );
  }
}
```

### 2. 使用 Riverpod

```dart
final postsProvider = FutureProvider<List<Post>>((ref) async {
  return await HttpService.getPosts();
});

final postProvider = StateNotifierProvider<PostNotifier, AsyncValue<List<Post>>>((ref) {
  return PostNotifier();
});

class PostNotifier extends StateNotifier<AsyncValue<List<Post>>> {
  PostNotifier() : super(const AsyncValue.loading());
  
  Future<void> fetchPosts() async {
    state = const AsyncValue.loading();
    try {
      final posts = await HttpService.getPosts();
      state = AsyncValue.data(posts);
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }
  
  Future<void> createPost(Post post) async {
    try {
      final newPost = await HttpService.createPost(post);
      state.whenData((posts) {
        state = AsyncValue.data([...posts, newPost]);
      });
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }
}

// 在 Widget 中使用
class PostsWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final postsAsync = ref.watch(postsProvider);
    
    return postsAsync.when(
      data: (posts) => ListView.builder(
        itemCount: posts.length,
        itemBuilder: (context, index) {
          final post = posts[index];
          return ListTile(
            title: Text(post.title),
            subtitle: Text(post.body),
          );
        },
      ),
      loading: () => Center(child: CircularProgressIndicator()),
      error: (error, stack) => Center(
        child: Column(
          children: [
            Text('Error: $error'),
            ElevatedButton(
              onPressed: () => ref.refresh(postsProvider),
              child: Text('Retry'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## WebSocket 连接

```dart
import 'dart:io';

class WebSocketService {
  WebSocket? _socket;
  StreamController<String>? _messageController;
  
  Stream<String> get messageStream => _messageController!.stream;
  
  Future<void> connect(String url) async {
    try {
      _socket = await WebSocket.connect(url);
      _messageController = StreamController<String>();
      
      _socket!.listen(
        (data) {
          _messageController!.add(data.toString());
        },
        onError: (error) {
          print('WebSocket error: $error');
        },
        onDone: () {
          print('WebSocket connection closed');
        },
      );
    } catch (e) {
      throw Exception('Failed to connect: $e');
    }
  }
  
  void sendMessage(String message) {
    if (_socket != null) {
      _socket!.add(message);
    }
  }
  
  void disconnect() {
    _socket?.close();
    _messageController?.close();
  }
}

// 在 Widget 中使用
class ChatWidget extends StatefulWidget {
  @override
  _ChatWidgetState createState() => _ChatWidgetState();
}

class _ChatWidgetState extends State<ChatWidget> {
  final WebSocketService _webSocketService = WebSocketService();
  final TextEditingController _messageController = TextEditingController();
  List<String> _messages = [];
  
  @override
  void initState() {
    super.initState();
    _connectToWebSocket();
  }
  
  Future<void> _connectToWebSocket() async {
    try {
      await _webSocketService.connect('ws://localhost:8080');
      _webSocketService.messageStream.listen((message) {
        setState(() {
          _messages.add(message);
        });
      });
    } catch (e) {
      print('Connection error: $e');
    }
  }
  
  void _sendMessage() {
    if (_messageController.text.isNotEmpty) {
      _webSocketService.sendMessage(_messageController.text);
      _messageController.clear();
    }
  }
  
  @override
  void dispose() {
    _webSocketService.disconnect();
    _messageController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.builder(
            itemCount: _messages.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(_messages[index]),
              );
            },
          ),
        ),
        Padding(
          padding: EdgeInsets.all(8.0),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _messageController,
                  decoration: InputDecoration(
                    hintText: 'Enter message',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              SizedBox(width: 8.0),
              ElevatedButton(
                onPressed: _sendMessage,
                child: Text('Send'),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```

## 缓存和离线支持

```dart
import 'package:shared_preferences/shared_preferences.dart';

class CacheService {
  static const String _postsKey = 'cached_posts';
  
  // 缓存数据
  static Future<void> cachePosts(List<Post> posts) async {
    final prefs = await SharedPreferences.getInstance();
    final postsJson = posts.map((post) => post.toJson()).toList();
    await prefs.setString(_postsKey, json.encode(postsJson));
  }
  
  // 获取缓存数据
  static Future<List<Post>?> getCachedPosts() async {
    final prefs = await SharedPreferences.getInstance();
    final postsString = prefs.getString(_postsKey);
    
    if (postsString != null) {
      final List<dynamic> postsJson = json.decode(postsString);
      return postsJson.map((json) => Post.fromJson(json)).toList();
    }
    return null;
  }
  
  // 清除缓存
  static Future<void> clearCache() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_postsKey);
  }
}

// 带缓存的网络服务
class CachedHttpService {
  static Future<List<Post>> getPostsWithCache() async {
    try {
      // 尝试从网络获取数据
      final posts = await HttpService.getPosts();
      // 缓存数据
      await CacheService.cachePosts(posts);
      return posts;
    } catch (e) {
      // 网络失败，尝试从缓存获取
      final cachedPosts = await CacheService.getCachedPosts();
      if (cachedPosts != null) {
        return cachedPosts;
      }
      throw Exception('No data available');
    }
  }
}
```

## 错误处理和重试机制

```dart
class RetryService {
  static Future<T> retry<T>(
    Future<T> Function() operation, {
    int maxAttempts = 3,
    Duration delay = const Duration(seconds: 1),
  }) async {
    int attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        return await operation();
      } catch (e) {
        attempts++;
        if (attempts >= maxAttempts) {
          throw e;
        }
        await Future.delayed(delay * attempts);
      }
    }
    
    throw Exception('Max retry attempts reached');
  }
}

// 使用重试机制
class ResilientHttpService {
  static Future<List<Post>> getPostsWithRetry() async {
    return await RetryService.retry(
      () => HttpService.getPosts(),
      maxAttempts: 3,
      delay: Duration(seconds: 2),
    );
  }
}
```

## 总结

Flutter 网络请求的特点：
- **多种选择**: http、dio、WebSocket 等
- **类型安全**: 支持强类型数据模型
- **状态管理**: 与 Provider、Riverpod 等集成
- **缓存支持**: 离线数据访问
- **错误处理**: 完善的错误处理和重试机制 