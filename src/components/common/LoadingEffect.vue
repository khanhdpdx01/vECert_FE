<template>
  <div class="loading">
    <img src="../../assets/svg/loading.svg" alt id="loading-icon"/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.loading {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>