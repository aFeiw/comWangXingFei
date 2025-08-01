<template>
    <main
      class="home"
      :aria-labelledby="data.heroText !== null ? 'main-title' : null"
    >
      <header class="hero">
        <div class="hero-background">
          <div class="hero-gradient"></div>
          <div class="hero-pattern"></div>
        </div>
        
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
          class="hero-image"
        >
  
        <h1
          v-if="data.heroText !== null"
          id="main-title"
          class="hero-title"
        >
          {{ data.heroText || $title || 'Hello' }}
        </h1>
  
        <p
          v-if="data.tagline !== null"
          class="description"
        >
          {{ data.tagline || $description || 'Welcome to your VuePress site' }}
        </p>
  
        <div
          v-if="data.actions && data.actions.length"
          class="actions"
        >
          <NavLink
            v-for="action in data.actions"
            :key="action.text"
            class="action-button"
            :class="action.theme"
            :item="action"
          />
        </div>
      </header>
  
      <div
        v-if="data.features && data.features.length"
        class="features"
      >
        <div
          v-for="(feature, index) in data.features"
          :key="index"
          class="feature"
          @click="handleClickFeature(feature.url)"
        >
          <div class="feature-icon">
            <span class="feature-emoji">{{ getFeatureEmoji(feature.title) }}</span>
          </div>
          <div class="feature-content">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.details }}</p>
          </div>
        </div>
      </div>
  
      <Content class="theme-default-content custom" />
  
      <div
        v-if="data.footer"
        class="footer"
      >
        {{ data.footer }}
      </div>
    </main>
  </template>
  
  <script>
  import NavLink from '@theme/components/NavLink.vue'
  
  export default {
    name: 'Home',
  
    components: { NavLink },
  
    computed: {
      data () {
        return this.$page.frontmatter
      }
    },
    methods: {
      handleClickFeature(url) {
          if (url) {
            window.location.href = url
          }
      },
      getFeatureEmoji(title) {
        const emojiMap = {
          '技术探索': '💡',
          '产品实践': '🚀',
          '方向寻找': '🎯'
        }
        return emojiMap[title] || '✨'
      }
    }
  }
  </script>
  
  <style lang="stylus">
  .home
    padding $navbarHeight 2rem 0
    max-width $homePageWidth
    margin 0px auto
    display block
    
    .hero
      text-align center
      position relative
      min-height 70vh
      display flex
      flex-direction column
      justify-content center
      align-items center
      background linear-gradient(135deg, #667eea 0%, #764ba2 100%)
      border-radius 24px
      margin 2rem 0
      overflow hidden
      box-shadow 0 20px 40px rgba(102, 126, 234, 0.3)
      
      .hero-background
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        z-index 1
        
        .hero-gradient
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          background linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)
          animation shimmer 3s ease-in-out infinite
          
        .hero-pattern
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          background-image radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 1px, transparent 1px),
                          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
          background-size 60px 60px
          animation float 20s ease-in-out infinite
          
      .hero-image
        max-width 100%
        max-height 280px
        display block
        margin 2rem auto 1.5rem
        position relative
        z-index 2
        filter drop-shadow(0 15px 30px rgba(0,0,0,0.4))
        border-radius 16px
        transition transform 0.3s ease
        
        &:hover
          transform scale(1.05)
        
      .hero-title
        font-size 3.5rem
        font-weight 800
        color #ffffff
        text-shadow 0 4px 8px rgba(0,0,0,0.3)
        margin 1.5rem 0
        position relative
        z-index 2
        letter-spacing -0.02em
        
      h1, .description, .actions
        margin 1.5rem auto
        position relative
        z-index 2
        
      .description
        max-width 40rem
        font-size 1.6rem
        line-height 1.5
        color rgba(255,255,255,0.95)
        font-weight 400
        text-shadow 0 2px 4px rgba(0,0,0,0.2)
        
      .actions
        display flex
        flex-wrap wrap
        justify-content center
        gap 1.5rem
        margin-top 2.5rem
        position relative
        z-index 2
        
      .action-button
        display inline-block
        font-size 1.2rem
        color #ffffff
        padding 1rem 2rem
        border-radius 16px
        transition all 0.4s cubic-bezier(0.4, 0, 0.2, 1)
        box-sizing border-box
        text-decoration none
        font-weight 600
        position relative
        overflow hidden
        border none
        cursor pointer
        backdrop-filter blur(10px)
        box-shadow 0 8px 25px rgba(0,0,0,0.2)
        
        &::before
          content ''
          position absolute
          top 0
          left -100%
          width 100%
          height 100%
          background linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
          transition left 0.6s
          
        &:hover::before
          left 100%
          
        &.brand
          background linear-gradient(135deg, #667eea 0%, #764ba2 100%)
          box-shadow 0 8px 25px rgba(102, 126, 234, 0.4)
          &:hover
            transform translateY(-3px) scale(1.05)
            box-shadow 0 12px 35px rgba(102, 126, 234, 0.6)
            
        &.alt
          background linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
          box-shadow 0 8px 25px rgba(240, 147, 251, 0.4)
          &:hover
            transform translateY(-3px) scale(1.05)
            box-shadow 0 12px 35px rgba(240, 147, 251, 0.6)
            
        .icon.outbound
          color #ffffff
          margin-left 0.5rem
          
    .features
      padding 4rem 0
      margin-top 4rem
      display grid
      grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
      gap 2rem
      background linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)
      border-radius 24px
      box-shadow 0 10px 30px rgba(0,0,0,0.1)
      
    .feature
      background #ffffff
      border-radius 20px
      padding 2rem
      cursor pointer
      transition all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
      box-shadow 0 4px 20px rgba(0,0,0,0.08)
      border 1px solid rgba(255,255,255,0.8)
      
      &:hover
        transform translateY(-8px)
        box-shadow 0 20px 40px rgba(0,0,0,0.15)
        border-color rgba(102, 126, 234, 0.3)
        
      .feature-icon
        text-align center
        margin-bottom 1.5rem
        
        .feature-emoji
          font-size 3rem
          display block
          margin-bottom 1rem
          filter drop-shadow(0 4px 8px rgba(0,0,0,0.1))
          
      .feature-content
        text-align center
        
        h2
          font-size 1.5rem
          font-weight 700
          color #2c3e50
          margin-bottom 1rem
          border-bottom none
          padding-bottom 0
          
        p
          color #7f8c8d
          line-height 1.6
          font-size 1rem
          margin 0
          
    .footer
      padding 3rem
      text-align center
      color #7f8c8d
      background #ffffff
      border-radius 20px
      margin-top 3rem
      box-shadow 0 4px 20px rgba(0,0,0,0.08)
      
  @keyframes shimmer
    0%, 100%
      opacity 0.3
    50%
      opacity 0.7
      
  @keyframes float
    0%, 100%
      transform translateY(0px)
    50%
      transform translateY(-20px)
      
  @media (max-width: $MQMobile)
    .home
      .hero
        min-height 60vh
        margin 1rem 0
        
        .hero-title
          font-size 2.5rem
          
        .description
          font-size 1.3rem
          
        .actions
          flex-direction column
          align-items center
          
        .action-button
          width 280px
          font-size 1.1rem
          padding 0.9rem 1.8rem
          
      .features
        grid-template-columns 1fr
        padding 2rem 1rem
        gap 1.5rem
        
      .feature
        padding 1.5rem
        
  @media (max-width: $MQMobileNarrow)
    .home
      padding-left 1rem
      padding-right 1rem
      
      .hero
        .hero-title
          font-size 2rem
          
        h1, .description, .actions
          margin 1rem auto
          
        .description
          font-size 1.1rem
          
        .action-button
          font-size 1rem
          padding 0.8rem 1.5rem
          width 250px
          
      .feature
        h2
          font-size 1.3rem
          
        p
          font-size 0.9rem
  </style>
  