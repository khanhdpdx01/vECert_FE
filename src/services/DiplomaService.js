// import axios from 'axios';
import http from './index';

class DiplomaService {
  getChoiceTrainingProgramFeild() {
    return http.get(`/diplomas/get-choice-training-program-feild`);
  }
  addDiploma(diploma, files) {
    let formData = new FormData();
    const blob = new Blob([JSON.stringify(diploma)], {
      type: 'application/json'
    });
    formData.append("diploma", blob);
    files.forEach(file => formData.append("files", file));

    return http.post(`/diplomas`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  getAllDiplomas() {
    return http.get('diplomas');
  }
  getAllDiplomasWithPagination(params) {
    return http.get('diplomas/all', params);
  }
  searchDiploma(params) {
    return http.get('diplomas/search', params);
  }
  getDiploma(id) {
    return http.get(`diplomas/${id}`);
  }
  getAllDiplomasHasPendingStatus(params) {
    return http.get('diplomas/pending-status', params);
  }
  signDiploma(serialNumber) {
    return http.post('diplomas/sign', {serialNumber});
  }
  verifyDiploma(serialNumber) {
    return http.get(`diplomas/verify/${serialNumber}`);
  }
}

export default DiplomaService;