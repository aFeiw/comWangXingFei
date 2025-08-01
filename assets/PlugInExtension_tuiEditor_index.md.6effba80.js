import{_ as s,c as n,o as a,a as l}from"./app.1f5371ca.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"tui.editor","slug":"tui-editor","link":"#tui-editor","children":[]},{"level":2,"title":"VUE \u7EC4\u4EF6","slug":"vue-\u7EC4\u4EF6","link":"#vue-\u7EC4\u4EF6","children":[{"level":3,"title":"TS \u7C7B\u578B\u58F0\u660E","slug":"ts-\u7C7B\u578B\u58F0\u660E","link":"#ts-\u7C7B\u578B\u58F0\u660E","children":[]},{"level":3,"title":"\u7F16\u8F91\u5668\u5B9A\u4E49","slug":"\u7F16\u8F91\u5668\u5B9A\u4E49","link":"#\u7F16\u8F91\u5668\u5B9A\u4E49","children":[]},{"level":3,"title":"\u7EC4\u4EF6\u4EE3\u7801","slug":"\u7EC4\u4EF6\u4EE3\u7801","link":"#\u7EC4\u4EF6\u4EE3\u7801","children":[]},{"level":3,"title":"\u4F7F\u7528\u65B9\u5F0F","slug":"\u4F7F\u7528\u65B9\u5F0F","link":"#\u4F7F\u7528\u65B9\u5F0F","children":[]}]}],"relativePath":"PlugInExtension/tuiEditor/index.md","lastUpdated":1720358322000}'),p={name:"PlugInExtension/tuiEditor/index.md"},e=l(`<h2 id="tui-editor" tabindex="-1">tui.editor <a class="header-anchor" href="#tui-editor" aria-hidden="true">#</a></h2><p><a href="https://nhn.github.io/tui.editor/latest/tutorial-example01-editor-basic" target="_blank" rel="noreferrer">tui.editor (opens new window)</a>\u7F16\u8F91\u5668\u652F\u6301 markdown \u4E0E\u6807\u51C6\u5BCC\u6587\u672C\u5185\u5BB9\u7684\u7F16\u8F91\u5668</p><h2 id="vue-\u7EC4\u4EF6" tabindex="-1">VUE \u7EC4\u4EF6 <a class="header-anchor" href="#vue-\u7EC4\u4EF6" aria-hidden="true">#</a></h2><p>\u4E0B\u9762\u57FA\u4E8E tui-editor \u5F00\u53D1\u7684 VUE 3 \u7EC4\u4EF6\uFF0C\u6269\u5C55\u4E86\u4EE5\u4E0B\u51E0\u4E2A\u529F\u80FD</p><ul><li>\u652F\u6301\u540E\u53F0\u56FE\u7247\u4E0A\u4F20\u800C\u4E0D\u4F7F\u7528\u9ED8\u8BA4\u7684 base64</li><li>\u6DFB\u52A0\u4E86\u5168\u5C4F\u663E\u793A\u6309\u94AE</li></ul><blockquote><p>\u8BF7\u81EA\u884C\u5904\u7406\u4E0A\u4F20\u7684 axios \u903B\u8F91</p></blockquote><p>\u5728\u6A21\u677F\u6587\u4EF6 \`index.html \u4E2D\u5F15\u5165\u7F16\u8F91\u5668\u6587\u4EF6\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528 yarn \u5B89\u88C5</p><div class="language-text line-numbers-mode"><button class="copy"></button><span class="lang">text</span><pre><code><span class="line"><span style="color:#c9d1d9;">&lt;script src=&quot;https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><h3 id="ts-\u7C7B\u578B\u58F0\u660E" tabindex="-1">TS \u7C7B\u578B\u58F0\u660E <a class="header-anchor" href="#ts-\u7C7B\u578B\u58F0\u660E" aria-hidden="true">#</a></h3><p>\u56E0\u4E3A toastui/editor \u6CA1\u6709\u63D0\u4F9B TS \u7C7B\u578B\u652F\u6301\uFF0C\u6240\u4EE5\u9700\u8981\u6211\u4EEC\u5728 <code>typings.d.ts</code> \u4E2D\u5BF9 toastui \u8FDB\u884C\u7C7B\u578B\u58F0\u660E\u3002</p><div class="language-text line-numbers-mode"><button class="copy"></button><span class="lang">text</span><pre><code><span class="line"><span style="color:#c9d1d9;">declare namespace toastui {</span></span>
<span class="line"><span style="color:#c9d1d9;">  class Editor {</span></span>
<span class="line"><span style="color:#c9d1d9;">    constructor(option: any)</span></span>
<span class="line"><span style="color:#c9d1d9;">    getHTML: () =&gt; any</span></span>
<span class="line"><span style="color:#c9d1d9;">    getMarkdown: () =&gt; any</span></span>
<span class="line"><span style="color:#c9d1d9;">    removeHook: (hook: string) =&gt; any</span></span>
<span class="line"><span style="color:#c9d1d9;">    addHook: (hook: string, callback: Function) =&gt; any</span></span>
<span class="line"><span style="color:#c9d1d9;">    setHeight: (height: string) =&gt; any</span></span>
<span class="line"><span style="color:#c9d1d9;">    getHeight: () =&gt; any</span></span>
<span class="line"><span style="color:#c9d1d9;">    on: (event: string, callback: Function) =&gt; any</span></span>
<span class="line"><span style="color:#c9d1d9;">    focus: () =&gt; any</span></span>
<span class="line"><span style="color:#c9d1d9;">  }</span></span>
<span class="line"><span style="color:#c9d1d9;">}</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="\u7F16\u8F91\u5668\u5B9A\u4E49" tabindex="-1">\u7F16\u8F91\u5668\u5B9A\u4E49 <a class="header-anchor" href="#\u7F16\u8F91\u5668\u5B9A\u4E49" aria-hidden="true">#</a></h3><p>\u4E0B\u9762\u662F\u5BF9 toastui/Editor \u5B9A\u4E49</p><div class="language-text line-numbers-mode"><button class="copy"></button><span class="lang">text</span><pre><code><span class="line"><span style="color:#c9d1d9;">import { uploadImage } from &#39;@/apis/uploadApi&#39;</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">export default class {</span></span>
<span class="line"><span style="color:#c9d1d9;">  //\u7F16\u8F91\u5668\u5B9E\u4F8B</span></span>
<span class="line"><span style="color:#c9d1d9;">  public editor: toastui.Editor</span></span>
<span class="line"><span style="color:#c9d1d9;">  public isFullscreen: boolean = false</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">  constructor(el: string, public height: string, initialValue: string) {</span></span>
<span class="line"><span style="color:#c9d1d9;">    this.editor = new toastui.Editor({</span></span>
<span class="line"><span style="color:#c9d1d9;">      el: document.querySelector(el),</span></span>
<span class="line"><span style="color:#c9d1d9;">      height,</span></span>
<span class="line"><span style="color:#c9d1d9;">      initialEditType: &#39;markdown&#39;,</span></span>
<span class="line"><span style="color:#c9d1d9;">      previewStyle: &#39;vertical&#39;,</span></span>
<span class="line"><span style="color:#c9d1d9;">      initialValue,</span></span>
<span class="line"><span style="color:#c9d1d9;">      toolbarItems: this.toolbar(),</span></span>
<span class="line"><span style="color:#c9d1d9;">    })</span></span>
<span class="line"><span style="color:#c9d1d9;">    this.imageHook()</span></span>
<span class="line"><span style="color:#c9d1d9;">  }</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">  //\u5DE5\u5177\u6761</span></span>
<span class="line"><span style="color:#c9d1d9;">  toolbar() {</span></span>
<span class="line"><span style="color:#c9d1d9;">    return [</span></span>
<span class="line"><span style="color:#c9d1d9;">      [&#39;heading&#39;, &#39;bold&#39;, &#39;italic&#39;],</span></span>
<span class="line"><span style="color:#c9d1d9;">      [&#39;hr&#39;, &#39;quote&#39;],</span></span>
<span class="line"><span style="color:#c9d1d9;">      [&#39;ul&#39;, &#39;ol&#39;, &#39;task&#39;, &#39;indent&#39;, &#39;outdent&#39;],</span></span>
<span class="line"><span style="color:#c9d1d9;">      [&#39;table&#39;, &#39;image&#39;, &#39;link&#39;],</span></span>
<span class="line"><span style="color:#c9d1d9;">      [&#39;code&#39;, &#39;codeblock&#39;],</span></span>
<span class="line"><span style="color:#c9d1d9;">      [</span></span>
<span class="line"><span style="color:#c9d1d9;">        {</span></span>
<span class="line"><span style="color:#c9d1d9;">          el: this.fullscreen(),</span></span>
<span class="line"><span style="color:#c9d1d9;">          name: &#39;fullscreen&#39;,</span></span>
<span class="line"><span style="color:#c9d1d9;">          tooltip: &#39;fullscreen&#39;,</span></span>
<span class="line"><span style="color:#c9d1d9;">        },</span></span>
<span class="line"><span style="color:#c9d1d9;">      ],</span></span>
<span class="line"><span style="color:#c9d1d9;">    ]</span></span>
<span class="line"><span style="color:#c9d1d9;">  }</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">  //\u5168\u5C4F\u8BBE\u7F6E</span></span>
<span class="line"><span style="color:#c9d1d9;">  private fullscreen() {</span></span>
<span class="line"><span style="color:#c9d1d9;">    const button = document.createElement(&#39;button&#39;)</span></span>
<span class="line"><span style="color:#c9d1d9;">    button.className = &#39;toastui-editor-toolbar-icons last&#39;</span></span>
<span class="line"><span style="color:#c9d1d9;">    button.style.backgroundImage = &#39;none&#39;</span></span>
<span class="line"><span style="color:#c9d1d9;">    button.style.margin = &#39;0&#39;</span></span>
<span class="line"><span style="color:#c9d1d9;">    button.innerHTML = \`&lt;span&gt;\u5168\u5C4F&lt;/span&gt;\`</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">    button.addEventListener(&#39;click&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#c9d1d9;">      this.editor.setHeight(&#39;100vh&#39;)</span></span>
<span class="line"><span style="color:#c9d1d9;">      let ui = document.querySelector(&#39;.toastui-editor-defaultUI&#39;) as HTMLDivElement</span></span>
<span class="line"><span style="color:#c9d1d9;">      ui.classList.toggle(&#39;fullScreen&#39;)</span></span>
<span class="line"><span style="color:#c9d1d9;">      this.isFullscreen = true</span></span>
<span class="line"><span style="color:#c9d1d9;">    })</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">    document.documentElement.addEventListener(&#39;keyup&#39;, (event: KeyboardEvent) =&gt; {</span></span>
<span class="line"><span style="color:#c9d1d9;">      if (event.key == &#39;Escape&#39; &amp;&amp; this.isFullscreen) {</span></span>
<span class="line"><span style="color:#c9d1d9;">        this.editor.setHeight(this.height)</span></span>
<span class="line"><span style="color:#c9d1d9;">        let ui = document.querySelector(&#39;.toastui-editor-defaultUI&#39;) as HTMLDivElement</span></span>
<span class="line"><span style="color:#c9d1d9;">        ui.classList.toggle(&#39;fullScreen&#39;)</span></span>
<span class="line"><span style="color:#c9d1d9;">        this.editor.focus()</span></span>
<span class="line"><span style="color:#c9d1d9;">        this.isFullscreen = false</span></span>
<span class="line"><span style="color:#c9d1d9;">      }</span></span>
<span class="line"><span style="color:#c9d1d9;">    })</span></span>
<span class="line"><span style="color:#c9d1d9;">    return button</span></span>
<span class="line"><span style="color:#c9d1d9;">  }</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">  //\u56FE\u7247\u4E0A\u4F20</span></span>
<span class="line"><span style="color:#c9d1d9;">  private imageHook() {</span></span>
<span class="line"><span style="color:#c9d1d9;">    this.editor.removeHook(&#39;addImageBlobHook&#39;)</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">    this.editor.addHook(&#39;addImageBlobHook&#39;, async (blob: any, callback: Function) =&gt; {</span></span>
<span class="line"><span style="color:#c9d1d9;">      const formData = new FormData()</span></span>
<span class="line"><span style="color:#c9d1d9;">      //\u6DFB\u52A0post\u6570\u636E</span></span>
<span class="line"><span style="color:#c9d1d9;">      formData.append(&#39;file&#39;, blob, blob.name)</span></span>
<span class="line"><span style="color:#c9d1d9;">      //\u4E0A\u4F20\u56FE\u7247</span></span>
<span class="line"><span style="color:#c9d1d9;">      const response = await uploadImage(formData)</span></span>
<span class="line"><span style="color:#c9d1d9;">      //\u66F4\u6539\u7F16\u8F91\u5668\u5185\u5BB9</span></span>
<span class="line"><span style="color:#c9d1d9;">      callback(response.result.url, blob.name)</span></span>
<span class="line"><span style="color:#c9d1d9;">    })</span></span>
<span class="line"><span style="color:#c9d1d9;">  }</span></span>
<span class="line"><span style="color:#c9d1d9;">}</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br></div></div><h3 id="\u7EC4\u4EF6\u4EE3\u7801" tabindex="-1">\u7EC4\u4EF6\u4EE3\u7801 <a class="header-anchor" href="#\u7EC4\u4EF6\u4EE3\u7801" aria-hidden="true">#</a></h3><p>\u7136\u540E\u521B\u5EFA <code>hd-editor.vue</code>\u7EC4\u4EF6\u6587\u4EF6</p><div class="language-text line-numbers-mode"><button class="copy"></button><span class="lang">text</span><pre><code><span class="line"><span style="color:#c9d1d9;">&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">import { nextTick } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#c9d1d9;">import Editor from &#39;./toastEditor&#39;</span></span>
<span class="line"><span style="color:#c9d1d9;">interface Props {</span></span>
<span class="line"><span style="color:#c9d1d9;">	modelValue?: string,</span></span>
<span class="line"><span style="color:#c9d1d9;">	placeholder?: string</span></span>
<span class="line"><span style="color:#c9d1d9;">	height?: string</span></span>
<span class="line"><span style="color:#c9d1d9;">}</span></span>
<span class="line"><span style="color:#c9d1d9;">const props = withDefaults(defineProps&lt;Props&gt;(), {</span></span>
<span class="line"><span style="color:#c9d1d9;">	modelValue: &#39;&#39;,</span></span>
<span class="line"><span style="color:#c9d1d9;">	placeholder: &#39;\u652F\u6301\u6258\u653E\u4E0A\u4F20\u56FE\u7247&#39;,</span></span>
<span class="line"><span style="color:#c9d1d9;">	height: &#39;500px&#39;</span></span>
<span class="line"><span style="color:#c9d1d9;">})</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">const emit = defineEmits([&#39;update:modelValue&#39;])</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">nextTick(() =&gt; {</span></span>
<span class="line"><span style="color:#c9d1d9;">	const markdownEditor = new Editor(&#39;#editor&#39;, props.height, props.modelValue)</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">	markdownEditor.editor.on(&#39;change&#39;, (type: string) =&gt; {</span></span>
<span class="line"><span style="color:#c9d1d9;">		emit(&#39;update:modelValue&#39;, markdownEditor.editor[type == &#39;markdown&#39; ? &#39;getMarkdown&#39; : &#39;getHTML&#39;]())</span></span>
<span class="line"><span style="color:#c9d1d9;">	})</span></span>
<span class="line"><span style="color:#c9d1d9;">})</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">	&lt;div id=&quot;editor&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">&lt;style lang=&quot;scss&quot; scoped&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">@import &quot;https://cdn.jsdelivr.net/npm/@toast-ui/editor@3.1.2/dist/toastui-editor.min.css&quot;;</span></span>
<span class="line"><span style="color:#c9d1d9;">#editor {</span></span>
<span class="line"><span style="color:#c9d1d9;">	@apply bg-white;</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">	//\u5168\u5C4F\u63A7\u5236</span></span>
<span class="line"><span style="color:#c9d1d9;">	:deep(.fullScreen) {</span></span>
<span class="line"><span style="color:#c9d1d9;">		position: fixed !important;</span></span>
<span class="line"><span style="color:#c9d1d9;">		z-index: 9999;</span></span>
<span class="line"><span style="color:#c9d1d9;">		top: 0;</span></span>
<span class="line"><span style="color:#c9d1d9;">		left: 0;</span></span>
<span class="line"><span style="color:#c9d1d9;">		right: 0;</span></span>
<span class="line"><span style="color:#c9d1d9;">		bottom: 0;</span></span>
<span class="line"><span style="color:#c9d1d9;">		background: #fff;</span></span>
<span class="line"><span style="color:#c9d1d9;">	}</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">	//\u9690\u85CF\u5E95\u90E8\u7F16\u8F91\u5668\u6A21\u5F0F\u5207\u6362</span></span>
<span class="line"><span style="color:#c9d1d9;">	:deep(.toastui-editor-mode-switch) {</span></span>
<span class="line"><span style="color:#c9d1d9;">		display: none !important;</span></span>
<span class="line"><span style="color:#c9d1d9;">	}</span></span>
<span class="line"><span style="color:#c9d1d9;">}</span></span>
<span class="line"><span style="color:#c9d1d9;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><h3 id="\u4F7F\u7528\u65B9\u5F0F" tabindex="-1">\u4F7F\u7528\u65B9\u5F0F <a class="header-anchor" href="#\u4F7F\u7528\u65B9\u5F0F" aria-hidden="true">#</a></h3><p>\u4F7F\u7528 vue \u7EC4\u4EF6\u7684\u597D\u5904\u5C31\u662F\u7F16\u5199\u65F6\u6BD4\u8F83\u8F9B\u82E6\uFF0C\u4F46\u4F7F\u7528\u65F6\u5C31\u5F88\u8F7B\u677E\u4E86\uFF0C\u4E0B\u9762\u518D\u4ECB\u7ECD\u4E00\u4E0B\u7EC4\u4EF6\u7684\u53EF\u4EE5\u4F7F\u7528\u7684 props \u5C5E\u6027</p><div class="language-text line-numbers-mode"><button class="copy"></button><span class="lang">text</span><pre><code><span class="line"><span style="color:#c9d1d9;">&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">import Editor from &#39;@/components/markdownEditor/editor.vue&#39;;</span></span>
<span class="line"><span style="color:#c9d1d9;">import { ref } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#c9d1d9;">const content = ref(&#39;houdunren.com&#39;)</span></span>
<span class="line"><span style="color:#c9d1d9;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span>
<span class="line"><span style="color:#c9d1d9;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">	&lt;div class&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">		&lt;Editor v-model=&quot;content&quot; /&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">		{{ content }}</span></span>
<span class="line"><span style="color:#c9d1d9;">	&lt;/div&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#c9d1d9;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u4E0B\u9762\u5BF9\u5C5E\u6027\u8FDB\u884C\u8BF4\u660E</p><table><thead><tr><th>\u5C5E\u6027</th><th>\u8BF4\u660E</th><th>\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>v-model</td><td>\u7F16\u8F91\u5668\u6570\u636E</td><td></td></tr><tr><td>placeholder</td><td>\u63D0\u793A\u5185\u5BB9</td><td></td></tr><tr><td>height</td><td>\u7F16\u8F91\u5668\u9AD8\u5EA6</td><td>500px</td></tr></tbody></table>`,22),c=[e];function r(t,o,i,d,b,u){return a(),n("div",null,c)}const g=s(p,[["render",r]]);export{y as __pageData,g as default};
