<template>
    <main
      class="home"
      :aria-labelledby="data.heroText !== null ? 'main-title' : null"
    >
      <header class="hero">
        <div class="hero-background">
          <div class="hero-particles"></div>
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
          <div class="feature-cover">
            <img :alt="feature.title" :src="feature.img"/>
          </div>
          <div class="feature-body">
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
          window.location.href = url
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
    position relative
    
    .hero
      text-align center
      position relative
      min-height 80vh
      display flex
      flex-direction column
      justify-content center
      align-items center
      background linear-gradient(135deg, #667eea 0%, #764ba2 100%)
      border-radius 20px
      margin 2rem 0
      overflow hidden
      
      .hero-background
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        z-index 1
        
        .hero-particles
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          background-image radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)
          background-size 50px 50px
          animation float 20s ease-in-out infinite
          
      .hero-image
        max-width: 100%
        max-height 280px
        display block
        margin 3rem auto 1.5rem
        position relative
        z-index 2
        filter drop-shadow(0 10px 20px rgba(0,0,0,0.3))
        
      .hero-title
        font-size 4rem
        font-weight 700
        color #fff
        text-shadow 0 4px 8px rgba(0,0,0,0.3)
        margin 2rem 0
        position relative
        z-index 2
        background linear-gradient(45deg, #fff, #f0f0f0)
        -webkit-background-clip text
        -webkit-text-fill-color transparent
        background-clip text
        
      h1, .description, .actions
        margin 1.8rem auto
        position relative
        z-index 2
        
      .description
        max-width 35rem
        font-size 1.8rem
        line-height 1.4
        color rgba(255,255,255,0.9)
        font-weight 300
        text-shadow 0 2px 4px rgba(0,0,0,0.3)
        
      .actions
        display flex
        flex-wrap wrap
        justify-content center
        gap 1.5rem
        margin-top 3rem
        position relative
        z-index 2
        
      .action-button
        display inline-block
        font-size 1.3rem
        color #fff
        padding 1rem 2rem
        border-radius 12px
        transition all .4s cubic-bezier(0.4, 0, 0.2, 1)
        box-sizing border-box
        text-decoration none
        font-weight 600
        position relative
        overflow hidden
        border none
        cursor pointer
        backdrop-filter blur(10px)
        
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
          background linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important
          box-shadow 0 8px 25px rgba(102, 126, 234, 0.4) !important
          &:hover
            transform translateY(-3px) scale(1.05)
            box-shadow 0 12px 35px rgba(102, 126, 234, 0.6) !important
            
        &.alt
          background linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important
          box-shadow 0 8px 25px rgba(240, 147, 251, 0.4) !important
          &:hover
            transform translateY(-3px) scale(1.05)
            box-shadow 0 12px 35px rgba(240, 147, 251, 0.6) !important
            
        .icon.outbound
          color #fff
          margin-left 0.5rem
          
    .features
      border-top 1px solid rgba(255,255,255,0.1)
      padding 3rem 0
      margin-top 4rem
      display flex
      flex-wrap wrap
      align-items flex-start
      align-content stretch
      justify-content space-between
      background rgba(255,255,255,0.02)
      border-radius 20px
      backdrop-filter blur(10px)
      
    .feature
      margin-bottom 2rem
      flex-grow 1
      flex-basis 30%
      cursor pointer
      border 1px solid rgba(255,255,255,0.1)
      border-radius 16px
      transition all .3s cubic-bezier(0.4, 0, 0.2, 1)
      background rgba(255,255,255,0.05)
      backdrop-filter blur(10px)
      
      &:hover
        border-color rgba(255,255,255,0.3)
        box-shadow 0 8px 32px rgba(0,0,0,0.3)
        transform translateY(-5px)
        
      .feature-cover
        height 12rem
        border-radius 16px 16px 0 0
        overflow hidden
        
        img
          height: 100%
          width: 100%
          object-fit cover
          transition transform .3s ease
          
      &:hover .feature-cover img
        transform scale(1.05)
        
      .feature-body
        padding 1.5rem
        background rgba(255,255,255,0.05)
        
      h2
        font-size 1.5rem
        font-weight 600
        border-bottom none
        padding-bottom 0
        color #fff
        margin-bottom 1rem
        
      p
        color rgba(255,255,255,0.8)
        line-height 1.6
        
    .footer
      padding 3rem
      border-top 1px solid rgba(255,255,255,0.1)
      text-align center
      color rgba(255,255,255,0.7)
      background rgba(255,255,255,0.02)
      border-radius 20px
      margin-top 3rem
      
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
          font-size 1.4rem
          
        .actions
          flex-direction column
          align-items center
          
        .action-button
          width 250px
          font-size 1.1rem
          padding 0.8rem 1.5rem
          
      .features
        flex-direction column
        padding 2rem 0
        
      .feature
        max-width 100%
        padding 0 2rem
        
  @media (max-width: $MQMobileNarrow)
    .home
      padding-left 1.5rem
      padding-right 1.5rem
      
      .hero
        .hero-title
          font-size 2rem
          
        h1, .description, .actions
          margin 1.2rem auto
          
        .description
          font-size 1.2rem
          
        .action-button
          font-size 1rem
          padding 0.6rem 1.2rem
          
      .feature
        h2
          font-size 1.25rem
  </style>
  