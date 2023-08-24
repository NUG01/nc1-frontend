<script setup>
import BasicAxios from '@/lib/axios'
import { onMounted, ref, watch } from 'vue'
import { ElTable, ElTableColumn, ElInput } from 'element-plus'
import BasicInput from '@/components/inputs/BasicInput.vue'
import BasicButton from '@/components/buttons/BasicButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const searchKeyword = ref('')
const isFetched = ref(false)
const searchFetched = ref(true)
const data = ref([])
const name = ref('')
const priceMin = ref('')
const priceMax = ref('')
const bedrooms = ref('')
const bathrooms = ref('')
const storeys = ref('')
const garages = ref('')

const propertiesToWatch = [
  { property: name, target: name.value },
  { property: priceMin, target: priceMin.value },
  { property: priceMax, target: priceMax.value },
  { property: bedrooms, target: bedrooms.value },
  { property: bathrooms, target: bathrooms.value },
  { property: storeys, target: storeys.value },
  { property: garages, target: garages.value }
]

propertiesToWatch.forEach(({ property, target }) => {
  watch(property, (newValue) => {
    target = newValue
  })
})

async function handleSearch() {
  searchFetched.value = false
  if (
    name.value ||
    priceMin.value ||
    priceMax.value ||
    bedrooms.value ||
    bathrooms.value ||
    storeys.value ||
    garages.value
  ) {
    try {
      const response = await BasicAxios.get(
        `csv-data/index?search=true&name=${name.value}&price_min=${priceMin.value}&price_max=${priceMax.value}&bedrooms=${bedrooms.value}&bathrooms=${bathrooms.value}&storeys=${storeys.value}&garages=${garages.value}`
      )
      data.value = response.data
      searchFetched.value = true
    } catch (error) {
      alert('Something went wrong!')
    }
  } else {
    searchFetched.value = true

    return
  }
}

onMounted(async () => {
  try {
    const response = await BasicAxios.get('csv-data/index')
    data.value = response.data
    isFetched.value = true
  } catch (error) {
    alert('Something went wrong!')
  }
})
</script>

<template>
  <div v-if="isFetched" class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full">
      <h1 class="text-2xl font-semibold mb-4">Search and Table Page</h1>

      <div>
        <div @click="handleSearch" class="flex items-end justify-end pr-[30px]">
          <BasicButton text="Filter" type="button" />
        </div>

        <div class="flex items-center justify-center px-[20px] mb-[20px] gap-[30px]">
          <BasicInput
            v-model="name"
            label="Name"
            type="text"
            placeholder="The Victoria"
          ></BasicInput>

          <BasicInput
            v-model="priceMin"
            label="Price Min"
            type="number"
            placeholder="120"
          ></BasicInput>
          <BasicInput
            v-model="priceMax"
            label="Price Max"
            type="number"
            placeholder="390600"
          ></BasicInput>

          <BasicInput
            v-model="bedrooms"
            label="Bedrooms"
            type="number"
            placeholder="4"
          ></BasicInput>
          <BasicInput
            v-model="bathrooms"
            label="Bathrooms"
            type="number"
            placeholder="2"
          ></BasicInput>
          <BasicInput v-model="storeys" label="Storeys" type="number" placeholder="1"></BasicInput>
          <BasicInput v-model="garages" label="Garages" type="number" placeholder="3"></BasicInput>
        </div>
      </div>
      <div v-if="searchFetched">
        <el-table :data="data" stripe>
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Price" prop="price"></el-table-column>
          <el-table-column label="Bedrooms" prop="bedrooms"></el-table-column>
          <el-table-column label="Bathrooms" prop="bathrooms"></el-table-column>
          <el-table-column label="Storeys" prop="storeys"></el-table-column>
          <el-table-column label="Garages" prop="garages"></el-table-column>
        </el-table>
      </div>
      <div class="relative mt-[50px]" v-else>
        <LoadingSpinner />
      </div>
    </div>
  </div>
  <div v-else class="h-[100vh] w-[100vw] bg-white"><LoadingSpinner /></div>
</template>
