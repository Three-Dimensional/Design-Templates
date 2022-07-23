<template>
  <div class="background-section__header">
    <div class="background-section__header">
      <p class="colors-title">主题颜色</p>
      <p class="colors-title">预设颜色</p>
      <div class="leftPanel-background-colors">
        <span
          v-for="{ title, value } in PRESET_COLOR"
          :key="title"
          :style="{ background: value }"
          class="leftPanel-background-colors-items"
          @click="handleClick(value)"
        >
        </span>
      </div>
      <div class="leftPanel-background-custom-top">
        <div id="ss-upload">
          <input
            id="uploadBackground"
            type="file"
            accept="image/svg+xml,image/jpeg,image/png,image/gif,image/psd"
            style="display: none"
          />
        </div>
        <button class="leftPanel-button">自定义背景</button>
        <p>点击色块或素材即可更改背景。若无发生变化，<br />请检查是否被上层图片所遮盖。</p>
      </div>
      <!-- 图片列表 -->
      <div class="type-list-wrap">
        <div class="imageList">
          <div v-for="url in BG_IMG" :key="url" class="imageList__img" @click="handleClickImg(url)">
            <img :src="url" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PRESET_COLOR, BG_IMG } from './constants'
import useEditorStore from '@/stores/editor'

const editeorStore = useEditorStore()
const handleClick = (value: string) => {
  editeorStore.updatePageStyle({
    backgroundColor: value,
    backgroundImage: ''
  })
}
const handleClickImg = (url: string) => {
  console.log('url', url)
  editeorStore.updatePageStyle({
    backgroundColor: '',
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    backgroundSize: 'cover'
  })
}
</script>

<style lang="scss" scoped>
.background-section__scroll {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  width: 100%;
}
.background-section__header {
  box-sizing: border-box;
  width: 256px;
}
.background-section {
  .colors-title:first-child {
    margin-top: 24px;
  }
}
.leftPanel-background-colors {
  overflow: hidden;
}
.leftPanel-background-colors-items {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  float: left;
  height: 36px;
  margin: 8px 8px 0 0;
  transition: all 0.1s ease;
  transition: border 0.3s;
  width: 36px;
  &:nth-child(6n) {
    margin: 8px 0 0;
  }
}
.leftPanel-background-colors-items {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  float: left;
  height: 36px;
  margin: 8px 8px 0 0;
  transition: all 0.1s ease;
  transition: border 0.3s;
  width: 36px;
}
.leftPanel-background-custom-top {
  margin-bottom: 20px;
  text-align: center;
  p {
    color: #bfbfbf;
    font-size: 12px;
    line-height: 17px;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .leftPanel-button {
    background-color: #fff;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    height: 28px;
    outline: none;
    position: relative;
    transition: all 0.2s ease;
  }
}
.leftPanel-button {
  color: #6d6d6d;
  float: none;
  font-size: 14px;
  height: 40px;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 256px;
}
.type-list-wrap {
  margin: 0 auto;
  padding-bottom: 8px;
  padding-top: 16px;
  width: 256px;
}
.imageList {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 256px;
}
.imageList__img {
  background: #f8f8fb;
  box-sizing: border-box;
  float: left;
  margin-left: 8px;
  opacity: 1;
  width: 66px;
  height: 88px;
  img {
    display: block;
    min-height: 1px;
    width: 100%;
    height: 100%;
  }
}
</style>
