import StudentAPI from "./api/index.js";

const main = async () => {
  const api = new StudentAPI();
  await api.load();
  await api.processStudents();
};

main();
