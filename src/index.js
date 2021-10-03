import StudentAPI from "./api/index.js";

const main = async () => {
  const api = new StudentAPI();
  try {
    await api.load();
    await api.processStudents();
  } catch (err) {
    console.log(err);
  }
};

main();
