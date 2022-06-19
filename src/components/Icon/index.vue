<script lang="ts">
export default {
  name: 'Icon',
}
</script>

<template>
    <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script setup lang='ts'>
    defineProps<{
        icon: string
    }>()
</script>