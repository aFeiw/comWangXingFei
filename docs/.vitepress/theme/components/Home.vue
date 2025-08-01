<template>
    <main
      class="home"
      :aria-labelledby="data.heroText !== null ? 'main-title' : null"
    >
      <header class="hero">
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
        >
  
        <h1
          v-if="data.heroText !== null"
          id="main-title"
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
    .hero
      text-align center
      img
        max-width: 100%
        max-height 280px
        display block
        margin 3rem auto 1.5rem
      h1
        font-size 3rem
      h1, .description, .actions
        margin 1.8rem auto
      .description
        max-width 35rem
        font-size 1.6rem
        line-height 1.3
        color lighten(#000, 40%)
      .actions
        display flex
        flex-wrap wrap
        justify-content center
        gap 1rem
        margin-top 2rem
      .action-button
        display inline-block
        font-size 1.2rem
        color #fff
        padding 0.8rem 1.6rem
        border-radius 8px
        transition all .3s ease
        box-sizing border-box
        text-decoration none
        font-weight 500
        position relative
        overflow hidden
        border none
        cursor pointer
        
        &::before
          content ''
          position absolute
          top 0
          left -100%
          width 100%
          height 100%
          background linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)
          transition left 0.5s
          
        &:hover::before
          left 100%
          
        &.brand
          background linear-gradient(135deg, #667eea 0%, #764ba2 100%)
          box-shadow 0 4px 15px rgba(102, 126, 234, 0.4)
          &:hover
            transform translateY(-2px)
            box-shadow 0 6px 20px rgba(102, 126, 234, 0.6)
            
        &.alt
          background linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
          box-shadow 0 4px 15px rgba(240, 147, 251, 0.4)
          &:hover
            transform translateY(-2px)
            box-shadow 0 6px 20px rgba(240, 147, 251, 0.6)
            
        .icon.outbound
          color #fff
          margin-left 0.5rem
          
    .features
      border-top 1px solid $borderColor
      padding 1.2rem 0
      margin-top 2.5rem
      display flex
      flex-wrap wrap
      align-items flex-start
      align-content stretch
      justify-content space-between
    .feature
      margin-bottom 2rem
      flex-grow 1
      flex-basis 30%
      max-width 30%
      cursor pointer
      border 1px solid $borderColor
      transition box-shadow .3s,border-color .3s
      &:hover {
        border-color transparent;
        box-shadow 0 1px 2px -2px #00000029,0 3px 6px #0000001f,0 5px 12px 4px #00000017
      }
      .feature-cover
        height 12rem
        img
          height: 100%;
          width: 100%;
          object-fit cover
      .feature-body
        padding 0 1.2rem
      h2
        font-size 1.4rem
        font-weight 500
        border-bottom none
        padding-bottom 0
        color lighten($textColor, 10%)
      p
        color lighten($textColor, 25%)
    .footer
      padding 2.5rem
      border-top 1px solid $borderColor
      text-align center
      color lighten($textColor, 25%)
  
  @media (max-width: $MQMobile)
    .home
      .hero
        .actions
          flex-direction column
          align-items center
        .action-button
          width 200px
      .features
        flex-direction column
      .feature
        max-width 100%
        padding 0 2.5rem
  
  @media (max-width: $MQMobileNarrow)
    .home
      padding-left 1.5rem
      padding-right 1.5rem
      .hero
        img
          max-height 210px
          margin 2rem auto 1.2rem
        h1
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
  