---
layout: home
hero:
  name: 王兴飞文档
  tagline: 技术探索与产品实践 | 早期记录学习历程，后续将分享首个上架产品调酒APP的创作历程
  image:
    src: ./learning.png
    alt: VitePress
  actions:
    - theme: brand
      text: 开始探索 →
      link: /personal/
    - theme: alt
      text: 早期博客 🎙️
      link: https://afeiw.github.io/aFeiWebsite/
    - theme: alt
      text: 调酒APP🍸
      link: http://flyahub.cn/
features:
    - title: 💡 技术探索
      details: 深入前端、后端、跨平台等技术领域，记录学习心得和实践经验
    - title: 🚀 产品实践
      details: 从创意到上架，分享调酒APP的完整开发历程和产品思维
    - title: 🎯 方向寻找
      details: 在技术海洋中探索个人发展方向，寻找最适合的技术栈和产品方向
---

<style scoped>
/* 主页按钮样式优化 */
.VPHomeHero .actions .VPButton {
  transition: all 0.3s ease;
  border-radius: 8px;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
}

.VPHomeHero .actions .VPButton.brand {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.VPHomeHero .actions .VPButton.brand:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.VPHomeHero .actions .VPButton.alt {
  border: 2px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: transparent;
}

.VPHomeHero .actions .VPButton.alt:hover {
  background: var(--vp-c-brand);
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .VPHomeHero .actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
 
 


