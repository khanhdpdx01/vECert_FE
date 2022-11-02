<template>
  <div class="principal">
    <AdminHeader />
    <PrincipalSignDiplomaTable/>
    <AdminFooter />
  </div>
</template>

<script>
import AdminHeader from "../components/header/AdminHeader.vue";
import AdminFooter from "../components/footer/AdminFooter.vue";
import PrincipalSignDiplomaTable from "../components/table/PrincipalSignDiplomaTable.vue";

export default {
  components: {
    AdminFooter,
    AdminHeader,
    PrincipalSignDiplomaTable,
  }
};
</script>

<style scoped>
.principal {
  background-color: #f6f7fb;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>