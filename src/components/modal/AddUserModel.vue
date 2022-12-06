<template>
  <div class="modal">
    <form class="modal__content" @submit.prevent="submitForm">
      <div class="content__back" @click="$emit('hide-user-modal')">
        <img src="../../assets/svg/less-than.svg" alt id="less-than-icon" />
        <span class="back-text">Hủy</span>
      </div>
      <span class="model-header">Thêm mới văn thư</span>

      <div class="program-group-input">
        <div class="program-group-input__wrapper1">
          <div class="program-group-input__item input-item">
            <label for="major">
              Họ và tên
              <input type="text" name="fullName" v-model="user.fullName" />
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="speciality">
              Số điện thoại
              <input type="text" name="phoneNumber" v-model="user.phoneNumber" />
            </label>
          </div>
        </div>
        <div class="program-group-input__wrapper2">
          <div class="program-group-input__item input-item">
            <label for="rank">
              Username
              <input type="text" name="username" v-model="user.username" />
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="level">
              Password
              <input type="password" name="password" v-model="user.password" />
            </label>
          </div>
        </div>
      </div>

      <button class="btn-add">Thêm mới</button>
    </form>
  </div>
</template>

<script>
import UserService from '../../services/UserService';
const service = new UserService();

export default {
  data() {
    return {
      user: {
        fullName: null,
        phoneNumber: null,
        username: null,
        Password: null
      }
    }
  },
  methods: {
    async submitForm() {
      const res = await service.createUser(this.user);
    
      if(res.status === 200) {
        this.$emit("success");
      }
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
  font-size: 16px;
  line-height: 18px;
  text-transform: capitalize;
  color: #44494d;
}
.input-item {
  @include flexCenter;
  flex-direction: column;
  margin-right: 0.5rem;
  label {
    letter-spacing: 0.2px;
    color: #73777a;
    line-height: 28px;
    width: 100%;
  }
  input,
  select {
    width: 100%;
    height: 50px;
    background: #fcfcfc;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
  }
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  .modal__content {
    margin: 75px auto;
    padding: 20px 50px;
    background: #fff;
    border: 1px solid #666;
    width: 70%;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    position: relative;
    .content__back {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    #less-than-icon {
      width: 15px;
    }
    .back-text {
      color: #ad0025;
      margin-left: 0.5rem;
    }
    .content__header {
      display: block;
      font-size: 20px;
      font-weight: 600;
      line-height: 16px;
      padding: 16px 0;
      margin-bottom: 16px;
      border-bottom: 0.7px solid #e0e0e0;
    }
  }
  .model-header {
    display: block;
    font-size: 20px;
    font-weight: 600;
    margin: 1rem 0 2rem 0;
  }
  .program-group-input {
    margin: 2rem 0;
    .program-group-input__wrapper1 {
      @include flexCenter;
      .program-group-input__item {
        width: 50%;
      }
    }
    .program-group-input__wrapper2 {
      @include flexCenter;
      margin-top: 1rem;
      .program-group-input__item {
        width: 50%;
      }
    }
  }

  .btn-add {
    margin: 0 auto;
    width: 200px;
    padding: 1rem 0;
    background: #ef0f3f;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
    border: none;
    border-radius: 10px;
    align-items: center;
    color: #ffffff;
    font-size: 16px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>