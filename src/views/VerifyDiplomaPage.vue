<template>
  <div class="home">
    <header>
      <img src="../assets/svg/logo-white.svg" alt="Picture" class="logo-white" />
      <img src="../assets/svg/curved.svg" alt="Picture" class="curved" />
      <img src="../assets/svg/picture.svg" alt="Picture" class="picture" />
    </header>
    <p class="brand-name">Hệ thống xác minh văn bằng</p>
    <p class="login" @click="showLoginModal = true" v-if="!hasLogin">Đăng nhập</p>
    <div class="group-input">
      <div class="group-input__fill-info-area">
        <div class="group-input__user-info">
          <input
            type="text"
            class="item user-info__last-name"
            placeholder="Mã sinh viên"
            v-model="params.lastName"
          />
        </div>
        <div class="group-input__diploma-number">
          <input type="text" placeholder="Số hiệu văn bằng" v-model="params.serialNumber" />
        </div>
      </div>
      <button class="group-input__btn-search" @click="searchAction">
        <img src="../assets/svg/icons8-search.svg" alt />
        Xác minh
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
        userId: null,
        serialNumber: null
      },
    };
  },
  computed: {
    ...mapGetters("diploma", ["getDiplomas"]),
    ...mapGetters("user", ['hasLogin'])
  },
  methods: {
    ...mapActions("diploma", ["searchDiploma"]),
    async searchAction() {
      await this.searchDiploma({ params: this.params });
      this.showResult = true;
      this.showTable = this.getDiplomas.length > 0 ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/main.scss";

.group-input {
  justify-content: center;

	.group-input__fill-info-area {
		width: calc(50% - 150px);
		justify-content: center;
	}

	.group-input__user-info {
		width: 50%;
  }

	.group-input__diploma-number {
		width: 50%;
	}
}
</style>
