<template>
  <div class="body">
    <div class="admin-table">
      <table>
        <thead>
          <th>Họ đệm</th>
          <th>Tên</th>
          <th>Ngày sinh</th>
          <th>Giới tính</th>
          <th>Nơi sinh</th>
          <th>Trình độ</th>
          <th>Hình thức ĐT</th>
          <th>Chuyên ngành</th>
          <th>Năm TN</th>
          <th>Số bằng</th>
          <th>Trạng thái VB</th>
          <th>Giao dịch</th>
          <th>Hành động</th>
        </thead>
        <tbody>
          <tr
            @click="getDiploma(diploma.serialNumber)"
            v-for="diploma in this.getDiplomas"
            :key="diploma.serialNumber"
          >
            <td>{{diploma.lastName}}</td>
            <td>{{diploma.firstName}}</td>
            <td>{{diploma.dateOfBirth}}</td>
            <td>{{diploma.gender ? 'Nam' : 'Nữ'}}</td>
            <td>{{diploma.placeOfBirth}}</td>
            <td>{{diploma.level}}</td>
            <td>{{diploma.modeOfStudy}}</td>
            <td>{{diploma.speciality}}</td>
            <td>{{diploma.yearOfGraduation}}</td>
            <td>{{diploma.serialNumber}}</td>
            <td>{{diploma.status}}</td>
            <td>
              <img v-if="diploma.status === 'Chưa nhận'" src="../../assets/svg/stop-icon.svg" alt class="filter" />
              <img v-if="diploma.status === 'Đã nhận'" src="../../assets/svg/check-icon.svg" alt class="filter" />
              <img v-if="diploma.status === 'Đang xử lý'" src="../../assets/svg/alert-icon.svg" alt class="filter" />
            </td>
            <td>
              <button class="btn-sign" @click="signDiploma(diploma.serialNumber)">Ký văn bằng</button>
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
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from "vuex";
import Pagination from "../pagination/Pagination.vue";
import DiplomaService from '../../services/DiplomaService';

export default {
  components: {
    Pagination
  },
  async created() {
    await this.getAllDiplomasHasPendingStatus({
      params: {
        page: 1,
        size: process.env.VUE_APP_TOTAL_ITEMS,
        sort: [],
        keyword: ""
      }
    });
  },
  computed: {
    ...mapGetters("diploma", ["getDiplomas", "getPage"])
  },
  methods: {
    ...mapActions("diploma", ["getAllDiplomasHasPendingStatus"]),
    async onPageChange(page) {
      this.getPage.currentPage = page;
      await this.getAllDiplomasHasPendingStatus({
        params: {
          page: this.getPage.currentPage,
          size: this.getPage.totalItems,
          sort: [],
          keyword: ""
        }
      });
    },
    async changeTotalItems(totalItems) {
      this.getPage.totalItems = totalItems;
      await this.getAllDiplomasHasPendingStatus({
        params: {
          page: this.getPage.currentPage,
          size: this.getPage.totalItems,
          sort: [],
          keyword: ""
        }
      });
    },
    async signDiploma(serialNumber) {
      const res = await new DiplomaService().signDiploma(serialNumber);
      if(res.status === 200) {
        this.$store.state.diploma.diplomas = this.getDiplomas.filter(item => item.serialNumber !== serialNumber);
        Vue.$toast.success('Ký thành công!');
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
    .btn-sign {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      background-color: #ef0f3f;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      z-index: 100;
      cursor: pointer;
    }
  }
}
</style>