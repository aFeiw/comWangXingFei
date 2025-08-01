# Redis 学习笔记

Redis 是一个开源的内存数据结构存储系统，可用作数据库、缓存和消息中间件。

## 目录

### 基础概念
- [Redis 架构理解](./architecture.md)
- [数据类型详解](./data-types.md)
- [持久化机制](./persistence.md)
- [内存管理](./memory-management.md)

### 核心功能
- [字符串操作](./string-operations.md)
- [哈希操作](./hash-operations.md)
- [列表操作](./list-operations.md)
- [集合操作](./set-operations.md)

### 高级特性
- [事务处理](./transactions.md)
- [发布订阅](./pub-sub.md)
- [Lua 脚本](./lua-scripting.md)
- [集群配置](./cluster.md)

## 快速开始

### 安装 Redis

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install redis-server

# CentOS/RHEL
sudo yum install redis

# macOS
brew install redis

# 启动 Redis
redis-server

# 连接 Redis
redis-cli
```

### 基础操作

```bash
# 设置键值对
SET key value

# 获取值
GET key

# 检查键是否存在
EXISTS key

# 删除键
DEL key

# 设置过期时间
EXPIRE key 3600

# 查看剩余过期时间
TTL key
```

## 数据类型

### 字符串 (String)

```bash
# 基本操作
SET name "John Doe"
GET name
SET age 25
INCR age
DECR age

# 批量操作
MSET key1 "value1" key2 "value2"
MGET key1 key2

# 字符串操作
APPEND name " Jr"
STRLEN name
GETRANGE name 0 3
SETRANGE name 0 "Jane"
```

### 哈希 (Hash)

```bash
# 哈希操作
HSET user:1 name "John" age 25 email "john@example.com"
HGET user:1 name
HGETALL user:1
HMSET user:2 name "Jane" age 30 email "jane@example.com"
HMGET user:2 name age
HDEL user:1 age
HEXISTS user:1 name
HKEYS user:1
HVALS user:1
HLEN user:1
```

### 列表 (List)

```bash
# 列表操作
LPUSH mylist "item1"
RPUSH mylist "item2"
LPOP mylist
RPOP mylist
LRANGE mylist 0 -1
LLEN mylist
LINDEX mylist 0
LSET mylist 0 "new_item"
LINSERT mylist BEFORE "item2" "new_item"
LREM mylist 1 "item1"
```

### 集合 (Set)

```bash
# 集合操作
SADD myset "member1" "member2" "member3"
SMEMBERS myset
SISMEMBER myset "member1"
SREM myset "member1"
SCARD myset
SPOP myset
SRANDMEMBER myset 2

# 集合运算
SADD set1 "a" "b" "c"
SADD set2 "b" "c" "d"
SINTER set1 set2
SUNION set1 set2
SDIFF set1 set2
```

### 有序集合 (Sorted Set)

```bash
# 有序集合操作
ZADD leaderboard 100 "player1"
ZADD leaderboard 200 "player2" 150 "player3"
ZRANGE leaderboard 0 -1 WITHSCORES
ZREVRANGE leaderboard 0 -1 WITHSCORES
ZSCORE leaderboard "player1"
ZRANK leaderboard "player1"
ZREVRANK leaderboard "player1"
ZCARD leaderboard
ZREM leaderboard "player1"
```

## 高级功能

### 事务处理

```bash
# 开始事务
MULTI

# 执行命令
SET key1 "value1"
SET key2 "value2"
INCR counter

# 提交事务
EXEC

# 或者取消事务
DISCARD
```

### 发布订阅

```bash
# 订阅频道
SUBSCRIBE news sports

# 发布消息
PUBLISH news "Breaking news!"
PUBLISH sports "Game started!"

# 模式订阅
PSUBSCRIBE news.*
PUBLISH news.tech "New technology!"
```

### Lua 脚本

```lua
-- 原子性操作示例
local key = KEYS[1]
local value = ARGV[1]
local ttl = ARGV[2]

-- 检查键是否存在
if redis.call("EXISTS", key) == 1 then
    return redis.call("GET", key)
else
    redis.call("SET", key, value)
    redis.call("EXPIRE", key, ttl)
    return value
end
```

```bash
# 执行 Lua 脚本
redis-cli --eval script.lua key1 , value1 3600
```

## 持久化

### RDB 快照

```bash
# 配置文件 redis.conf
save 900 1      # 900秒内至少1个键被修改
save 300 10     # 300秒内至少10个键被修改
save 60 10000   # 60秒内至少10000个键被修改

# 手动保存
SAVE
BGSAVE
```

### AOF 日志

```bash
# 配置文件 redis.conf
appendonly yes
appendfsync always    # 每次写入都同步
appendfsync everysec  # 每秒同步一次
appendfsync no        # 由操作系统决定

# AOF 重写
BGREWRITEAOF
```

## 集群配置

### 主从复制

```bash
# 主服务器配置
# redis.conf
bind 127.0.0.1
port 6379

# 从服务器配置
# redis.conf
bind 127.0.0.1
port 6380
slaveof 127.0.0.1 6379
```

### Redis Cluster

```bash
# 创建集群
redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 \
127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \
--cluster-replicas 1

