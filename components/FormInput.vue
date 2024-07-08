<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  label: string
  name: string
  type: string
  defaultValue?: any
  size?: string | ''
}>()

const emits = defineEmits(['change'])

const handleChange = (event: Event) => {
  emits('change', event)
}
</script>

<template>
  <div class="form-control">
    <label :for="props.name" class="label">
      <span class="label-text capitalize">{{ props.label }}</span>
    </label>
    <input
      :type="props.type"
      :name="props.name"
      :value="props.defaultValue"
      :class="`input input-bordered ${props.size}`"
      @input="handleChange"
    />
  </div>
</template>
