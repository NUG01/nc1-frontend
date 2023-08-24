<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: String,
  type: String
})

const inputId = `input-${Math.random().toString(36).substring(7)}`
</script>

<template>
  <button
    :type="type"
    class="rounded-md bg-indigo-50 px-[18px] py-[10px] text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
  >
    {{ text }}
  </button>
</template>
