<template>
  <div id="home">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>
<style lang="scss">
#home {
  min-height: 100vh;
}

.formCardApp--bg {
  background-color: var(--second-color);
}

.button-app--white {
  background-color: white;
}

.linkToSwitch {
  margin-top: 25px;
  margin-bottom: 5px;
  font-size: 13px;
  text-align: left;
  color: var(--third-color);
  margin-left: 25px;
  color: white;
}
</style>
