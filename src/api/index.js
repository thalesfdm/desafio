import "dotenv/config";
import { GoogleSpreadsheet } from "google-spreadsheet";

import * as helpers from "../helpers/index.js";

/**
 * The StudentAPI class is a wrapper around the GoogleSpreadsheet class
 */
export default class StudentAPI {
  #doc;
  #rows;

  constructor() {
    this.#doc = new GoogleSpreadsheet(process.env.SHEET_ID);
    this.#rows = [];
  }

  async load() {
    await this.#doc.useServiceAccountAuth({
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
    });

    await this.#doc.loadInfo();

    /**
     * headerValues should be set this way, do not try to use
     * sheet.setHeaderRow() as it overwrites the original table
     */
    const sheet = this.#doc.sheetsByIndex[0];
    sheet.headerValues = [
      "Matricula",
      "Aluno",
      "Faltas",
      "P1",
      "P2",
      "P3",
      "Situação",
      "Nota para Aprovação Final",
    ];

    this.#rows = await sheet.getRows();

    console.log("> Document loaded.");
  }

  /**
   * e.g: "Total de aulas no semestre: 60" = 60
   */
  getNumberOfClasses() {
    return parseInt(this.#rows[0]._rawData[0].slice(28).trim());
  }

  getStudents() {
    return this.#rows.slice(2);
  }

  /**
   * Process each student row validating absence rate and grades
   * via helper functions and then saving it at the original table
   */
  async processStudents() {
    console.log(" > Processing student data...");

    const numberOfClasses = this.getNumberOfClasses();
    const students = this.getStudents();

    for (const student of students) {
      let approvalStatus = helpers.validateAbsence(student, numberOfClasses);

      if (approvalStatus == "Reprovado por Falta") {
        student["Situação"] = approvalStatus;
        student["Nota para Aprovação Final"] = 0;
        await student.save();

        console.log(`  > ${student["Aluno"].trimEnd()} - ${approvalStatus}`);
        continue;
      }

      const averageGrade = helpers.getAverageGrade(student);
      approvalStatus = helpers.validateGrades(averageGrade);

      const remainingGradeForApproval = helpers.getRemainingGradeForApproval(
        approvalStatus,
        averageGrade
      );

      student["Situação"] = approvalStatus;
      student["Nota para Aprovação Final"] = remainingGradeForApproval;
      await student.save();

      console.log(`  > ${student["Aluno"].trimEnd()} - ${approvalStatus}`);
    }

    console.table(
      students.map((student) => {
        return {
          "Aluno": student["Aluno"],
          "Situação": student["Situação"],
          "Nota para Aprovação Final": student["Nota para Aprovação Final"],
        };
      })
    );
  }
}
