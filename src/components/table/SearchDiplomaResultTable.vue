<template>
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
      <th>Xếp loại</th>
      <th>Quyết định TN</th>
      <th>Số vào sổ</th>
      <th>Số bằng</th>
      <th>Trạng thái</th>
    </thead>
    <tbody>
      <tr v-for="diploma in diplomas" :key="diploma.serialNumber" @click="getDiploma(diploma.serialNumber)">
        <td>{{diploma.lastName}}</td>
        <td>{{diploma.firstName}}</td>
        <td>{{diploma.dateOfBirth}}</td>
        <td>{{diploma.gender}}</td>
        <td>{{diploma.placeOfBirth}}</td>
        <td>{{diploma.level}}</td>
        <td>{{diploma.modeOfStudy}}</td>
        <td>{{diploma.speciality}}</td>
        <td>{{diploma.yearOfGraduation}}</td>
        <td>{{diploma.rank}}</td>
        <td>{{diploma.graduation}}</td>
        <td>{{diploma.refNumber}}</td>
        <td>{{diploma.serialNumber}}</td>
        <td>
          <span v-if="diploma.status === 'Đã nhận'" class="status-diploma status-diploma-success">{{diploma.status}}</span>
          <span v-if="diploma.status === 'Đang xử lý'" class="status-diploma status-diploma-pending">{{diploma.status}}</span>
        </td>
      </tr>
    </tbody>

    <DetailsDiplomaModal v-if="showModal" @hide-details-modal="showModal = false" :diploma="diploma"/>
  </table>
</template>

<script>
import DetailsDiplomaModal from "../../components/modal/DetailsDiplomaModal.vue";
import DiplomaService from '../../services/DiplomaService'
const diplomaService = new DiplomaService();

export default {
  props: ["diplomas"],
  components: {
    DetailsDiplomaModal
  },
  data() {
    return {
      showModal: false,
      diploma: {}
    };
  },
  methods: {
    async getDiploma(id) {
      const res = await diplomaService.getDiploma(id);
      this.diploma = res.data;
      this.showModal = true;
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  font-family: "Roboto";
  border-collapse: collapse;
  width: 80%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 135%;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  td {
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #fff;
  }
  th {
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #fff;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #ffdcdf;
    color: #ef0f3f;
  }
  tr {
    cursor: pointer;pointerpointer
    &:nth-child(even) {
      background-color: #f2f2f2;
    }
    &:hover {
      background-color: #ddd;
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
}
</style>