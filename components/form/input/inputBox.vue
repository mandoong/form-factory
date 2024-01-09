<template>
  <div class="card_wrap">
    <div class="title">Edit {{ page }}</div>
    <div class="input_list_wrap">
      <div class="input_list" v-for="(value, key, index) in forms">
        <span class="input_wrap" v-if="(typeof value === 'object' && value.relation)">
          <div class="input_title">{{ key }}</div>: <input class="input" :type="value"  v-model="inputData[key]"/>
        </span>
        <span class="input_wrap" v-else>
          <div class="input_title">{{ key }}</div>
           : <input class="input" :type="value" v-model="inputData[key]" /> </span>
      </div>
    </div>
    <div>
      <button @click="schemaUpdate">
        Send
      </button>
    </div>
  </div>
</template>
<script setup>
const $props = defineProps({
  forms: {
    type: Object
  },
  data: {
    type: Object
  }
})

const {
  forms,
  data
} = toRefs($props)

const inputData = ref({...data.value})

const page = getQuery().page.toUpperCase()

const emits = defineEmits(['update']) 

const schemaUpdate = () => {
  return emits('update', inputData.value)
}

</script>

<style lang="scss" scoped>
.card_wrap {
  background-color: white;
  width: 800px;
  min-height: 500px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;    
  }
  .input_list_wrap {
    flex: 1 1 ;

    .input_list {
    margin-bottom: 20px;
    .input_wrap {
    display: flex;
    gap: 10px;
    align-items: center;
    box-sizing: border-box;
      .input_title {
        width: 100px;
        
      }

      .input {

        width: 100%;
        height: 30px;

        &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }
      }
    }
  }

  }


}
</style>