import * as helpers from "./index.js";

describe("validate student absence", () => {
  const student = {};
  const numberOfClasses = 60;

  it("should return an empty string if student absence is <= 25%", () => {
    student["Faltas"] = numberOfClasses * 0.25;
    expect(helpers.validateAbsence(student, numberOfClasses)).toEqual("");
  });

  it("should return 'Reprovado por Falta' if student absence is > 25%", () => {
    student["Faltas"] = numberOfClasses * 0.25 + 1;
    expect(helpers.validateAbsence(student, numberOfClasses)).toEqual("Reprovado por Falta");
  });
});

describe("get student average grade", () => {
  const student = {};

  it("should return the average grade of a given student", () => {
    student["P1"] = 20;
    student["P2"] = 30;
    student["P3"] = 100;
    expect(helpers.getAverageGrade(student)).toEqual(50);
  });
});

describe("validate student grades", () => {
  let averageGrade = 0;

  it("should return 'Reprovado por Nota' only if average < 50", () => {
    averageGrade = 49;
    expect(helpers.validateGrades(averageGrade)).toEqual("Reprovado por Nota");

    averageGrade = 50;
    expect(helpers.validateGrades(averageGrade)).not.toEqual("Reprovado por Nota");
  });

  it("should return 'Exame Final' only if 50 <= average < 70", () => {
    averageGrade = 49;
    expect(helpers.validateGrades(averageGrade)).not.toEqual("Exame Final");

    averageGrade = 50;
    expect(helpers.validateGrades(averageGrade)).toEqual("Exame Final");

    averageGrade = 69;
    expect(helpers.validateGrades(averageGrade)).toEqual("Exame Final");

    averageGrade = 70;
    expect(helpers.validateGrades(averageGrade)).not.toEqual("Exame Final");
  });

  it("should return 'Aprovado' only if average >= 70", () => {
    averageGrade = 69;
    expect(helpers.validateGrades(averageGrade)).not.toEqual("Aprovado");

    averageGrade = 70;
    expect(helpers.validateGrades(averageGrade)).toEqual("Aprovado");

    averageGrade = 71;
    expect(helpers.validateGrades(averageGrade)).toEqual("Aprovado");
  });
});

describe("get remaining grade for approval", () => {
  let approvalStatus = "";
  let averageGrade = 0;

  it("should return '100 - average', rounded up, if approval equals 'Exame Final'", () => {
    approvalStatus = "Exame Final";
    averageGrade = 55;
    expect(helpers.getRemainingGradeForApproval(approvalStatus, averageGrade)).toEqual(45);
  });

  it("should return '0' if approval != 'Exame Final'", () => {
    approvalStatus = "Aprovado";
    expect(helpers.getRemainingGradeForApproval(approvalStatus, averageGrade)).toEqual(0);

    approvalStatus = "Reprovado por Falta";
    expect(helpers.getRemainingGradeForApproval(approvalStatus, averageGrade)).toEqual(0);

    approvalStatus = "Reprovado por Nota";
    expect(helpers.getRemainingGradeForApproval(approvalStatus, averageGrade)).toEqual(0);
  });
});
