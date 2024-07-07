## tui.editor

[tui.editor (opens new window)](https://nhn.github.io/tui.editor/latest/tutorial-example01-editor-basic)编辑器支持 markdown 与标准富文本内容的编辑器

## VUE 组件

下面基于 tui-editor 开发的 VUE 3 组件，扩展了以下几个功能

- 支持后台图片上传而不使用默认的 base64
- 添加了全屏显示按钮

> 请自行处理上传的 axios 逻辑

在模板文件 `index.html 中引入编辑器文件，当然你也可以使用 yarn 安装

```text
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
```

### TS 类型声明

因为 toastui/editor 没有提供 TS 类型支持，所以需要我们在 `typings.d.ts` 中对 toastui 进行类型声明。

```text
declare namespace toastui {
  class Editor {
    constructor(option: any)
    getHTML: () => any
    getMarkdown: () => any
    removeHook: (hook: string) => any
    addHook: (hook: string, callback: Function) => any
    setHeight: (height: string) => any
    getHeight: () => any
    on: (event: string, callback: Function) => any
    focus: () => any
  }
}
```

### 编辑器定义

下面是对 toastui/Editor 定义

```text
import { uploadImage } from '@/apis/uploadApi'

export default class {
  //编辑器实例
  public editor: toastui.Editor
  public isFullscreen: boolean = false

  constructor(el: string, public height: string, initialValue: string) {
    this.editor = new toastui.Editor({
      el: document.querySelector(el),
      height,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue,
      toolbarItems: this.toolbar(),
    })
    this.imageHook()
  }

  //工具条
  toolbar() {
    return [
      ['heading', 'bold', 'italic'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'image', 'link'],
      ['code', 'codeblock'],
      [
        {
          el: this.fullscreen(),
          name: 'fullscreen',
          tooltip: 'fullscreen',
        },
      ],
    ]
  }

  //全屏设置
  private fullscreen() {
    const button = document.createElement('button')
    button.className = 'toastui-editor-toolbar-icons last'
    button.style.backgroundImage = 'none'
    button.style.margin = '0'
    button.innerHTML = `<span>全屏</span>`

    button.addEventListener('click', () => {
      this.editor.setHeight('100vh')
      let ui = document.querySelector('.toastui-editor-defaultUI') as HTMLDivElement
      ui.classList.toggle('fullScreen')
      this.isFullscreen = true
    })

    document.documentElement.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key == 'Escape' && this.isFullscreen) {
        this.editor.setHeight(this.height)
        let ui = document.querySelector('.toastui-editor-defaultUI') as HTMLDivElement
        ui.classList.toggle('fullScreen')
        this.editor.focus()
        this.isFullscreen = false
      }
    })
    return button
  }

  //图片上传
  private imageHook() {
    this.editor.removeHook('addImageBlobHook')

    this.editor.addHook('addImageBlobHook', async (blob: any, callback: Function) => {
      const formData = new FormData()
      //添加post数据
      formData.append('file', blob, blob.name)
      //上传图片
      const response = await uploadImage(formData)
      //更改编辑器内容
      callback(response.result.url, blob.name)
    })
  }
}
```

### 组件代码

然后创建 `hd-editor.vue`组件文件

```text
<script setup lang="ts">
import { nextTick } from 'vue';
import Editor from './toastEditor'
interface Props {
	modelValue?: string,
	placeholder?: string
	height?: string
}
const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	placeholder: '支持托放上传图片',
	height: '500px'
})

const emit = defineEmits(['update:modelValue'])

nextTick(() => {
	const markdownEditor = new Editor('#editor', props.height, props.modelValue)

	markdownEditor.editor.on('change', (type: string) => {
		emit('update:modelValue', markdownEditor.editor[type == 'markdown' ? 'getMarkdown' : 'getHTML']())
	})
})

</script>

<template>
	<div id="editor"></div>
</template>

<style lang="scss" scoped>
@import "https://cdn.jsdelivr.net/npm/@toast-ui/editor@3.1.2/dist/toastui-editor.min.css";
#editor {
	@apply bg-white;

	//全屏控制
	:deep(.fullScreen) {
		position: fixed !important;
		z-index: 9999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
	}

	//隐藏底部编辑器模式切换
	:deep(.toastui-editor-mode-switch) {
		display: none !important;
	}
}
</style>
```

### 使用方式

使用 vue 组件的好处就是编写时比较辛苦，但使用时就很轻松了，下面再介绍一下组件的可以使用的 props 属性

```text
<script setup lang="ts">
import Editor from '@/components/markdownEditor/editor.vue';
import { ref } from 'vue';
const content = ref('houdunren.com')
</script>

<template>
	<div class>
		<Editor v-model="content" />
		{{ content }}
	</div>
</template>
```

下面对属性进行说明

| 属性        | 说明       | 默认值 |
| ----------- | ---------- | ------ |
| v-model     | 编辑器数据 |        |
| placeholder | 提示内容   |        |
| height      | 编辑器高度 | 500px  |