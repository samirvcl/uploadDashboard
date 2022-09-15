import api from "../api";

async function getAllMounthStatistics() {
  const { data } = await api.get("mounths");
  return data;
}

async function updateMounthStatistics(id) {
  const { data } = await api.patch(`mounths/${id}`, {
    count: 1,
  });
  console.log(data);
}
export { getAllMounthStatistics, updateMounthStatistics };