# 连接集群
redis-cli -c -p 7000
```

## 性能优化

### 内存优化

```bash
# 设置最大内存
CONFIG SET maxmemory 2gb

# 内存策略
CONFIG SET maxmemory-policy allkeys-lru
CONFIG SET maxmemory-policy volatile-lru
CONFIG SET maxmemory-policy allkeys-random
CONFIG SET maxmemory-policy volatile-random
CONFIG SET maxmemory-policy volatile-ttl
CONFIG SET maxmemory-policy noeviction
```

### 连接池配置

```python
# Python 连接池示例
import redis

pool = redis.ConnectionPool(
    host='localhost',
    port=6379,
    db=0,
    max_connections=20,
    decode_responses=True
)

r = redis.Redis(connection_pool=pool)
```

```java
// Java 连接池示例
@Configuration
public class RedisConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // 设置序列化器
        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        
        return template;
    }
}
```

## 监控和调试

### 性能监控

```bash
# 查看统计信息
INFO

# 查看内存使用
INFO memory

# 查看命令统计
INFO stats

# 查看慢查询
SLOWLOG GET 10

# 设置慢查询阈值
CONFIG SET slowlog-log-slower-than 10000
```

### 调试工具

```bash
# 监控命令
MONITOR

# 查看键空间统计
INFO keyspace

# 查看客户端连接
CLIENT LIST

# 查看配置
CONFIG GET *

# 查看服务器信息
INFO server
```

## 安全配置

### 访问控制

```bash
# 设置密码
CONFIG SET requirepass "your_password"

# 认证
AUTH your_password

# 重命名危险命令
CONFIG SET rename-command FLUSHDB ""
CONFIG SET rename-command FLUSHALL ""
CONFIG SET rename-command KEYS ""
```

### 网络安全

```bash
# 绑定网络接口
CONFIG SET bind 127.0.0.1

# 禁用危险命令
CONFIG SET rename-command DEBUG ""
CONFIG SET rename-command CONFIG ""

# 设置超时
CONFIG SET timeout 300
```

## 最佳实践

### 键命名规范

```bash
# 使用冒号分隔
user:1:profile
user:1:posts
post:1:comments

# 使用点分隔
user.1.profile
user.1.posts

# 使用下划线分隔
user_1_profile
user_1_posts
```

### 数据结构选择

```bash
# 字符串：简单键值对
SET user:1:name "John"

# 哈希：对象属性
HSET user:1 name "John" age 25 email "john@example.com"

# 列表：队列、时间线
LPUSH timeline:user:1 "post:1"
LPUSH timeline:user:1 "post:2"

# 集合：标签、好友
SADD post:1:tags "redis" "database"
SADD user:1:friends "user:2" "user:3"

# 有序集合：排行榜、时间排序
ZADD leaderboard 100 "player1"
ZADD posts:user:1 1640995200 "post:1"
```

### 缓存策略

```bash
# 设置过期时间
SET key value EX 3600
SET key value PX 3600000

# 条件设置
SET key value NX EX 3600  # 不存在时设置
SET key value XX EX 3600  # 存在时设置

# 原子性操作
SET key value EX 3600
GET key
DEL key
```

### 错误处理

```bash
# 检查键是否存在
EXISTS key

# 安全删除
DEL key

# 原子性操作
MULTI
SET key value
EXPIRE key 3600
EXEC
```

## 应用场景

### 缓存系统

```python
# 缓存装饰器
import redis
import json
import functools

r = redis.Redis(host='localhost', port=6379, db=0)

def cache(expire=3600):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # 生成缓存键
            cache_key = f"{func.__name__}:{hash(str(args) + str(kwargs))}"
            
            # 尝试从缓存获取
            cached = r.get(cache_key)
            if cached:
                return json.loads(cached)
            
            # 执行函数
            result = func(*args, **kwargs)
            
            # 存入缓存
            r.setex(cache_key, expire, json.dumps(result))
            
            return result
        return wrapper
    return decorator
```

### 会话存储

```python
# 会话管理
import uuid
import json

class SessionManager:
    def __init__(self, redis_client):
        self.redis = redis_client
    
    def create_session(self, user_id):
        session_id = str(uuid.uuid4())
        session_data = {
            'user_id': user_id,
            'created_at': time.time()
        }
        self.redis.setex(f"session:{session_id}", 3600, json.dumps(session_data))
        return session_id
    
    def get_session(self, session_id):
        data = self.redis.get(f"session:{session_id}")
        if data:
            return json.loads(data)
        return None
    
    def delete_session(self, session_id):
        self.redis.delete(f"session:{session_id}")
```

### 消息队列

```python
# 简单消息队列
class MessageQueue:
    def __init__(self, redis_client, queue_name):
        self.redis = redis_client
        self.queue_name = queue_name
    
    def enqueue(self, message):
        self.redis.lpush(self.queue_name, json.dumps(message))
    
    def dequeue(self, timeout=0):
        if timeout > 0:
            result = self.redis.brpop(self.queue_name, timeout)
            if result:
                return json.loads(result[1])
        else:
            result = self.redis.rpop(self.queue_name)
            if result:
                return json.loads(result)
        return None
``` 