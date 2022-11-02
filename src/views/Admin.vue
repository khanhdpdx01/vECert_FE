<template>
  <div class="admin">
    <AdminHeader/>
    <router-view/>
    <AdminFooter/>
  </div>
</template>

<script>
import AdminHeader from '../components/header/AdminHeader.vue'
import AdminFooter from '../components/footer/AdminFooter.vue'

export default {
    components: {
        AdminFooter,
        AdminHeader,
    }
}
</script>

<style scoped>
.admin {
  background-color: #f6f7fb;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>