export const validateAbsence = (student, numberOfClasses) => {
  const absenceLimit = numberOfClasses * 0.25;
  const absence = parseInt(student["Faltas"]);
  return absence > absenceLimit ? "Reprovado por Falta" : "";
};

export const getAverageGrade = (student) => {
  const P1 = parseInt(student["P1"]);
  const P2 = parseInt(student["P2"]);
  const P3 = parseInt(student["P3"]);
  return (P1 + P2 + P3) / 3;
};

export const validateGrades = (averageGrade) => {
  if (averageGrade < 50) {
    return "Reprovado por Nota";
  } else if (averageGrade < 70) {
    return "Exame Final";
  } else {
    return "Aprovado";
  }
};

export const getRemainingGradeForApproval = (approvalStatus, averageGrade) => {
  if (approvalStatus == "Exame Final") {
    return Math.ceil(100 - averageGrade);
  } else {
    return 0;
  }
};
