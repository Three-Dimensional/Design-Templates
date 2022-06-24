<template>
  <div class="content-container">
    <TemplateList :list="testData"></TemplateList>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../store/index'
import TemplateList from '../../components/TemplateList.vue'

const store = useStore<GlobalDataProps>()
const testData = computed(() => store.state.templates.data)
</script>

<style>
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>
