<template>
  <Teleport to="body">
    <div class="modal" @click.self="close('close')">
      <div class="card_wrap">
        <div v-for="(value, key, index) in forms">
          <span v-if="(typeof value === 'object' && value.relation)">
            {{ f_relation(value.relation)}}
          </span>
          <span v-else>{{ value }}</span>
        </div>        
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const $props = defineProps({
  forms: {
    type: Object
  }
})

const {
  forms
} = toRefs($props)

const close = defineEmits(['close'])


const f_relation = (relation) => {
  return usePageData(relation).value

}

</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  .card_wrap {
    background-color: white;
    width: 800px;
    min-height: 500px;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>