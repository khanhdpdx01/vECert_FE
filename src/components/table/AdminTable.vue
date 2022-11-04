<template>
  <div class="body">
    <div class="admin-table">
      <div class="group-button">
        <div class="group-button__add-diploma-area">
          <span>Tất cả (50)</span>
          <img src="../../assets/svg/down-icon.svg" alt="notification icon" class="down-icon" />
          <button class="btn-add" @click="showAddDiplomaModal= true">
            <img src="../../assets/svg/add-icon.svg" class="add-icon" />
            <span>Thêm mới văn bằng</span>
          </button>
        </div>
        <div class="group-button__search-area">
          <input
            type="text"
            class="search-input"
            placeholder="Tìm kiếm tên hoặc số bằng"
            v-model="searchContent"
            @blur="search"
          />
          <img src="../../assets/svg/filter-icon.svg" alt class="filter" @click="showFilterModel=true"/>
        </div>
      </div>
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
          <th class="center">Năm TN</th>
          <th class="center">Số bằng</th>
          <th class="center">Trạng thái VB</th>
          <th class="center">Giao dịch</th>
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
            <td class="center">{{diploma.yearOfGraduation}}</td>
            <td class="center">{{diploma.serialNumber}}</td>
            <td class="center">
              <span v-if="diploma.status === 'Đã nhận'" class="status-diploma status-diploma-success">{{diploma.status}}</span>
              <span v-if="diploma.status === 'Đang xử lý'" class="status-diploma status-diploma-pending">{{diploma.status}}</span>
            </td>
            <td class="center">
              <img
                v-if="diploma.status === 'Chưa nhận'"
                src="../../assets/svg/stop-icon.svg"
                alt
                class="filter"
              />
              <img
                v-if="diploma.status === 'Đã nhận'"
                src="../../assets/svg/check-icon.svg"
                alt
                class="filter"
              />
              <img
                v-if="diploma.status === 'Đang xử lý'"
                src="../../assets/svg/alert-icon.svg"
                alt
                class="filter"
              />
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

    <AddDiplomaModal
      v-if="showAddDiplomaModal"
      @hide-modal="showAddDiplomaModal = false"
      @success="showAddDiplomaModal = false"
    />
    <DetailsDiplomaModal
      v-if="showDetailsModal"
      @hide-details-modal="showDetailsModal = false"
      :diploma="diploma"
    />
    <FilterDiplomaModel
      v-if="showFilterModel"
      @hide-filter-modal="showFilterModel = false"
      @success="showFilterModel = false"
      :filterFeilds="filterFeilds"
      :searchContent="searchContent"
    />
  </div>
</template>

<script>
import AddDiplomaModal from "../modal/AddDiplomaModal.vue";
import DetailsDiplomaModal from "../modal/DetailsDiplomaModal.vue";
import FilterDiplomaModel from "../modal/FilterDiplomaModel.vue";
import Pagination from "../pagination/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import DiplomaService from "../../services/DiplomaService";
const diplomaService = new DiplomaService();

export default {
  components: {
    AddDiplomaModal,
    DetailsDiplomaModal,
    FilterDiplomaModel,
    Pagination
  },
  data() {
    return {
      showAddDiplomaModal: false,
      showDetailsModal: false,
      showFilterModel : false,
      diploma: {},
      searchContent: null,
      filterFeilds: {
        majorId: null,
        specialityId: null,
        levelId: null,
        rankId: null,
        modeOfStudyId: null,
        statusId: null
      }
    };
  },
  async created() {
    await this.getAllDiplomasWithPagination({
      params: {
        page: 1,
        size: process.env.VUE_APP_TOTAL_ITEMS,
        sort: [],
        keyword: ""
      }
    });

    // await this.getAllDiplomas();
  },
  computed: {
    ...mapGetters("diploma", ["getDiplomas", "getPage"])
  },
  methods: {
    ...mapActions("diploma", ["getAllDiplomasWithPagination"]),
    async getDiploma(id) {
      const res = await diplomaService.getDiploma(id);
      this.diploma = res.data;
      this.showDetailsModal = true; 
    },
    async onPageChange(page) {
      this.getPage.currentPage = page;
      await this.getAllDiplomasWithPagination({
        params: {
          page: this.getPage.currentPage,
          size: this.getPage.totalItems,
          sort: [],
          keyword: this.searchContent,
          majorId: this.filterFeilds.majorId,
          specialityId: this.filterFeilds.specialityId,
          levelId: this.filterFeilds.levelId,
          rankId: this.filterFeilds.rankId,
          modeOfStudyId: this.filterFeilds.modeOfStudyId,
          statusId: this.filterFeilds.statusId
        }
      });
    },
    async changeTotalItems(totalItems) {
      this.getPage.totalItems = totalItems;
      await this.getAllDiplomasWithPagination({
        params: {
          page: this.getPage.currentPage,
          size: this.getPage.totalItems,
          sort: [],
          keyword: this.searchContent,
          majorId: this.filterFeilds.majorId,
          specialityId: this.filterFeilds.specialityId,
          levelId: this.filterFeilds.levelId,
          rankId: this.filterFeilds.rankId,
          modeOfStudyId: this.filterFeilds.modeOfStudyId,
          statusId: this.filterFeilds.statusId
        }
      });
    },
    async search() {
      await this.getAllDiplomasWithPagination({
        params: {
          page: 1,
          size: process.env.VUE_APP_TOTAL_ITEMS,
          sort: [],
          keyword: this.searchContent
        }
      });
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
GPA span,
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
        font-size: 14px;
        font-weight: 700;
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
    .status-diploma {
      padding: 5px 10px;
      border-radius: 5px;
      font-family: 'Roboto';
      font-weight: 600;
      font-size: 14px;
    }
    .status-diploma-success {
      background: #CDFFCD;
      color: #007F00;
    }
    .status-diploma-pending {
      background: #f6e4c8;
      color: #FF9900;
    }
    .center {
      text-align: center;
    }
  }
}
</style>
