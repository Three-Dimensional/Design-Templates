<template>
  <aside class="editor-control">
    <div class="left-tools">
      <div class="tools">
        <Popover :title="'调色板'">
          <span class="color-block" :style="{ backgroundColor: props.toolSetting.color }"></span>
        </Popover>

        <!-- 字体 -->
        <Popover title="字体">
          <div
            @click="showFontFun"
            class="font-family__wrap"
            v-html="findFamilyByvalue(props.toolSetting.fontFamily)"
          ></div>
        </Popover>
        <FontFamilyList v-show="showFontFamily" :chooseFamily="chooseFamily" />
      </div>
    </div>

    <Popover title="字体大小" class="hover-tips tools-item font-size--choose">
      <input type="text" v-model="fontSizeValue" @focus="fontInputFocus" @blur="fontInputBlur" />
      <span class="font-pop__icon" @click="showFontSize = !showFontSize">
        <Icon icon="angle-down" />
      </span>
      <span class="tips-text" v-if="!showFontSize">字体大小</span>
      <FontSize v-model:visible="showFontSize" v-model:size="fontSizeValue" />
    </Popover>

    <!--     <Popover title="加粗" :class="[props.toolSetting.bold && 'selected']">
      <span class="icon-wrap" @click="emitData('bold', !props.toolSetting.bold)">
        <Icon icon="bold" />
      </span>
    </Popover>h

    <Popover title="斜体" :class="[props.toolSetting.italic && 'selected']">
      <span class="icon-wrap" @click="emitData('italic', !props.toolSetting.italic)">
        <Icon icon="italic" />
      </span>
    </Popover>

    <Popover title="下划线" :class="[props.toolSetting.underline && 'selected']">
      <span class="icon-wrap" @click="emitData('underline', !props.toolSetting.underline)">
        <Icon icon="underline" />
      </span>
    </Popover>

    <Popover title="对齐" class="hover-tips tools-item">
      <span class="icon-wrap">
        <Icon :icon="`text-align-${props.toolSetting.align}`" />
      </span>
    </Popover> -->
    <!-- 统一功能区 -->
    <!-- <div class="right-tools">
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
    </div> -->
  </aside>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import Popover from '@/components/Popover.vue'
import Opacity from '@/components/Tools/Opacity.vue'
import FontSize from '@/components/Tools/FontSize.vue'
import FontFamilyList from '@/components/Tools/FontFamilyList.vue'
import { findFamilyByvalue } from '@/config/toolBarConfig'
import useEditorStore from '@/stores/editor'

const store = useEditorStore()

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
  toolSetting: {
    type: Object,
    required: true
  }
})

// 监听文字Style数据变化
watch(
  () => props.toolSetting,
  (newVal) => {
    console.log('%c Line:121 🍢 newVal', 'color:#ed9ec7', newVal)
  },
  {
    deep: true,
    immediate: true
  }
)
// 字体显示控制
const showFontFamily = ref(false)
const showFontFun = () => {
  showFontFamily.value = !showFontFamily.value
}

const chooseFamily = (value: string) => {
  showFontFamily.value = false
  // eslint-disable-next-line vue/no-mutating-props
  props.toolSetting.fontFamily = value
}

// const emit = defineEmits(['update:setting', 'delete', 'reverse', 'copy'])

// const emitData = (key: string, value: string | number | boolean) => {
//   const copyData = {
//     ...props.toolSetting,
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
//   get: () => props.toolSetting.opacity,
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
//   get: () => props.toolSetting.size,
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
