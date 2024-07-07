# vue2 注册视频组件

## 这里我列举两个文件

```vue
<template>
  <div>
  <div :style="{ width: videoDom.width, height: videoDom.height }">
    <div
      v-show="posterOnLoad"
      id="videoDiv"
      :style="{ width: videoDom.width, height: videoDom.height }"
    >
      <div
        class="control_div"
        @click="play()"
        :style="{ width: videoDom.width, height: videoDom._fullscreen? '100vh' : videoDom.height }"
      >
        <van-icon
          v-if="videoDom._paused && !posterShow"
          class="control_play"
          name="play"
          size="40px"
          color="#fff"
        />
        <div class="control_bottom" @click.stop>
          <span>{{ videoDom._endTimeStr }}</span>
          <div class="slider">
            <van-slider
              v-model="videoDom.rate"
              :disabled="videoDom.endTime === 0"
              step="0.0000000000000000000000000000000001"
              min="0"
              max="1"
              active-color="#fff"
              inactive-color="rgba(255, 255, 255, 0.4)"
              button-size="15px"
            ></van-slider>
          </div>
          <span>{{ videoDom._currentTimeStr }}</span>
          <div class="fullscreen_icon">
            <van-icon v-if="videoDom._fullscreen" size="24" name="shrink" @click="videoRequestFullscreen"/>
            <van-icon v-else size="24" name="expand-o" @click="videoRequestFullscreen"/>
          </div>
        </div>
      </div>
      <div
        class="poster"
        v-if="posterShow"
        @click="posterClick"
        :style="{
          width: videoDom.width,
          height: videoDom.height,
          backgroundImage: `url(${bannerAttachmentPath})`,
        }"
      >
        <van-icon name="play" size="30px" color="#fff" />
      </div>
      <div
        class="poster errorPoster"
        v-if="!posterShow && videoLoadError"
        :style="{
          width: videoDom.width,
          height: videoDom.height,
        }"
      >
        <van-icon name="close" size="40px" color="#fff"  />
        <span>视频资源加载失败</span>
      </div>
    </div>
    <img v-if="!posterOnLoad" ref="acquiesceImg" style="display: none;" id="acquiesceImg" :src="bannerAttachmentPath" />
  </div> 
   <slot name="desr"></slot>
  </div>

</template>
<script>
import { getVideoClassPrxy } from "@/views/NewTraining/components/myVideo/myVideo";
import { submitCourseDetails } from "@/api/GrowthMap/GrowthMap";
export default {
  name: "myVideo",
  props: {
    //课件id
    coursewareId: {
      type: [String, Number],
    },
    // 制式单元id
    courseId: {
      type: [String, Number],
    },
    //学习进度
    // watchProcess: {
    //   type: [String, Number]
    // },
    src: {
      type: String,
    },
    bannerAttachmentPath: {
      type: String,
    },
    videoRate: {
      type: Object,
    },
    videoImagePress: {
      type: Boolean,
    },
  },
  data() {
    return {
      videoDom: {},
      posterShow: true,
      posterOnLoad: false, //封面是否加载完成
      videoLoadError: false, //视频是否加载失败
    };
  },
  components: {},
  computed: {},
  watch: {
    src: function (newValue) {
      this.videoDom.src = newValue;
    },
    posterOnLoad: function (newValue) {
      if(newValue){
          this.init()
      }
    },
  },
  mounted() {
    let that  = this
    let img = document.querySelector('#acquiesceImg')
    let timer = setInterval(function() {
      if (that.videoImagePress && img.complete) {
        that.posterOnLoad = true
        clearInterval(timer)
      }
    }, 50)
  },
  beforeDestroy() {
    this.putCourseStudy();
    this.removeListenHandler();
  },
  methods: {
    init() {
      this.videoDom = getVideoClassPrxy({
        videoConfig: {
          width: "100vw",
          height: "220px",
          src: this.src,
          poster: this.bannerAttachmentPath,
          autoplay: false,
          controls: false,
          loop: false,
        },
        callback: (data) => {
          console.log("视频数据",data)
          switch (data.key) {
            case "_paused":
              if(data.value) {
                this.putCourseStudy();
              }
              break;
            case "rate":
              if(data.value === 1) {
                this.$emit("update:videoRate", { rate: Math.trunc(this.videoDom.rate * 100), currentTime: Math.trunc(this.videoDom.currentTime), coursewareId: this.coursewareId })
                this.putCourseStudy();
              }
              break;
            case "src":
              this.posterShow = true;
              this.$emit("update:videoRate", { rate: Math.trunc(this.videoDom.rate * 100), currentTime: Math.trunc(this.videoDom.currentTime), coursewareId: this.coursewareId })
              break;
            case "_fullscreen": 
              if(data.value) {
                this.initEventHandler();
              }
              break;
            case "_currentTimeStr":
              this.$emit("update:videoRate", { rate: Math.trunc(this.videoDom.rate * 100), currentTime: Math.trunc(this.videoDom.currentTime), coursewareId: this.coursewareId })
              break;
            case "_endTime":
              console.log('视频可以播放')
              break;
            case "_loadError":
              this.videoLoadError = true
              this.$toast('视频加载失败')
          }
        },
      });
    },
    /**
     * @description: 视频播放或暂停
     * @return {*}
     */
    play() {
      if (this.videoDom._paused) {
        this.videoDom.play();
      } else {
        this.videoDom.pause();
      }
    },

    /**
     * @description: 点击封面触发
     * @return {*}
     */
    posterClick() {
      this.posterShow = false;
      this.play();
    },

    /**
     * @description: 提交当前学习进度
     * @return {*}
     */
    putCourseStudy() {
      submitCourseDetails({
        unitId: this.courseId,
        coursewareId: this.coursewareId,
        studyDuration: Math.trunc(this.videoDom.currentTime), //学习时长
        hashFinish: this.videoDom.rate === 1? 1: 0,  // 是否学习完成
        watchProgress: Math.trunc(this.videoDom.rate * 100),
      });
    },

    /**
     * @description: 全屏播放
     * @return {*}
     */
    videoRequestFullscreen() {
      if(!this.videoDom._fullscreen) {
        this.videoDom.requestFullscreen()
      }else {
        this.videoDom.exitFullscreen()
      }
    },
    /**
     * @description: 初始化事件监听
     * @return {*}
     */
    initEventHandler: function() {
      history && history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.toBackPage, false);
    },
    /**
     * @description: 事件处理
     * @return {*}
     */
    removeListenHandler: function() {
      window.removeEventListener("popstate", this.toBackPage, false);
    },
    /**
     * @description: 返回事件
     * @return {*}
     */
    toBackPage: function() {
      this.removeListenHandler();
      if (this.videoDom._fullscreen) {
        this.videoDom.exitFullscreen();
      }
    }
  }
};
</script>
<style scoped lang='scss'>
#videoDiv {
  position: absolute;
}
/deep/.van-icon-play{
  background: rgba(0,0,0, 0.2) !important;
}
div.poster {
  position: absolute;
  z-index: 97;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
div.control_div {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 90;
  bottom: 0;
}
div.control_bottom {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 30px;
  bottom: 0;
  color: #fff;
}
div.control_bottom > span {
  width: 10%;
  line-height: 30px;
  text-align: center;
}
div.control_bottom > .slider {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
}
div.control_bottom > .fullscreen_icon {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
div.errorPoster{
  background-color: black;
  color: #fff;
  font-size: 16px;
  flex-direction: column;
}
</style>

```
## myVideo.js

