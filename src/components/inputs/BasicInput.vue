<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String
})
const inputId = `input-${Math.random().toString(36).substring(7)}`
const inputValue = ref('')
</script>

<template>
  <div>
    <label :for="type" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
    <div class="mt-2">
      <input
        :type="type"
        :name="type"
        :id="type"
        class="block w-full px-[7px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
