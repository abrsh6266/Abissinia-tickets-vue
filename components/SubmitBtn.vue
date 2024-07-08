<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  text: string
}>()
</script>

<template>
  <button class="btn btn-primary btn-block" type="submit">
    {{ props.text }}
  </button>
</template>