```js
function getTimeStr(time) {
  var h = Math.floor(time/3600);
  var m = Math.floor(time%3600/60);
  var s = Math.floor(time%60);
  h = h>=10?h:"0"+h;
  m = m>=10?m:"0"+m;
  s = s>=10?s:"0"+s;
  return ( h.toString() === '00'?'': (h+":") )+m+":"+s;
}
export class VideoClass {
  id = 'mydiv'
  width = '' //宽
  height = '' //高
  _offsetWidth = 0 //video元素宽（非全屏）
  _offsetHeight = 0 //video元素高（非全屏）
  src = '' //播放地址
  poster = '' //视频封面
  autoplay = false //是否自动播放
  controls = true //视频控件是否展示
  loop = false //是否开启循环播放
  volume = 1 //视频音量
  _endTime = 0 //视频总时长
  _endTimeStr = '00:00' //视频总时长格式化后
  currentTime = 0 //当前播放时长
  _currentTimeStr = '00:00' //当前播放时长格式化后
  rate = 0 //当前播放进度
  _fullscreen = false //当前是否为全屏展示
  _paused = true //当前是否为暂停
  speed = 1 //当前视频播放速度
  _buffered = 0 //当前视频缓存
  preload = 'none'  //none:不预载 metadata:预载资源信息 auto:
  modificationVideoAttributeCallback = () => {} //属性更改时的回调
  _posterOnload = false  //封面是否加载完成
  _loadError = false //视频是否加载失败

  static videoBackDiv = '#videoDiv'

  constructor(videoConfig, modificationVideoAttributeCallback) {
    if(Object.keys(videoConfig).includes('rate')) {
      throw new Error('videoClass初始化值请不要传入 rate，请通过修改 currentTime 实现')
    }
    this.id = videoConfig.id? videoConfig.id: this.id
    this.width = videoConfig.width? videoConfig.width: this.width
    this.height = videoConfig.height? videoConfig.height: this.height
    this.src = videoConfig.src? videoConfig.src: this.src
    this.poster = videoConfig.poster? videoConfig.poster: this.poster
    this.autoplay = ('autoplay' in videoConfig)? videoConfig.autoplay: this.autoplay
    this.controls = ('controls' in videoConfig)? videoConfig.controls: this.controls
    this.loop = ('loop' in videoConfig)? videoConfig.loop: this.loop
    this.volume = videoConfig.volume? videoConfig.volume: this.volume
    this.speed = videoConfig.speed? videoConfig.speed: this.speed
    this.preload = videoConfig.preload? videoConfig.preload: this.preload
    this.currentTime = videoConfig.currentTime? videoConfig.currentTime: this.currentTime
    this.RefreshVideo = this.RefreshVideo.bind(this)
    this.modificationVideoAttribute = this.modificationVideoAttribute.bind(this)
    this.volumechange = this.volumechange.bind(this)
    this.canplay = this.canplay.bind(this)
    this.loadError = this.loadError.bind(this)
    this.timeupdate = this.timeupdate.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.requestRotate = this.requestRotate.bind(this)
    this.requestFullscreen = this.requestFullscreen.bind(this)
    this.exitFullscreen = this.exitFullscreen.bind(this)
    this.modificationVideoAttributeCallback = modificationVideoAttributeCallback
    this.posterOnload()
    this.RefreshVideo()
  }

  /**
   * @description: 初始化播放器
   * @return {*}
   */
  RefreshVideo() {
    let video = document.createElement('video')
    video.setAttribute('id', this.id)
    video.style.backgroundColor = 'black'
    video.style.width = this.width
    video.style.height = this.height
    video.setAttribute('src', this.src)
    video.setAttribute('poster', this.poster)
    this.autoplay? video.setAttribute('autoplay', this.autoplay) : ''
    this.controls? video.setAttribute('controls', this.controls) : ''
    this.loop? video.setAttribute('loop', this.loop) : ''
    video.volume = this.volume
    video.playbackRate = this.speed
    video.preload = this.preload
    let oldVideo = document.querySelector(`#${this.id}`)
    if (oldVideo) {
      this.removeEvent()
      document.querySelector(VideoClass.videoBackDiv).removeChild(oldVideo)
    }
    document.querySelector(VideoClass.videoBackDiv).appendChild(video)
    this._offsetHeight = video.offsetHeight
    this._offsetWidth = video.offsetWidth
    video.currentTime = this.currentTime
    this._currentTimeStr =  getTimeStr(this.currentTime)
    video.addEventListener('volumechange', this.volumechange)
    video.addEventListener('canplay', this.canplay)
    video.addEventListener('timeupdate', this.timeupdate)
    video.addEventListener('error', this.loadError)
  }

  /**
   * @description: 修改实体类的属性
   * @param {*} key 修改的属性名
   * @param {*} value 修改后的值
   * @param {*} synchronizationVideo 是否同步修改video对应属性
   * @return {*}
   */
  modificationVideoAttribute({key, value, synchronizationVideo = true}){
    let video = document.querySelector(`#${this.id}`)
    let oldValue = this[key]
    switch(key) {
      case 'width':
        if(value !== this.width) {
          this.width = value
          if(!this._fullscreen) {
            //当前不为全屏展示时
            video.style.width = this.width
            this.modificationVideoAttribute({ key: '_offsetWidth', value: video.offsetWidth })
          }
        }
        break;
      case '_offsetWidth':
        if(value !== this._offsetWidth) {
          this._offsetWidth = value
        }
        break;
      case 'height':
        if(value !== this.height) {
          this.height = value
          if(!this._fullscreen) {
            //当前不为全屏展示时
            video.style.height = this.height
            this.modificationVideoAttribute({ key: '_offsetHeight', value: video.offsetHeight })
          }
        }
        break;
      case '_offsetHeight':
        if(value !== this._offsetHeight) {
          this._offsetHeight = value
        }
        break;
      case 'src':
        if(value !== this.src) {
          this.src = value
          video.setAttribute('src', this.src)
          this.pause()
          this.modificationVideoAttribute({ key: 'currentTime', value: 0 })
          this.modificationVideoAttribute({ key: '_buffereds', value: 0 })
          this.RefreshVideo()
        }
        break;
      case 'poster':
        if(value !== this.poster) {
          this.poster = value
          this.modificationVideoAttribute({ key: '_posterOnload', value: false })
          this.posterOnload()
          if(this.poster !== '' && this.poster != null) {
            video.setAttribute('poster', this.poster)
          }else {
            video.removeAttribute('poster')
          }
        }
        break;
      case 'autoplay':
        if(value !== this.autoplay) {
          this.autoplay = value
          if(this.autoplay) {
            video.setAttribute('autoplay', this.autoplay)
          }else {
            video.removeAttribute('autoplay')
          }
        }
        break;
      case 'controls':
        if(value !== this.controls) {
          this.controls = value
          if(this.controls) {
            video.setAttribute('controls', this.controls)
          }else {
            video.removeAttribute('controls')
          }
        }
        break;
      case 'loop':
        if(value !== this.loop) {
          this.loop = value
          if(this.loop) {
            video.setAttribute('loop', this.loop)
          }else {
            video.removeAttribute('loop')
          }
        }
        break;
      case 'volume':
        if(value !== this.volume) {
          this.volume = value
          video.volume = this.volume
        }
        break;
      case '_endTime':
        if(value !== this._endTime) {
          this._endTime = value
          this.modificationVideoAttribute({ key: '_endTimeStr', value: getTimeStr(this._endTime) })
        }
        break;
      case '_endTimeStr':
        if(value !== this._endTimeStr) {
          this._endTimeStr = value
        }
        break;
      case 'currentTime':
        if(value !== this.currentTime) {
          this.currentTime = value
          if(synchronizationVideo) {
            video.currentTime = this.currentTime
          }
          this.modificationVideoAttribute({ key: '_currentTimeStr', value: getTimeStr(this.currentTime) })
          //改属性此次不应使用modificationVideoAttribute修改，防止陷入循环
          this.modificationVideoAttribute({ key: 'rate', value: this.currentTime/this._endTime> 1? 1: this.currentTime/this._endTime , synchronizationVideo: false })
          //this.rate = this.currentTime/this._endTime
        }
        break;
      case '_currentTimeStr':
        if(value !== this._currentTimeStr) {
          this._currentTimeStr = value
        }
        break;
      case 'rate':
        if(value !== this.rate) {
          //不需要再为this.rate赋值，修改currentTime时已经更改
          this.rate = value > 1? 1: value
          if(synchronizationVideo){
            this.modificationVideoAttribute({ key: 'currentTime', value: this.rate * this._endTime})
          }
        }
        break;
      case '_fullscreen':
        if(value !== this._fullscreen) {
          this._fullscreen = value
        }
        break;
      case '_paused':
        if(value !== this._paused) {
          this._paused = value
        }
        break;
      case 'speed':
        if(value !== this.speed) {
          this.speed = value
          video.playbackRate = this.speed
        }
        break;
      case '_buffered':
        if(value !== this._buffered) {
          this._buffered = value
        }
        break;
      case 'preload':
        if(value !== this.preload) {
          this.preload = value
          video.preload = this.preload
        }
        break;
      case '_posterOnload':
        if(value !== this._posterOnload) {
          this._posterOnload = value
        }
        break;
      case '_loadError': 
        if(value !== this._loadError) {
          this._loadError = value
        }
        break;
    }
    if(this.modificationVideoAttributeCallback && value !== oldValue) {
      this.modificationVideoAttributeCallback({ key, value })
    }
  }

  /**
   * @description: 当音量改变时执行
   * @return {*}
   */
  volumechange() {
    let video = document.querySelector(`#${this.id}`)
    this.modificationVideoAttribute({ key: 'volume', value: video.volume })
  }

  /**
   * @description: 当视频可以播放时执行
   * @return {*}
   */
  canplay() {
    let video = document.querySelector(`#${this.id}`)
    this.rate = this.currentTime/video.duration > 1? 1: this.currentTime/video.duration
    this.modificationVideoAttribute({ key: '_endTime', value: video.duration })
  }

  /**
   * @description: 当视频播放时间变更时触发
   * @return {*}
   */
  timeupdate() {
    let video = document.querySelector(`#${this.id}`)
    let count = 5
    let timer = setInterval(() => {
      if(count === 0){
        clearInterval(timer)
      }else{
        if(video != null) {
          if(video.buffered.length > 0){
            this.modificationVideoAttribute({ key: '_buffered', value: video.buffered.end(video.buffered.length -1) })
          }
          if(video.duration > video.currentTime) {
            this.modificationVideoAttribute({ key: 'currentTime', value: video.currentTime, synchronizationVideo: false })
          }else {
            this.modificationVideoAttribute({ key: 'currentTime', value: video.duration, synchronizationVideo: false })
          }
          count--
        }
      }
    }, 50)
  }

  /**
   * @description: 视频加载失败时执行
   * @return {*}
   */
  loadError() {
    this.modificationVideoAttribute({ key: '_loadError', value: true })
  }

  /**
   * @description: 移除绑定事件
   * @return {*}
   */
  removeEvent() {
    let video = document.querySelector(`#${this.id}`)
    video.removeEventListener('volumechange', this.volumechange)
    video.removeEventListener('canplay', this.canplay)
    video.removeEventListener('timeupdate', this.timeupdate)
  }

  /**
   * @description: 播放视频
   * @return {*}
   */
  play() {
    let video = document.querySelector(`#${this.id}`)
    video.play()
    this.modificationVideoAttribute({ key: '_paused', value: false })
  }

  /**
   * @description: 暂停视频
   * @return {*}
   */
  pause() {
    let video = document.querySelector(`#${this.id}`)
    video.pause()
    this.modificationVideoAttribute({ key: '_paused', value: true })
  }

  /**
   * @description: 全屏显示
   * @return {*}
   */
  requestFullscreen() {
    if(this._fullscreen) {
      console.error('当前已为全屏展示')
      return
    }
    let video = document.querySelector(`#${this.id}`)
    let element = document.querySelector(`${VideoClass.videoBackDiv}`)
    element.style.width = '100vw'
    video.style.height = '100vh'
    element.style.height = '100vh'
    element.style.background = 'black'
    element.style.position = 'fixed'
    element.style.top = '0'
    element.style.left = '0'
    element.style.zIndex = 999
    this.modificationVideoAttribute({ key: '_fullscreen', value: true })
  }

  /**
   * @description: 退出全屏展示
   * @return {*}
   */
  exitFullscreen() {
    if(!this._fullscreen) {
      console.error('目前仅支持全屏展示时旋转')
      return
    }
    let video = document.querySelector(`#${this.id}`)
    let element = document.querySelector(`${VideoClass.videoBackDiv}`)
    element.style.width = this.width
    video.style.height = this.height
    element.style.height = this.height
    element.style.background = ''
    element.style.position = ''
    element.style.top = ''
    element.style.left = ''
    element.style.zIndex = 0
    this.modificationVideoAttribute({ key: '_fullscreen', value: false })
  }

  /**
   * @description: 开启视频旋转
   * @param {*} deg
   * @return {*}
   */
  requestRotate(deg) {
    if(!(deg === -90 || deg === 90 || deg === '-90' || deg === '90')){
      console.error('目前仅支持旋转 90 或 -90')
      return
    }
    let video = document.querySelector(`#${this.id}`)
    let videoHeight = this._offsetHeight
    let videoWidth = this._offsetWidth
    video.style.setProperty('transform-origin', `50%`)
    video.style.setProperty('-ms-transform-origin:', `50%`) /* IE 9 */
    video.style.setProperty('-webkit-transform-origin', `50%`) /* Safari 和 Chrome */
    video.style.setProperty('-moz-transform-origin', `50%`)/* Firefox */
    video.style.setProperty('-o-transform-origin', `50%`) /* Opera */
    if(this._fullscreen) {
      let magnifyRatio = Math.max(videoHeight/document.body.offsetWidth, videoWidth/document.body.offsetHeight)
      video.style.setProperty('transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`)
      video.style.setProperty('-ms-transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`) /* IE 9 */
      video.style.setProperty('-webkit-transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`) /* Safari 和 Chrome */
      video.style.setProperty('-moz-transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`)/* Firefox */
      video.style.setProperty('-o-transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`) /* Opera */

    }else {
      throw new Error('目前仅支持全屏旋转')
      // video.style.width = this._offsetHeight
      // video.style.height = this._offsetWidth
      // video.style.setProperty('transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`)
      // video.style.setProperty('-ms-transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`) /* IE 9 */
      // video.style.setProperty('-webkit-transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`) /* Safari 和 Chrome */
      // video.style.setProperty('-moz-transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`)/* Firefox */
      // video.style.setProperty('-o-transform', `rotate(${deg}deg) scale(${1 / magnifyRatio})`) /* Opera */
    }

  }

  /**
   * @description: 取消视频旋转
   * @return {*}
   */
  exitRequestRotate() {
    let video = document.querySelector(`#${this.id}`)
    video.style.setProperty('transform-origin', `50%`)
    video.style.setProperty('-ms-transform-origin:', `50%`) /* IE 9 */
    video.style.setProperty('-webkit-transform-origin', `50%`) /* Safari 和 Chrome */
    video.style.setProperty('-moz-transform-origin', `50%`)/* Firefox */
    video.style.setProperty('-o-transform-origin', `50%`) /* Opera */
    video.style.setProperty('transform', `rotate(0deg) scale(1)`)
    video.style.setProperty('-ms-transform', `rotate(0deg) scale(1)`) /* IE 9 */
    video.style.setProperty('-webkit-transform', `rotate(0deg) scale(1)`) /* Safari 和 Chrome */
    video.style.setProperty('-moz-transform', `rotate(0deg) scale(1)`)/* Firefox */
    video.style.setProperty('-o-transform', `rotate(0deg) scale(1)`) /* Opera */
  }

  /**
   * @description: 判断封面是否加载完毕
   * @return {*}
   */
  posterOnload() {
    if(this.poster !== ''){
      let img = document.createElement('img')
      img.src = this.poster
      img.style.display = 'none'
      document.querySelector(VideoClass.videoBackDiv).appendChild(img)
      img.onload = () => {
        this.modificationVideoAttribute({ key: '_posterOnload', value: true })
        document.querySelector(VideoClass.videoBackDiv).removeChild(img)
      }
    }else {
      this.modificationVideoAttribute({ key: '_posterOnload', value: true })
    }
  }

}
/**
 * @description: 返回代理后的videoClass实例
 * @param { Object } videoConfig videoClass的初始配置
 * @param { Array } watchDataArray 需要监听的videoClass属性
 * @return {*}
 */
export function getVideoClassPrxy({videoConfig, callback}) {
  let video = new VideoClass(videoConfig, callback)
  return new Proxy(video, {
    set: function(target, key, value, receiver) {
      if(key.startsWith('_')) {
        throw new Error(`VideoClass Error: ${key} 为私有变量，不允许外部修改`)
      }else {
        target.modificationVideoAttribute({key, value})
      }
      return true
    },
  })
}

```

