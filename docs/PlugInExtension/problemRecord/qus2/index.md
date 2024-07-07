# jsx函数式组件注册与使用

## 原始组件

```vue
<template>
    <van-popup v-model:show="show" round>
        <img src="@/assets/img/attendance/clickfalse.png" alt="" class="clickfalse" @click="cancel">
        <div class="title">
            选择打卡规则
        </div>
        <div class="hhti">
            <van-radio-group v-model="checked">
                <div v-for="(item,index) in content">
                    <van-radio :name="index">
                        <template #icon="props">
                            <img class="img-icon" :src="props.checked ? 'src/assets/img/attendance/rulechooston.png' : 'src/assets/img/attendance/rulechoosefalse.png'" alt="" />
                        </template>
                        <span class="rules">{{ item.groupName }}</span>
                    </van-radio>
                    <div class="tandl">
                        <div class="line">
                            <img src="@/assets/img/attendance/clock.png" alt="">
                            <span>打卡时间：{{ formatTime(item.checkinTime) }}</span>
                        </div>
                        <div class="line">
                            <img src="@/assets/img/attendance/location.png" alt="">
                            <span>打卡地址：{{ formatLoc(item.locations) }}</span>
                        </div>
                    </div>
                </div>
            </van-radio-group>
        </div>
        <div class="choose">
            <van-checkbox v-model="showchoose">
                <template #icon="props">
                    <img class="iimg-icon" :src="props.checked ? 'src/assets/img/attendance/chooseshowfalse.png' : 'src/assets/img/attendance/chooseshowon.png'" alt="" />
                </template>
                <div class="sspan">
                    <span>若后续均以当前选择打卡规则为准，不再弹出该提示。</span>
                </div>
            </van-checkbox>
        </div>
        <div class="bottom">
            <van-button @Click="confirm" class="bbutton">确认</van-button>
        </div>
    </van-popup>
</template>
<script setup>
import { sec2Date } from '@/utils'
const emits = defineEmits(['close', "confirm"])
const props = defineProps({ content: Object})
const checked = ref(0)
const show = ref(false);
const showchoose = ref(false)
const cancel = () => {
    emits('close')
}
const confirm = () => {
    emits('confirm',{
        i: checked.value,
        hasDefault: showchoose.value
    })
}

const formatTime = computed(() => {
    return (checkinTime) => {
        let timeShow = checkinTime.map(item => {
            return `${sec2Date(item.workSec).format('HH:mm')}~${sec2Date(item.offWorkSec).format('HH:mm')}`
        })
        return timeShow.join('、')
    }
})
const formatLoc = computed(() => {
    return (locations) => {
        let locShow = locations.map(item => item.locTitle)
        return locShow.join('、')
    }
})
</script>
```

## jsx函数式组件注册

```jsx
import Rules from './rules.vue'
import {mountComponent} from "../utils"
let _instance
function getInstance() {
    const { instance, unmount } = mountComponent({
        setup() {
            let show = ref(false)
            let options = reactive({
                content: '',
            })
            let _callback
            const open = (args, callback) => {
                Object.assign(options, args)
                show.value = true
                _callback = callback 
            }
            const close = () => {
                show.value = false
                _callback(false)
            }
            const confirm = (i) => {
                show.value = false
                _callback(true, i)
            }
            const render = () => {
                return (
                    // @ts-ignore
                    <Rules
                        show={show.value}
                        content={options.content}
                        onClose={close}
                        onConfirm={confirm}
                    >
                    </Rules>
                )
            }
            //@ts-ignore
            getCurrentInstance().render = render
            return { open, close }
        },
    })
    _instance = instance
}
export function MRules(args) {
    return new Promise((resolve, reject) => {
        if (_instance == null) {
            getInstance()
        }
        _instance.open(args, (action, params) => {
            action ? resolve(params) : reject()
        })
    })
}
```

## 释义

这段代码主要是定义了一个全局的弹窗组件 MRules，它通过 Rules 组件实现，支持传入参数，并返回一个 Promise。

在代码中，首先定义了一个 _instance 变量，用来存储组件实例，当它不存在时，通过 getInstance 函数创建组件实例，并将它赋值给 _instance 变量。getInstance 函数的实现中，定义了组件实例的 setup 函数，它包含了打开、关闭、确认的三个方法，还包含了 render 函数，用来渲染 Rules 组件，并将其返回。其中，打开方法 open 接受一个参数 args 和一个回调函数 callback，args 中包含了传入的参数，callback 用来在弹窗关闭时通知结果。关闭方法 close 只负责将 show 值设置为 false，确认方法 confirm 则是将结果通过回调函数传递给调用者。在 setup 函数的结尾处，通过 getCurrentInstance().render 将 render 函数赋值给当前组件实例的 render 属性，以便在需要渲染时调用。

MRules 函数返回一个 Promise，当 _instance 存在时，直接调用 _instance.open 打开弹窗，并传入参数和回调函数。当 _instance 不存在时，先通过 getInstance 函数创建实例，再调用 open 方法打开弹窗。在弹窗关闭时，根据回调函数传递的参数来决定 Promise 是成功还是失败，并传递相应的值。

## 组件使用

```ts
    const getTodayRule = (modify) => {
        if(modify) todayRule.value = null
        if (todayRule.value != null) return Promise.resolve(todayRule.value)
        return checkin
            .getRule({
                cat: CheckinPlaceType.workplace,
                hasHis: 'n',
            })
            .then(({ code, data }) => {
                if (code !== 0) return
                // 如果只有一条打卡规则
                if(data.attRuleVoList.length === 1) {
                    todayRule.value = {
                        ...data.attRuleVoList[0],
                        needCheckin: data.needCheckin
                    }
                }else {
                    // 如果不是变更规则或没有默认规则
                    if(modify || data.hasDefault === 'N') {
                        MRules({
                            content:data.attRuleVoList
                        }).then(({i, hasDefault}) => {
                            todayRule.value = {
                                ...data.attRuleVoList[i],
                                needCheckin: data.needCheckin
                            }
                            // 勾选保存打卡规则后调用保存接口
                            if(hasDefault) {
                                checkin.saveDefaultRule({
                                    groupId:data.attRuleVoList[i].groupId,
                                    userId:userInfo.userid
                                })
                            }
                        })
                    }else {
                        let dufaultRule = data.attRuleVoList.find(item => item.defaultRule === 'Y');
                        todayRule.value = {
                            ...dufaultRule,
                            needCheckin: data.needCheckin
                        }
                    }
                }
                
                return data
            })
```

## 释义

这段代码定义了一个名为 getTodayRule 的函数，用于获取当天的打卡规则。函数的主要实现逻辑如下：

如果 modify 参数为 true，则清空 todayRule 的缓存。
如果 todayRule 已经有值，直接返回缓存的值。
否则，调用 checkin.getRule 函数获取当天的打卡规则，并在获取成功后进行如下处理：
如果只有一条打卡规则，直接缓存该规则到 todayRule 中。
如果有多条打卡规则，且没有默认规则或者调用时需要变更规则，弹出打卡规则选择框，让用户选择一条规则，然后缓存选择的规则到 todayRule 中。如果用户勾选了保存默认规则，则调用 checkin.saveDefaultRule 函数保存默认规则。
如果有多条打卡规则，且有默认规则且没有要求变更规则，则缓存默认规则到 todayRule 中。
最终函数返回一个 Promise 对象，该对象在获取成功时返回 data 参数。如果获取失败或者没有获取到数据，Promise 对象将会 resolve，但不会返回任何值。

