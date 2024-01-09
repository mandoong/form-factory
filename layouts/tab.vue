<template>
  <div class="content_wrap">
    <div class="app_nav">
      <div class="tab_title">Manager</div>
      <div class="tab_menus" v-for="(value, key, index) in pageMenus"
      @click="selectMenu(key)">
        <div>-</div>
        <div>{{ key }}</div>
      </div>
    </div>
    <div class="dash_board_wrap"> 
      <div class="board_tilte">{{ params.page.toUpperCase() }} TABLE</div>
      <div class="boar_wrap">
        <slot />

      </div>
    </div>
  </div>
</template>

<script setup>
const _close = ref(true)


const pageMenus = usePageMenus()
const params = useQuery()
const router = useRouter()
      
const selectMenu = (key) => {
  _close.value = true
  return router.push(`/managers/${key}`)
}

console.log(pageMenus.value)

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
    margin: 0;
    width: 250px;
    height: 100%;
    background-color: rgba(53, 53, 53);
    font-size: 20px;
    color: white;
    z-index: 1;
    padding: 20px;
    box-sizing: border-box;
  

    .tab_title {
      font-size: 24px;
      margin-bottom: 40px;
    }

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
    display: flex;
    flex-direction: column;
    padding: 50px 100px;
    width: calc(100% - 250px);

    .board_tilte {
      font-size: 36px;
      font-weight: 700;
      margin-bottom:  40px;
      height: 100px;
    }

    .boar_wrap {
      height: 100%;
      width: 100%;
      overflow: scroll;
    }
  }

}
</style>~/composables/dataFactory