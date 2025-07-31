export function frontendFlutter() {
    return [
        {
            //开启折叠
            collapsible: true,
            text: '基础概念',
            items: [
                { text: 'Flutter 架构理解', link: '/frontend/Flutter/architecture' },
                { text: 'Dart 语言基础', link: '/frontend/Flutter/dart-basics' },
                { text: 'Widget 系统详解', link: '/frontend/Flutter/widget-system' },
                { text: 'State 管理', link: '/frontend/Flutter/state-management' },
            ],
        },
        {
            //开启折叠
            collapsible: true,
            text: '核心组件',
            items: [
                { text: 'Material Design 组件', link: '/frontend/Flutter/material-components' },
                { text: 'Cupertino 组件', link: '/frontend/Flutter/cupertino-components' },
                { text: '布局组件', link: '/frontend/Flutter/layout-widgets' },
                { text: '导航组件', link: '/frontend/Flutter/navigation' },
            ],
        },
        {
            //开启折叠
            collapsible: true,
            text: '高级特性',
            items: [
                { text: '动画系统', link: '/frontend/Flutter/animations' },
                { text: '手势处理', link: '/frontend/Flutter/gestures' },
                { text: '网络请求', link: '/frontend/Flutter/http-requests' },
                { text: '本地存储', link: '/frontend/Flutter/local-storage' },
                { text: '状态管理方案', link: '/frontend/Flutter/state-solutions' },
            ],
        },
        {
            //开启折叠
            collapsible: true,
            text: '性能优化',
            items: [
                { text: '性能优化技巧', link: '/frontend/Flutter/performance' },
                { text: '内存管理', link: '/frontend/Flutter/memory-management' },
                { text: '渲染优化', link: '/frontend/Flutter/rendering-optimization' },
            ],
        },
        {
            //开启折叠
            collapsible: true,
            text: '实战应用',
            items: [
                { text: '项目结构', link: '/frontend/Flutter/project-structure' },
                { text: '路由管理', link: '/frontend/Flutter/routing' },
                { text: '国际化', link: '/frontend/Flutter/internationalization' },
                { text: '主题定制', link: '/frontend/Flutter/theming' },
                { text: '测试策略', link: '/frontend/Flutter/testing' },
            ],
        },
        {
            //开启折叠
            collapsible: true,
            text: '发布部署',
            items: [
                { text: '构建配置', link: '/frontend/Flutter/build-config' },
                { text: '应用签名', link: '/frontend/Flutter/app-signing' },
                { text: '发布到应用商店', link: '/frontend/Flutter/publishing' },
            ],
        },
    ]
} 