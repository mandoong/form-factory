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
        <td @click="_modal = 'edit'">수정</td>
        <td @click="schema.delete()">삭제</td>
      </tr>
    </tbody>
  </table>

  <BasicModal 
    v-if="_modal === 'edit'" 
    :forms="schema.UPDATE.data"
    @close="_modal = ''" />

</template>

<script setup>
const $props = defineProps({
  schema: {
    type: Object
  },
  relation: {
    type: Object
  }
})

const {
  schema,
  relation,
} = toRefs($props)

const _modal = ref('')


const schemaData = computed(() => {
  return schema.value.find()
})


const relationCheck = (value) => {
  if (value.id) {
    return value.id
  } else if (Array.isArray(value)) {
    return value.map(e => relationCheck(e))
  } else {
    return "-"
  }
}

</script>

<style lang="scss" scoped>

table {
  width: 100%;

  .list_wrap {
  display: flex;

  .list {
    margin-left: 10px;
  }
}

}



</style>