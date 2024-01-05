<template>
  <div v-if="_subtype">
    <div>sub page</div>
  </div>
  <div v-else-if="pageData">
    <FormInput 
        :schema="pageData.find()" 
        :relation="{
        children: ['comment'],
        user: 'user',
        comment_movie: 'movie',
        parent: 'comment'
        }"/>
    <RouterLink :to="`${_page}/${id}`">
      Go!
      </RouterLink>

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
  return usePageData(_page).value
})

const id = ref(0)


onMounted(() => {
  if (!_page) {
    router.push('/managers/movies')
  } 
})

</script>
