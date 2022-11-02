<template>
  <header>
    <div class="header__menu">
      <div class="header__logo" @click="redirectHomepage">
        <img src="../../assets/svg/logo.svg" alt="logo" />
      </div>
      <ul class="header__details-menu" v-if="getRole === 'ROLE_ADMIN'">
        <router-link :to="{ name: 'diplomas'}" tag="li" class="header__menu-item">Quản lý văn bằng</router-link>
      </ul>
      <ul class="header__details-menu" v-if="getRole === 'ROLE_SUPERADMIN'">
        <router-link :to="{ name: 'diplomas'}" tag="li" class="header__menu-item">Quản lý văn bằng</router-link>
        <router-link :to="{ name: 'users'}" tag="li" class="header__menu-item">Quản lý người dùng</router-link>
      </ul>
      <ul class="header__details-menu" v-if="getRole === 'ROLE_PRINCIPAL'">
        <router-link :to="{ name: 'Principal'}" tag="li" class="header__menu-item">Quản lý văn bằng</router-link>
      </ul>
    </div>
    <div class="header__user-info">
      <div class="header__notification">
        <img src="../../assets/svg/notification-icon.svg" alt="notification icon" />
      </div>
      <div class="header__user-menu">
        <img src="../../assets/svg/user-sample.svg" alt="notification icon" class="user-img" />
        <div class="header__user--dropdown">
          <span class="header__username">Nguyễn Văn A</span>
          <ul class="dropdown">
            <li @click="logout">Logout</li>
          </ul>
        </div>

        <img src="../../assets/svg/down-icon.svg" alt="notification icon" class="down-icon" />
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["hasLogin", "getRole"])
  },
  methods: {
    logout() {
      this.$cookies.remove("access_token");
      localStorage.removeItem("vuex");
      this.$store.state.user.isLogin = false;
      this.$router.replace({ path: "/" });
    },
    redirectHomepage() {
      this.$router.replace({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin flexCenter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
span,
li {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  color: #44494d;
}

header {
  background: #ffff;
  width: 100%;
  height: 100px;
  padding: 0 20px;
  @include flexCenter;
  .header__menu {
    @include flexCenter;
    .header__logo {
      cursor: pointer;
    }
    .header__details-menu {
      @include flexCenter;
      li {
        list-style-type: none;
        margin-right: 1rem;
        font-weight: 600;
      }
    }
  }
  .header__user-info {
    @include flexCenter;
    .header__notification {
      margin-right: 1rem;
      position: relative;
      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ff0000;
      }
    }
    .header__user-menu {
      @include flexCenter;
      .user-img {
        border-radius: 50%;
        margin-right: 1rem;
      }
      .header__user--dropdown {
        position: relative;
        cursor: pointer;
        .header__username {
          font-weight: 600;
        }
        .dropdown {
          position: absolute;
          top: 16px;
          right: 0;
          width: 100px;
          padding: 10px;
          text-align: center;
          background-color: rgba($color: #000, $alpha: 0.1);
          list-style-type: none;
          display: none;
        }
        &:hover > .dropdown {
          display: block;
        }
      }
    }
  }
}
</style>