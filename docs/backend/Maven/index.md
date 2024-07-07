# Maven简介

Maven的本质是一个项目管理工具，将项目开发和管理过程抽象成一个项目对象模型（POM）。

### Maven的作用：

1.项目构建:提供标准的、跨平台的自动化项目构建方式
 2.依赖管理:方便快捷的管理项目依赖的资源(jar包)，避免资源间的版本冲突问题
 3.统一开发结构:提供标准的、统一的项目结构

# 二、Maven基础概念

## 1.仓库

仓库:用于存储资源,包含各种jar包

## 仓库分类:

## 1.1本地仓库:

自己电脑上存储资源的仓库，连接远程仓库获取

## 1.2远程仓库:

非本机电脑上的仓库，为本地仓库提供资源资源

中央仓库:Maven团队维护，存储所有资源的仓库
 私服:部门/公司范围内存储资源的仓库，从中央仓库获取资源

## 2.坐标

坐标：Maven中的坐标用于描述仓库中资源的位置

#### 坐标的组成：

groupld:定义当前Maven项目隶属组织名称（通常是域名反写，例如: org.mybatis)
 artifactld:定义当前Maven项目名称(通常是模块名称，例如CRM、SMS)
 version:定义当前项目版本号
 packaging:定义该项目的打包方式

### 坐标的作用：

使用唯一标识，唯一性定位资源位置，通过该标识可以将资源的识别与下载工作交由机器完成

## 仓库配置：

本地仓库、远程仓库、镜像仓库配置

# 三、Maven项目相关

Maven构建命令使用mvn开头，后面添加功能参数，可以一次执行多个命令，使用空格分隔
 mvn compile #编译
 mvn clean #清理
 mvn test #测试
 mvn package #打包
 mvn install  #安装到本地仓库

Maven工程目录结构

# 四、依赖管理

## 1、依赖管理

依赖指当前项目运行所需的jar，一个项目可以设置多个依赖

## 2、依赖传递

依赖具有传递性
 直接依赖:在当前项目中通过依赖配置建立的依赖关系
 间接依赖:被资源的资源如果依赖其他资源，当前项目间接依赖其他资源

依赖传递冲突问题
 ●路径优先:当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高
 ●声明优先:当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的
 ●特殊优先:当同级配置了相同资源的不同版本，后配置的覆盖先配置的

## 3、可选依赖

可选依赖指对外隐藏当前所依赖的资源――不透明



```xml
<dependency>
<groupId>junit</groupId>
<artifactId>junit</artifactId>
<version>4.12</version>
<optional>true</optional>
</dependency>
```

## 4、排除依赖

排除依赖指主动断开依赖的资源，被排除的资源无需指定版本一一不需要



```xml
<dependency>
<groupId>junit</groupId>
<artifactId>junit</artifactId>
<version>4.12</version>
<exclusions>
<exclusion>
<groupId>org.hamcrest</groupId>
<artifactId>hamcrest-core</artifactId>
</exclusion>
</exclusions>
</dependency>
```

## 5、依赖范围

依赖的jar默认情况可以在任何地方使用，可以通过scope标签设定其作用范围
 作用范围:
 主程序范围有效(main文件夹范围内)
 测试程序范围有效(test文件夹范围内)
 是否参与打包(package指令范围内)

# 五、生命周期与插件

## 1、项目构建生命周期

Maven构建生命周期描述的是一次构建过程经历了多少个事件
 Maven对项目构建的生命周期划分为3套：
 clean：清理工作

image.png

default：核心工作，例如编译，测试，打包，部署等

image.png

site：产生报告，发布站点等

image.png

## 2、插件

插件与生命周期内的阶段绑定，在执行到对应生命周期时执行对应的插件功能
 默认maven在各个生命周期上绑定有预设的功能
 通过插件可以自定义其他功能



```xml
<build>
<plugins>
<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-source-plugin</artifactId>
<version>2.2.1</version>
<executions>
<execution>
<goals>
<goal>jar</goal>
</goals>
<phase>generate-test-resources</phase>
</execution>
</executions>
</plugin>
</plugins>
</build>
```

# 六、分模块开发与设计

# 七、聚合

作用:聚合用于快速构建maven工程，—次性构建多个项目/模块。

制作方式:
 创建一个空模块,打包类型定义为pom
 `<packaging>pom</packaging>`
 (模块的类型有pom war jar)
 定义当前模块进行构建操作时关联的其他模块名称



```xml
<modules>
<module>../ssm_controller</module>
<module>../ssm_service</module>
<module>../ssm_dao</module>
<module>../ssm_pojo</module>
</modules>
```

注意事项:参与聚合操作的模块最终执行顺序与模块间的依赖关系有关，与配置顺序无关

