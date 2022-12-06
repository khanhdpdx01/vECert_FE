<template>
  <div class="modal">
    <div class="modal__content">
      <div class="content__back" @click="$emit('hide-details-modal')">
        <img src="../../assets/svg/less-than.svg" alt id="less-than-icon" />
        <span class="back-text">Quay lại</span>
      </div>

      <div class="content__user-info">
        <div class="content__modal">
          <span class="content__modal--header">Thông tin cá nhân</span>
          <button class="btn-verify" @click="verifyDiploma" v-if="showVerifyButton && isSigned && isAdminPage">Xác minh</button>
          <span
            class="content__modal--verify-result-valid"
            v-if="!showVerifyButton && isValid"
          >Thông tin văn bằng hợp lệ</span>
          <span
            class="content__modal--verify-result-invalid"
            v-if="!showVerifyButton && !isValid"
          >Thông tin văn bằng không hợp lệ</span>
        </div>
        <div class="content__user-detals-info">
          <div class="item">
            <span class="title">Mã sinh viên:</span>
            <span class="content">{{diploma.userId}}</span>
          </div>
          <div class="item">
            <span class="title">Ngày sinh:</span>
            <span class="content">{{diploma.dateOfBirth}}</span>
          </div>
          <div class="item">
            <span class="title">Nơi sinh:</span>
            <span class="content">{{diploma.placeOfBirth}}</span>
          </div>
          <div class="item">
            <span class="title">Họ tên:</span>
            <span class="content">{{diploma.lastName}} {{diploma.firstName}}</span>
          </div>
          <div class="item">
            <span class="title">Giới tính:</span>
            <span class="content">{{diploma.gender}}</span>
          </div>
          <div class="item">
            <span class="title">Lớp sinh viên:</span>
            <span class="content">{{diploma.grade}}</span>
          </div>
        </div>
      </div>

      <div class="content__diploma-info">
        <span class="content__header">Thông tin văn bằng và chương trình đào tạo</span>
        <div class="content__diploma-info-wrapper">
          <div class="content__diploma-detals-info">
            <div class="item">
              <span class="title">Số hiệu văn bằng:</span>
              <span class="content">{{diploma.serialNumber}}</span>
            </div>
            <div class="item">
              <span class="title">Trình độ đào tạo:</span>
              <span class="content">{{diploma.level}}</span>
            </div>
            <div class="item">
              <span class="title">Số vào sổ:</span>
              <span class="content">{{diploma.refNumber}}</span>
            </div>
            <div class="item">
              <span class="title">Hình thức đào tạo:</span>
              <span class="content">{{diploma.modeOfStudy}}</span>
            </div>

            <div class="item">
              <span class="title">Đợt tốt nghiệp:</span>
              <span class="content">{{diploma.graduation}}</span>
            </div>

            <div class="item">
              <span class="title">Tổng số tín chỉ tích lũy:</span>
              <span class="content">{{diploma.totalCredits}}</span>
            </div>
            <div class="item">
              <span class="title">Ngày quyết định tốt nghiệp:</span>
              <span class="content">{{diploma.dateOfGraduation}}</span>
            </div>
            <div class="item">
              <span class="title">Ngày nhập học:</span>
              <span class="content">{{diploma.dateOfEnrollment}}</span>
            </div>
            <div class="item">
              <span class="title">Điểm TB tốt nghiệp:</span>
              <span class="content">{{diploma.gpa}}</span>
            </div>
            <div class="item">
              <span class="title">Thời gian đào tạo:</span>
              <span class="content">{{diploma.time}} năm</span>
            </div>
            <div class="item">
              <span class="title">Xếp loại tốt nghiệp:</span>
              <span class="content">{{diploma.rank}}</span>
            </div>
            <div class="item">
              <span class="title">Niên khóa:</span>
              <span class="content">206270241</span>
            </div>
            <div class="item">
              <span class="title">Ngành đào tạo:</span>
              <span class="content">{{diploma.speciality}}</span>
            </div>
            <div class="item">
              <span class="title">Ngôn ngữ đào tạo:</span>
              <span class="content">{{diploma.trainingLanguage}}</span>
            </div>
            <div class="item">
              <span class="title">Chuyên ngành đào tạo:</span>
              <span class="content">{{diploma.major}}</span>
            </div>
            <div class="item">
              <span class="title">Trạng thái:</span>
              <span class="content">{{diploma.status}}</span>
            </div>
          </div>
          <div class="content__diploma-digital-signature">
            <img src="../../assets/svg/digital-signature.svg" alt />
            <span>Xác minh chữ ký số</span>
          </div>
        </div>
      </div>

      <div class="content__storage-info" v-if="diploma.status === 1">
        <span class="content__header">Thông tin lưu trữ blockchain</span>
        <div class="content__storage-detals-info">
          <!-- <div class="item">
            <span class="title">Trạng thái giao dịch</span>
            <span class="content">61c0b802846b4408241efcaf</span>
          </div>-->
          <div class="item">
            <span class="title">Mã giao dịch:</span>
            <span class="content">{{diploma.transactionId}}</span>
          </div>
          <div class="item">
            <span class="title">Thông tin tra cứu:</span>
            <!-- <span class="content">{{explorer_endpoint}}/{{diploma.tx}}</span> -->
            <a class="content" target="_blank" :href="explorer_endpoint">{{explorer_endpoint}}</a>
          </div>
        </div>
      </div>

      <iframe :src="image"></iframe>
    </div>
  </div>
