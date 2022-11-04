<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-content">
      <div class="center">
        <h1>Đăng nhập</h1>
        <form method="post" @submit.prevent="startLogin">
          <div class="txt_field">
            <input type="text" v-model="info.username" required />
            <span></span>
            <label>Username</label>
          </div>
          <div class="txt_field">
            <input type="password" v-model="info.password" required />
            <span></span>
            <label>Password</label>
          </div>
          <input type="submit" value="Login" />
          <div class="signup_link"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      info: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["hasLogin", "getRole"])
  },
  methods: {
    ...mapActions("user", ["login"]),
    async startLogin() {
      console.log(this.info);
      await this.login(this.info);
      if (this.hasLogin) {
        switch (this.getRole) {
          case "ROLE_ADMIN":
            this.$router.replace({ path: "/admin/diplomas" });
            break;
          case "ROLE_SUPERADMIN":
            this.$router.replace({ path: "/admin/diplomas" });
            break;
          case "ROLE_PRINCIPAL":
            this.$router.replace({ path: "/principal" });
        }
      } else {
        this.$toast.error('Người dùng không tồn tại hoặc đã bị chặn!')
      }
    },
    closeModal() {
      this.$emit("close-modal");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  width: 100%;
  height: 100%;

  .overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    z-index: 9999;
    margin: 75px auto;
    padding: 20px 50px;
    background: #fff;
    border: 1px solid #666;
    width: 30%;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    position: relative;

    .center h1 {
      text-align: center;
      padding: 20px 0;
    }
    .center form {
      padding: 0 40px;
      box-sizing: border-box;
    }
    form .txt_field {
      position: relative;
      border-bottom: 2px solid #adadad;
      margin: 30px 0;
    }
    .txt_field input {
      width: 100%;
      padding: 0 5px;
      height: 40px;
      font-size: 16px;
      border: none;
      background: none;
      outline: none;
    }
    .txt_field label {
      position: absolute;
      top: 50%;
      left: 5px;
      color: #adadad;
      transform: translateY(-50%);
      font-size: 16px;
      pointer-events: none;
      transition: 0.5s;
    }
    .txt_field span::before {
      content: "";
      position: absolute;
      top: 40px;
      left: 0;
      width: 0%;
      height: 2px;
      background: #2691d9;
      transition: 0.5s;
    }
    .txt_field input:focus ~ label,
    .txt_field input:valid ~ label {
      top: -5px;
      color: #2691d9;
    }
    .txt_field input:focus ~ span::before,
    .txt_field input:valid ~ span::before {
      width: 100%;
    }
    .pass {
      margin: -5px 0 20px 5px;
      color: #2691d9;
      cursor: pointer;
      opacity: 70%;
    }
    .pass:hover {
      text-decoration: underline;
    }
    input[type="submit"] {
      width: 100%;
      height: 50px;
      border: 1px solid;
      background: #2691d9;
      border-radius: 25px;
      font-size: 18px;
      color: #e9f4fb;
      font-weight: 700;
      cursor: pointer;
      outline: none;
    }
    input[type="submit"]:hover {
      border-color: #2691d9;
      transition: 0.5s;
    }
    .signup_link {
      margin: 30px 0;
      text-align: center;
      font-size: 16px;
      color: #666666;
    }
    .signup_link a {
      color: #2691d9;
      text-decoration: none;
    }
    .signup_link a:hover {
      text-decoration: underline;
    }
  }
}
</style>