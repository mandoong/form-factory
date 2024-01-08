<template>
  <Teleport to="body">
    <div class="modal" @click.self="close('close')">
      <slot />
    </div>
  </Teleport>
</template>

<script setup>

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


}
</style>