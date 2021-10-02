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
  }

  getNumberOfClasses() {
    return this.#rows[0]._rawData[0].slice(28);
  }

  getStudents() {
    return this.#rows.slice(2);
  }

  async processStudents() {
    const numberOfClasses = this.getNumberOfClasses();
    const students = this.getStudents();

    for (const student of students) {
      let approvalStatus = helpers.validateAbsence(student, numberOfClasses);

      if (approvalStatus == "Reprovado por Falta") {
        student["Situação"] = approvalStatus;
        student["Nota para Aprovação Final"] = 0;
        await student.save();
        continue;
      }

      const averageGrade = helpers.getAverageGrade(student);
      approvalStatus = helpers.validateGrades(averageGrade);

      const naf = helpers.remainingGradeForApproval(approvalStatus, averageGrade);

      student["Situação"] = approvalStatus;
      student["Nota para Aprovação Final"] = naf;
      await student.save();
    }
  }
}
