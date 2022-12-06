<template>
  <div class="home">
    <header>
      <img src="../assets/svg/logo-white.svg" alt="Picture" class="logo-white" />
      <img src="../assets/svg/curved.svg" alt="Picture" class="curved" />
      <img src="../assets/svg/picture.svg" alt="Picture" class="picture" />
    </header>
    <p class="brand-name">Hệ thống tra cứu văn bằng</p>
    <!-- <p class="verify" @click="goVerifyDiplomaPage">Xác minh văn bằng</p> -->
    <p class="login" @click="showLoginModal = true" v-if="!hasLogin">Đăng nhập</p>
    <p class="login" @click="redirectPage" v-else>Trang quản trị</p>
    <div class="group-input">
      <div class="group-input__fill-info-area">
        <div class="group-input__user-info">
          <input
            type="text"
            class="item user-info__last-name"
            placeholder="Họ đệm"
            v-model="params.lastName"
          />
          <input
            type="text"
            class="item user-info__first-name"
            placeholder="Tên"
            v-model="params.firstName"
          />
          <input
            type="date"
            class="item user-info__birthday"
            placeholder="Ngày sinh"
            v-model="params.dateOfBirth"
          />
        </div>
        <span>Hoặc</span>
        <div class="group-input__diploma-number">
          <input type="text" placeholder="Số hiệu văn bằng" v-model="params.serialNumber" />
        </div>
      </div>
      <button class="group-input__btn-search" @click="searchAction">
        <img src="../assets/svg/icons8-search.svg" alt />
        Tìm kiếm
      </button>
    </div>
    <SearchDiplomaResultTable v-if="showTable" :diplomas="this.getDiplomas" v-show="showResult"/>
    <p v-else v-show="showResult">Không tìm thấy văn bằng phù hợp</p>

    <LoginModal v-show="showLoginModal" @close-modal="showLoginModal = false"/>
    <!-- <GenerateCertificate/> -->
  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import GenerateCertificate from "../components/pdf/GenerateCertificate.vue"
import SearchDiplomaResultTable from "../components/table/SearchDiplomaResultTable.vue";
import LoginModal from "../components/modal/LoginModal.vue"
import { mapGetters, mapActions } from "vuex";

const subPath = process.env.VUE_APP_SUB_PATH;

export default {
  name: "Home",
  components: {
    SearchDiplomaResultTable,
    LoginModal,
    // GenerateCertificate
  },
  data() {
    return {
      showTable: false,
      showResult: false,
      showLoginModal: false,
      params: {
        lastName: "",
        firstName: "",
        dateOfBirth: null,
        serialNumber: null
      },
    };
  },
  computed: {
    ...mapGetters("diploma", ["getDiplomas"]),
    ...mapGetters("user", ['hasLogin', 'getRole'])
  },
  methods: {
    ...mapActions("diploma", ["searchDiploma"]),
    async searchAction() {
      await this.searchDiploma({ params: this.params });
      this.showResult = true;
      this.showTable = this.getDiplomas.length > 0 ? true : false;
    },
    goVerifyDiplomaPage() {
      this.$router.replace({ path: `${subPath}/verify` });
    },
    redirectPage() {
      if (this.hasLogin) {
        switch (this.getRole) {
          case "ROLE_ADMIN":
            this.$router.replace({ path: `${subPath}/admin/diplomas` });
            break;
          case "ROLE_SUPERADMIN":
            this.$router.replace({ path: `${subPath}/admin/diplomas` });
            break;
          case "ROLE_PRINCIPAL":
            this.$router.replace({ path:  `${subPath}/principal` });
        }
      } else {
        this.$toast.error('Người dùng không tồn tại hoặc đã bị chặn!');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/main.scss";
</style>
