<script lang="ts"></script>
<template>
  <div class="editor-control">
    <div class="left-tools">
      <ul class="tools">
        <li class="hover-tips">
          <span class="color-block" :style="{ backgroundColor: props.setting.color }"></span>
          <span class="tips-text">调色板</span>
        </li>
        <li class="hover-tips">
          <div
            class="font-family-wrap"
            v-html="findFamilyByvalue(fontFamilyValue)"
            @click="fontFamilyVisible = !fontFamilyVisible"
          ></div>
          <span class="font-pop-icon" @click="fontFamilyVisible = !fontFamilyVisible">
            <Icon icon="angle-down" />
          </span>
          <span class="tips-text" v-if="!fontFamilyVisible">字体</span>
          <FontFamily v-model:visible="fontFamilyVisible" v-model:family="fontFamilyValue" />
        </li>
        <li class="hover-tips font-size-choose">
          <input
            type="text"
            v-model="fontSizeValue"
            @focus="fontSizeVisible = true"
            @blur="fontSizeVisible = false"
          />
          <span class="font-pop-icon" @click="fontSizeVisible = !fontSizeVisible">
            <Icon icon="angle-down" />
          </span>
          <span class="tips-text" v-if="!fontSizeVisible">字体大小</span>
          <FontSize v-model:visible="fontSizeVisible" v-model:size="fontSizeValue" />
        </li>
        <li :class="['hover-tips', props.setting.bold && 'selected']">
          <span class="icon-wrap" @click="emitData('bold', !props.setting.bold)">
            <Icon icon="bold" />
          </span>
          <span class="tips-text">加粗</span>
        </li>
        <li :class="['hover-tips', props.setting.italic && 'selected']">
          <span class="icon-wrap" @click="emitData('italic', !props.setting.italic)">
            <Icon icon="italic" />
          </span>
          <span class="tips-text">斜体</span>
        </li>
        <li :class="['hover-tips', props.setting.underline && 'selected']">
          <span class="icon-wrap" @click="emitData('underline', !props.setting.underline)">
            <Icon icon="underline" />
          </span>
          <span class="tips-text">下划线</span>
        </li>
        <li class="hover-tips">
          <span class="icon-wrap">
            <Icon :icon="`text-align-${props.setting.align}`" />
          </span>
          <span class="tips-text">对齐</span>
        </li>
      </ul>
    </div>
    <div class="right-tools">
      <ul class="tools">
        <li class="hover-tips" @click="emit('copy')">
          <span class="icon-wrap">
            <Icon icon="fuzhi" />
          </span>
          <span class="tips-text">复制</span>
        </li>
        <li class="hover-tips" id="OpacityBtn">
          <span class="icon-wrap" @click="toggleShow">
            <Icon icon="touming" />
          </span>
          <span class="tips-text">透明度</span>
          <Opacity
            v-model:show="opacityShow"
            v-model:value="opacityValue"
            :location="opacityLocation"
          />
        </li>
        <li class="hover-tips" @click="emit('reverse')">
          <span class="icon-wrap">
            <Icon icon="duicheng" />
          </span>
          <span class="tips-text">翻转</span>
        </li>
        <li class="hover-tips" @click="emit('delete')">
          <span class="icon-wrap">
            <Icon icon="shanchu" />
          </span>
          <span class="tips-text">删除</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Opacity from '@/components/Tools/Opacity.vue'
import FontSize from '@/components/Tools/FontSize.vue'
import FontFamily from '@/components/Tools/FontFamily.vue'
import { findFamilyByvalue } from '@/config/toolBarConfig'

interface Setting {
  color: string
  family: string
  size: number
  bold: boolean
  italic: boolean
  underline: boolean
  align: string
  opacity: number
}
interface Props {
  setting: Setting
}
const emit = defineEmits(['update:setting', 'delete', 'reverse', 'copy'])
const props = withDefaults(defineProps<Props>(), {
  setting: () => {
    return {
      color: 'rgb(130, 85, 130)',
      family: '',
      size: 15,
      bold: false,
      italic: false,
      underline: false,
      align: 'left',
      opacity: 0
    }
  }
})

const emitData = (key: string, value: string | number | boolean) => {
  const copyData = {
    ...props.setting,
    [key]: value
  }
  emit('update:setting', copyData)
}

// 控制透明度工具栏
const opacityShow = ref(false)
const opacityLocation = ref({
  left: 0,
  top: 0
})
const opacityValue = computed({
  get: () => props.setting.opacity,
  set: (value: number) => emitData('opacity', value)
})

// 显示弹窗的时候获取坐标，计算透明度弹窗应该显示的位置
function toggleShow() {
  const ele = document.getElementById('OpacityBtn')
  const rect = ele?.getBoundingClientRect()
  opacityLocation.value.left = rect?.x || 0
  opacityLocation.value.top = rect?.y || 0
  opacityShow.value = !opacityShow.value
}

// 字体大小显示控制
const fontSizeVisible = ref(false)
const fontSizeValue = computed({
  get: () => props.setting.size,
  set: (value: number) => emitData('size', value)
})

// 字体显示控制
const fontFamilyVisible = ref(false)
const fontFamilyValue = computed({
  get: () => props.setting.family,
  set: (value: string) => emitData('family', value)
})
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
    li {
      display: flex;
      border-radius: 4px;
      padding: 8px;
      margin: 0 5px;
      align-items: center;
      position: relative;
    }
    .font-pop-icon {
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
    .hover-tips {
      position: relative;
      &:hover {
        background: #f3f4f9;
        .tips-text {
          visibility: initial;
        }
      }
      &.selected {
        background: #f3f4f9;
      }

      .tips-text {
        background-color: #000;
        border-radius: 4px;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 24%);
        color: #fff;
        font-size: 12px;
        left: 50%;
        line-height: 12px;
        padding: 4px 8px;
        position: absolute;
        top: 49px;
        transform: translateX(-50%);
        visibility: hidden;
        white-space: pre;
        z-index: 1;
        &::after {
          border: 4px solid transparent;
          border-bottom-color: #000;
          bottom: 100%;
          content: '';
          left: 50%;
          margin-left: -4px;
          position: absolute;
        }
      }
    }

    .font-size-choose {
      input {
        background: transparent;
        border: none;
        height: 18px;
        outline: none;
        overflow: hidden;
        text-align: left;
        width: 32px;
      }
      .font-pop-icon {
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

    .font-family-wrap {
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
