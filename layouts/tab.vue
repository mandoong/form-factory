<template>
  <div class="content_wrap">
    <div class="app_nav" :class="{ close: _close }">
      <button class="close_btn" @click="_close = !_close">x</button>
    </div>
    <div class="side_btn">
      <button class="close_btn" @click="_close = !_close">x</button>
    </div>

    <div class="dash_board_wrap"> 
      <slot />
    </div>
  </div>
</template>

<script setup>
const _close = ref(false)

</script>


<style lang="scss" scoped>
.content_wrap {
  width: 100vw;
  height: 100vh;
  display: flex;


  .close_btn {
      background-color: transparent;
      border: none;
      font-size: 20px;
    }

  .app_nav {
    top: 0;
    left: 0;
    margin: 0;
    width: 300px;
    height: 100%;
    background-color: rgba(53, 53, 53);
    position: absolute;
    font-size: 20px;
    color: white;
    z-index: 1;
    padding: 20px;
    box-sizing: border-box;

    &.close {
      left: -300px;
    }

  }
  .side_btn {
    padding: 20px;
    width: 64px;
    box-sizing: border-box;
  }

  .dash_board_wrap {
    box-sizing: border-box;
    flex: 1 1;
    height: 100%;
    padding: 50px 10px;
  }

}
</style>