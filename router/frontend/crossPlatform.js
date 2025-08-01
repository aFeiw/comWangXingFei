export function frontendCrossPlatform() {
    return [
        {
            text: 'Flutter',
            collapsible: true,
            items: [
                { text: 'Dart基础', link: '/frontend/CrossPlatform/dart-basics' },
                { text: 'Widget系统', link: '/frontend/CrossPlatform/widget-system' },
                { text: 'Material组件', link: '/frontend/CrossPlatform/material-components' },
                { text: '状态管理', link: '/frontend/CrossPlatform/state-management' },
                { text: '导航', link: '/frontend/CrossPlatform/navigation' },
                { text: '手势', link: '/frontend/CrossPlatform/gestures' },
                { text: '动画', link: '/frontend/CrossPlatform/animations' },
                { text: 'HTTP请求', link: '/frontend/CrossPlatform/http-requests' },
                { text: '性能优化', link: '/frontend/CrossPlatform/performance' },
                { text: '架构', link: '/frontend/CrossPlatform/architecture' },
            ],
        },
        {
            text: 'React Native',
            collapsible: true,
            items: [
                { text: '基础概念', link: '/frontend/CrossPlatform/ReactNative/' },
                { text: '架构理解', link: '/frontend/CrossPlatform/ReactNative/architecture' },
                { text: '组件系统', link: '/frontend/CrossPlatform/ReactNative/component-system' },
                { text: '状态管理', link: '/frontend/CrossPlatform/ReactNative/state-management' },
                { text: '导航系统', link: '/frontend/CrossPlatform/ReactNative/navigation' },
                { text: '动画系统', link: '/frontend/CrossPlatform/ReactNative/animations' },
                { text: '性能优化', link: '/frontend/CrossPlatform/ReactNative/performance' },
                { text: '调试技巧', link: '/frontend/CrossPlatform/ReactNative/debugging' },
            ],
        },
        {
            text: '混合开发',
            collapsible: true,
            items: [
                { text: '概述', link: '/frontend/CrossPlatform/Hybrid/' },
                { text: 'Cordova/PhoneGap', link: '/frontend/CrossPlatform/Hybrid/cordova-phonegap' },
                { text: 'Ionic Framework', link: '/frontend/CrossPlatform/Hybrid/ionic-framework' },
                { text: 'Capacitor', link: '/frontend/CrossPlatform/Hybrid/capacitor' },
                { text: 'Tauri', link: '/frontend/CrossPlatform/Hybrid/tauri' },
                { text: '性能优化', link: '/frontend/CrossPlatform/Hybrid/performance-optimization' },
                { text: '最佳实践', link: '/frontend/CrossPlatform/Hybrid/project-structure' },
                { text: '安全考虑', link: '/frontend/CrossPlatform/Hybrid/security-considerations' },
            ],
        },
    ]
} 