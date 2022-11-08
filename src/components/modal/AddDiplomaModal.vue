<template>
  <div class="modal">
    <form class="modal__content" @submit.prevent="submitForm">
      <div class="content__back" @click="$emit('hide-modal')">
        <img src="../../assets/svg/less-than.svg" alt id="less-than-icon" />
        <span class="back-text">Hủy</span>
      </div>
      <span class="model-header">Thêm mới văn bằng</span>
      <div class="user-group-input">
        <span class="input__header">Thông tin cá nhân</span>
        <div class="user-group-input__wrapper1">
          <div class="user-group-input__item input-item">
            <label for="userId">
              Mã sinh viên
              <input type="text" name="userId" v-model="diploma.userId" />
            </label>
          </div>
          <div class="user-group-input__item input-item">
            <label for="last-name">
              Họ đệm
              <input type="text" name="last-name" v-model="diploma.lastName" />
            </label>
          </div>
          <div class="user-group-input__item input-item">
            <label for="first-name">
              Tên
              <input type="text" name="first-name" v-model="diploma.firstName" />
            </label>
          </div>
          <div class="user-group-input__item input-item">
            <label for="birthday">
              Ngày sinh
              <input type="date" name="birthday" v-model="diploma.dateOfBirth" />
            </label>
          </div>
        </div>
        <div class="user-group-input__wrapper2">
          <div class="user-group-input__item input-item">
            <label for="gender">
              Giới tính
              <div class="group-radio-button">
                <label for="male">
                  <input type="radio" name="gender" id="male" v-model="diploma.gender" />
                  <div class="radio-custom">
                    <span></span>
                    <span>Nam</span>
                  </div>
                </label>

                <label for="female">
                  <input type="radio" name="gender" id="female" v-model="diploma.gender" />
                  <div class="radio-custom">
                    <span></span>
                    <span>Nữ</span>
                  </div>
                </label>
              </div>
            </label>
          </div>
          <div class="user-group-input__item input-item">
            <label for="place-of-birth">
              Nơi sinh
              <input type="text" name="place-of-birth" v-model="diploma.placeOfBirth" />
            </label>
          </div>
          <div class="user-group-input__item input-item">
            <label for="grade">
              Lớp sinh viên
              <input type="text" name="grade" v-model="diploma.grade" />
            </label>
          </div>
        </div>
      </div>

      <div class="diploma-group-input">
        <span class="input__header">Thông tin văn bằng</span>
        <div class="diploma-group-input__wrapper">
          <div class="diploma-group-input__item input-item">
            <label for="so-hieu">
              Số hiệu
              <input type="text" name="so-hieu" v-model="diploma.serialNumber" />
            </label>
          </div>
          <div class="diploma-group-input__item input-item">
            <label for="so-vao-so">
              Số vào sổ
              <input type="text" name="so-vao-so" v-model="diploma.refNumber" />
            </label>
          </div>
          <div class="diploma-group-input__item input-item">
            <label for="dot-tn">
              Đợt tốt nghiệp
              <input type="text" name="dot-tn" v-model="diploma.graduation" />
            </label>
          </div>
          <div class="diploma-group-input__item input-item">
            <label for="ngay-qd">
              Ngày quyết định
              <input type="date" name="ngay-qd" v-model="diploma.dateOfGraduate" />
            </label>
          </div>
          <!-- <div class="diploma-group-input__item input-item">
            <label for="status">
              Trạng thái
              <select name="status" v-model="diploma.status">
                <option v-for="(x, index) in getChoiceFeild.status" :value="index" :key="x.id">{{x}}</option>
              </select>
            </label>
          </div> -->
        </div>
      </div>

      <div class="program-group-input">
        <span class="input__header">Thông tin chương trình đào tạo</span>
        <div class="program-group-input__wrapper1">
          <div class="program-group-input__item input-item">
            <label for="major">
              Ngành đào tạo
              <select name="major" v-model="diploma.majorId">
                <option v-for="x in getChoiceFeild.majors" :value="x.id" :key="x.id">{{x.name}}</option>
              </select>
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="speciality">
              Chuyên ngành đào tạo
              <select name="speciality" v-model="diploma.specialityId">
                <option v-for="x in filterSpeciality" :value="x.id" :key="x.id">{{x.name}}</option>
              </select>
            </label>
          </div>
        </div>
        <div class="program-group-input__wrapper2">
          <div class="program-group-input__item input-item">
            <label for="avg-point">
              Điểm TB
              <input type="text" name="avg-point" v-model="diploma.gpa" />
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for>
              Tổng TC tích lũy
              <input type="text" name v-model="diploma.totalCredits" />
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="rank">
              Xếp loại
              <select name="rank" v-model="diploma.rankId">
                <option v-for="(x, index) in getChoiceFeild.ranks" :value="index" :key="x.id">{{x}}</option>
              </select>
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="level">
              Trình độ
              <select name="level" v-model="diploma.levelId">
                <option v-for="(x, index) in getChoiceFeild.levels" :value="index" :key="x.id">{{x}}</option>
              </select>
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="status">
              Thời gian đào tạo
              <input type="text" name v-model="diploma.trainingTime" />
            </label>
          </div>
        </div>
        <div class="program-group-input__wrapper3">
          <div class="program-group-input__item input-item">
            <label for>
              Ngày nhập học
              <input type="date" name v-model="diploma.dateOfEnrollment" />
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for>
              Niên khóa
              <input type="date" name v-model="diploma.session" />
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="modeOfStudy">
              Hình thức
              <select name="modeOfStudy" v-model="diploma.modeOfStudy">
                <option
                  v-for="(x, index) in getChoiceFeild.modeOfStudies"
                  :value="index"
                  :key="x.id"
                >{{x}}</option>
              </select>
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="language">
              Ngôn ngữ
              <select name="language" v-model="diploma.trainingLanguage">
                <option
                  v-for="(x, index) in getChoiceFeild.languages"
                  :value="index"
                  :key="x.id"
                >{{x}}</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div
        class="choice-file-area"
        :class="{expand: files.length > 0}"
        @drop.prevent="addFile"
        @dragover.prevent
      >
        <input type="file" name="file" multiple @change="choiceFile"/>
        <div class="choice-file-area__wrapper">
          <div class="choice-file-area__details">
            <img src="../../assets/svg/upload-icon.svg" alt id="upload-icon" />
            <div class="choice-file-area__guide">
              <span>Chọn file hoặc kéo thả vào vị trí này</span>
              <span>File văn bằng PDF kích thước không quá 10MB</span>
            </div>
          </div>
          <button type="button" class="btn-file">Chọn file</button>
        </div>
        <ul class="choice-file-area__wrapper1">
          <li v-for="(file, index) in files" :key="index">
            <img src="../../assets/svg/pdf-icon.svg" alt="Pdf icon" class="pdf-icon"/>
            <span>{{ file.name }}</span>
            <div class="remove-file" @click="removeFile(file)">
              <img src="../../assets/svg/cross-icon.svg" />
            </div>
          </li>
        </ul>
      </div>
      <button class="btn-add">Hoàn thành</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DiplomaService from "../../services/DiplomaService";
