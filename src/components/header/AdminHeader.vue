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
      <div class="header__user-menu">
        <div class="header__user--dropdown">
          <img src="../../assets/img/profile-user.png" alt="notification icon" class="user-img" />
          <span class="header__username">{{getUsername}}</span>
          <ul class="dropdown">
            <li @click="logout">
              <img src="../../assets/svg/log_out_icon.svg" alt="notification icon" class="logout-img" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["hasLogin", "getRole", "getUsername"])
  },
  methods: {
    logout() {
      this.$cookies.remove("access_token");
      localStorage.removeItem("vuex");
      this.$store.state.user.isLogin = false;
      this.$router.replace({ path: '/' });
    },
    redirectHomepage() {
      this.$router.replace({ path: '/' });
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
        cursor: pointer;
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
        margin-right: .5rem;
        width: 25px;
        height: 25px;
      }
      .header__user--dropdown {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        .header__username {
          font-weight: 600;
          text-align: center;
          text-transform: none;
        }
        .dropdown {
          position: absolute;
          top: 25px;
          right: 0;
          width: 150px;
          padding: 10px;
          text-align: center;
          background-color: rgba($color: #000, $alpha: 0.1);
          list-style-type: none;
          display: none;
          li {
            display: flex;
            justify-content: space-around;
            align-items: center;
            text-transform:none;
            text-align: start;
          }
        }
        &:hover > .dropdown {
          display: block;
        }
      }
    }
  }
}
</style>