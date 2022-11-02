<template>
  <div class="modal">
    <form class="modal__content" @submit.prevent="submitForm">
      <div class="content__back" @click="$emit('hide-filter-modal')">
        <img src="../../assets/svg/less-than.svg" alt id="less-than-icon" />
        <span class="back-text">Hủy</span>
      </div>
      <span class="model-header">Lọc văn bằng</span>

      <div class="program-group-input">
        <div class="program-group-input__wrapper1">
          <div class="program-group-input__item input-item">
            <label for="major">
              Ngành đào tạo
              <select name="major" v-model="filterFeilds.majorId">
                <option :value="null">Tất cả</option>
                <option v-for="x in getChoiceFeild.majors" :value="x.id" :key="x.id">{{x.name}}</option>
              </select>
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="speciality">
              Chuyên ngành đào tạo
              <select name="speciality" v-model="filterFeilds.specialityId">
                <option :value="null">Tất cả</option>
                <option v-for="x in filterSpeciality" :value="x.id" :key="x.id">{{x.name}}</option>
              </select>
            </label>
          </div>
        </div>
        <div class="program-group-input__wrapper2">
          <div class="program-group-input__item input-item">
            <label for="rank">
              Xếp loại
              <select name="rank" v-model="filterFeilds.rankId">
                <option :value="null">Tất cả</option>
                <option v-for="(x, index) in getChoiceFeild.ranks" :value="index" :key="x.id">{{x}}</option>
              </select>
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="level">
              Trình độ
              <select name="level" v-model="filterFeilds.levelId">
                <option :value="null">Tất cả</option>
                <option v-for="(x, index) in getChoiceFeild.levels" :value="index" :key="x.id">{{x}}</option>
              </select>
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="modeOfStudy">
              Hình thức
              <select name="modeOfStudy" v-model="filterFeilds.modeOfStudyId">
                <option :value="null">Tất cả</option>
                <option
                  v-for="(x, index) in getChoiceFeild.modeOfStudies"
                  :value="index"
                  :key="x.id"
                >{{x}}</option>
              </select>
            </label>
          </div>
          <div class="program-group-input__item input-item">
            <label for="status">
              Trạng thái
              <select name="status" v-model="filterFeilds.statusId">
                <option :value="null">Tất cả</option>
                <option v-for="(x, index) in getChoiceFeild.status" :value="index" :key="x.id">{{x}}</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <button class="btn-add">Lọc</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DiplomaService from "../../services/DiplomaService";
const service = new DiplomaService();

export default {
  props: ['filterFeilds', 'searchContent'],
  async created() {
    await this.getChoiceTrainningProgramFeild();
  },
  computed: {
    ...mapGetters("diploma", ["getChoiceFeild"]),
    filterSpeciality() {
      return this.filterFeilds.majorId !== -1
        ? this.getChoiceFeild.specialities.filter(
            x => x.major.id === this.filterFeilds.majorId
          )
        : [];
    }
  },
  methods: {
    ...mapActions("diploma", ["getChoiceTrainningProgramFeild", "getAllDiplomasWithPagination"]),
    async submitForm() {
      await this.getAllDiplomasWithPagination({
        params: {
          page: 1,
          size: process.env.VUE_APP_TOTAL_ITEMS,
          sort: [],
          keyword: this.searchContent,
          majorId: this.filterFeilds.majorId,
          specialityId: this.filterFeilds.specialityId,
          levelId: this.filterFeilds.levelId,
          rankId: this.filterFeilds.rankId,
          modeOfStudyId: this.filterFeilds.modeOfStudyId,
          statusId: this.filterFeilds.statusId
        },
      });
    
      this.$emit("success");
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
      .program-group-input__item {
        width: 25%;
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