const service = new DiplomaService();

export default {
  data() {
    return {
      diploma: {
        userId: "",
        lastName: "",
        firstName: "",
        dateOfBirth: null,
        gender: false,
        placeOfBirth: "",
        grade: "",
        serialNumber: "",
        refNumber: "",
        graduation: "",
        dateOfGraduate: null,
        status: -1,
        majorId: -1,
        specialityId: -1,
        GPA: 0.0,
        totalCredits: 0,
        rankId: 0,
        levelId: 0,
        time: 0,
        dateOfEnrollment: null,
        session: null,
        modeOfStudy: -1,
        trainingLanguage: -1
      },
      files: []
    };
  },
  async created() {
    await this.getChoiceTrainningProgramFeild();
  },
  computed: {
    ...mapGetters("diploma", ["getChoiceFeild"]),
    filterSpeciality() {
      return this.diploma.majorId !== -1
        ? this.getChoiceFeild.specialities.filter(
            x => x.major.id === this.diploma.majorId
          )
        : [];
    }
  },
  methods: {
    ...mapActions("diploma", ["getChoiceTrainningProgramFeild"]),
    async submitForm() {
      const res = await service.addDiploma(this.diploma, this.files);
      if (res.status === 200) {
        this.$emit('success');
      }
      this.$toast.success('Thêm mới văn bằng thành công')
    },
    addFile(e) {
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      [...droppedFiles].forEach(f => {
        this.files.push(f);
      });
    },
    removeFile(file) {
      this.files = this.files.filter(f => {
        return f != file;
      });
    },
    choiceFile(e) {
      [...e.target.files].forEach(f => {
        this.files.push(f);
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
    .input__header {
      display: block;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
  .model-header {
    display: block;
    font-size: 20px;
    font-weight: 600;
    margin: 1rem 0 2rem 0;
  }
  .user-group-input {
    .user-group-input__wrapper1 {
      @include flexCenter;
      .user-group-input__item:nth-child(1) {
        width: 25%;
      }
      .user-group-input__item:nth-child(2) {
        width: 30%;
      }
      .user-group-input__item:nth-child(3) {
        width: 20%;
      }
      .user-group-input__item:nth-child(4) {
        width: 25%;
      }
    }
    .user-group-input__wrapper2 {
      @include flexCenter;
      margin-top: 1rem;
      .user-group-input__item:nth-child(1) {
        width: 25%;
        .group-radio-button {
          @include flexCenter;
          height: 50px;
          label {
            height: 100%;
            input {
              display: none;

              &:checked + .radio-custom span:nth-child(1) {
                background-color: #ff0000;
              }
            }
            .radio-custom {
              @include flexCenter;
              width: 100%;
              height: 100%;
              border: 1px solid #e6e6e6;
              border-radius: 10px;
              justify-content: space-evenly;
              padding: 10px;
              margin-right: 5px;
              position: relative;

              span:nth-child(1) {
                display: block;
                height: 15px;
                width: 15px;
                border-radius: 100%;
                border: 3px solid #fff;
                -webkit-box-shadow: 0px 0px 0px 2px #ff0000;
                box-shadow: 0px 0px 0px 2px #ff0000;
              }
            }
            &:nth-child(1) {
              margin-right: 1rem;
            }
          }
        }
      }
      .user-group-input__item:nth-child(2) {
        width: 50%;
      }
      .user-group-input__item:nth-child(3) {
        width: 25%;
      }
    }
  }
  .diploma-group-input {
    margin-top: 2rem;
    .diploma-group-input__wrapper {
      @include flexCenter;
      .diploma-group-input__item {
        width: 25%;
      }
    }
  }
  .program-group-input {
    margin-top: 2rem;
    .program-group-input__wrapper1 {
      @include flexCenter;
      .program-group-input__item:nth-child(1) {
        width: 50%;
      }
      .program-group-input__item:nth-child(2) {
        width: 50%;
      }
    }
    .program-group-input__wrapper2 {
      @include flexCenter;
      margin-top: 1rem;
      .program-group-input__item:nth-child(1) {
        width: 15%;
      }
      .program-group-input__item:nth-child(2) {
        width: 20%;
      }
      .program-group-input__item:nth-child(3) {
        width: 15%;
      }
      .program-group-input__item:nth-child(4) {
        width: 25%;
      }
      .program-group-input__item:nth-child(5) {
        width: 25%;
      }
    }
    .program-group-input__wrapper3 {
      @include flexCenter;
      margin-top: 1rem;
      .program-group-input__item {
        width: 25%;
      }
    }
  }

  .choice-file-area {
    height: 100px;
    margin: 2rem 0;
    background: #fcfcfc;
    border: 1px dashed rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    input[type="file"] {
      position: absolute;
      width: 100%;
      height: 100px;
      opacity: 0;
    }
    .choice-file-area__wrapper {
      @include flexCenter;
      height: 100px;
      .choice-file-area__details {
        @include flexCenter;
        img {
          margin: 0 2rem;
        }
        .choice-file-area__guide {
          @include flexCenter;
          flex-direction: column;
          align-items: flex-start;
          span:nth-child(1) {
            color: #44494d;
            display: block;
            margin-bottom: 12px;
          }
          span:nth-child(2) {
            color: rgba(0, 0, 0, 0.4);
            font-weight: 15px;
          }
        }
      }

      .btn-file {
        height: 40px;
        background: #fbfdfe;
        border: 1px solid rgba(239, 15, 63, 0.75);
        border-radius: 5px;
        text-transform: uppercase;
        color: #ef0f3f;
        padding: 12px 1rem;
        font-size: 16px;
        margin-right: 2rem;
      }
    }
    .choice-file-area__wrapper1 {
      @include flexCenter;
      justify-content: space-evenly;
      flex-wrap: wrap;
      list-style-type: none;
      li {
        width: 25%;
        background: #ffffff;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        height: 60px;
        padding: 5px 10px;
        position: relative;
        @include flexCenter;
        justify-content: flex-start;
        .pdf-icon {
          margin-right: 5px;
        }
        span {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .remove-file {
          position: absolute;
          width: 20px;
          height: 20px;
          right: -10px;
          top: -10px;
          border-radius: 50%;
          background-color: #a3a3a3;
          @include flexCenter;
          justify-content: center;
          img {
            width: 50%;
            height: 50%;
          }
        }
      }
    }
  }
  .expand {
    height: 200px;
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