</template>
<script>
import DiplomaService from "../../services/DiplomaService";
const service = new DiplomaService();

export default {
  props: ["diploma"],
  data() {
    return {
      image: null,
      showVerifyButton: true,
      isValid: true,
      explorer_endpoint: `${process.env.VUE_APP_EXPLORER_ENDPOINT}/?tab=transactions&transId=${this.diploma.transactionId}`,
      isSigned: false,
      isAdminPage: true,
    };
  },
  mounted() {
    // console.log(this.diploma?.diplomaLink);
    // this.image =
    //   process.env.VUE_APP_SERVICE_ENDPOINT +
    //   "/diplomas/files/" +
    //   this.diploma?.diplomaLink;

    if (this.diploma.status === 1) {
      this.image =
        process.env.VUE_APP_IPFS_ENDPOINT + "/ipfs/" + this.diploma?.diplomaLink;
        this.isSigned = true;
    } else {
      this.image =
        process.env.VUE_APP_SERVICE_ENDPOINT + "/diplomas/files/" +
        this.diploma?.diplomaLink;
    }
    if(this.$route.name === 'Home') {
      this.isAdminPage = false;
    }
  },
  methods: {
    async verifyDiploma() {
      const res = await service.verifyDiploma(
        this.diploma.serialNumber
      );
      if (res.data) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      this.showVerifyButton = false;
    }
  }
};
</script>

<style lang="scss" scoped>
span, a {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.1px;
}

.title {
  color: #8f9294;
}

.content {
  color: #44494d;
  font-weight: 600;
}
.modal {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .modal__content {
    margin: 75px auto;
    padding: 20px 50px;
    background: #fff;
    border: 1px solid #666;
    width: 60%;
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
    .content__user-info {
      .content__modal {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        border-bottom: 0.7px solid #e0e0e0;
        margin-bottom: 16px;
        padding: 16px 0;
        .content__modal--header {
          font-size: 20px;
          font-weight: 600;
          line-height: 16px;
        }
        .btn-verify {
          height: 30px;
          padding: 0 15px;
          background-color: #ef0f3f;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }
        .content__modal--verify-result-valid {
          // font-size: 20px;
          font-weight: 600;
          line-height: 16px;
          color: #007f00;
        }
        .content__modal--verify-result-invalid {
          // font-size: 20px;
          font-weight: 600;
          line-height: 16px;
          color: #ef0f3f;
        }
      }
      .content__user-detals-info {
        display: flex;
        flex-flow: row wrap;
        .item {
          width: 33%;
          display: flex;
          .title {
            width: 120px;
          }
          .content {
            width: calc(100% - 120px);
          }
        }
      }
    }
    .content__diploma-info {
      .content__diploma-info-wrapper {
        display: flex;
        flex-direction: row;
        .content__diploma-detals-info {
          width: 90%;
          display: flex;
          flex-flow: wrap;
          .item {
            width: 50%;
            .title {
              display: inline-block;
              width: 220px;
            }
            .content {
              width: calc(100% - 220px);
            }
          }
        }
        .content__diploma-digital-signature {
          width: 10%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span {
            color: #007f00;
            margin-top: 10px;
            text-align: center;
          }
        }
      }
    }
    .content__storage-info {
      .content__storage-detals-info {
        display: flex;
        flex-flow: wrap;
        .item {
          width: 100%;
          .title {
            display: inline-block;
            width: 200px;
          }
          .content {
            width: calc(100% - 200px);
          }
        }
      }
    }
    iframe {
      margin-top: 1rem;
      width: 100%;
      height: 600px;
    }
  }
}
</style>