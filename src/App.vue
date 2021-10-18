<template>
  <div id="app">
   <main-tab-bar />

   <keep-alive exclued="Detail">
     <router-view />
   </keep-alive>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
   MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