# 八、继承

作用:通过继承可以实现在子工程中沿用父工程中的配置

◆在子工程中声明其父工程坐标与对应的位置



```xml
<!-- 定义该工程的父工程-->
<parent>
<groupId>com.itheima</groupId>
<artifactId>ssm</artifactId>
<version>1.0-SNAPSHOT</version>
<!--填写父工程的 pom文件 -->
<relativePath>../ssm/pom.xml</relativePath>
</parent>
```

在子工程中定义依赖关系，无需声明依赖版本，版本参照父工程中依赖的版本

# 九、属性

属性类别：

## 1.自定义属性

作用：等同于定义变量，方便统一维护
 定义格式：



```xml
<properties>
<spring.version>5.1.9.RELEASE</spring.version>
<junit.version>4.12</junit.version>
</properties>
```

调用格式：



```xml
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-context</artifactId>
<version>${spring.version}</version>
</dependency>
```

## 2.内置属性

作用：使用maven内置属性，快速配置
 调用格式：
 $ {basedir}
 ${version}

## 3.Setting属性

作用：使用maven配置文件setting.xml中的标签属性，用于动态配置
 调用格式：
 ${settings.localRepository}

## 4.Java系统属性

作用：读取Java系统属性
 调用格式：
 ${user.home}

## 5.环境变量属性

作用：使用环境变量的属性
 调用格式：
 ${env.JAVA_HOME}

# 十、版本管理

SNAPSHOT（快照版本）
 RELEASE（发布版本）

# 十一、资源配置

作用：在任意配置文件中加载pom文件中定义的属性
 调用格式：
 ${jdbc.url}
 开启配置文件加载pom属性：



```xml
<resources>
<resource>
<!--设定配置文件对应的位置目录，支持使用属性动态设定路径-->
<directory>${project.basedir}/src/main/resources</directory>
<!--开启对配置文件的资源加载过滤-->
<filtering>true</filtering>
</resource>
</resources>
```

# 十二、多环境开发配置

多环境配置：



```xml
<!-- 创建多环境-->
<profiles>
<profile>
<!--定义环境对应的唯一名称 -->
<id>pro_env</id>
<!-- 定义环境中专用的属性值-->
<properties>
<jdbc.url>jdbc:mysql://127.1.1.1:3306/ssm_db</jdbc.url>
</properties>
<!-- 设置默认启动-->
<activation>
<activeByDefault>true</activeByDefault>
</activation>
</profile>

<profile>
<id>dev_env</id>
……
</profile>
</profiles>
```

作用：加载指定环境配置
 调用格式：
 mvn 指令 -P 环境id
 eg：mvn install –P pro_env

# 十三、跳过测试

## 1、使用命令跳过测试

mvn 指令 -D skipTests

## 2、使用界面操作跳过测试

## 3、使用配置跳过测试



```xml
<plugin>
<artifactId>maven-surefire-plugin</artifactId>
<version>2.22.1</version>
<configuration>
<skipTests>true</skipTests>
<includes>
<include>**/User*Test.java</include>
</includes>
<excludes>
<exclude>**/User*TestCase.java</exclude>
</excludes>
</configuration>
</plugin>
```

# 十四、私服

## 1、仓库分类：

## 宿主仓库hosted

保存无法从中央仓库获取的资源
 自主研发
 第三方非开源项目

## 代理仓库proxy：

代理远程仓库，通过nexus访问其他公共仓库，例如中央仓库

## 仓库组group：

将若干个仓库组成一个群组，简化配置
 仓库组不能保存资源，属于设计型仓库

## 2、私服中的资源上传与下载

### 访问私服配置（本地仓库访问私服）：

配置本地仓库访问私服的权限：



```xml
<servers>
<server>
<id>heima-release</id>
<username>admin</username>
<password>admin</password>
</server>
<server>
<id>heima-snapshots</id>
<username>admin</username>
<password>admin</password>
</server>
</servers>
```

配置本地仓库资源来源（setting.xml）



```xml
<mirrors>
<mirror>
<id>nexus-heima</id>
<mirrorOf>*</mirrorOf>
<url>http://localhost:8081/repository/maven-public/</url>
</mirror>
</mirrors>
```

### 访问私服配置（项目工程访问私服）：

配置当前项目访问私服上传资源的保存位置(pom.xml)



```xml
<distributionManagement>
<repository>
<id>heima-release</id>
<url>http://localhost:8081/repository/heima-release/</url>
</repository>
<snapshotRepository>
<id>heima-snapshots</id>
<url>http://localhost:8081/repository/heima-snapshots/</url>
</snapshotRepository>
</distributionManagement>
```

发布资源到私服命令：
 mvn deploy