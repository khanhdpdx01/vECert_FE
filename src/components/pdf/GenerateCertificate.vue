<template>
  <div>
    <button @click="generateCertificate">Click me</button>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import certi from '../../assets/img/original-cert.txt'
import amiriFont from '../../assets/img/font.txt'

export default {
  create() {
    this.generateCertificate();
  },
  methods: {
    async generateCertificate() {
      console.log(certi);
      console.log(amiriFont);
      var studentname = "Nguyễn Tấn Khanh";
      var collegename = "Đại học Đà Nẵng";
      var eventname = "Lễ tốt nghiệp";
      var placename = "Hội trường khu F";
      var dateevent = "1/9/2023";
      var filename = "sample-content";
      var doc = new jsPDF("landscape", "mm", "a4");
      doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
      doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
      doc.setFont("Amiri");
      doc.addImage(certi, "JPEG", 0, 0, 297, 210);

      /* Student Name */
      console.log(studentname.length);
      if (studentname.length > 40) {
        doc.setFontSize(16);
        doc.text(150, 101, studentname);
      } else if (studentname.length > 35) {
        doc.setFontSize(20);
        doc.text(150, 101, studentname);
      } else if (studentname.length < 16) {
        doc.setFontSize(22);
        doc.text(180, 101, studentname);
      } else if (studentname.length < 21) {
        doc.setFontSize(22);
        doc.text(175, 101, studentname);
      } else {
        doc.setFontSize(22);
        doc.text(153, 101, studentname);
      }

      /* College Name*/
      if (studentname.length > 64) {
        doc.setFontSize(18);
        doc.text(25, 115, collegename);
      } else if (studentname.length > 32) {
        doc.setFontSize(20);
        doc.text(25, 115, collegename);
      } else {
        doc.setFontSize(22);
        doc.text(25, 115, collegename);
      }

      /* Event Name */
      if (studentname.length > 64) {
        doc.setFontSize(18);
        doc.text(201, 115, eventname);
      } else if (studentname.length > 32) {
        doc.setFontSize(20);
        doc.text(201, 115, eventname);
      } else {
        doc.setFontSize(22);
        doc.text(201, 115, eventname);
      }

      /* Place Name */
      if (studentname.length > 64) {
        doc.setFontSize(18);
        doc.text(224, 128, placename);
      } else if (studentname.length > 32) {
        doc.setFontSize(20);
        doc.text(224, 128, placename);
      } else {
        doc.setFontSize(22);
        doc.text(224, 128, placename);
      }

      /* Date of the Event */
      doc.setFontSize(20);
      doc.text(100, 141, dateevent);

      doc.save(filename + ".pdf");
    }
  }
};
</script>

<style>
</style>