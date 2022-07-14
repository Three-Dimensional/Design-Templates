<template>
  <div class="template">
    <img class="template-img" v-for="(url, index) in urls" :src="url" :key="index" />
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import imageUrls from '@/mock/mock'

const urls = shallowRef(imageUrls)
</script>

<style lang="scss">
.template {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  & {
    -ms-overflow-style: none;
  }
  & {
    overflow: -moz-scrollbars-none;
  }
  .template-img {
    width: 45%;
    flex: 1;
    margin: 3px;
  }
}
</style>
