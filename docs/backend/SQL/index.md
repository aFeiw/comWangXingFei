# SQL 学习笔记

SQL (Structured Query Language) 是用于管理关系数据库的标准语言。

## 目录

### 基础概念
- [SQL 基础语法](./basic-syntax.md)
- [数据类型详解](./data-types.md)
- [约束条件](./constraints.md)
- [索引优化](./indexes.md)

### 查询操作
- [SELECT 查询](./select-queries.md)
- [WHERE 条件](./where-clauses.md)
- [JOIN 连接](./joins.md)
- [聚合函数](./aggregate-functions.md)

### 数据操作
- [INSERT 插入](./insert.md)
- [UPDATE 更新](./update.md)
- [DELETE 删除](./delete.md)
- [事务处理](./transactions.md)

### 高级特性
- [存储过程](./stored-procedures.md)
- [触发器](./triggers.md)
- [视图](./views.md)
- [性能优化](./performance.md)

## 基础语法

### 创建数据库

```sql
-- 创建数据库
CREATE DATABASE my_database;

-- 使用数据库
USE my_database;

-- 删除数据库
DROP DATABASE my_database;
```

### 创建表

```sql
-- 创建用户表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建文章表
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    author_id INT NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 查询操作

### 基本查询

```sql
-- 查询所有用户
SELECT * FROM users;

-- 查询特定字段
SELECT id, username, email, created_at FROM users;

-- 条件查询
SELECT * FROM users WHERE created_at > '2023-01-01';

-- 排序
SELECT * FROM users ORDER BY created_at DESC;

-- 限制结果数量
SELECT * FROM users LIMIT 10 OFFSET 20;
```

### 连接查询

```sql
-- 内连接
SELECT 
    a.title,
    a.content,
    u.username as author
FROM articles a
INNER JOIN users u ON a.author_id = u.id
WHERE a.status = 'published';

-- 左连接
SELECT 
    u.username,
    COUNT(a.id) as article_count
FROM users u
LEFT JOIN articles a ON u.id = a.author_id
GROUP BY u.id, u.username;

-- 右连接
SELECT 
    a.title,
    u.username
FROM articles a
RIGHT JOIN users u ON a.author_id = u.id;
```

### 聚合查询

```sql
-- 统计用户数量
SELECT COUNT(*) as total_users FROM users;

-- 按状态统计文章数量
SELECT 
    status,
    COUNT(*) as count
FROM articles
GROUP BY status;

-- 计算平均文章长度
SELECT 
    AVG(LENGTH(content)) as avg_content_length
FROM articles
WHERE status = 'published';

-- 查找最活跃的作者
SELECT 
    u.username,
    COUNT(a.id) as article_count,
    AVG(LENGTH(a.content)) as avg_content_length
FROM users u
LEFT JOIN articles a ON u.id = a.author_id
GROUP BY u.id, u.username
HAVING article_count > 0
ORDER BY article_count DESC
LIMIT 10;
```

## 数据操作

### 插入数据

```sql
-- 插入单条记录
INSERT INTO users (username, email, password_hash) 
VALUES ('john_doe', 'john@example.com', 'hashed_password');

-- 插入多条记录
INSERT INTO users (username, email, password_hash) VALUES
('jane_doe', 'jane@example.com', 'hashed_password_1'),
('bob_smith', 'bob@example.com', 'hashed_password_2'),
('alice_jones', 'alice@example.com', 'hashed_password_3');

-- 从其他表插入数据
INSERT INTO users (username, email, password_hash)
SELECT username, email, password_hash FROM temp_users;
```

### 更新数据

```sql
-- 更新单条记录
UPDATE users 
SET email = 'new_email@example.com'
WHERE id = 1;

-- 批量更新
UPDATE articles 
SET status = 'archived'
WHERE created_at < '2022-01-01';

-- 使用子查询更新
UPDATE articles 
SET author_id = (
    SELECT id FROM users WHERE username = 'admin'
)
WHERE author_id IS NULL;
```

### 删除数据

```sql
-- 删除单条记录
DELETE FROM users WHERE id = 1;

-- 批量删除
DELETE FROM articles WHERE status = 'draft';

-- 删除所有数据
DELETE FROM users;

-- 截断表（更快，但不可回滚）
TRUNCATE TABLE articles;
```

## 高级查询

### 子查询

```sql
-- 查找发表文章最多的用户
SELECT username, email
FROM users
WHERE id IN (
    SELECT author_id
    FROM articles
    GROUP BY author_id
    HAVING COUNT(*) = (
        SELECT MAX(article_count)
        FROM (
            SELECT COUNT(*) as article_count
            FROM articles
            GROUP BY author_id
        ) as counts
    )
);

-- 使用 EXISTS
SELECT username
FROM users u
WHERE EXISTS (
    SELECT 1 FROM articles a 
    WHERE a.author_id = u.id 
    AND a.status = 'published'
);
```

### 窗口函数

```sql
-- 按作者排名文章
SELECT 
    title,
    username,
    ROW_NUMBER() OVER (
        PARTITION BY author_id 
        ORDER BY created_at DESC
    ) as author_rank
FROM articles a
JOIN users u ON a.author_id = u.id;

-- 计算累计文章数
SELECT 
    username,
    created_at,
    COUNT(*) OVER (
        PARTITION BY author_id 
        ORDER BY created_at
        ROWS UNBOUNDED PRECEDING
    ) as cumulative_articles
FROM articles a
JOIN users u ON a.author_id = u.id;
```

## 索引优化

### 创建索引

```sql
-- 单列索引
CREATE INDEX idx_username ON users(username);

