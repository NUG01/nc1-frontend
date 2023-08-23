<script setup>
import { ref, computed } from 'vue'
import { ElTable, ElTableColumn, ElInput } from 'element-plus'
import BasicAxios from '@/lib/axios'
import { onMounted } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const searchKeyword = ref('')
const isFetched = ref(false)
// Replace this with your actual data source
const data = ref([])

onMounted(async () => {
  const response = await BasicAxios.get('csv-data/index')
  data.value = response.data
  console.log(response.data)
  isFetched.value = true
})

const filteredData = computed(() => {
  if (!searchKeyword.value) {
    return data.value
  }
  const keyword = searchKeyword.value.toLowerCase()
  return data.value.filter((item) => {
    return item.name.toLowerCase().includes(keyword) || item.email.toLowerCase().includes(keyword)
  })
})
</script>

<template>
  <div v-if="isFetched" class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-4">Search and Table Page</h1>

      <!-- Search Bar -->
      <!-- <el-input v-model="searchKeyword" placeholder="Search..." class="mb-4"></el-input> -->

      <!-- Table -->
      <el-table :data="filteredData" stripe>
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Price" prop="price"></el-table-column>
        <el-table-column label="Bedrooms" prop="bedrooms"></el-table-column>
        <el-table-column label="Bathrooms" prop="bathrooms"></el-table-column>
        <el-table-column label="Storeys" prop="storeys"></el-table-column>
        <el-table-column label="Garages" prop="garages"></el-table-column>
      </el-table>
    </div>
  </div>
  <div v-else class="h-[100vh] w-[100vw]"><LoadingSpinner /></div>
</template>

<style scoped>
/* Add Element Plus styles */
</style>
