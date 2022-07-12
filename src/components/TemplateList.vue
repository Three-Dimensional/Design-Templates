<template>
  <div class="template-list-component">
    <a-row :gutter="16">
      <a-col :span="6" v-for="item in list" :key="item.id" class="poster-item">
        <router-link :to="{ name: 'template', params: { id: item.id } }">
          <a-card hoverable>
            <template #cover>
              <img :src="item.coverImg" v-if="item.coverImg" />
              <img
                src="http://typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/5f81cca3f3bf7a0e1ebaf885.png"
                v-else
              />
              <div class="hover-item">
                <a-button size="large" type="primary">使用该模版创建</a-button>
              </div>
            </template>
            <a-card-meta :title="item.title">
              <template #description>
                <div class="description-detail">
                  <span>作者：{{ item.author }}</span>
                  <span class="user-number">{{ item.copiedCount }}</span>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TemplateProps } from '@/stores/interface'

export default defineComponent({
  name: 'TemplateList',
  props: {
    list: {
      type: Array as PropType<TemplateProps[]>,
      required: true
    }
  }
})
</script>

<style lang="scss">
.poster-item {
  position: relative;
  margin-bottom: 20px;
  .ant-card {
    border-radius: 12px;
  }
  .ant-card-cover {
    height: 390px;
    position: relative;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    img {
      width: 100%;
      transition: all ease-in 0.2s;
    }
    .hover-item {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      background: rgba(0, 0, 0, 0.8);
      align-items: center;
      justify-content: center;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
  }
  .ant-card-hoverable {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  }
  .ant-card-body {
    padding: 0;
  }
  .ant-card-meta {
    margin: 0;
  }
  .ant-card-meta-title {
    color: #333;
    padding: 10px 12px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 0 !important;
  }
  &:hover {
    .hover-item {
      display: flex;
    }
    img {
      transform: scale(1.25);
    }
  }
}
.description-detail {
  display: flex;
  justify-content: space-between;
  padding: 13px 12px;
  color: #999;
}
.user-number {
  font-weight: bold;
}
.poster-title {
  height: 70px;
}
.poster-title {
  h2 {
    margin-bottom: 0px;
  }
}
.barcode-container {
  img {
    border-radius: 0;
  }
}
</style>
