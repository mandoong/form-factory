<template>
  <table>
    <thead>
      <tr>
        <th v-for="(value, key, index) in schemaData[0]">
        {{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in schemaData">
        <td v-for="(value, key, index) in data">
          <span v-if="Array.isArray(value) && Object.keys(relation)?.some(e => e === key)">
            {{ relationCheck(value) }}</span>

          <span v-else-if="Array.isArray(value)">{{ relationCheck(value) }}</span>

          <span v-else-if="typeof value === 'object' && Object.keys(relation)?.some(e => e === key)">
            {{value?.id ?  relation[key] + ' ' +  value?.id : "-" }}</span>
            
          <span v-else>{{ value }}</span>
        </td>
        <td @click="(_modal = 'edit', seletedIdData = data)">수정</td>
        <td @click="(_modal = 'delete', seletedIdData = data)">삭제</td>
      </tr>
    </tbody>
  </table>

  <BasicModal 
    v-if="_modal === 'edit'" 
    @close="_modal = ''" >
    <FormInputBox 
      :forms="schema.UPDATE.data" 
      :data="seletedIdData"
      @update="schemaUpdate"
      />
  </BasicModal>
  <BasicModal 
    v-if="_modal === 'delete'" 
    @close="_modal = ''" >
    <FormInputBox 
      :forms="schema.UPDATE.data" 
      :data="seletedIdData"
      @update="schemaUpdate"
      />
  </BasicModal>

</template>

<script setup>
const $props = defineProps({
  schema: {
    type: Object
  },
})

const {
  schema
} = toRefs($props)

const _modal = ref('')

const seletedIdData = ref()

const relation = computed(() => {
  return schema.value?.table || {}
}) 

const schemaData = ref([])


const relationCheck = (value) => {
  if (value.id) {
    return value.id
  } else if (Array.isArray(value)) {
    return value.map(e => relationCheck(e))
  } else {
    return "-"
  }
}

const schemaUpdate = (data) => {
  const axiosData = { url: schema.value.UPDATE.url, data }

  console.log(axiosData)

  return _modal.value = ''
}

watch(schema, async () => {
  schemaData.value = await schema.value.findAll()
}, {immediate: true})
</script>

<style lang="scss" scoped>

table {
  width: 100%;



  tbody {

    tr {

      td {
        max-width: 200px;
        overflow: hidden;
        padding: 0px 10px;

        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
      }
    }
  }


}

</style>