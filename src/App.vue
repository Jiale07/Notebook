<template>
  <div class="main-body">
    <router-view ></router-view>
  </div>
</template>

<style lang="scss">
@import '/src/styles/theme.scss';

*{
  margin: 0;
  padding: 0;
}
.main-body {
  //background-color: var(--bg-primary);

}

//@media (prefers-color-scheme: dark) {
//  #app {
//    background-color: #121212;
//  }
//}


.main-body {
  display: flex;
  min-height: 100vh;
}
</style>


<!--
  #02546F
  #039BD2
  #7A9A9E
-->
<script setup lang="ts">
</script>
