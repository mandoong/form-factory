<template>
  <div class="content_wrap">
    <div class="app_nav" :class="{ close: _close }">
      <button class="close_btn" @click="_close = !_close">x</button>
      <div class="tab_menus" v-for="(value, key, index) in pageMenus"
      @click="selectMenu(key)">
        <div>-</div>
        <div>{{ key }}</div>
      </div>
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
import { usePageMenus } from '~/composables/dataFactory';

const _close = ref(true)


const pageMenus = usePageMenus()
const router = useRouter()
      
const selectMenu = (key) => {
  _close.value = true
  return router.push(`/managers/${key}`)
}

console.log(pageMenus)




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
      margin-bottom: 30px;

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

    .tab_menus {
      height: 40px;
      font-size: 20px;
      display: flex;
      gap: 10px;
      cursor: pointer;
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
</style>~/composables/dataFactory