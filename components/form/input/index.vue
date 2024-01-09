<template>
  <table>
    <thead>
      <tr>
        <th class="check_box_column"></th>
        <th v-for="(value, key, index) in schemaData[0]">
        {{ key }}</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in schemaData">
        <td class="check_box_column" >
          <div class="check_box"></div>
        </td>
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
  return schema.value?.table?.relation || {}
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

const schemaUpdate = async (data) => {
  const result = await schema.value.update(seletedIdData.value.id, data)

  if (result) {
    result.data
  }

  _modal.value = ''
}

watch(schema, async () => {
  schemaData.value = await schema.value.findAll()
}, {immediate: true})
</script>

<style lang="scss" scoped>

table {
  width: 100%;
  border-spacing: 0px;

  thead {
     tr { 
      background-color: gray;
      color: white;
      height: 30px;
      position: sticky;
      top: 0;
      
      th {
        padding: 0 10px;
        border-left: 1px solid white;

        &:last-child {
          border-left: none;
        }
        &.check_box_column {
          min-width: 20px;
        }
      }
     }
  }



  tbody {

    tr {



      td {


        max-width: 200px;
        overflow: hidden;
        padding: 0px 10px;
        height: 30px;

        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
       &.check_box_column {
        display: flex;
        justify-content: center;
        align-items: center;
        .check_box {
          border: 1px solid gray;
          width: 12px;
          aspect-ratio: 1 / 1;
        }
       }
      }
      &:nth-child(even) {
          background-color: rgba(242, 242, 242);  
        }
    }
  }
}

</style>