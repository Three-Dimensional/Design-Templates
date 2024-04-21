<template>
  <aside class="editor-control">
    {{ TextStyle.fontFamily }}
    <div class="left-tools">
      <div class="tools">
        <!-- {{ setting }} -->
        <Popover :title="'调色板'">
          <span class="color-block" :style="{ backgroundColor: props.setting.color }"></span>
        </Popover>

        <!-- 字体 -->
        <Popover title="字体" @click="showFontFamily = !showFontFamily">
          <div class="font-family__wrap" v-html="findFamilyByvalue(TextStyle.fontFamily)"></div>
          <FontFamilyList
            v-model:visible="showFontFamily"
            v-model:fontFamily="TextStyle.fontFamily"
          />
        </Popover>

        <!-- 字体大小 -->
        <Popover title="字体大小" class="hover-tips tools-item font-size--choose">
          <input
            type="text"
            v-model="fontSizeValue"
            @focus="fontInputFocus"
            @blur="fontInputBlur"
          />
          <span class="font-pop__icon" @click="showFontSize = !showFontSize">
            <Icon icon="angle-down" />
          </span>
          <span class="tips-text" v-if="!showFontSize">字体大小</span>
          <FontSize v-model:visible="showFontSize" v-model:size="fontSizeValue" />
        </Popover>
        <!-- 粗体 -->
        <Popover title="加粗" :class="[props.setting.bold && 'selected']">
          <span class="icon-wrap" @click="emitData('bold', !props.setting.bold)">
            <Icon icon="bold" />
          </span>
        </Popover>
        <!-- 斜体 -->
        <Popover title="斜体" :class="[props.setting.italic && 'selected']">
          <span class="icon-wrap" @click="emitData('italic', !props.setting.italic)">
            <Icon icon="italic" />
          </span>
        </Popover>
        <!-- 下划线 -->
        <Popover title="下划线" :class="[props.setting.underline && 'selected']">
          <span class="icon-wrap" @click="emitData('underline', !props.setting.underline)">
            <Icon icon="underline" />
          </span>
        </Popover>
        <!-- 对齐方式 -->
        <Popover title="对齐" class="hover-tips tools-item">
          <span class="icon-wrap">
            <Icon :icon="`text-align-${props.setting.align}`" />
          </span>
        </Popover>
      </div>
    </div>
    <!-- 统一功能区 -->
    <div class="right-tools">
      <ul class="tools">
        <Popover title="复制" class="hover-tips tools-item" @click="emit('copy')">
          <span class="icon-wrap">
            <Icon icon="fuzhi" />
          </span>
        </Popover>
        <Popover title="透明度" class="hover-tips tools-item" id="OpacityBtn">
          <span class="icon-wrap" @click="toggleShow">
            <Icon icon="touming" />
          </span>
          <Opacity
            v-model:show="opacityShow"
            v-model:value="opacityValue"
            :location="opacityLocation"
          />
        </Popover>
        <Popover title="翻转" class="hover-tips tools-item" @click="emit('reverse')">
          <span class="icon-wrap">
            <Icon icon="duicheng" />
          </span>
        </Popover>
        <Popover title="删除" class="hover-tips tools-item" @click="emit('delete')">
          <span class="icon-wrap">
            <Icon icon="shanchu" />
          </span>
        </Popover>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import Popover from '@/components/Popover.vue'
import Opacity from '@/components/Tools/Opacity.vue'
import FontSize from '@/components/Tools/FontSize.vue'
import FontFamilyList from '@/components/Tools/FontFamilyList.vue'
import { findFamilyByvalue } from '@/config/toolBarConfig'

interface Setting {
  color: string
  fontFamily: string
  // size: number
  // bold: boolean
  // italic: boolean
  // underline: boolean
  // align: string
  // opacity: number
}

const props = defineProps({
  setting: {
    type: Object,
    required: true
  }
})

// 选中的文字数据
let TextStyle: Setting = {
  color: 'red',
  fontFamily: 'Microsoft YaHei'
  // size: 0,
  // bold: false,
  // italic: false,
  // underline: false,
  // align: '',
  // opacity: 0
}

// 监听文字Style数据变化
watch(
  () => props.setting,
  (newVal) => {
    TextStyle = reactive({
      ...newVal.style
    })
    console.log('%c Line:136 🍐 TextStyle', 'color:#7f2b82', TextStyle.fontFamily)
  },
  {
    deep: true,
    immediate: true
  }
)

// const emit = defineEmits(['update:setting', 'delete', 'reverse', 'copy'])

// const emitData = (key: string, value: string | number | boolean) => {
//   const copyData = {
//     ...props.setting,
//     [key]: value
//   }
//   emit('update:setting', copyData)
// }

// // 控制透明度工具栏
// const opacityShow = ref(false)
// const opacityLocation = ref({
//   left: 0,
//   top: 0
// })
// const opacityValue = computed({
//   get: () => props.setting.opacity,
//   set: (value: number) => emitData('opacity', value)
// })

// // 显示弹窗的时候获取坐标，计算透明度弹窗应该显示的位置
// function toggleShow() {
//   const ele = document.getElementById('OpacityBtn')
//   const rect = ele?.getBoundingClientRect()
//   opacityLocation.value.left = rect?.x || 0
//   opacityLocation.value.top = rect?.y || 0
//   opacityShow.value = !opacityShow.value
// }

// // 字体大小显示控制
// const showFontSize = ref(false)
// const fontSizeValue = computed({
//   get: () => props.setting.size,
//   set: (value: number) => emitData('size', value)
// })
// let copyFont = 0
// const fontInputFocus = () => {
//   showFontSize.value = true
//   copyFont = fontSizeValue.value
// }
// const fontInputBlur = () => {
//   if (fontSizeValue.value === copyFont) return
//   showFontSize.value = !showFontSize.value
// }

// 字体显示控制
const showFontFamily = ref(false)
</script>

<style scoped lang="scss">
.editor-control {
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  font-size: 14px;
  height: 48px;
  justify-content: space-between;
  max-width: 100%;
  min-width: 474px;
  padding: 0 16px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  word-break: keep-all;
  .left-tools {
    display: flex;
  }
  .right-tools {
    display: flex;
  }

  .tools {
    display: flex;
    height: 100%;
    align-items: center;
    .font-pop__icon {
      cursor: pointer;
    }
    .color-block {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      height: 24px;
      width: 24px;
    }
    .icon-wrap {
      width: 20px;
      height: 20px;
      font-size: 18px;
      text-align: center;
      line-height: 20px;
    }

    .font-size--choose {
      input {
        background: transparent;
        border: none;
        height: 18px;
        outline: none;
        overflow: hidden;
        text-align: left;
        width: 32px;
      }
      .font-pop__icon {
        display: block;
        height: 20px;
        margin-left: 5px;
        margin-right: -5px;
        position: relative;
        width: 20px;
        font-size: 15px;
        text-align: center;
        line-height: 20px;
        .icon {
          color: #111a36;
        }
      }
    }

    .font-family__wrap {
      align-items: center;
      cursor: pointer;
      display: flex;
      height: 20px;
      overflow: hidden;
      position: relative;
      width: 115px;
    }
  }
}
</style>