-- 复合索引
CREATE INDEX idx_author_status ON articles(author_id, status);

-- 唯一索引
CREATE UNIQUE INDEX idx_email ON users(email);

-- 全文索引
CREATE FULLTEXT INDEX idx_content ON articles(title, content);
```

### 查询优化

```sql
-- 使用 EXPLAIN 分析查询
EXPLAIN SELECT * FROM articles WHERE author_id = 1;

-- 强制使用索引
SELECT * FROM articles FORCE INDEX (idx_author_status) 
WHERE author_id = 1 AND status = 'published';

-- 避免全表扫描
SELECT * FROM articles 
WHERE author_id = 1 
AND created_at > '2023-01-01'
AND status = 'published';
```

## 事务处理

### 事务基础

```sql
-- 开始事务
START TRANSACTION;

-- 执行操作
INSERT INTO users (username, email, password_hash) 
VALUES ('new_user', 'new@example.com', 'hash');

UPDATE articles SET author_id = LAST_INSERT_ID() 
WHERE id = 1;

-- 提交事务
COMMIT;

-- 或者回滚事务
ROLLBACK;
```

### 事务隔离级别

```sql
-- 设置隔离级别
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 查看当前隔离级别
SELECT @@tx_isolation;
```

## 存储过程

### 创建存储过程

```sql
DELIMITER //

CREATE PROCEDURE GetUserArticles(
    IN user_id INT,
    IN status_filter VARCHAR(20)
)
BEGIN
    SELECT 
        a.id,
        a.title,
        a.content,
        a.status,
        a.created_at
    FROM articles a
    WHERE a.author_id = user_id
    AND (status_filter IS NULL OR a.status = status_filter)
    ORDER BY a.created_at DESC;
END //

DELIMITER ;

-- 调用存储过程
CALL GetUserArticles(1, 'published');
```

### 带参数的存储过程

```sql
DELIMITER //

CREATE PROCEDURE CreateUserWithArticles(
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    OUT p_user_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    INSERT INTO users (username, email, password_hash)
    VALUES (p_username, p_email, p_password_hash);
    
    SET p_user_id = LAST_INSERT_ID();
    
    COMMIT;
END //

DELIMITER ;

-- 调用存储过程
CALL CreateUserWithArticles('new_user', 'new@example.com', 'hash', @user_id);
SELECT @user_id;
```

## 触发器

### 创建触发器

```sql
-- 创建触发器，在插入文章时更新用户统计
DELIMITER //

CREATE TRIGGER after_article_insert
AFTER INSERT ON articles
FOR EACH ROW
BEGIN
    UPDATE users 
    SET article_count = (
        SELECT COUNT(*) 
        FROM articles 
        WHERE author_id = NEW.author_id
    )
    WHERE id = NEW.author_id;
END //

DELIMITER ;

-- 创建触发器，在删除文章时更新用户统计
DELIMITER //

CREATE TRIGGER after_article_delete
AFTER DELETE ON articles
FOR EACH ROW
BEGIN
    UPDATE users 
    SET article_count = (
        SELECT COUNT(*) 
        FROM articles 
        WHERE author_id = OLD.author_id
    )
    WHERE id = OLD.author_id;
END //

DELIMITER ;
```

## 视图

### 创建视图

```sql
-- 创建用户文章视图
CREATE VIEW user_articles_view AS
SELECT 
    u.id as user_id,
    u.username,
    u.email,
    COUNT(a.id) as total_articles,
    COUNT(CASE WHEN a.status = 'published' THEN 1 END) as published_articles,
    MAX(a.created_at) as last_article_date
FROM users u
LEFT JOIN articles a ON u.id = a.author_id
GROUP BY u.id, u.username, u.email;

-- 使用视图
SELECT * FROM user_articles_view WHERE total_articles > 0;
```

## 性能优化

### 查询优化技巧

```sql
-- 使用 LIMIT 限制结果
SELECT * FROM articles ORDER BY created_at DESC LIMIT 10;

-- 避免 SELECT *
SELECT id, title, author_id, created_at FROM articles;

-- 使用索引的列进行排序
SELECT * FROM articles ORDER BY author_id, created_at DESC;

-- 使用 IN 而不是多个 OR
SELECT * FROM articles WHERE author_id IN (1, 2, 3);

-- 使用 EXISTS 而不是 IN（对于大表）
SELECT * FROM users u 
WHERE EXISTS (
    SELECT 1 FROM articles a WHERE a.author_id = u.id
);
```

### 表优化

```sql
-- 分析表
ANALYZE TABLE articles;

-- 优化表
OPTIMIZE TABLE articles;

-- 检查表
CHECK TABLE articles;

-- 修复表
REPAIR TABLE articles;
```

## 最佳实践

### 命名规范

```sql
-- 表名使用复数形式
users, articles, comments

-- 字段名使用下划线分隔
user_id, created_at, updated_at

-- 索引名使用前缀
idx_username, idx_author_status

-- 外键名使用 fk_ 前缀
fk_articles_author
```

### 数据完整性

```sql
-- 使用外键约束
ALTER TABLE articles 
ADD CONSTRAINT fk_articles_author 
FOREIGN KEY (author_id) REFERENCES users(id) 
ON DELETE CASCADE;

-- 使用检查约束
ALTER TABLE articles 
ADD CONSTRAINT chk_status 
CHECK (status IN ('draft', 'published', 'archived'));

-- 使用默认值
ALTER TABLE articles 
ALTER COLUMN status SET DEFAULT 'draft';
``` 