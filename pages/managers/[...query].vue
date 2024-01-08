<template>
  <div v-if="_target">
    <div>target page</div>
  </div>
  <div v-else-if="_subtype">
    <div>sub page</div>
  </div>
  <div v-else-if="pageData">
    <FormInput 
        :schema="pageData" />
  </div>
  <div v-else>
    page is not found
  </div>
</template>


<script setup>
definePageMeta({
  layout: 'tab'
})

const [_page, _subtype, _target] = useRoute().params.query

const router = useRouter()

const pageData = computed(() => {
  if (_page) return usePageData(_page).value
  return {}
})

const id = ref(0)

onMounted(() => {
  if (!_page) {
    router.push('/managers/movies')
  } 
})

</script>
