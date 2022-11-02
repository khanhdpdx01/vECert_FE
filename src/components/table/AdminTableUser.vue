<template>
  <div class="body">
    <div class="admin-table">
      <div class="group-button">
        <div class="group-button__add-diploma-area">
          <span>Tất cả (50)</span>
          <img src="../../assets/svg/down-icon.svg" alt="notification icon" class="down-icon" />
          <button class="btn-add" @click="showAddUserModal= true">
            <img src="../../assets/svg/add-icon.svg" class="add-icon" />
            <span>Thêm mới người dùng</span>
          </button>
        </div>
        <div class="group-button__search-area">
          <input type="text" class="search-input" placeholder="Tìm kiếm tên hoặc số bằng" v-model="searchContent" @blur="search"/>
          <img src="../../assets/svg/filter-icon.svg" alt class="filter" />
        </div>
      </div>
      <table>
        <thead>
          <th>Username</th>
          <th>Họ và tên</th>
          <th>Số điện thoại</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="user in this.getUsers" :key="user.userId">
            <td>{{user.username}}</td>
            <td>{{user.fullName}}</td>
            <td>{{user.phoneNumber}}</td>
            <td>{{roles[user.role]}}</td>
            <td>{{user.active ? 'Đang hoạt động' : 'Bị khóa'}}</td>
            <td>
              <img src="../../assets/svg/lock-icon.svg" alt class="filter" @click="updateUser(user)"/>
            </td>
          </tr>
        </tbody>
      </table>

      <pagination
        :total-pages="getPage.totalPages"
        :per-page="getPage.totalItems"
        :current-page="getPage.currentPage"
        @pagechanged="onPageChange"
        @change-total-items="changeTotalItems"
      />

      <AdminTableUser
      v-if="showAddUserModal"
      @hide-user-modal="showAddUserModal = false"
      @success="showAddUserModal = false"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "../pagination/Pagination.vue";
import AdminTableUser from "../modal/AddUserModel.vue";
import { mapGetters, mapActions } from "vuex";
import UserService from '../../services/UserService';
const service = new UserService();

export default {
  data() {
    return {
      showAddUserModal: false,
      roles: {
        "ROLE_ADMIN": "Văn thư",
        "ROLE_SUPERADMIN": "Quản trị hệ thống",
        "ROLE_PRINCIPAL": "Hiệu trưởng"
      },
      searchContent: null
    };
  },
  components: {
    Pagination,
    AdminTableUser
  },
  async created() {
    await this.getAllUsers({
      params: {
        page: 1,
        size: process.env.VUE_APP_TOTAL_ITEMS,
        sort: [],
        keyword: ""
      }
    });
  },
  computed: {
    ...mapGetters("user", ["getUsers", "getPage"])
  },
  methods: {
    ...mapActions("user", ["getAllUsers"]),
    async onPageChange(page) {
      this.getPage.currentPage = page;
      await this.getAllUsers({
        params: {
          page: this.getPage.currentPage,
          size: this.getPage.totalItems,
          sort: [],
          keyword: this.searchContent
        }
      });
    },
    async changeTotalItems(totalItems) {
      this.getPage.totalItems = totalItems;
      await this.getAllUsers({
        params: {
          page: this.getPage.currentPage,
          size: this.getPage.totalItems,
          sort: [],
          keyword: this.searchContent
        }
      });
    },
    async search() {
      await this.getAllUsers({
        params: {
          page: 1,
          size: this.getPage.totalItems,
          sort: [],
          keyword: this.searchContent
        }
      });
    },
    async updateUser(existUser) {
      existUser.active = !existUser.active;
      const res = await service.updateUser({
        userId: existUser.userId,
        active: existUser.active
      });

      if(res.status === 200) {
        if(existUser.active) {
          this.$toast.success('Người dùng được mở chặn')
        } else {
          this.$toast.success('Người dùng đã bị chặn')
        }
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
input {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
}
.body {
  width: 100%;
  padding: 20px;
  height: 100%;
}
.admin-table {
  padding: 10px 20px;
  box-shadow: 0px 16px 40px rgba(112, 144, 176, 0.2);
  border-radius: 8px;
  background-color: #fff;
  height: 100%;
  .group-button {
    @include flexCenter;
    .group-button__add-diploma-area {
      @include flexCenter;
      img {
        margin-right: 5px;
      }
      .btn-add {
        @include flexCenter;
        padding: 0 10px;
        height: 50px;
        background: #ef0f3f;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
        border: none;
        border-radius: 10px;
        color: #fff;
        margin-left: 1rem;
        cursor: pointer;
      }
    }
    .group-button__search-area {
      @include flexCenter;
      input {
        width: 400px;
        background: #f1f1f1;
        border-radius: 5px;
        height: 50px;
        border: none;
        color: #8f9294;
        opacity: 0.5;
        padding-left: 1rem;
        margin-right: 1rem;
      }
    }
  }
  table {
    margin: 1rem 0;
    font-family: "Roboto";
    width: 100%;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 135%;
    letter-spacing: 0.05em;
    text-transform: capitalize;
    border-collapse: collapse;
    td {
      padding: 8px;
      font-size: 14px;
    }
    th {
      height: 55px;
      padding: 12px 8px;
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #f2f2f2;
      font-size: 14px;
    }
    tr {
      height: 55px;
      border-top: 0.7px solid #dfdfdf;
      border-bottom: 0.7px solid #dfdfdf;
      &:nth-child(even) {
        background-color: #f2f2f2;
      }
      &:hover {
        background-color: #ddd;
        cursor: pointer;
      }
    }
  }
}
</style>